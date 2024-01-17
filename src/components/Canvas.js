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


                opacity.current += 1


                const rectQuant = 50;
                const rectRange = 200;
                const rectInputs = {
                    bites: width / rectQuant,

                }

            
            
                for(let i = 0; i < rectQuant; i++) { 

                    const thisY = Math.sin(toRads((i * 80) + opacity.current)) * rectRange ;
                    const thisYX = Math.cos(toRads((i * 80) + opacity.current)) * rectRange ;

                    context.save();
                    context.beginPath();
                    //context.translate(rectInputs.bites * i, 500 + thisY);
                    context.moveTo(rectInputs.bites * i, 500 + thisY);   
                    context.lineTo(rectInputs.bites * i, 500 + thisYX);


                    context.fillStyle = "orange";
                    context.strokeStyle = "white";
                    context.lineWidth = 5;
                    context.stroke();
                    //context.fillRect(0, 0, rectInputs.bites, rectInputs.bites);
                    context.restore();
                }
                
                for(let i = 0; i < 50; i++) { 

                    const thisY = Math.sin(toRads((i / 2) + opacity.current)) * rectRange ;
                    const thisYX = Math.cos(toRads((i / 2) + opacity.current)) * rectRange ;

                    context.save();
                    context.beginPath();
                    //context.translate(rectInputs.bites * i, 500 + thisY);
                    context.moveTo(rectInputs.bites * i, 500 + thisY);   
                    context.lineTo(rectInputs.bites * i, 500 + thisYX);


                    context.fillStyle = "orange";
                    context.strokeStyle = "white";
                    context.lineWidth = 5;
                    context.stroke();
                    //context.fillRect(0, 0, rectInputs.bites, rectInputs.bites);
                    context.restore();
                }

                /*
                const thisY = Math.sin(toRads((0 * 2) + opacity.current)) * rectRange;
                const thisY2 = Math.sin(toRads((50 * 2) + opacity.current)) * rectRange;
                const thisY3 = Math.sin(toRads((50 / 3 * 2) + opacity.current)) * rectRange;
                const thisY4 = Math.sin(toRads((50 / 3 * 2 * 2) + opacity.current)) * rectRange;
                bezierCurve(context, {x: 0, y: 500 + thisY }, {x: 500 / 3, y: 500 + (thisY3 * 1) }, {x: 500 / 3 * 2, y: 500 + thisY4 }, {x: 1000 / 2, y: 500 + thisY2 }, 1, 2, "white", 0)
                
                
                const thisY5 = Math.sin(toRads((100 * 2) + opacity.current)) * rectRange;
                const thisY6 = Math.sin(toRads(((50 / 3 + 50) * 2) + opacity.current)) * rectRange;
                const thisY7 = Math.sin(toRads(((50 / 3 * 2 + 50) * 2) + opacity.current)) * rectRange;
                bezierCurve(context, {x: 500, y: 500 + thisY2 }, {x: (500 / 3) + 500, y: 500 + (thisY6) }, {x: (500 / 3 * 2) + 500 , y: 500 + (thisY7) }, {x: 1000 , y: 500 + thisY5 }, 1, 2, "white", 0)
                */

                const yMotionDelta = 50
                const yMotion = Math.sin(toRads(opacity.current * 1)) * yMotionDelta;

                const xMotion = 0
                const xMotion2 = yMotion
                const yMove = Math.cos(toRads(opacity.current * 1)) * (yMotionDelta);

                //const yMove = opacity.current * 5
                //console.log(yMotion)
                const quantity = 2;
                //bezierCurve(context, {x: 0, y: 500 }, {x: 250, y: 500 }, {x: 250, y: 500 + yMotion }, {x: 500, y: 500 + (yMotion)}, 1, 2, "white", yMove)
                //bezierCurve(context, {x: 500, y: 500 + yMotion }, {x: 750, y: 500 + yMotion }, {x: 750, y: 500}, {x: 1000, y: 500}, 1, 2, "white", yMove)

                
                /*
                for(let i = 0; i < quantity; i++) {
                    //console.log(i)
                    
                    const halfHeight = width / 2
                    const thisWidth = width / quantity;
                    const thisHalfWidth = thisWidth / 2;
                    //bezierCurve(context, {x: 0, y: 500 }, {x: 250, y: 500 }, {x: 250, y: 500 + yMotion }, {x: 500, y: 500 + (yMotion)}, 1, 2, "white", yMove)
                    bezierCurve(
                        context, 
                        {x: i * thisWidth, y: 500 }, 
                        {x: (i * thisWidth) +  (thisHalfWidth / 2), y: 500 }, 
                        {x: (i * thisWidth) +  (thisHalfWidth / 2), y: 500 + yMotion }, 
                        {x: (i * thisWidth) + (thisWidth / 2), y: 500 + (yMotion)}, 
                        1, 2, "white", yMove
                        )

                    bezierCurve(
                        context, 
                        {x: (i * thisWidth) + (thisWidth / 2), y: halfHeight + yMotion }, 
                        {x: (i * thisWidth) + (thisWidth / 2) + (thisHalfWidth / 2), y: halfHeight + yMotion }, 
                        {x: (i * thisWidth) + (thisWidth / 2) + (thisHalfWidth / 2), y: halfHeight}, 
                        {x: (i * thisWidth) + (thisWidth), y: halfHeight}, 
                        1, 2, "white", yMove
                        )
                }
                */

                /*
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
                */
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
