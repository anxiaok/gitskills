import React, { Component } from 'react'

export default class Header extends Component {
    render() {
        console.log('Header收到的props是',this.props);
        return (
            <div>
                <h2>React Router Demo</h2>
            </div>
        )
    }
}
