
function drawCruve(context, cp1x, cp1y, cp2x, cp2y, endX, endY, color, weight) {

    context.save();
    context.beginPath();
    context.strokeStyle = color;
    context.lineWidth = weight;
    //context.fillStyle = color;
    context.beginPath();
    context.moveTo(cp1x, cp1y);
    context.quadraticCurveTo(endX, endY, cp2x, cp2y);
    //context.arc(cp1x, cp1y, 1, 0, 2 * Math.PI); // Control point one
    //context.arc(startX, startY, 10, 0, 2 * Math.PI); // Control point one
    context.globalAlpha = 1;
    context.stroke();
    //context.fill();
    context.restore();
    

}


export function drawWave(context, xShift, yShift, reversedEl, gap, getAngle, color, weight) {
    // DRAW CURVES BETWEEN POINTS
    reversedEl.forEach((e, i) => {

        const thisX = (gap * i) + xShift;
        const nextX = (gap * (i + 1)) + xShift;
        const thisY = e + yShift;
        const nextY = reversedEl[i + 1] + yShift;

        const nextNextX = (gap * (i + 2)) + xShift;
        const nextNextY = reversedEl[i + 2] + yShift;

        const endX = nextX;
        const endY = nextY;
        
        const cp1x = thisX + (endX - thisX) / 2;
        const cp1y = thisY + (endY - thisY) / 2;
        const cp2x = endX + (nextNextX - endX) / 2;
        const cp2y = endY + (nextNextY - endY) / 2;


        drawCruve(context, cp1x, cp1y, cp2x, cp2y, endX, endY, color, weight)
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