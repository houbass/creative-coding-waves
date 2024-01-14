import React, { useEffect, useRef, useState } from "react";

// FUNCTIONS
import { bezierCurve} from "../functions/DrawingFunctions";
import { curvePatternFun, createBetweenLayers } from "../functions/PaternFunctions";
import { createRandomInputs } from "../functions/CreateRandomInputs";
import { toRads, randomRange } from "../functions/HelpingFunctions";

// LIBRARIES
import random from "canvas-sketch-util/random";

// INPUTS 
import { 
    canvasColor, v, curveIputs, mainWeigt, betweenWeight, 
    betweenBites, trackersQuantity, trackerGap, randomInputsHandler,
    randomQuantity, randomSegments 
} from "../inputs/Inputs";



export default function Canvas({ canvasRef, canvasSize, recHandler, images, animateHandler, drawHandler, reset }) {

    // REFS 
    const opacity = useRef(0);

    // STATES
    const [curvesPattern, setCurvesPattern] = useState([]);

    //ANIMATION IS RUNING HERE
    useEffect(() => {

        // canvas def
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        // Animation handler (zabranuje aby se animace zrychlovala po kazdem updatu)
        let timerHolder = null;

        // canvas settings
        const width = canvas.width;
        const height = canvas.height;

        // animation function
        function render() { 

            // ANIMATION ON/OFF
            if(animateHandler === true) {
                timerHolder = window.requestAnimationFrame(render);
            } else{
                timerHolder = null;
            }

            // CAPTURE IMAGES
            imgCapture(canvas)

            // DRAWING
            function drawing() {
                // DRAWING FUNCTION
                if(drawHandler === true) {
                    
                } else{
                    //context.clearRect(0, 0, width, height);
                    context.fillStyle = canvasColor;
                    context.fillRect(0, 0, width, height);
                }


                // MOTION
                //let checking = random.noise1D(opacity.current / 10000, 1, 1) * (curvesPattern.length - 1);
                let checking = Math.sin(toRads(opacity.current / 100)) * (curvesPattern.length - 1);
                //let checking = opacity.current;

                if(checking < 0 ){
                    checking *= -1;
                }


                // MAIN CURVES MOTION
                const thisCurve = curvesPattern[Math.round(checking)];
                thisCurve?.forEach((e, i) => {
                    bezierCurve(context, e.start, e.cp1, e.cp2, e.end, 1, mainWeigt, "white")
                })

                // TRACKING CURVES
                for(let i = 1; i < trackersQuantity; i++) {
                    let thisOpacity = 0.8 / i
                    let thisGapIndex = Math.round(checking) - (i * trackerGap) + (curvesPattern.length - 1);
                    const newArr = curvesPattern.concat(curvesPattern)
                    const thisTracker = newArr[thisGapIndex]
                    thisTracker?.forEach(e => {
                        bezierCurve(context, e.start, e.cp1, e.cp2, e.end, thisOpacity, betweenWeight, "white")
                    });
                };      

                // COUNT EVERY FRAME
                opacity.current += v;

                // REPEAT FRAMES
                if(opacity.current >= curvesPattern.length - 1) {
                    opacity.current = 0;
                }; 
            };
            drawing();
        };
        render();

        //animation cancel when re-render component
        return () => cancelAnimationFrame(timerHolder);
    });

    // CAPTURE IMAGES
    function imgCapture(canvas) {
        if(recHandler === true) {
            images.current=([
                ...images.current, canvas.toDataURL("image/png", 1.0)
            ]);
        };
    };

    // GET CURVES
    useEffect(() => {
        const thisValues = [];

        let inputValues;
        if(randomInputsHandler === true) {
            inputValues = createRandomInputs(randomQuantity, canvasSize, randomSegments);
        } else{
            inputValues = curveIputs;
        };

        inputValues.forEach((e, index) => {
            // CREATE MAIN LAYERS
            thisValues.push(curvePatternFun(canvasSize , e.yAxis, e.firstYShift, e.inputShifts, mainWeigt));

            // CREATE BETWEEN LAYERS
            const betweenLayers = createBetweenLayers(canvasSize, e, index, inputValues, betweenWeight, betweenBites);
            betweenLayers.forEach(i => {
                thisValues.push(i)
            });
        });
        setCurvesPattern(thisValues);

        // eslint-disable-next-line
    }, [canvasSize, reset, randomInputsHandler]);


    return (
        <div 
        style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",           
        }}>
            <canvas id="canvas" ref={canvasRef} height={canvasSize} width={canvasSize} />
        </div>
    )
}
