import { getLoc, getCanvasLoc, scaleValue, hsv2rgb } from './common';
import $ from 'jquery';


/**
 * Brush 
 * 
 */

// down
export function brushDown(e, ui, settings, isMouse) {
	e.preventDefault();
	e.stopPropagation();

	settings.loc0 = getCanvasLoc(e, ui.canvas[0], isMouse);

	if (settings.loc0.length == 2) {
		settings.paging = true;
		settings.drawing = false;
	}
	else {
		let color = settings.erasing ? "#fff" : settings.color;
		settings.drawing = true;
		ui.context.strokeStyle = color;
		ui.context.fillStyle = color;
		ui.context.lineWidth = settings.erasing ? 20 : settings.brushSize;
		        
		settings.locPrev = $.extend({}, settings.loc0[0]);

		ui.context.fillRect(settings.loc0[0].x - settings.brushSize/2, settings.loc0[0].y - settings.brushSize/2, settings.brushSize, settings.brushSize);
	} 
}

// move
export function brushMove(e, ui, settings, isMouse) {
	e.preventDefault();
	e.stopPropagation();

	settings.loc = getCanvasLoc(e, ui.canvas[0], isMouse);
	
	if (settings.loc.length == 2) {
		// add animation
	} else {
		settings.paging = false;

		if (settings.drawing) {
			ui.context.beginPath();
			ui.context.moveTo(settings.locPrev.x, settings.locPrev.y);
			ui.context.lineTo(settings.loc[0].x, settings.loc[0].y);
			ui.context.stroke();
				
			settings.locPrev = $.extend({}, settings.loc[0]);
		}  		
	}
}

// up
export function brushUp(e, ui, settings, isMouse) {         
	e.preventDefault();
	e.stopPropagation();

	if (settings.loc.length == 2) {
		let diff1 = settings.loc[0].x - settings.loc0[0].x;
		let diff2 = settings.loc[1].x - settings.loc0[1].x;
			
		let canvas = ui.canvas[0];
		
		if (diff1 > 100 && diff2 > 100) {// left
			if (settings.currentPage == 0) alert('On first page'); // [NEED] add as a flash message
			else {
				// save current 
				settings.pages[settings.currentPage] = ui.context.getImageData(0,0, canvas.width, canvas.height);

				settings.currentPage--;
				
				// clear screen
				ui.context.clearRect(0,0, canvas.width, canvas.height);
				// restore
				ui.context.putImageData(settings.pages[settings.currentPage], 0, 0);
			}
		}
		else if (diff1 < -100 && diff2 < -100) {// right
			// save current 
			settings.pages[settings.currentPage] = ui.context.getImageData(0,0, canvas.width, canvas.height);
			
			settings.currentPage++;
			
			// clear screen
			ui.context.clearRect(0,0, canvas.width, canvas.height);

			// restore if exists
			if (settings.pages[settings.currentPage])
				ui.context.putImageData(settings.pages[settings.currentPage], 0, 0);
		}
	} 

	settings.loc0 = {};
	settings.loc = {};
	settings.paging = false;	
	settings.drawing = false;		
}



/**
 * Size control
 * 
 */

// down
export function sizeDown(e, ui, settings, isMouse) {
	settings.sizing = true;
	sizeMove(e, ui, settings, isMouse);
}
// move
export function sizeMove(e, ui, settings, isMouse) {	
	if (!settings.sizing) 
		return; 

	let coords = getLoc(e, isMouse),
		bb = ui.sizeHolder[0].getBoundingClientRect(),
		bottom; 

	settings.locSize = bb.height - bb.height * (coords.y - bb.top) / bb.height; 
	bottom = settings.locSize<0 ? 1 : settings.locSize>bb.height ? bb.height : settings.locSize;
	ui.sizePointer.css({bottom: `${bottom}px`})
	settings.brushSize = scaleValue(settings.locSize, bb.height, 20);
	ui.context.lineWidth = settings.brushSize;
}
// up
export function sizeUp(e, ui, settings) {
	e.preventDefault();
	settings.locSize = {};
	settings.sizing = false;
}



/**
 * Color control
 * 
 */

// down
export function colorDown(e, ui, settings, isMouse) {
	settings.coloring = true;
	colorMove(e, ui, settings, isMouse);
}
// move
export function colorMove(e, ui, settings, isMouse) {	
	if (!settings.coloring) 
		return; 

	let coords = getLoc(e, isMouse),
		bb = ui.colorHolder[0].getBoundingClientRect(),
		top, bottom, hue, x, newHeight; 

	// black & white
	if (coords.y >= (bb.top + bb.height * .7)) {
		newHeight = bb.height * .3;
		
		bottom = bb.top + bb.height - coords.y; 
		
		if (bottom < 0) bottom = 0;
		ui.colorPointer.css({bottom: `${bottom}px`, top: 'initial'})
		x = scaleValue(bottom, newHeight, 255);
		
		settings.color = `rgb(${x},${x},${x})`; 		

	// colored
	} else {
		newHeight = bb.height * .7;
		
		top = coords.y - bb.top; 
		
		if (top < 0) top = 0;
		ui.colorPointer.css({top: `${top}px`, bottom: 'initial'})
		hue = 359 - scaleValue(top, newHeight, 359);
		hue = (hue < 0) ? 0 : (hue>=360) ? 359 : hue;
		
		settings.color = '#'+hsv2rgb(hue, 100, 100).hex; 	
	}
	ui.currentColor.css({background: settings.color});
}
// up
export function colorUp(e, ui, settings) {
	e.preventDefault();
	settings.coloring = false;
}


/**
 * Eraser control
 * 
 */

// down/move
export function eraserDown(e, ui, settings, isMouse) {
	e.preventDefault();
	e.stopPropagation();

	settings.erasing = true;
	ui.eraser.addClass('active');
}
// up
export function eraserUp(e, ui, settings) {
	e.preventDefault();
	e.stopPropagation();

	settings.erasing = false;
	ui.eraser.removeClass('active');
}