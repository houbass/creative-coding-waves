
import { toRads, randomRange } from "../functions/HelpingFunctions";

export function drawDna(context, width, motion, quantity, range, lineWidth, arcR, color, yShift) {        
    for(let i = 1; i < quantity; i++) { 
        const bites = width / quantity;
        const thisY1 = (Math.sin(toRads((i * 6) + motion)) * range ) + yShift;
        const thisY2 = (Math.cos(toRads((i * 6) + motion)) * range) + yShift ;
        const x = bites * i;
        const y1 = (width / 2) + thisY1;
        const y2 = (width / 2) + thisY2;

        context.save();
        context.beginPath();
        context.moveTo(x, y1);   
        context.lineTo(x, y2);
        context.strokeStyle = color;
        context.lineWidth = lineWidth;
        context.stroke();
        context.restore();
        
        context.save();
        context.beginPath();
        context.fillStyle = color;
        context.arc(x, y1, arcR, 0, Math.PI * 2);
        context.arc(x, y2, arcR, 0, Math.PI * 2);
        context.fill();
        context.restore();
    }
}
