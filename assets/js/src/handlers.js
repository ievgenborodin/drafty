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
	core.coloring = true;
	colorMove(e, core, session, isMouse);
}
// move
export function colorMove(e, core, session, isMouse) {	
	if (!core.coloring) 
		return; 

	let coords = getLoc(e, isMouse),
		bb = core.colorHolder[0].getBoundingClientRect(),
		top, bottom, hue, x, newHeight; 

	// black & white
	if (coords.y >= (bb.top + bb.height * .7)) {
		newHeight = bb.height * .3;
		
		bottom = bb.top + bb.height - coords.y; 
		
		if (bottom < 0) bottom = 0;
		core.colorPointer.css({bottom: `${bottom}px`, top: 'initial'})
		x = scaleValue(bottom, newHeight, 255);
		
		session.color = `rgb(${x},${x},${x})`; 		

	// colored
	} else {
		newHeight = bb.height * .7;
		
		top = coords.y - bb.top; 
		
		if (top < 0) top = 0;
		core.colorPointer.css({top: `${top}px`, bottom: 'initial'})
		hue = 359 - scaleValue(top, newHeight, 359);
		hue = (hue < 0) ? 0 : (hue>=360) ? 359 : hue;
		
		session.color = '#'+hsv2rgb(hue, 100, 100).hex; 	
	}
	core.currentColor.css({background: session.color});
}
// up
export function colorUp(e, core, session) {
	e.preventDefault(e);
	core.coloring = false;
}