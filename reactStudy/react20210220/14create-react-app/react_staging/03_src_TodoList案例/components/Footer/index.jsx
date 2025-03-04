import React, { Component } from 'react'

export default class Footer extends Component {
    // 全选checkbox的回调
    handleCheckAll = (event)=>{
        const {checkAllTodo} = this.props;
        checkAllTodo(event.target.checked);
    }
    // 
    handleClearAllDone = ()=>{
        const {clearAllDone} = this.props;
        clearAllDone();
    }
    render() {
        const {todos} = this.props;
        const doneCount = todos.reduce((prev,todo)=>{
            return prev+(todo.done ? 1 : 0);
        },0);
        const total = todos.length
        return (
            <div className="todo-footer">
                <label>
                    <input type="checkbox" onChange={this.handleCheckAll} checked={doneCount === total && total !==0 ? true : false}/>
                </label>
                <span>
                    <span>已完成{doneCount}</span> / 全部{total}
                </span>
                <button onClick={this.handleClearAllDone} className="btn btn-danger">清除已完成任务</button>
            </div>
        )
    }
}
