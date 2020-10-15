import React, {useEffect, useState} from "react";
import Button from '@material-ui/core/Button';
import "./Key.css"

export function Key(props) {

    const [toggled, setToggled] = useState(false);
    const [keysPressed, setKeysPressed] = useState([])

    const SHARP_FLAT_KEYS = ['w','e','t','y','u','o','p'];

    const handleMouseDown = e => {
        props.virtualKeyDown(props.keyboardKey);
    }

    const handleMouseUp = e => {
        props.virtualKeyUp(props.keyboardKey);
    }

    const handleKeyDown = e => {
        setToggled(true);
        setKeysPressed(keysPressed => [...keysPressed, e.key]);
    }

    const handleKeyUp = e => {
        setToggled(false);
        setKeysPressed(keysPressed.filter(key => key !== e.key));
    }

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
    }, []);

    return(
        <div>
            {
                toggled && keysPressed.includes(props.keyboardKey)
                ?
                    <Button>{props.keyboardKey}</Button>
                    :
                    SHARP_FLAT_KEYS.includes(props.keyboardKey)
                        ?
                        <Button variant="contained" color="secondary"
                                onTouchStart={handleMouseDown}
                                onTouchEnd={handleMouseUp}
                                onMouseLeave={handleMouseUp}>
                            {props.keyboardKey}
                        </Button>
                        :
                        <Button variant="contained" color="primary"
                                onTouchStart={handleMouseDown}
                                onTouchEnd={handleMouseUp}
                                onMouseLeave={handleMouseUp}>
                            {props.keyboardKey}
                        </Button>
            }
        </div>
    )
}
