import React, { Component } from 'react'
import {nanoid} from 'nanoid'

export default class Header extends Component {
    // uuid: 库比较大 可以使用nanoid 库
    handleKeyUp = (event)=>{
        const {keyCode,target} = event;
        if(keyCode !== 13) return false;
        if(target.value.trim() === ''){
            alert('输入不能为空');
            return false;
        };
        const {addTodo} = this.props;
        const todoObj = {
            id:nanoid(),name:target.value,done:false
        }
        addTodo(todoObj);
        target.value = '';
    }
    render() {
        return (
            <div className="todo-header">
                <input onKeyUp={this.handleKeyUp} type="text" placeholder="请输入你的任务名称，按回车键确认" />
            </div>
        )
    }
}
