import React, {useEffect, useState} from "react";
import Soundfont from "soundfont-player"
import * as Tone from "tone";
import {Key} from "./Key";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import {useMediaQuery} from "react-responsive/src";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

export function Synth(props) {
    const classes = useStyles();
    const TONES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const KEYS = ['a','w','s','e','d','f','t','g','y','h','u','j'];
    const KEYS_NEXT_OCTAVE_UP = ['k','o','l','p',';'];
    const OCTAVE_KEYS = ['1', '2', '3', '4', '5', '6', '7'];
    const synth = new Tone.PolySynth(Tone.Synth).toDestination();
    let octave = 4;

    // Media Queries
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-device-width: 1224px)'
    })
    const isBigScreen = useMediaQuery({ query: '(min-device-width: 1824px)' })
    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })



    function isMapped(key) {
        return KEYS.includes(key);
    }

    function isOctave(key) {
        return OCTAVE_KEYS.includes(key);
    }

    function isKeysNextOctaveUp(key) {
        return KEYS_NEXT_OCTAVE_UP.includes(key);
    }

    const handleKeyDown = e => {
        if (isMapped(e.key) && !e.repeat) {
            let noteOctave = TONES[KEYS.indexOf(e.key)] + octave.toString();
            const now = Tone.now();
            synth.triggerAttack(noteOctave, now);
            props.onNewNote(now);
        } else if (isKeysNextOctaveUp(e.key) && !e.repeat && octave !== 7) {
            let nextOctave = octave + 1;
            let noteOctave = TONES[KEYS_NEXT_OCTAVE_UP.indexOf(e.key)] + nextOctave.toString()
            const now = Tone.now();
            synth.triggerAttack(noteOctave, now);
        } else if (isOctave(e.key) && !e.repeat) {
            octave = parseInt(e.key);
        }
    };

    const handleKeyUp = e => {
        if (isMapped(e.key) && !e.repeat) {
            let note = TONES[KEYS.indexOf(e.key)];
            const now = Tone.now();
            // Release all octaves of a note, so a new octave can be selected while another note and octave are pressed
            synth.triggerRelease([note + '1', note + '2', note + '3',
                note + '4', note + '5', note + '6', note + '7'], now);
            console.log(now);
        } else if (isKeysNextOctaveUp(e.key) && !e.repeat) {
            let note = TONES[KEYS_NEXT_OCTAVE_UP.indexOf(e.key)];
            const now = Tone.now();
            // Release all octaves of a note, so a new octave can be selected while another note and octave are pressed
            synth.triggerRelease([note + '1', note + '2', note + '3',
                note + '4', note + '5', note + '6', note + '7'], now);
            // console.log(now);
        }
    };


    function handleVirtualKeyDown(key) {
        if (isKeysNextOctaveUp(key) && octave !== 7) {
            let nextOctave = octave + 1;
            let noteOctave = TONES[KEYS_NEXT_OCTAVE_UP.indexOf(key)] + nextOctave.toString()
            const now = Tone.now();
            synth.triggerAttack(noteOctave, now);
        } else if (isOctave(key)) {
            octave = parseInt(key);
        } else if (isMapped(key)){
            let noteOctave = TONES[KEYS.indexOf(key)] + octave.toString();
            const now = Tone.now();
            synth.triggerAttack(noteOctave, now);
            // console.log(now);
        }
    }

    function handleVirtualKeyUp(key) {
        if (isKeysNextOctaveUp(key)) {
            let note = TONES[KEYS_NEXT_OCTAVE_UP.indexOf(key)];
            const now = Tone.now();
            // Release all octaves of a note, so a new octave can be selected while another note and octave are pressed
            synth.triggerRelease([note + '1', note + '2', note + '3',
                note + '4', note + '5', note + '6', note + '7'], now);
            // console.log(now);
        } else if (isMapped(key)){
            let note = TONES[KEYS.indexOf(key)];
            const now = Tone.now();
            // Release all octaves of a note, so a new octave can be selected while another note and octave are pressed
            synth.triggerRelease([note + '1', note + '2', note + '3',
                note + '4', note + '5', note + '6', note + '7'], now);
            // console.log(now);
        }
    }

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
    }, []);

    return (
        <div className={classes.root}>
            <h1>Spooky</h1>
            {
                isBigScreen || isDesktopOrLaptop
                    ?
                    <div>
                        <ButtonGroup>
                            <Key keyboardKey={'1'} virtualKeyDown={handleVirtualKeyDown} virtualKeyUp={handleVirtualKeyUp}/>
                            <Key keyboardKey={'2'} virtualKeyDown={handleVirtualKeyDown} virtualKeyUp={handleVirtualKeyUp}/>
                            <Key keyboardKey={'3'} virtualKeyDown={handleVirtualKeyDown} virtualKeyUp={handleVirtualKeyUp}/>
                            <Key keyboardKey={'4'} virtualKeyDown={handleVirtualKeyDown} virtualKeyUp={handleVirtualKeyUp}/>
                            <Key keyboardKey={'5'} virtualKeyDown={handleVirtualKeyDown} virtualKeyUp={handleVirtualKeyUp}/>
                            <Key keyboardKey={'6'} virtualKeyDown={handleVirtualKeyDown} virtualKeyUp={handleVirtualKeyUp}/>
                            <Key keyboardKey={'7'} virtualKeyDown={handleVirtualKeyDown} virtualKeyUp={handleVirtualKeyUp}/>
                        </ButtonGroup>
                        <div style={{direction: "ltr"}}>
                            <ButtonGroup style={{padding: "32px"}}>
                            <Key keyboardKey={'w'} virtualKeyDown={handleVirtualKeyDown} virtualKeyUp={handleVirtualKeyUp}/>
                            <Key keyboardKey={'e'} virtualKeyDown={handleVirtualKeyDown} virtualKeyUp={handleVirtualKeyUp}/>
                            </ButtonGroup>
                            <ButtonGroup style={{padding: "32px"}}>
                            <Key keyboardKey={'t'} virtualKeyDown={handleVirtualKeyDown} virtualKeyUp={handleVirtualKeyUp}/>
                            <Key keyboardKey={'y'} virtualKeyDown={handleVirtualKeyDown} virtualKeyUp={handleVirtualKeyUp}/>
                            <Key keyboardKey={'u'} virtualKeyDown={handleVirtualKeyDown} virtualKeyUp={handleVirtualKeyUp}/>
                            </ButtonGroup>
                            <ButtonGroup style={{padding: "32px"}}>
                            <Key keyboardKey={'o'} virtualKeyDown={handleVirtualKeyDown} virtualKeyUp={handleVirtualKeyUp}/>
                            <Key keyboardKey={'p'} virtualKeyDown={handleVirtualKeyDown} virtualKeyUp={handleVirtualKeyUp}/>
                            </ButtonGroup>
                        </div>
                        <ButtonGroup>
                            <Key keyboardKey={'a'} virtualKeyDown={handleVirtualKeyDown} virtualKeyUp={handleVirtualKeyUp}/>
                            <Key keyboardKey={'s'} virtualKeyDown={handleVirtualKeyDown} virtualKeyUp={handleVirtualKeyUp}/>
                            <Key keyboardKey={'d'} virtualKeyDown={handleVirtualKeyDown} virtualKeyUp={handleVirtualKeyUp}/>
                            <Key keyboardKey={'f'} virtualKeyDown={handleVirtualKeyDown} virtualKeyUp={handleVirtualKeyUp}/>
                            <Key keyboardKey={'g'} virtualKeyDown={handleVirtualKeyDown} virtualKeyUp={handleVirtualKeyUp}/>
                            <Key keyboardKey={'h'} virtualKeyDown={handleVirtualKeyDown} virtualKeyUp={handleVirtualKeyUp}/>
                            <Key keyboardKey={'j'} virtualKeyDown={handleVirtualKeyDown} virtualKeyUp={handleVirtualKeyUp}/>
                            <Key keyboardKey={'k'} virtualKeyDown={handleVirtualKeyDown} virtualKeyUp={handleVirtualKeyUp}/>
                            <Key keyboardKey={'l'} virtualKeyDown={handleVirtualKeyDown} virtualKeyUp={handleVirtualKeyUp}/>
                            <Key keyboardKey={';'} virtualKeyDown={handleVirtualKeyDown} virtualKeyUp={handleVirtualKeyUp}/>
                        </ButtonGroup>
                    </div>
                    :
                    isPortrait
                    ?
                        <div>
                            <ButtonGroup>
                                <Key keyboardKey={'1'} virtualKeyDown={handleVirtualKeyDown} virtualKeyUp={handleVirtualKeyUp}/>
                                <Key keyboardKey={'2'} virtualKeyDown={handleVirtualKeyDown} virtualKeyUp={handleVirtualKeyUp}/>
                                <Key keyboardKey={'3'} virtualKeyDown={handleVirtualKeyDown} virtualKeyUp={handleVirtualKeyUp}/>
                                <Key keyboardKey={'4'} virtualKeyDown={handleVirtualKeyDown} virtualKeyUp={handleVirtualKeyUp}/>
                                <Key keyboardKey={'5'} virtualKeyDown={handleVirtualKeyDown} virtualKeyUp={handleVirtualKeyUp}/>
                            </ButtonGroup>

                            <div style={{direction: "ltr"}}>
                                <ButtonGroup style={{padding: "32px"}}>
                                    <Key keyboardKey={'w'} virtualKeyDown={handleVirtualKeyDown} virtualKeyUp={handleVirtualKeyUp}/>
                                    <Key keyboardKey={'e'} virtualKeyDown={handleVirtualKeyDown} virtualKeyUp={handleVirtualKeyUp}/>
                                </ButtonGroup>
                                <ButtonGroup style={{padding: "32px"}}>
                                    <Key keyboardKey={'t'} virtualKeyDown={handleVirtualKeyDown} virtualKeyUp={handleVirtualKeyUp}/>
                                </ButtonGroup>
                            </div>
                            <ButtonGroup>
                                <Key keyboardKey={'a'} virtualKeyDown={handleVirtualKeyDown} virtualKeyUp={handleVirtualKeyUp}/>
                                <Key keyboardKey={'s'} virtualKeyDown={handleVirtualKeyDown} virtualKeyUp={handleVirtualKeyUp}/>
                                <Key keyboardKey={'d'} virtualKeyDown={handleVirtualKeyDown} virtualKeyUp={handleVirtualKeyUp}/>
                                <Key keyboardKey={'f'} virtualKeyDown={handleVirtualKeyDown} virtualKeyUp={handleVirtualKeyUp}/>
                                <Key keyboardKey={'g'} virtualKeyDown={handleVirtualKeyDown} virtualKeyUp={handleVirtualKeyUp}/>
                            </ButtonGroup>
                            <footer>*For IOS mobile you won't hear sound if your IPhone is on silent*</footer>
                        </div>
                        :
                        <div>
                            <ButtonGroup>
                                <Key keyboardKey={'1'} virtualKeyDown={handleVirtualKeyDown} virtualKeyUp={handleVirtualKeyUp}/>
                                <Key keyboardKey={'2'} virtualKeyDown={handleVirtualKeyDown} virtualKeyUp={handleVirtualKeyUp}/>
                                <Key keyboardKey={'3'} virtualKeyDown={handleVirtualKeyDown} virtualKeyUp={handleVirtualKeyUp}/>
                                <Key keyboardKey={'4'} virtualKeyDown={handleVirtualKeyDown} virtualKeyUp={handleVirtualKeyUp}/>
                                <Key keyboardKey={'5'} virtualKeyDown={handleVirtualKeyDown} virtualKeyUp={handleVirtualKeyUp}/>
                                <Key keyboardKey={'6'} virtualKeyDown={handleVirtualKeyDown} virtualKeyUp={handleVirtualKeyUp}/>
                                <Key keyboardKey={'7'} virtualKeyDown={handleVirtualKeyDown} virtualKeyUp={handleVirtualKeyUp}/>
                            </ButtonGroup>

                            <div style={{direction: "ltr"}}>
                                <ButtonGroup style={{padding: "32px"}}>
                                    <Key keyboardKey={'w'} virtualKeyDown={handleVirtualKeyDown} virtualKeyUp={handleVirtualKeyUp}/>
                                    <Key keyboardKey={'e'} virtualKeyDown={handleVirtualKeyDown} virtualKeyUp={handleVirtualKeyUp}/>
                                </ButtonGroup>
                                <ButtonGroup style={{padding: "32px"}}>
                                    <Key keyboardKey={'t'} virtualKeyDown={handleVirtualKeyDown} virtualKeyUp={handleVirtualKeyUp}/>
                                    <Key keyboardKey={'y'} virtualKeyDown={handleVirtualKeyDown} virtualKeyUp={handleVirtualKeyUp}/>
                                    <Key keyboardKey={'u'} virtualKeyDown={handleVirtualKeyDown} virtualKeyUp={handleVirtualKeyUp}/>
                                </ButtonGroup>
                            </div>
                            <ButtonGroup >
                                <Key keyboardKey={'a'} virtualKeyDown={handleVirtualKeyDown} virtualKeyUp={handleVirtualKeyUp}/>
                                <Key keyboardKey={'s'} virtualKeyDown={handleVirtualKeyDown} virtualKeyUp={handleVirtualKeyUp}/>
                                <Key keyboardKey={'d'} virtualKeyDown={handleVirtualKeyDown} virtualKeyUp={handleVirtualKeyUp}/>
                                <Key keyboardKey={'f'} virtualKeyDown={handleVirtualKeyDown} virtualKeyUp={handleVirtualKeyUp}/>
                                <Key keyboardKey={'g'} virtualKeyDown={handleVirtualKeyDown} virtualKeyUp={handleVirtualKeyUp}/>
                                <Key keyboardKey={'h'} virtualKeyDown={handleVirtualKeyDown} virtualKeyUp={handleVirtualKeyUp}/>
                                <Key keyboardKey={'j'} virtualKeyDown={handleVirtualKeyDown} virtualKeyUp={handleVirtualKeyUp}/>
                            </ButtonGroup>
                            <footer>*For IOS mobile you won't hear sound if your IPhone is on silent*</footer>
                        </div>
            }

        </div>
    )
}
