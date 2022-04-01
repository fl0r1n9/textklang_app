import React from "react";
import Layout from "./components/Layout";
import './App.css';
import pipeline from './data/hoelderlin-zischler-forICARUS1.tsv';
import {tsv2json} from "tsv-json";


function App() {

    const [readText, setReadText] = React.useState('');
    const all_poems_json = {poems: []}

    //get file(s)
    fetch(pipeline)
        .then(r => r.text())
        .then(text => {

            setReadText(text);

        });

    if (readText !== '') {
        //parse tsv to json arrays
        const tsv = tsv2json(readText);
        let poemNo = 0
        let tokenIndex = 0
        let startNewJson = false
        const toSplitAndParse = [26, 27, 28, 29, 40];

        //read arrays line by line
        for (const line of tsv) {
            if (line[0].includes("#end document")) {
                poemNo++
                startNewJson = false
                tokenIndex = 0
            }
            if (startNewJson === true) {
                if (line[0].includes("#audio-file")) {
                    all_poems_json.poems[poemNo].audio = line[0].split('=')[1];
                }
                if (line.length === 63) {

                    for (let number of toSplitAndParse) {

                        line[number] = line[number].split('|').map(string => parseFloat(string));
                    }

                    all_poems_json.poems[poemNo].tokens.push({
                        index: tokenIndex,
                        tokenInSentenceId: parseInt(line[0]),
                        tokenString: line[1],
                        pos: line[5],
                        startTime: parseFloat(line[13]),
                        endTime: parseFloat(line[14]),
                        syllableCount: parseInt(line[17]),
                        b: line[26],
                        c1: line[27],
                        c2: line[28],
                        d: line[29],
                        stress: line[40],
                        sampa: line[47].split('|'),
                        //TODO: change index to last for new tsv version
                        newline: line[2]
                    })
                    tokenIndex++
                }

            }
            if (line[0].includes("#documentId")) {

                all_poems_json.poems[poemNo] = {
                    documentId: '',
                    audio: '',
                    reader: '',
                    author: '',
                    title: '',
                    tokens: []
                }
                all_poems_json.poems[poemNo].documentId = line[0].split('=')[1];
                let splitNo = line[0].split('=')[1].split('_').length;
                all_poems_json.poems[poemNo].reader = line[0].split('=')[1].split('_')[0];
                all_poems_json.poems[poemNo].author = line[0].split('=')[1].split('_')[1];

                let titleStringArray = line[0].split('=')[1].split('_').splice(-splitNo + 2);
                let titleString = "";

                for (let i = 0; i < titleStringArray.length -1 ; i++) {
                    titleString = titleString.concat(titleStringArray[i] + " ");
                }
                titleString = titleString.concat(titleStringArray[titleStringArray.length -1])

                all_poems_json.poems[poemNo].title = titleString;

                startNewJson = true
            }


        }
        //console.log(all_poems_json.poems)
    }


    return (
        <div className="App">
            <h1>Textklang App</h1>
            <Layout all_poems_json={all_poems_json}/>
        </div>
    );
}

export default App;
