// 自己实现一个connect方法，用于连接组件和store
/**
 * @file connect.js
 * @description Connects the component to the store
 * @param {function} mapStateToProps - Maps the state to the props
 * @param {function} mapDispatchToProps - Maps the dispatch to the props
 * @returns {function} - Returns the connected component:高阶组件
*/

import { PureComponent } from 'react';
// import store from '../store';
import { StoreContext } from './index';
export function connect(mapStateToProps, mapDispatchToProps) {

  return function (WrapperComponent) {
    class Component extends PureComponent {
      constructor(props,context) {
        super(props);
        this.state = {
          ...mapStateToProps(context.getState()),
        }
      }
      

      componentDidMount() {
        this.unsubscribe = this.context.subscribe(() => {
          // 重新渲染组件:不要这样做，因为这样做会导致组件的所有生命周期都会执行一遍
          // this.forceUpdate();

          const state = mapStateToProps(this.context.getState());
          this.setState({
            ...state,
          })
        });
      }
      componentWillUnmount() {
        this.unsubscribe()
      }
      render() {
        const state = mapStateToProps(this.context.getState());
        const dispatch = mapDispatchToProps(this.context.dispatch);
        return <WrapperComponent {...state} {...this.props} {...dispatch} />
      }
    }

    Component.contextType = StoreContext;

    return Component;
  }

}