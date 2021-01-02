// 创建“外壳”组件App 分别暴露和统一暴露
import React,{Component} from 'react'
import Search from './components/Search'
import List from './components/List'
// 创建并暴露App组件
export default class App extends Component{
    
    
    render(){
        return (
            <div className="container">
                <Search/>
                <List/>
            </div>
        )
    }
}