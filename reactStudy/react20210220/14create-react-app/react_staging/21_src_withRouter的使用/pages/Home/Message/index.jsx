import React, { Component } from 'react'
import {Link,Route} from 'react-router-dom'
import Detail from './Detail'

export default class Message extends Component {
    state = {
        messageArr:[
            {id:'01',title:'消息1'},
            {id:'02',title:'消息2'},
            {id:'03',title:'消息3'},
        ]
    }
    replacesShow = (id,title)=>{
        // 编写一段代码，让其实现跳转到Detail组件，且为replace跳转
        
        const {history:{replace}} = this.props;
        // replace跳转+携带params参数
        // replace(`/home/message/detail/${id}/${title}`);
        
        // replace跳转+携带search参数
        // replace(`/home/message/detail?id=${id}&title=${title}`);

        // replace跳转+携带state参数
        replace(`/home/message/detail`,{id,title});
    }
    pushShow = (id,title)=>{
        
        const {history:{push}} = this.props;
        // push跳转+携带params参数
        // push(`/home/message/detail/${id}/${title}`);

        // push跳转+携带search参数
        // push(`/home/message/detail?id=${id}&title=${title}`);

        // push跳转+携带state参数
        push(`/home/message/detail`,{id,title});
    }
    back = ()=>{
        this.props.history.goBack();
    }
    forward = ()=>{
        this.props.history.goForward();
    }
    go = ()=>{
        this.props.history.go(-2);
    }
    render() {
        const {messageArr} = this.state;
        return (
            <div>
                <ul>
                    {
                        messageArr.map((msgObj)=>{
                            return (
                                <li key={msgObj.id}>
                                    {/* 向路由组件传递params参数 */}
                                    {/* <Link to={`/home/message/detail/${msgObj.id}/${msgObj.title}`}>{msgObj.title}</Link> */}
                                    
                                    {/* 向路由组件传递search参数 */}
                                    {/* <Link to={`/home/message/detail/?id=${msgObj.id}&title=${msgObj.title}`}>{msgObj.title}</Link> */}

                                    {/* 向路由组件传递state参数 */}
                                    <Link to={{pathname:'/home/message/detail',state:{id:msgObj.id,title:msgObj.title}}}>{msgObj.title}</Link>
                                    <button onClick={c => this.pushShow(msgObj.id,msgObj.title)}>push查看</button>
                                    <button onClick={c=>this.replacesShow(msgObj.id,msgObj.title)}>replace查看</button>
                                </li>
                            )
                        })
                    }
                </ul>
                {/* 申明接收params参数 */}
                {/* <Route path="/home/message/detail/:id/:title" component={Detail}></Route> */}
                
                {/* search参数无需声明接收 */}
                {/* <Route path="/home/message/detail" component={Detail} /> */}

                {/* state参数无需声明接收 */}
                <Route path="/home/message/detail" component={Detail} />
                
                <button onClick={this.back}>回退</button>
                <button onClick={this.forward}>前进</button>
                <button onClick={this.go}>go</button>
            </div>
        )
    }
}
