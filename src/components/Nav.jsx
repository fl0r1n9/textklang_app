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
import {Howl, Howler} from "howler";
import wav from '../data/wavs/Zischler_Hoelderlin_Der_Herbst.wav'
import mp3 from '../data/mp3s/01_Chiron.mp3'
import {Snackbar} from "@mui/material";
import {useEffect} from "react";

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

    useEffect(() => {
        if (props.id) {
             const snippet = new Howl({
                src: [wav], html5: true, preload: true,
                sprite: {
                    interval: [props.start * 1000, (props.end - props.start) * 1000 + 100],
                }
            })
            snippet.play('interval')
        }
    }, [props.wordClicked])


    const entireAudio = new Howl({
        src: [mp3], html5: true, preload:false
    })

    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const handleClick = () => {
        setOpen(true);
    };

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
            <SimpleSnackbar handleClick={handleClick}/>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{mr: "10px"}}>
                    {props.id ? props.id[0] + " - " + props.id[1] : "Textklang App"}
                </Typography>
                <PlayArrowIcon sx={{mr: "10px"}} color={props.id ? "white" : "disabled"}
                               style={{cursor: props.id ? 'pointer' : 'auto'}}  onClick={() => {

                   // TODO: state change while play() loses reference to Howl
                   handleClick()
                   setMessage("Audio wird abgespielt")
                   entireAudio.play()

                }}/>

                <PauseIcon sx={{mr: "10px"}} color={props.id ? "white" : "disabled"}
                           style={{cursor: props.id ? 'pointer' : 'auto'}} onClick={() => {
                        entireAudio.pause()
                        handleClick()
                        setMessage("Audio pausiert")
                }}/>
                <StopIcon sx={{mr: "10px"}} color={props.id ? "white" : "disabled"}
                          style={{cursor: props.id ? 'pointer' : 'auto'}}
                          onClick={() => {
                              entireAudio.stop();
                              handleClick()
                              setMessage("Audio gestoppt")
                          }}/>
                <VolumeDownIcon sx={{mr: "10px"}}
                                style={{cursor: 'pointer'}}
                                onClick={() => {
                                    Howler.volume(Howler.volume() - 0.1);
                                    handleClick();
                                    setMessage("Lautstärke: " + Howler.volume().toFixed(1) * 100 + "%")

                                }}/>
                <VolumeUpIcon sx={{mr: "10px"}}
                              style={{cursor: 'pointer'}}
                              onClick={() => {
                                  Howler.volume(Howler.volume() + 0.1);
                                  handleClick()
                                  setMessage("Lautstärke: " + Howler.volume().toFixed(1) * 100 + "%")
                              }}/>
                <div style={{flexGrow: 1}}/>
                <ArrowBackIos sx={{mr: "10px"}} style={{cursor: 'pointer'}}/>
                <Typography variant="h8" component="div" sx={{mr: "10px"}}>
                    Rezitation {1 + "/" + 1}
                </Typography>
                <ArrowForwardIos style={{cursor: 'pointer'}}/>
            </Toolbar>
        </AppBar>
        <Toolbar id="back-to-top-anchor" style={{minHeight: 1}}/>
        {/*<Container>
                <Box sx={{ my: 2 }}>
                    {[...new Array(12)]
                        .map(
                            () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
                        )
                        .join('\n')}
                </Box>
            </Container>*/}
        <ScrollTop {...props}>
            <Fab color="secondary" size="small" aria-label="scroll back to top">
                <KeyboardArrowUpIcon/>
            </Fab>
        </ScrollTop>
    </React.Fragment>);
}