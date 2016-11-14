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
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <Item isInserter trinket={defaultInputs} trinketIndex={props.trinkets.length} actions={props.actions} />
        {props.trinkets.map((trinket, index) => (
          <Item trinket={trinket} key={index} trinketIndex={index} actions={props.actions} />
        ))}
      </tbody>
    </table>
    </div>
  );
}

List.propTypes = {
  trinkets: ImmutablePropTypes.list.isRequired,
  actions: PropTypes.objectOf(PropTypes.func),
};

const enhance = compose(
  pure,
  withActions,
);

export default enhance(List);
