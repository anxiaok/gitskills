import React, { Component } from 'react'

export default class Message extends Component {
    render() {
        return (
            <div>
                <ul>
                    <li>
                        <a href="/message1">messag001</a>
                    </li>
                    <li>
                        <a href="/message2">messag002</a>
                    </li>
                    <li>
                        <a href="/message3">messag003</a>
                    </li>
                </ul>
            </div>
        )
    }
}
