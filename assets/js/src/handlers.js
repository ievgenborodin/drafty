import { getLoc, getCanvasLoc, scaleValue, hsv2rgb } from './common';


/**
 * Brush 
 * 
 */

// down
export function brushDown(e, core, session, isMouse) {
	session.loc0 = getCanvasLoc(e, core.canvas[0], isMouse); 

	core.drawing = true;
	core.context.strokeStyle = session.color;
	core.context.fillStyle = session.color;
	core.context.lineWidth = session.brushSize;
        
	session.locPrev = Object.assign({}, session.loc0);

	core.context.fillRect(session.loc0.x - session.brushSize/2, session.loc0.y - session.brushSize/2, session.brushSize, session.brushSize); 
}

// move
export function brushMove(e, core, session, isMouse) {
	session.loc = getCanvasLoc(e, core.canvas[0], isMouse);
	
	if (core.drawing){

		core.context.beginPath();
		core.context.moveTo(session.locPrev.x, session.locPrev.y);
		core.context.lineTo(session.loc.x, session.loc.y);
		core.context.stroke();
		
		session.locPrev = Object.assign({}, session.loc);
	}  
}

// up
export function brushUp(e, core, session) {         
	e.preventDefault(e);

	if (session.loc.x != session.locPrev.x || session.loc.y != session.locPrev.y) {
		core.context.beginPath();
		core.context.moveTo(session.locPrev.x, session.locPrev.y);
		core.context.lineTo(session.loc.x, session.loc.y);
		core.context.stroke(); 
	}
	core.drawing = false;
	session.loc = {};
	session.loc0 = {};
	session.locPrev = {};
}



/**
 * Size control
 * 
 */

// down
export function sizeDown(e, core, session, isMouse) {
	core.sizing = true;
	sizeMove(e, core, session, isMouse);
}
// move
export function sizeMove(e, core, session, isMouse) {	
	if (!core.sizing) 
		return; 

	let coords = getLoc(e, isMouse),
		bb = core.sizeHolder[0].getBoundingClientRect(),
		bottom; 

	session.locSize = bb.height - bb.height * (coords.y - bb.top) / bb.height; 
	bottom = session.locSize<0 ? 1 : session.locSize>bb.height ? bb.height : session.locSize;
	core.sizePointer.css({bottom: `${bottom}px`})
	session.brushSize = scaleValue(session.locSize, bb.height, 20);
	core.context.lineWidth = session.brushSize;
}
// up
export function sizeUp(e, core, session) {
	e.preventDefault(e);
	session.locSize = {};
	core.sizing = false;
}



/**
 * Color control
 * 
 */

// down
export function colorDown(e, core, session, isMouse) {
	console.log('is down')
	core.coloring = true;
	colorMove(e, core, session, isMouse);
}
// move
export function colorMove(e, core, session, isMouse) {	
	if (!core.coloring) 
		return; 

	let coords = getLoc(e, isMouse),
		bb = core.colorHolder[0].getBoundingClientRect(),
		top, hue; 

	session.locColor = bb.height * (coords.y - bb.top) / bb.height; 
	top = session.locColor<0 ? 1 : session.locColor>bb.height ? bb.height : session.locColor;
	core.colorPointer.css({top: `${top}px`})
	hue = 359 - scaleValue(session.locColor, bb.height, 359);
	hue = (hue < 0) ? 0 : (hue>=360) ? 359 : hue;
	
	session.color = '#'+hsv2rgb(hue, 100, 100).hex; 	
}
// up
export function colorUp(e, core, session) {
	e.preventDefault(e);
	session.locColor = {};
	core.coloring = false;
}




/**
 * B&W Color control
 * 
 */

// down
export function bwDown(e, core, session, isMouse) {
	core.coloring = true;
	bwMove(e, core, session, isMouse);
}
// move
export function bwMove(e, core, session, isMouse) {	
	if (!core.coloring) 
		return; 

	let coords = getLoc(e, isMouse),
		bb = core.bwHolder[0].getBoundingClientRect(),
		bottom, x; 

	session.locColor = bb.height * (coords.y - bb.top) / bb.height; 
	bottom = session.locColor<0 ? 1 : session.locColor>bb.height ? bb.height : session.locColor;
	core.colorPointer.css({bottom: `${bb.height - bottom}px`})
	x = 255 - scaleValue(session.locColor, bb.height, 255);
	
	session.color = `rgb(${x},${x},${x})`; 	
}
// up
export function bwUp(e, core, session) {
	e.preventDefault(e);
	session.locColor = {};
	core.coloring = false;
}
