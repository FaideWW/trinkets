import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addTrinket } from '../store/actions';
import Importer from '../components/Importer';

function ImporterContainer(props) {
  return <Importer actions={props.actions} />;
}

ImporterContainer.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
}

function mapActionsToProps(dispatch) {
  return {
    actions: bindActionCreators({
      addTrinket,
    }, dispatch),
  };
}

export default connect(null, mapActionsToProps)(ImporterContainer);
