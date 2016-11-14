import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addTrinket, updateTrinket, removeTrinket } from '../store/actions';
import List from '../components/List';

function ListContainer({ trinkets, actions }) {
  return <List trinkets={trinkets} actions={actions} />;
}

ListContainer.propTypes = {
  trinkets: ImmutablePropTypes.list.isRequired,
  actions: PropTypes.objectOf(PropTypes.func),
};

function mapStateToProps(state) {
  return {
    trinkets: state,
  };
}

function mapActionsToProps(dispatch) {
  return {
    actions: bindActionCreators({
      addTrinket,
      updateTrinket,
      removeTrinket,
    }, dispatch),
  };
}

export default connect(mapStateToProps, mapActionsToProps)(ListContainer);
