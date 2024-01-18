

// DEG TO RADS
export function toRads(deg) {
    return deg * (Math.PI / 180);
}

// RANDOM NUMBER
export function randomRange(min, max) {
    return Math.round(min + (Math.random() * (max - min)))
}


// GET ANGLE
export function getAngle(startx, starty, endx, endy) {
    const lengtX = endx - startx;
    const lengthY = starty - endy;
    const thisLength = Math.sqrt(Math.pow(lengtX, 2) + Math.pow(lengthY, 2));
    //const thisAngle = (180 / Math.PI) * Math.asin(lengthY / thisLength);
    const thisAngle = lengthY / thisLength;

    return thisAngle
}