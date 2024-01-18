
function drawCruve(context, startX, startY, cp1x, cp1y, cp2x, cp2y, endX, endY, color, weight) {
    // Cubic Bézier curve
    context.save();
    context.beginPath();
    context.strokeStyle = color;
    context.lineWidth = weight;
    context.fillStyle = color;
    context.beginPath();
    context.moveTo(startX, startY);
    //context.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY);
    context.lineTo(endX, endY)
    context.globalAlpha = 1;
    context.stroke();
    context.fill();
    context.restore();
    
    /*
    // Start and end points
    context.save();
    context.beginPath();
    context.fillStyle = "blue";
    context.beginPath();
    context.arc(startX, startY, 5, 0, 2 * Math.PI); // Start point
    context.arc(endX, endY, 5, 0, 2 * Math.PI); // End point
    context.fill();

    // Control points
    context.save();
    context.beginPath();
    
    context.beginPath();
    context.arc(cp1x, cp1y, 5, 0, 2 * Math.PI); // Control point one
    context.arc(cp2x, cp2y, 5, 0, 2 * Math.PI); // Control point two
    context.fill();
    

    // TANGENTA
    context.save();
    context.beginPath();
    context.strokeStyle = "orange";
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(endX, endY)
    context.globalAlpha = 1;
    context.stroke();
    context.restore();
    */
}


export function drawWave(context, xShift, yShift, reversedEl, gap, getAngle, color, weight) {
    // DRAW CURVES BETWEEN POINTS
    reversedEl.forEach((e, i) => {

        const thisX = (gap * i) + xShift;
        const nextX = (gap * (i + 1)) + xShift;
        const thisY = e + yShift;
        const nextY = reversedEl[i + 1] + yShift;

        const startX = thisX;
        const startY = thisY;
        const endX = nextX;
        const endY = nextY;

        let cp1x, cp1y, cp2x, cp2y;

        if(i <= 0) {
            // FIRST CURVE
            cp1x = ((endX - startX) / 2) + startX; 
            cp1y = startY - ((startY - endY) / 2);
            cp2x = cp1x;
            cp2y = cp1y;

        } else{              
            // REST CURVES
            const prevStartX = gap * (i - 1);
            const prevStartY = reversedEl[i - 1];
            cp1x = ((endX - startX) / 2) + startX; 
            cp2x = cp1x;
            cp2y = startY - ((startY - endY) / 2);
            const lengthX = cp1x - startX
            // PREV ANGLE
            const angle1 = getAngle(prevStartX, prevStartY, startX, startY);
            const prepona = angle1 * lengthX;
            cp1y = startY - prepona;
        }

        drawCruve(context, startX, startY, cp1x, cp1y, cp2x, cp2y, endX, endY, color, weight)
    }) 
}

export function drawLines(context, reversedEl, gap, color, weight, length) {
    // LINES
    reversedEl.forEach((e, i) => {
        context.save();
        context.beginPath();
        context.strokeStyle = color;
        context.moveTo(gap * i, e);
        context.lineTo((gap * i) + length, e)
        context.lineWidth = weight;
        context.stroke();
        context.fill();
        context.restore();
    })
}