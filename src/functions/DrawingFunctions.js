

export function bezierCurve(context, start, cp1, cp2, end, opacity, weight, color) {

    //console.log(start)

    //const color = 255 / index

    context.save();

    // Cubic Bézier curve
    //context.strokeStyle = "white";
    context.strokeStyle = color
    context.lineWidth = weight;
    context.beginPath();
    context.moveTo(start.x, start.y);
    context.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
    context.globalAlpha = opacity;
    context.stroke();
    context.restore();

    /*
    // Start and end points
    context.fillStyle = "blue";
    context.beginPath();
    context.arc(start.x, start.y, 5, 0, 2 * Math.PI); // Start point
    context.arc(end.x, end.y, 5, 0, 2 * Math.PI); // End point
    context.fill();

    // Control points
    context.fillStyle = "red";
    context.beginPath();
    context.arc(cp1.x, cp1.y, 5, 0, 2 * Math.PI); // Control point one
    context.arc(cp2.x, cp2.y, 5, 0, 2 * Math.PI); // Control point two
    context.fill();
    */
}