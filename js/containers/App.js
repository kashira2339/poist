import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PoistList from '../components/PoistList';
import * as PoistActions from '../actions';

class App extends Component {
  static get propTypes() {
    return {
      poists: PropTypes.array.isRequired,
      actions: PropTypes.object.isRequired 
    };
  };
  constructor(props, context) {
    super(props, context);
    chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
      this.props.actions.addPoist();
    });
  }
  render() {
    const { poists, actions } = this.props;
    return (
      <PoistList poists={poists} actions={actions} />
    );
  }
}

export default connect(
  function(state) {
    return {
      poists: state.poists
    };
  },
  function(dispatch) {
    return {
      actions: bindActionCreators(PoistActions, dispatch)
    };
  }
)(App);
