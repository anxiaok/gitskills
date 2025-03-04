import React, { Component } from 'react'

export default class Item extends Component {
    state = {mouse:false}
    handleMouse = (flag)=>{
        return ()=>{
            this.setState({mouse:flag})
        }
    }
    handleCheck = (id)=>{
        return (event)=>{
            const {updateTodo} = this.props;
            updateTodo(id,event.target.checked);
        }
    }
    // 删除的回调
    handleDelete = (id)=>{
        if(window.confirm('确定删除吗？')){
            const {deleteTodo} = this.props;
            deleteTodo(id);
        }
    }
    render() {
        const {id,name,done} = this.props
        const {mouse} = this.state;
        return (
            <li style={{backgroundColor:mouse? '#ddd':'white'}} onMouseEnter={this.handleMouse(true)} onMouseLeave={this.handleMouse(false)}>
                <label>
                    <input type="checkbox" checked={done} onChange={this.handleCheck(id)}/>
                    <span>{name}</span>
                </label>
                <button onClick={()=>this.handleDelete(id)} className="btn btn-danger" style={{display:mouse ? 'block':'none'}}>删除</button>
            </li>
        )
    }
}
