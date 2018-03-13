
/**
 * Window To Canvas
 * 
 */
export function wtc(canvas, x, y) {
  var bbox = canvas.getBoundingClientRect();
  return { x: x - bbox.left * (canvas.width / bbox.width),
      y: y - bbox.top * (canvas.height / bbox.height)
  };
}


/**
 * Set Canvas Size
 * 
 */
export function setCanvasSize(canvas) {
	canvas.attr('width', window.innerWidth + 'px').attr('height', window.innerHeight + 'px');
}