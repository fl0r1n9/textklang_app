import React from "react";
import Layout from "./components/Layout";
import './App.css';
//import excerpt from './data/excerpt.tsv';
//import {tsv2json} from "tsv-json";

function App() {

    //create
    const json = {};
    //console.log(tsv2json(excerpt));

  return (
    <div className="App">
        <h1>Textklang App</h1>
        <Layout json = {json}/>
    </div>

  );
}

export default App;
