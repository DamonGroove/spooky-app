import React, {useEffect, useState} from 'react';
import { VictoryChart, VictoryScatter } from "victory";

export function Visualizer(props) {
    const [data, setData] = useState(getData);
    const [size, setSize] = useState(getSize);
    // let setStateInterval = null;

    function getData() {
        console.log("Duration array length: " + props.durations.length);
        // Changes with time signature
        const num =  Math.ceil(props.durations.length );
        if(num === 1) {
            return [];
        }
        const points = new Array(num).fill(1);

        // Return the coordinates in the array where x is the index and y is the duration
        return points.map((point, index) => {
            console.log("Duration:" + (Math.ceil(props.durations[index] - props.durations[(index - 1)])));
            let duration = props.durations[index] - props.durations[(index - 1)];
            return {x: index + 1, y: duration};
        });
    }

    function getSize() {
        return Math.random() * 10
    }

    // Use side effects only when the durations props is changed
    useEffect(() => {
        setData(getData());
        setSize(getSize());

        // Possible Interval
        // setStateInterval = window.setInterval(() => {
        //     setData(getData());
        //     setSize(getSize());
        // }, 3000);
        //
        // return () => {
        //     window.clearInterval(setStateInterval);
        // }
    }, [props.durations]);



    return (
        <div>
            <VictoryChart
                domain={{ y: [0, 5] }}
                animate={{ duration: 200 }}
            >
                <VictoryScatter
                    size={size}
                    data={data}
                    style={{ data: { opacity: ({ datum }) => datum.opacity || 1 } }}
                    animate={{
                        animationWhitelist: ["style", "data", "size"], // Try removing "size"
                        onExit: {
                            duration: 100,
                            before: () => ({ opacity: 0.3, _y: 0 })
                        },
                        onEnter: {
                            duration: 100,
                            before: () => ({ opacity: 0.3, _y: 0 }),
                            after: (datum) => ({ opacity: 1, _y: datum._y })
                        }
                    }}
                />
            </VictoryChart>
            {/*Dynamic component rendering, might remove*/}
            {/*<div>*/}
            {/*    {props.durations.map((value, index) => {*/}
            {/*        return <div key={index}>{value}</div>*/}
            {/*    })}*/}
            {/*</div>*/}
        </div>
    );
}
