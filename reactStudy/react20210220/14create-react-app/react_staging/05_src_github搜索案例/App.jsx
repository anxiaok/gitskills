// 创建“外壳”组件App 分别暴露和统一暴露
import React,{Component} from 'react'
import Search from './components/Search'
import List from './components/List'
// 创建并暴露App组件
export default class App extends Component{
    state = {
        users:[],// 初始化状态，users初始值为数组
        isFirst:true,// 是否为第一次打开页面
        isLoading:false,//标识是否处于加载中
        err:'',// 存储请求相关的错误信息
    }
    // 更新app的sat
    updateAppState = (users)=>{
        this.setState(users);
    }
    render(){
        return (
            <div className="container">
                <Search updateAppState = {this.updateAppState}/>
                <List {...this.state}/>
            </div>
        )
    }
}