// 创建“外壳”组件App 分别暴露和统一暴露
import React,{Component} from 'react'
import {Link,NavLink,Route} from 'react-router-dom'
import Home from './pages/Home' // Home是路由组件
import About from './pages/About'// About是路由组件
import Header from './components/Header' // Header是一般组件
import MyNavLink from './components/MyNavLink'
// 创建并暴露App组件
export default class App extends Component{
    render(){
        return (
            <div>
                <div className="row">
                    <div className="col-xs-offset-2 col-xs-8">
                        <div className="page-header">
                            <Header />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-2 col-xs-offset-2">
                        <div className="list-group">
                            {
                                // <a className="list-group-item" href="./about.html">About</a>
                                // <a className="list-group-item active" href="./home.html">Home</a>
                            }
                            {
                                /**
                                 * React中靠路由链接实现切换组件，to的链接使用小写，不加.
                                 * BrowserRouter
                                 * HashRouter
                                 * 编写路由链接
                                 * Link NavLink
                                 */
                            }
                            <MyNavLink to="/about">About</MyNavLink>
                            <MyNavLink to="/home">Home</MyNavLink>
                        </div>
                    </div>
                    <div className="col-xs-6">
                        <div className="panel">
                            <div className="panel-body">
                                {
                                    /**
                                     * 注册路由
                                     */
                                }
                                <Route path="/about" component={About} />
                                <Route path="/home" component={Home} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}