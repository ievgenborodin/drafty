import { getLoc, getCanvasLoc, scaleValue, hsv2rgb } from './common';


/**
 * Brush 
 * 
 */

// down
export function brushDown(e, core, session, isMouse) {
	e.preventDefault();
	e.stopPropagation();

	session.loc0 = getCanvasLoc(e, core.canvas[0], isMouse);

	if (session.loc0.length == 2) {
		core.paging = true;
		core.drawing = false;
	}
	else {
		let color = core.erasing ? "#fff" : session.color;
		core.drawing = true;
		core.context.strokeStyle = color;
		core.context.fillStyle = color;
		core.context.lineWidth = core.erasing ? 20 : session.brushSize;
		        
		session.locPrev = Object.assign({}, session.loc0[0]);

		core.context.fillRect(session.loc0[0].x - session.brushSize/2, session.loc0[0].y - session.brushSize/2, session.brushSize, session.brushSize);
	} 
}

// move
export function brushMove(e, core, session, isMouse) {
	e.preventDefault();
	e.stopPropagation();

	session.loc = getCanvasLoc(e, core.canvas[0], isMouse);
	
	if (session.loc.length == 2) {
		// add animation
	} else {
		core.paging = false;

		if (core.drawing) {
			core.context.beginPath();
			core.context.moveTo(session.locPrev.x, session.locPrev.y);
			core.context.lineTo(session.loc[0].x, session.loc[0].y);
			core.context.stroke();
				
			session.locPrev = Object.assign({}, session.loc[0]);
		}  		
	}
}

// up
export function brushUp(e, core, session, isMouse) {         
	e.preventDefault();
	e.stopPropagation();

	if (session.loc.length == 2) {
		let diff1 = session.loc[0].x - session.loc0[0].x;
		let diff2 = session.loc[1].x - session.loc0[1].x;
			
		let canvas = core.canvas[0];
		
		if (diff1 > 100 && diff2 > 100) {// left
			if (core.currentPage == 0) alert('On first page'); // [NEED] add as a flash message
			else {
				// save current 
				core.pages[core.currentPage] = core.context.getImageData(0,0, canvas.width, canvas.height);

				core.currentPage--;
				
				// clear screen
				core.context.clearRect(0,0, canvas.width, canvas.height);
				// restore
				core.context.putImageData(core.pages[core.currentPage], 0, 0);
			}
		}
		else if (diff1 < -100 && diff2 < -100) {// right
			// save current 
			core.pages[core.currentPage] = core.context.getImageData(0,0, canvas.width, canvas.height);
			
			core.currentPage++;
			
			// clear screen
			core.context.clearRect(0,0, canvas.width, canvas.height);

			// restore if exists
			if (core.pages[core.currentPage])
				core.context.putImageData(core.pages[core.currentPage], 0, 0);
		}
	} 

	session.loc0 = {};
	session.loc = {};
	core.paging = false;	
	core.drawing = false;		
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
	e.preventDefault();
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
	e.preventDefault();
	core.coloring = false;
}


/**
 * Eraser control
 * 
 */

// down/move
export function eraserDown(e, core, session, isMouse) {
	e.preventDefault();
	e.stopPropagation();

	core.erasing = true;
	core.eraser.addClass('active');
}
// up
export function eraserUp(e, core, session) {
	e.preventDefault();
	e.stopPropagation();

	core.erasing = false;
	core.eraser.removeClass('active');
}