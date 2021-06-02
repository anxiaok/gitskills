import React, { Component } from 'react'
import axios from 'axios'

export default class Search extends Component {
    search = ()=>{
        // 解构赋值的连续写法 keyWoedElement 没有定义
        /*
            let obj = {a:{b:1}};
            const {a:{b:data}} = obj;
            console.log(data); // 可以重命名b 为data
        */
        const {keyWordElement:{value:keyWord}} = this;
        const {updateAppState} = this.props;
        updateAppState({isFirst:false,isLoading:true});
        axios.get(`/apiUses/users?q=${keyWord}`).then(
            response => {
                 updateAppState({
                     isFirst:false,
                     isLoading:false,
                     users:response.data.items
                });
            },
            error => {
                updateAppState({
                    isLoading:false,
                    err:error.message
                });
            }
        )
    }
    render() {
        return (
            <section className="jumotron">
                <h3 className="jumbotron-heading">搜索github用户</h3>
                <div>
                    <input ref={c => this.keyWordElement = c} type="text" placeholder="输入关键词点击搜索" />
                    <button onClick={this.search}>搜索</button>
                </div>
            </section>
        )
    }
}