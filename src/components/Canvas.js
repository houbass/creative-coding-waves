import React, { useEffect, useRef } from "react";

// FUNCTIONS
import { drawDna } from "../functions/DrawingFunctions";

// INPUTS 
import { canvasColor } from "../inputs/Inputs";

export default function Canvas({ canvasRef, canvasSize, recHandler, images, animateHandler, drawHandler, reset }) {

    // REFS 
    const motion = useRef(0);

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
                motion.current += 1;

                // DRAW DNA
                const quantity = 50;
                const range = 100;
                const lineWidth = 3
                const arcR = lineWidth * 2;
                const yShift = 0;
                const color = "white";
                drawDna(context, width, motion.current, quantity, range, lineWidth, arcR, color, yShift); 

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

    // INIT
    useEffect(() => {
        motion.current = 0;

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
