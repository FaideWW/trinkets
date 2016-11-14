import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { withProps, pure, compose } from 'recompose';

const withComputedResult = withProps(({ trinkets }) => {
  let trinketString = '';

  if (trinkets.size < 2) {
    trinketString = 'Please add at least 2 trinkets.';
  } else {
    trinketString = `
# Auto-generated trinket list.  Paste this into the 'Overrides' tab.
# Be sure to remove the trinkets from your sim profile first as a control!
    `;

    for (let i = 0; i < trinkets.size; i++) {
      const trink1 = trinkets.get(i);
      const trink1String = `${formatTrinketString(trink1.str)}`;
      for (let j = i + 1; j < trinkets.size; j++) {
        const trink2 = trinkets.get(j);
        const trink2String = `${formatTrinketString(trink2.str)}`;

        trinketString += `
copy=${trink1.shorthand}+${trink2.shorthand}
trinket1=${trink1String}
trinket2=${trink2String}
        `;
      }
    }
  }

  return {
    trinketString,
  };
})

function Result(props) {
  return (
    <div>
      
      <pre>
        {props.trinketString}
      </pre>
    </div>
  );
}

Result.propTypes = {
  trinkets: ImmutablePropTypes.list.isRequired,
  trinketString: PropTypes.string,
}

const enhance = compose(
  pure,
  withComputedResult
);

export default enhance(Result);

function formatTrinketString(str) {
  const wowheadRegex = /wowhead.com\/item=(\d+)\/([^&]+)(?:&bonus=([:\d]+))?/g;

  const wowheadMatch = wowheadRegex.exec(str);
  if (!wowheadMatch.length || wowheadMatch.length < 3) {
    return str;
  }

  const trinketName = wowheadMatch[2].split('-').join('_');
  const trinketID = wowheadMatch[1];
  const trinketBonus = wowheadMatch[3];
  let trinketBonusStr = '';

  if (trinketBonus) {
    trinketBonusStr = `,bonus_id=${trinketBonus.split(':').join('/')}`;
  }

  return `${trinketName},id=${trinketID}${trinketBonusStr}`;
}
