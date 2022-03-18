import React from "react";
import Layout from "./components/Layout";
import './App.css';
import excerpt from './data/excerpt.tsv';
import {tsv2json} from "tsv-json";


function App() {

    //alternative
    const [readText, setReadText] = React.useState('');
    const json = {
        documentId: '',
        audio: '',
        reader: '',
        author: '',
        title: '',
        tokens: []
    };

    fetch(excerpt)
        .then(r => r.text())
        .then(text => {

            setReadText(text);

        });

    if (readText !== '') {

        const tsv = tsv2json(readText);

        let splitNo = tsv[2][0].split('=')[1].split('_').length;

        json.documentId = tsv[1][0].split('=')[1];
        json.audio = tsv[2][0].split('=')[1];
        json.reader = tsv[2][0].split('=')[1].split('_')[0];
        json.author = tsv[2][0].split('=')[1].split('_')[1];

        let titleStringArray = tsv[1][0].split('=')[1].split('_').splice(-splitNo + 2);
        let titleString = "";
        for (let string of titleStringArray) {
            titleString = titleString.concat(string + " ");
        }
        json.title = titleString;

        //TODO: entire file, divide 40
        const toSplitAndParse = [26,27,28,29,40];

        for (let i = 0; i < tsv.length; i++) {

            if (tsv[i].length === 63) {

                for (let number of toSplitAndParse) {

                    tsv[i][number] = tsv[i][number].split('|').map( string => parseFloat(string));
                   }

                json.tokens.push({
                    tokenInSentenceId: parseInt(tsv[i][0]),
                    tokenString: tsv[i][1],
                    pos: tsv[i][5],
                    startTime: parseInt(tsv[i][13]),
                    endTime: parseInt(tsv[i][14]),
                    syllableCount: parseInt(tsv[i][17]),
                    b: tsv[i][26],
                    c1: tsv[i][27],
                    c2: tsv[i][28],
                    d: tsv[i][29],
                    stress: tsv[i][40],
                    sampa: tsv[i][47].split('|'),
                    //1 if true
                    newline: tsv[i][2]
                })
            }

        }

        //console.log(json);

    }
    return (
        <div className="App">
            <h1>Textklang App</h1>
            <Layout json={json}/>
            {/*<input type="file" onChange={loadTSV} />*/}
        </div>
    );
}

export default App;
