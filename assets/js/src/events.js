import $ from 'jquery';
import { 
  brushDown, brushMove, brushUp, 
  sizeDown, sizeMove, sizeUp, 
  colorDown, colorMove, colorUp, bwDown, bwMove, bwUp
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
  core.canvas.on('touchend', e => brushUp(e, core, session));
  //mouse
  core.canvas.on('mousedown', e => brushDown(e, core, session, true));
  core.canvas.on('mousemove', e => brushMove(e, core, session, true));
  core.canvas.on('mouseup', e => brushUp(e, core, session));
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
  // colors
  //touch
  core.colorHolder.on('touchstart', e => colorDown(e, core, session, false));
  core.colorHolder.on('touchmove', e => colorMove(e, core, session, false));         
  core.colorHolder.on('touchend', e => colorUp(e, core, session));
  ////mouse
  core.colorHolder.on('mousedown', e => colorDown(e, core, session, true));
  core.colorHolder.on('mousemove', e => colorMove(e, core, session, true));
  core.colorHolder.on('mouseup', e => colorUp(e, core, session));

  // black & white
  //touch
  core.bwHolder.on('touchstart', e => bwDown(e, core, session, false));
  core.bwHolder.on('touchmove', e => bwMove(e, core, session, false));         
  core.bwHolder.on('touchend', e => bwUp(e, core, session));
  ////mouse
  core.bwHolder.on('mousedown', e => bwDown(e, core, session, true));
  core.bwHolder.on('mousemove', e => bwMove(e, core, session, true));
  core.bwHolder.on('mouseup', e => bwUp(e, core, session));
}