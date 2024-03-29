

export function curvePatternFun(canvasSize ,yAxis, firstYShift, inputShifts, weight) {
    const thisValus = []
    inputShifts.forEach((e, i) => {
        const segments = inputShifts.length;
        const segmentLength = canvasSize / segments;
        const cpx = (segmentLength * i) + (segmentLength / 2)

        // IF FOR FIRST ELEMENT
        let cpy1;
        if(i === 0) {
            cpy1 = yAxis + firstYShift
        } else{
            cpy1 = yAxis + (inputShifts[i - 1] * -1);
        }
        
        const cpy2 = yAxis + e
        const values = {
            start: {x: segmentLength * i, y: yAxis},
            cp1: {x: cpx, y: cpy1},
            cp2: {x: cpx, y: cpy2},
            end: {x: segmentLength * (i + 1), y: yAxis},
            weight: weight
        }
        thisValus.push(values)
    });

    return thisValus;
}





// CREATE BETWEEN LAYERS
export function createBetweenLayers(canvasSize, e, index, curveIputs, betweenWeight, betweenBites) {

    const thisValues = [];

    const nextElement = curveIputs[index + 1]
    if(nextElement) {

        // FIRST Y SHIFT
        const yShiftDelta = nextElement.firstYShift - e.firstYShift
        const yShift = yShiftDelta / betweenBites;

        // INPUT SHIFTS                
        const nextInputShifts = nextElement.inputShifts;
        const inputShiftsBites = nextInputShifts.map((item, shiftIndex) => {
            let thisInputShif = e.inputShifts[shiftIndex];

            const thisInputShiftBite = (item - thisInputShif) / betweenBites;

            return thisInputShiftBite;
        })

        // CREATE BETWEEN LAYERS
        for(let i = 1; i < betweenBites; i++) {
            // FIRST Y SHIFT
            const thisShift = e.firstYShift + (yShift * i)
            const someshit = e.inputShifts.map((inputShift, inputShiftIndex) => {

                return inputShift + (inputShiftsBites[inputShiftIndex] * i);
            })
            thisValues.push(curvePatternFun(canvasSize , e.yAxis, thisShift, someshit, betweenWeight));                              
        }
    }

    return thisValues;
}