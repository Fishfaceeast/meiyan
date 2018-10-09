/**
 * Created by yuqian<peytonyu@126.com> on 2018/1/27.
 */
import React from "react";
const { Component, PropTypes } = React;
import './index.scss';
import classNames from 'classnames/bind';

export default class Overlay extends Component {

  static propTypes = {
    /**
     * 是否显示
     */
    show: PropTypes.bool.isRequired,

    /**
     * 是否自动锁定滚动
     */
    autoLockScrolling: PropTypes.bool.isRequired,

  };

  static defaultProps = {
    show: false,
    autoLockScrolling: true
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.show) {
      this.applyAutoLockScrolling(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.show && nextProps.show) {
      this.applyAutoLockScrolling(nextProps);
    }
    if (this.props.show && !nextProps.show) {
      this.allowScrolling();
    }
  }

  applyAutoLockScrolling(props) {
    if (props.autoLockScrolling) {
      this.preventScrolling();
    }
  }

  preventTouchMoveDefault(e) {
    e.preventDefault();
  }

  preventScrolling() {
    document.body.addEventListener('touchmove', this.preventTouchMoveDefault);
  }

  allowScrolling() {
    document.body.removeEventListener('touchmove', this.preventTouchMoveDefault, false);
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
