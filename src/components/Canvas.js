import React, { useEffect, useRef } from "react";

// FUNCTIONS
import { drawWave, drawLines } from "../functions/DrawingFunctions";
import { toRads, randomRange, getAngle } from "../functions/HelpingFunctions";

// LIBRARIES
import random from "canvas-sketch-util/random";

// INPUTS 
import { canvasColor, } from "../inputs/Inputs";


export default function Canvas({ canvasRef, canvasSize, recHandler, images, animateHandler, drawHandler, reset }) {

    // REFS 
    const opacity = useRef(0);

    // WAVES ELEMENTS
    const waveElements = useRef([]);
    const waveElements2 = useRef([]);
    
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

                // MAIN MOTION
                opacity.current += 1;

                // FIRST MOTION
                const wavesYmotion = (canvasSize / 2) + (random.noise1D(opacity.current, 1 / 100, 200));
                waveElements.current.push(wavesYmotion);

                // SECOND MOTION
                const wavesYmotion2 = (canvasSize / 2) + (random.noise1D(opacity.current, 1 / 50, 100));
                waveElements2.current.push(wavesYmotion2);


                // CURVE SETTING
                const gap = 5;
                const step = width / gap;

                // REVERSING ELEMENTS
                const reversedEl = waveElements.current.slice(Math.max(waveElements.current.length - step, 0)).reverse();
                const reversedEl2 = waveElements2.current.slice(Math.max(waveElements2.current.length - step, 0)).reverse();

                // DRAW WAVE
                //drawWave(context, 40, -40, reversedEl, gap, getAngle, "orange", 5);
                //drawWave(context, 10, -20, reversedEl2, gap, getAngle, "rgb(225, 35, 105)", 5);
                //drawWave(context, 0, 0, reversedEl, gap, getAngle, "white", 5);
                //drawLines(context, reversedEl, gap, "white", 4, 30);

                
                const quantity = 10;
                for(let i = 0; i < quantity; i++) {
                    const colors = ["purple", "red", "white", "orange", "lightblue"];
                    const thisColor = colors[i];
                    drawWave(context, i * 20 * -1, i * 30, reversedEl, gap, getAngle, "white", 5 );
                }
                
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
            images.current = ([
                ...images.current, canvas.toDataURL("image/png", 1.0)
            ]);
        };
    };

    // INIT
    useEffect(() => {
        opacity.current = canvasSize / 2;
        waveElements.current = [];
        waveElements2.current = [];

        // eslint-disable-next-line
    }, [canvasSize, reset]);


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
