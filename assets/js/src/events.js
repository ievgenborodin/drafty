import { down, move, up } from './handlers';
import { wtc } from './common';


/**
 * Down event
 * 
 */
export function downEvent(core, session) {
  core.canvas.on('touchstart', function(e) { 
    e.preventDefault(e); 
    session.loc0 = wtc(core.canvas[0],e.originalEvent.touches[0].pageX,e.originalEvent.touches[0].pageY); 

    down(core, session);
  });
  
  core.canvas.on('mousedown', function(e) {   
    e.preventDefault(e); 
    session.loc0 = wtc(core.canvas[0],e.clientX,e.clientY); 
     
    down(core, session);
  });
}



/**
 * Move event
 * 
 */
export function moveEvent(core, session) {
  core.canvas.on('touchmove', function(e) { 
    e.preventDefault(e); 
    session.loc = wtc(core.canvas[0],e.originalEvent.touches[0].pageX,e.originalEvent.touches[0].pageY); 
      
    move(core, session);
  });
         
  core.canvas.on('mousemove', function(e) {   
     e.preventDefault(e); 
     session.loc = wtc(core.canvas[0],e.clientX,e.clientY);
    
     move(core, session); 
  });
}


/**
 * Up event
 * 
 */
export function upEvent(core, session) {
  core.canvas.on('touchend', function(e) { 
    e.preventDefault(e);
    session.loc = wtc(core.canvas[0],e.clientX,e.clientY);
            
    up(core, session);
  });

  core.canvas.on('mouseup', function(e) {  
    e.preventDefault(e);
    session.loc = wtc(core.canvas[0],e.clientX,e.clientY);
         
    up(core, session);
  });
}