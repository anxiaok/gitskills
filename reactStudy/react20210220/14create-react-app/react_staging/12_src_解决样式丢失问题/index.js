// 引入react 核心库
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {BrowserRouter,HashRouter} from 'react-router-dom'

// 渲染App到页面

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
)