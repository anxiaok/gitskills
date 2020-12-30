import React,{Component} from 'react'
import hello from './index.module.css'
// 快速书写 rcc rfc（函数定义的）
export default class Hello extends Component{
    render(){
        return <h2 className={hello.title}>Hello，react</h2>
    }
}