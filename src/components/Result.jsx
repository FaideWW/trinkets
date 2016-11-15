import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { withProps, withHandlers, withState, pure, compose } from 'recompose';

const withComputedResult = withProps(({ trinkets, output }) => {
  if (output === 'pairs') {
    return { trinketString: generateTrinketPairs(trinkets.toArray()) };
  } else if (output === 'single') {
    return { trinketString: generateTrinketSingles(trinkets.toArray()) };
  } else {
    return { trinketString: 'Unsupported output format' };
  }
});

const withOutputFormat = withState('output', 'setOutput', 'pairs');

const withOutputActions = withHandlers({
  handleSetOutputFormat: ({ setOutput }) => e => setOutput(e.target.value),
});

function Result(props) {
  return (
    <div>
      <label className="pt-label pt-inline">
        Output format:
        <div className="pt-select">
          <select onChange={props.handleSetOutputFormat}>
            <option value="pairs">Pairs</option>
            <option value="single">Single</option>
          </select>
        </div>
      </label>
      <pre>
        {props.trinketString}
      </pre>
    </div>
  );
}

Result.propTypes = {
  trinkets: ImmutablePropTypes.orderedMap.isRequired,
  trinketString: PropTypes.string,
}

const enhance = compose(
  pure,
  withOutputFormat, 
  withOutputActions,
  withComputedResult
);

export default enhance(Result);

function generateTrinketPairs(trinkets) {
  if (trinkets.size < 2) {
    return 'Please add at least 2 trinkets.';
  }

  let trinketString = `
# Auto-generated trinket list.  Paste this into the 'Overrides' tab.
  `;

  for (let i = 0; i < trinkets.length; i++) {
    const trink1 = trinkets[i];
    const trink1String = `${formatTrinketString(trink1.str)}`;
    for (let j = i + 1; j < trinkets.length; j++) {
      const trink2 = trinkets[j];
      const trink2String = `${formatTrinketString(trink2.str)}`;

      trinketString += `
copy=${trink1.shorthand}+${trink2.shorthand}
trinket1=${trink1String}
trinket2=${trink2String}
      `;
    }
  }

  return trinketString;
}

function generateTrinketSingles(trinkets) {
  if (trinkets.size < 1) {
    return 'Please add at least 1 trinkets.';
  }

  let trinketString = `
# Auto-generated trinket list.  Paste this into the 'Overrides' tab.
  `;

  for (let i = 0; i < trinkets.length; i++) {
    const trink = trinkets[i];
    const trinkString = `${formatTrinketString(trink.str)}`;

    trinketString += `
copy=${trink.shorthand}
trinket1=${trinkString}
    `;
  }

  return trinketString;
}

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
