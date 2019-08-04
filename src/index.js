import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { BrowserRouter } from "react-router-dom";
import 'typeface-roboto';
import Router from "./router";
import $ from 'jquery';
import './index.scss';

/*初始化*/
renderWithHotReload(Router);

/*热更新*/
if (module.hot) {
    module.hot.accept("./router/index.tsx", () => {
        const Router = require("./router/index.tsx").default;
        renderWithHotReload(Router);
    });
}
$(function () {
    console.log('正在测试jquery');
})
function renderWithHotReload(Router) {
    ReactDOM.render(
        <AppContainer>
            <BrowserRouter>
                <Router />
            </BrowserRouter>
        </AppContainer>,
        document.getElementById("app")
    );
}

// 判断该浏览器支不支持 serviceWorker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('/service-worker.js')
            .then(registration => {
                console.log('service-worker registed')
            })
            .catch(error => {
                console.log('service-worker registed error')
            })
    })
}