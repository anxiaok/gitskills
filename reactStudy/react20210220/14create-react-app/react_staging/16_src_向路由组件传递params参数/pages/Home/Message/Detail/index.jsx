import React, { Component } from 'react'
const DetailData = [
    {id:'01',content:'你好，中国'},
    {id:'02',content:'你好，尚硅谷'},
    {id:'03',content:'你好，未来的自己'},
]
export default class Detail extends Component {
    render() {
        console.log(this.props);
        const {match:{params:{id,title}}} = this.props;
        const findResult = DetailData.find((detailObj)=>{
            return detailObj.id === id;
        })
        return (
            <div>
                <ul>
                    <li>Id:{id}</li>
                    <li>TITLE:{title}</li>
                    <li>Content:{findResult.content}</li>
                </ul>
            </div>
        )
    }
}
