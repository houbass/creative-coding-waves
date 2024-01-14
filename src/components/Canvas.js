import React, { useEffect, useRef, useState } from "react";

// FUNCTIONS
import { bezierCurve} from "../functions/DrawingFunctions";
import { curvePatternFun, createBetweenLayers } from "../functions/PaternFunctions";
import { toRads, randomRange } from "../functions/HelpingFunctions";

// INPUTS 
import { canvasColor, v, curveIputs, mainWeigt, betweenWeight, betweenBites } from "../inputs/Inputs";

//CANVAS SKETCH FUNKCE
const random = require ('canvas-sketch-util/random')

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
                
                curvesPattern.forEach((curve, index) => {
                    //let check = (Math.sin(toRads(opacity.current + (index * (180 / curvesPattern.length)))) + 1) / 2;
                    let check = Math.cos(toRads(opacity.current + (index * (180 / curvesPattern.length))))
                    //let check = Math.sin(random.noise2D(index, 0, 0.001 + (opacity.current /100000)) * 40); 

                    if(check < 0) {
                        check = 0;
                    }

                    //console.log(check)
                    const thisOpacity = check / 2

                    curve.forEach(e => {
                        bezierCurve(context, e.start, e.cp1, e.cp2, e.end, thisOpacity, e.weight)
                    })
                })

                // UPDATE EVERY FRAME
                opacity.current += v;
            }
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
            ])
        }
    }


    // GET CURVES
    useEffect(() => {
        const thisValues = [];

        curveIputs.forEach((e, index) => {
            // CREATE MAIN LAYERS
            thisValues.push(curvePatternFun(canvasSize , e.yAxis, e.firstYShift, e.inputShifts, mainWeigt));

            // CREATE BETWEEN LAYERS
            const betweenLayers = createBetweenLayers(canvasSize, e, index, curveIputs, betweenWeight, betweenBites);
            betweenLayers.forEach(i => {
                thisValues.push(i)
            });
        });

        setCurvesPattern(thisValues);
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
