import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Zoom from '@mui/material/Zoom';
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import StopIcon from '@mui/icons-material/Stop';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import SettingsIcon from '@mui/icons-material/Settings';
import {Howl} from "howler";
import {Snackbar} from "@mui/material"
import {useEffect} from "react"
import ReactHowler from 'react-howler'

function ScrollTop(props) {
    const {children, window} = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        target: window ? window() : undefined, disableHysteresis: true, threshold: 100,
    });

    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor',);

        if (anchor) {
            anchor.scrollIntoView({
                behavior: 'smooth', block: 'center',
            });
        }
    };

    return (<Zoom in={trigger}>
        <Box
            onClick={handleClick}
            role="presentation"
            sx={{position: 'fixed', bottom: 16, right: 16}}
        >
            {children}
        </Box>
    </Zoom>);
}

ScrollTop.propTypes = {
    children: PropTypes.element.isRequired, /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default function BackToTop(props) {

    //Howler hooks
    const [playing, setPlaying] = React.useState(false);
    const [volume, setVolume] = React.useState(1.0);

    //load audio file from name
    let entireAudio
    let audioString
    if (props.selectedPoem) {
        try {
            audioString = require('../data/wavs/' + props.selectedPoem.audio)
            entireAudio = new Howl({
                src: [audioString], html5: true, preload: false
            })

        } catch (e) {
            console.log("Falscher Audioname")
        }
    }

    //check for click in ContentPage and play word interval
    useEffect(() => {
        if (props.selectedPoem) {
            audioString = require('../data/wavs/' + props.selectedPoem.audio)
            const snippet = new Howl({
                src: [audioString], html5: true, preload: false,
                sprite: {
                    interval: [props.start * 1000, (props.end - props.start) * 1000 + 50],
                }
            })
            snippet.play('interval')
        }
    }, [props.wordClicked])


    //snackbar hooks
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("");
    useEffect(()=>{setMessage("Lautstärke: " + volume.toFixed(1) * 100 + "%")},[volume])


    function SimpleSnackbar() {

        const handleClose = (event, reason) => {
            if (reason === 'clickaway') {
                return;
            }

            setOpen(false);
        };

        return (<div>
            <Snackbar
                open={open}
                autoHideDuration={500}
                onClose={handleClose}
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                message={message}
            />
        </div>);
    }

    return (<React.Fragment>
        <CssBaseline/>
        <AppBar>
            <SimpleSnackbar/>
            <Toolbar>
                {props.selectedPoem ?
                    <ReactHowler
                    src={audioString}
                    playing={playing}
                    volume={volume}
                    ref={(ref) => (entireAudio = ref)}
                    /> : ""}

                <Typography variant="h6" component="div" sx={{mr: "10px"}}>
                    {props.selectedPoem ? props.selectedPoem.author + " - " + props.selectedPoem.title + " (" + props.selectedPoem.reader + ")" : "Textklang App"}
                </Typography>
                <PlayArrowIcon sx={{mr: "10px"}} color={props.selectedPoem ? "white" : "disabled"}
                               style={{cursor: props.selectedPoem ? 'pointer' : 'auto'}} onClick={() => {
                    setPlaying(true)
                    setOpen(true)
                    setMessage("Audio wird abgespielt")

                }}/>

                <PauseIcon sx={{mr: "10px"}} color={props.selectedPoem ? "white" : "disabled"}
                           style={{cursor: props.selectedPoem ? 'pointer' : 'auto'}} onClick={() => {
                    setPlaying(false)
                    setOpen(true)
                    setMessage("Audio pausiert")
                }}/>
                <StopIcon sx={{mr: "10px"}} color={props.selectedPoem ? "white" : "disabled"}
                          style={{cursor: props.selectedPoem ? 'pointer' : 'auto'}}
                          onClick={() => {
                              setPlaying(false)
                              entireAudio.seek(0)
                              setOpen(true)
                              setMessage("Audio gestoppt")
                          }}/>
                <VolumeDownIcon sx={{mr: "10px"}}
                                style={{cursor: 'pointer'}}
                                onClick={() => {
                                    if(volume >= 0.09) {
                                        setVolume( volume - 0.1)
                                    }
                                    setOpen(true)
                                }}/>
                <VolumeUpIcon sx={{mr: "10px"}}
                              style={{cursor: 'pointer'}}
                              onClick={() => {
                                  if(volume !== 1) {
                                      setVolume( volume + 0.1)
                                  }
                                  setOpen(true)
                              }}/>
                <div style={{flexGrow: 1}}/>
                    {props.selectedPoem ? <Box sx={{display: 'flex', flexDirection: "row", alignItems: 'center'}}>
                        <ArrowBackIos style={{cursor: 'pointer'}} sx={{mr: "10px"}}/>
                        <Typography variant="h8" sx={{mr: "10px"}}>
                            Rezitation {1 + "/" + 1}
                        </Typography>
                        <ArrowForwardIos style={{cursor: 'pointer'}}/> </Box> : <SettingsIcon style={{cursor: 'pointer'}} sx={{mr: "10px"}}/>
                    }
                    </Toolbar>
                    </AppBar>
                    <Toolbar id="back-to-top-anchor" style={{minHeight: 1}}/>
                    <ScrollTop {...props}>
                    <Fab color="secondary" size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon/>
                    </Fab>
                    </ScrollTop>
                    </React.Fragment>);
                }