/**
 * Down handler
 * 
 */
export function down(core, session) {
	core.draw = true;
	core.context.strokeStyle = session.color;
	core.context.fillStyle = session.color;
        
	session.locPrev = Object.assign({}, session.loc0);

	core.context.fillRect(session.loc0.x - session.brushSize/2, session.loc0.y - session.brushSize/2, session.brushSize, session.brushSize); 
}


/**
 * Move handler
 * 
 */
export function move(core, session) {
	if (core.draw){

		core.context.beginPath();
		core.context.moveTo(session.locPrev.x, session.locPrev.y);
		core.context.lineTo(session.loc.x, session.loc.y);
		core.context.stroke();
		
		session.locPrev = Object.assign({}, session.loc);
	}  
}


/**
 * Up handler
 * 
 */
export function up(core, session) {         
	if (session.loc.x != session.locPrev.x || session.loc.y != session.locPrev.y) {
		core.context.beginPath();
		core.context.moveTo(session.locPrev.x, session.locPrev.y);
		core.context.lineTo(session.loc.x, session.loc.y);
		core.context.stroke(); 
	}
          
	core.draw = false;
	session.loc = {};
	session.loc0 = {};
	session.locPrev = {};
}