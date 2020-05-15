import $ from 'jquery';
import { brushDown, brushMove, brushUp, sizeDown, sizeMove, sizeUp,  
         colorDown, colorMove, colorUp, eraserDown, eraserUp, clearPage, toggleManualMode } from './handlers';

/**
 * Window
 * 
 */
$(window).on('mousedown mouseup', function(e) {
    this.mousedown = (e.type === 'mousedown') ? 1 : 0;
});



/**
 * Brush 
 * 
 */
export function brushEvents(ui, settings) {
  //touch
  ui.canvas.on('touchstart', e => brushDown(e, ui, settings, false));
  ui.canvas.on('touchmove', e => brushMove(e, ui, settings, false));         
  ui.canvas.on('touchend', e => brushUp(e, ui, settings, false));
  //mouse
  ui.canvas.on('mousedown', e => brushDown(e, ui, settings, true));
  ui.canvas.on('mousemove', e => brushMove(e, ui, settings, true));
  ui.canvas.on('mouseup', e => brushUp(e, ui, settings, true));
}



/**
 * Size control
 * 
 */
export function sizeEvents(ui, settings) {
  //touch
  ui.sizeHolder.on('touchstart', e => sizeDown(e, ui, settings, false));
  ui.sizeHolder.on('touchmove', e => sizeMove(e, ui, settings, false));         
  ui.sizeHolder.on('touchend', e => sizeUp(e, ui, settings));
  ////mouse
  ui.sizeHolder.on('mousedown', e => sizeDown(e, ui, settings, true));
  ui.sizeHolder.on('mousemove', e => sizeMove(e, ui, settings, true));
  ui.sizeHolder.on('mouseup', e => sizeUp(e, ui, settings));
}


/**
 * Color control
 * 
 */
export function colorEvents(ui, settings) {
  //touch
  ui.colorHolder.on('touchstart', e => colorDown(e, ui, settings, false));
  ui.colorHolder.on('touchmove', e => colorMove(e, ui, settings, false));         
  ui.colorHolder.on('touchend', e => colorUp(e, ui, settings));
  ////mouse
  ui.colorHolder.on('mousedown', e => colorDown(e, ui, settings, true));
  ui.colorHolder.on('mousemove', e => colorMove(e, ui, settings, true));
  ui.colorHolder.on('mouseup', e => colorUp(e, ui, settings));
}


/**
 * Eraser control 
 * 
 */
export function eraserEvents(ui, settings) {
  //touch
  ui.eraser.on('touchstart', e => eraserDown(e, ui, settings, false));
  ui.eraser.on('touchmove', e => eraserDown(e, ui, settings, false));         
  ui.eraser.on('touchend', e => eraserUp(e, ui, settings, false));
  //mouse
  ui.eraser.on('mousedown', e => eraserDown(e, ui, settings, true));
  ui.eraser.on('mousemove', e => eraserDown(e, ui, settings, true));
  ui.eraser.on('mouseup', e => eraserUp(e, ui, settings, true));
  //clear clear
  ui.newPageBtn.on('click', e=> clearPage(e, ui));
}


export function extras(ui, settings) {

  ui.currentColor.on('click', e => toggleManualMode(e, ui, settings, false));

}