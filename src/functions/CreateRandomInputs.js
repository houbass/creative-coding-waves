
// HELPING FUNCTIONS
import { randomRange } from "./HelpingFunctions";


// CREATE RANDOM INPUTS
export function createRandomInputs(quantity, canvasSize, segments) {
    const halfScreen = canvasSize / 2

    const randomInputsArr = [];
    for(let i = 0; i < quantity; i++) {

        // segments
        const thisSegments = [];
        for(let j = 0; j <segments; j++) {
            thisSegments.push(randomRange(halfScreen * -1, halfScreen))
        };

        // NEW INPUT
        const thisRandomInputs = {
            yAxis: randomRange(halfScreen - 200, halfScreen + 200),
            firstYShift: randomRange(halfScreen * -1, halfScreen),
            inputShifts: thisSegments
        };
        randomInputsArr.push(thisRandomInputs);
    };

    // PUSH FIRST ONE TO THE END TO MAKE A NICE LOOP
    randomInputsArr.push(randomInputsArr[0]);


    return randomInputsArr;
};