/**
 * Created by yuqian<peytonyu@126.com> on 2018/1/27.
 */
import React from "react";
const { Component, PropTypes } = React;
import './index.scss';
import classNames from 'classnames/bind';

export default class Overlay extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {show, canScroll, onClose} = this.props;
    const cls = classNames({
      "overlay-wrapper": true,
      "active": show
    })
    return (
      <div className={cls} onClick={() => {onClose()}}>
      </div>
    )
  }

}
