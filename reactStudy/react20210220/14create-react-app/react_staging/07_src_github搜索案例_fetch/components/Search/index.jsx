import React, { Component } from 'react'
import PubSub from 'pubsub-js'
// import axios from 'axios'

export default class Search extends Component {
    search = async ()=>{
        const {keyWordElement:{value:keyWord}} = this;
        PubSub.publish('atguigu',{isFirst:false,isLoading:true});
        //#region 发送网络请求---使用axios发送
        // axios.get(`/apiUses/users?q=${keyWord}`).then(
        //     response => {
        //         PubSub.publish('atguigu',{
        //              isFirst:false,
        //              isLoading:false,
        //              users:response.data.items
        //         });
        //     },
        //     error => {
        //         PubSub.publish('atguigu',{
        //             isLoading:false,
        //             err:error.message
        //         });
        //     }
        // )
        //#endregion
        
        //#region 发送网络请求 --- 使用fetch(未优化)
        // fetch(`/apiUses/users?q=${keyWord}`).then(
        //     response =>{
        //         console.log('联系服务器成功了')
        //         return response.json();
        //     },
        //     error => {
        //         console.log('联系服务器失败了',error)
        //         return new Promise();
        //     }
        // ).then(
        //     response =>{
        //         console.log('成功了',response);
        //     },
        //     error => {
        //         console.log('失败了',error);
        //     }
        // );
        //#endregion
        //#region 发送网络请求 --- 使用fetch(优化)
        // fetch(`/apiUses/users?q=${keyWord}`).then(
        //     response =>{
        //         console.log('联系服务器成功了')
        //         return response.json();
        //     }
        // ).then(
        //     response =>{
        //         console.log('获取数据成功了',response);
        //     }
        // ).catch(
        //     error =>{
        //         console.log('请求出错',error);
        //     }
        // );
        //#endregion
        //#region 发送网络请求 --- 使用fetch(优化)
        try{
            const response = await fetch(`/apiUses/users?q=${keyWord}`);
            const data = await response.json();
            PubSub.publish('atguigu',{
                 isFirst:false,
                 isLoading:false,
                 users:data.items
            });
        }catch(error){
            console.log('请求出错',error);
            PubSub.publish('atguigu',{
                isLoading:false,
                err:error.message
            });
        }
        //#endregion

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