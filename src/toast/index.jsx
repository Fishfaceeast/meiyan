/**
 * Created by yuqian<peytonyu@126.com> on 2018/1/27.
 */
import React from "react";
const { Component, PropTypes } = React;

export default class Toast extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="toast-wrapper">I am a toast!</div>
    )
  }
}
