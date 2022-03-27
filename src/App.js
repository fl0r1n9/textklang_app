import React from "react";
import Layout from "./components/Layout";
import './App.css';
import excerpt from './data/excerpt.tsv';
import pipeline from './data/hoelderlin-zischler-forICARUS1.tsv';
import {tsv2json} from "tsv-json";


function App() {

    //alternative
    const [readText, setReadText] = React.useState('');
    const all_poems_json = {poems: []}
    const poem_json = {
        documentId: '',
        audio: '',
        reader: '',
        author: '',
        title: '',
        tokens: []
    };

    //get file(s)
    fetch(pipeline)
        .then(r => r.text())
        .then(text => {

            setReadText(text);

        });

    if (readText !== '') {

        const tsv = tsv2json(readText);
        let poemNo = 0
        let startNewJson = false
        const toSplitAndParse = [26, 27, 28, 29, 40];

        for (const line of tsv) {
            if (line[0].includes("#end document")) {
                poemNo++
                startNewJson = false
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
                        //1 if true, change index to last for new tsv version
                        newline: line[2]
                    })
                }

            }
            if (line[0].includes("#documentId")) {

                all_poems_json.poems[poemNo] = {documentId: '',
                    audio: '',
                    reader: '',
                    author: '',
                    title: '',
                    tokens: []}
                all_poems_json.poems[poemNo].documentId = line[0].split('=')[1];
                let splitNo = line[0].split('=')[1].split('_').length;
                all_poems_json.poems[poemNo].reader = line[0].split('=')[1].split('_')[0];
                all_poems_json.poems[poemNo].author = line[0].split('=')[1].split('_')[1];

                let titleStringArray = line[0].split('=')[1].split('_').splice(-splitNo + 2);
                let titleString = "";
                for (let string of titleStringArray) {
                    titleString = titleString.concat(string + " ");
                }
                all_poems_json.poems[poemNo].title = titleString;

                startNewJson = true
            }


        }
        console.log(all_poems_json.poems)
    }

    //OLD: read tsv and parse to json
    if (readText !== '') {

        const tsv = tsv2json(readText);

        let splitNo = tsv[2][0].split('=')[1].split('_').length;

        poem_json.documentId = tsv[1][0].split('=')[1];
        poem_json.audio = tsv[2][0].split('=')[1];
        poem_json.reader = tsv[2][0].split('=')[1].split('_')[0];
        poem_json.author = tsv[2][0].split('=')[1].split('_')[1];

        let titleStringArray = tsv[1][0].split('=')[1].split('_').splice(-splitNo + 2);
        let titleString = "";
        for (let string of titleStringArray) {
            titleString = titleString.concat(string + " ");
        }
        poem_json.title = titleString;

        //TODO: entire file
        const toSplitAndParse = [26, 27, 28, 29, 40];

        for (let i = 0; i < tsv.length; i++) {

            if (tsv[i].length === 63) {

                for (let number of toSplitAndParse) {

                    tsv[i][number] = tsv[i][number].split('|').map(string => parseFloat(string));
                }

                poem_json.tokens.push({
                    tokenInSentenceId: parseInt(tsv[i][0]),
                    tokenString: tsv[i][1],
                    pos: tsv[i][5],
                    startTime: parseFloat(tsv[i][13]),
                    endTime: parseFloat(tsv[i][14]),
                    syllableCount: parseInt(tsv[i][17]),
                    b: tsv[i][26],
                    c1: tsv[i][27],
                    c2: tsv[i][28],
                    d: tsv[i][29],
                    stress: tsv[i][40],
                    sampa: tsv[i][47].split('|'),
                    //1 if true, change index to last for new tsv version
                    newline: tsv[i][2]
                })
            }

        }
        //console.log(poem_json);
    }

    return (
        <div className="App">
            <h1>Textklang App</h1>
            <Layout all_poems_json={all_poems_json}/>
            {/*optional: <input type="file" onChange={loadTSV} />*/}
        </div>
    );
}

export default App;
