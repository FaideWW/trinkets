import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { withHandlers, pure, compose } from 'recompose';
import Item from './Item'

const withActions = withHandlers({
  addTrinket: ({ actions }) => () => actions.addTrinket({ shorthand: 'trinket', str: 'hello' }),
  removeTrinket: ({ actions }) => index => actions.removeTrinket({ index }),
});

const defaultInputs = {
  shorthand: '',
  str: '',
};

function List(props) {
  return (
    <div>
    <table className="pt-table pt-striped table">
      <thead>
        <tr>
          <th>Shorthand</th>
          <th>SimC String or Wowhead URL</th>
          <th>Minimum ilvl</th>
          <th>Maximum ilvl</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <Item isInserter trinket={defaultInputs} trinketIndex={props.trinkets.length} actions={props.actions} />
        {props.trinkets.toArray().map((trinket) => (
          <Item trinket={trinket} key={trinket.id} trinketIndex={trinket.id} actions={props.actions} />
        ))}
      </tbody>
    </table>
    </div>
  );
}

List.propTypes = {
  trinkets: ImmutablePropTypes.orderedMap.isRequired,
  actions: PropTypes.objectOf(PropTypes.func),
};

const enhance = compose(
  pure,
  withActions,
);

export default enhance(List);
