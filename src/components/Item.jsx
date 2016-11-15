import React, { PropTypes } from 'react';
import { withState, withHandlers, pure, compose } from 'recompose';
import { Tooltip, Position } from '@blueprintjs/core';
import './Item.css';

const withHasChanges = withState('dirty', 'setDirty', false);
const withName = withState('name', 'setName', ({ trinket }) => trinket.shorthand);
const withString = withState('str', 'setStr', ({ trinket }) => trinket.str);
const withActions = withHandlers({
  handleDoFormAction: ({ isInserter, trinket, trinketIndex, actions, name, str, setName, setStr, setDirty }) => e => {
    e.preventDefault();
    console.log(actions);
    if (isInserter) {
      if (!name.trim().length || !str.trim().length) {
        return;
      }

      actions.addTrinket({ shorthand: name.trim(), str: str.trim() });
      setName('');
      setStr('');
    } else {
      if (!name.trim().length || !str.trim().length) {
        setName(trinket.shorthand);
        setStr(trinket.str);
        return;
      }
      actions.updateTrinket({ id: trinketIndex, shorthand: name.trim(), str: str.trim() });
      setName(name.trim());
      setStr(str.trim());
    }

    setDirty(false);
  },
  handleRemoveTrinket: ({ actions, trinketIndex }) => e => {
    e.preventDefault();
    actions.removeTrinket({ id: trinketIndex });
  },
  handleSetName: ({ name, setName, setDirty }) => e => {
    e.preventDefault();
    setName(e.target.value);
    setDirty(true);
  },
  handleSetString: ({ str, setStr, setDirty }) => e => {
    e.preventDefault();
    setStr(e.target.value);
    setDirty(true);
  },
});

function Item(props) {
  let actions = null;
  if (props.isInserter) {
    actions = (
      <button 
        className="pt-button pt-intent-primary pt-icon-add" 
        onClick={props.handleDoFormAction}
      >
        Add Trinket
      </button>
    );
  } else {
    actions = (
      <div className="pt-button-group">
        <Tooltip content="Update Trinket" position={Position.BOTTOM}>
          <button 
            className="pt-button pt-intent-success pt-icon-small-tick" 
            onClick={props.handleDoFormAction}
          />
        </Tooltip>
        <Tooltip content="Remove Trinket" position={Position.BOTTOM}>
          <button 
            className="pt-button pt-intent-danger pt-icon-small-cross" 
            onClick={props.handleRemoveTrinket}
          />
        </Tooltip>
      </div>
    );
  }
  return (
      <tr>
        <td>
          <input className="pt-input" placeholder="e.g. 'memento'" value={props.name} onChange={props.handleSetName} />
        </td>
        <td>
          <input className="pt-input" placeholder="e.g. 'http://www.wowhead.com/item=133644/memento-of-angerboda&bonus=1826'" value={props.str} onChange={props.handleSetString} />
        </td>
        <td>
          {actions}
        </td>
      </tr>
  );
}

Item.propTypes = {
  isInserter: PropTypes.bool,
  trinket: PropTypes.object,
  trinketIndex: PropTypes.string,
  name: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired,
  str: PropTypes.string.isRequired,
  setStr: PropTypes.func.isRequired,
  dirty: PropTypes.bool.isRequired,
  setDirty: PropTypes.func.isRequired,
  handleSetName: PropTypes.func.isRequired,
  handleSetString: PropTypes.func.isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
};

const enhance = compose(
  pure,
  withName,
  withString,
  withHasChanges,
  withActions,
);

export default enhance(Item);
