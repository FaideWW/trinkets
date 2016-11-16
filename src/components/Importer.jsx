import React, { PropTypes } from 'react';
import { withHandlers, withState, pure, compose } from 'recompose';
import { parseWowheadURL } from '../util';
import axios from 'axios';

const withValid = withState('valid', 'setValid', true);
const withInputState = withState('value', 'setValue', '');

const withImportActions = withHandlers({
  handleImportWowhead: ({ actions, setValid, value }) => () => {
    const data = parseWowheadURL(value);

    if (!data) {
      setValid(false);
      return;
    }

    let bonus = '';
    if (data[3]) {
      bonus = `&bonus=${data[3]}`;
    }

    const constructedWowheadRequest = `http://www.wowhead.com/item=${data[1]}${bonus}&xml`;

    axios.get(constructedWowheadRequest)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        debugger;
        console.error(err);
      });

    setValid(true);
  },
  handleSetValue: ({ actions, setValue }) => e => {
    setValue(e.target.value);
  }
});

function Importer(props) {
  return (
    <div>
      Import from wowhead
      <input value={props.value} onChange={props.handleSetValue} />
      <button onClick={props.handleImportWowhead}>Import</button>
    </div>
  );
}

Importer.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
};

const enhance = compose(
  pure,
  withValid,
  withInputState,
  withImportActions,
);

export default enhance(Importer);
