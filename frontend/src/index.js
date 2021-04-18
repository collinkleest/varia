import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import { Landing, Commands } from "./Components/";

const navLinks = [
    {name: "Home", path: "/", component: Landing}, 
    {name: "Commands", path: "/commands", component: Commands}
];

ReactDOM.render(<App navLinks={navLinks}/>, document.getElementById('root'));