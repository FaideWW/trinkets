import React from 'react';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Result from '../components/Result';

function ResultContainer(props) {
  return <Result trinkets={props.trinkets} />;
}

ResultContainer.propTypes = {
  trinkets: ImmutablePropTypes.orderedMap.isRequired,
};

function mapStateToProps(state) {
  return {
    trinkets: state,
  };
}

export default connect(mapStateToProps, null)(ResultContainer);
