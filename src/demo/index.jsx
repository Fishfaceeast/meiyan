
import React, { Component } from 'react';
import Overlay from '../overlay';
import './index.scss';

export default class OverlayDemo extends Component {
  constructor(props) {
    super(props);
    this.togglePanel = this.togglePanel.bind(this);
    this.state = {
      show: false
    };
  }

  togglePanel() {
    this.setState((prevState) => {
      return {
        show: !prevState.show
      }
    })
  }

  render() {
    const { show } = this.state;
    return (
      <div>
        <button onClick={this.togglePanel}>Trigger Overlay!</button>
        { !!show && <div className="dialog">I am a dialog</div>}
        <Overlay
          show={show}
          onClose={this.togglePanel}
        />
      </div>

    );
  }
}
