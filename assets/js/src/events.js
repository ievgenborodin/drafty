import $ from 'jquery';
import { 
  brushDown, brushMove, brushUp, 
  sizeDown, sizeMove, sizeUp, 
  colorDown, colorMove, colorUp,
  eraserDown, eraserUp  
} from './handlers';
import { wtc } from './common';


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
export function brushEvents(core, session) {
  //touch
  core.canvas.on('touchstart', e => brushDown(e, core, session, false));
  core.canvas.on('touchmove', e => brushMove(e, core, session, false));         
  core.canvas.on('touchend', e => brushUp(e, core, session, false));
  //mouse
  core.canvas.on('mousedown', e => brushDown(e, core, session, true));
  core.canvas.on('mousemove', e => brushMove(e, core, session, true));
  core.canvas.on('mouseup', e => brushUp(e, core, session, true));
}



/**
 * Size control
 * 
 */
export function sizeEvents(core, session) {
  //touch
  core.sizeHolder.on('touchstart', e => sizeDown(e, core, session, false));
  core.sizeHolder.on('touchmove', e => sizeMove(e, core, session, false));         
  core.sizeHolder.on('touchend', e => sizeUp(e, core, session));
  ////mouse
  core.sizeHolder.on('mousedown', e => sizeDown(e, core, session, true));
  core.sizeHolder.on('mousemove', e => sizeMove(e, core, session, true));
  core.sizeHolder.on('mouseup', e => sizeUp(e, core, session));
}


/**
 * Color control
 * 
 */
export function colorEvents(core, session) {
  //touch
  core.colorHolder.on('touchstart', e => colorDown(e, core, session, false));
  core.colorHolder.on('touchmove', e => colorMove(e, core, session, false));         
  core.colorHolder.on('touchend', e => colorUp(e, core, session));
  ////mouse
  core.colorHolder.on('mousedown', e => colorDown(e, core, session, true));
  core.colorHolder.on('mousemove', e => colorMove(e, core, session, true));
  core.colorHolder.on('mouseup', e => colorUp(e, core, session));
}


/**
 * Eraser control 
 * 
 */
export function eraserEvents(core, session) {
  //touch
  core.eraser.on('touchstart', e => eraserDown(e, core, session, false));
  core.eraser.on('touchmove', e => eraserDown(e, core, session, false));         
  core.eraser.on('touchend', e => eraserUp(e, core, session, false));
  //mouse
  core.eraser.on('mousedown', e => eraserDown(e, core, session, true));
  core.eraser.on('mousemove', e => eraserDown(e, core, session, true));
  core.eraser.on('mouseup', e => eraserUp(e, core, session, true));
}