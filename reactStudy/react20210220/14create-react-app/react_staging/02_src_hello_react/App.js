// 创建“外壳”组件App 分别暴露和统一暴露
import React,{Component} from 'react'
import Hello from './components/Hello'
import Welcome from './components/Welcome'
// 创建并暴露App组件
export default class App extends Component{
    render(){
        return (
            <div>
                <Hello />
                <Welcome />
            </div>
        )
    }
}