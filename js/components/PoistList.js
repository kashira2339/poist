import React, { Component, PropTypes } from 'react';
import Poist from './Poist';

export default class PoistList extends Component {
  static get propTypes() {
    return {
      poists: PropTypes.array.isRequired,
      actions: PropTypes.object.isRequired
    };
  };
  constructor(props, context) {
    props.actions.load();
    super(props, context);
  }
  render() {
    const { poists, actions } = this.props;
    const poistsForRender = poists.map((poist) => {
      return (
        <Poist
           key={ poist.id }
           poist={ poist }
           { ...actions }
           />
      );
    });
    return(
      <div className='poistList'>
        { poistsForRender }
      </div>
    );
  }
}
