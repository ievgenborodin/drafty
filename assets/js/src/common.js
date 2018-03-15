

/**
 * Set Canvas Size
 * 
 */
export function setCanvasSize(core) {
	let data = core.context.getImageData(0,0, canvas.width, canvas.height);
	core.canvas.attr('width', window.innerWidth-50 + 'px').attr('height', window.innerHeight + 'px');
	core.context.putImageData(data, 0, 0);
}


/**
 * Get Location 
 * 
 */
export function getLoc(e, isMouse){
	return isMouse 
    	? 
   	{ x: e.clientX, y: e.clientY } 
     	: 
    { x: e.originalEvent.touches[0].pageX, y: e.originalEvent.touches[0].pageY };
}


/**
 * Get Canvas Location 
 * 
 */
export function getCanvasLoc(e, canvas, isMouse) {
	e.preventDefault(e); 

	let loc, 
		bbox = canvas.getBoundingClientRect();
	
	if (isMouse) 
		return [{ 
			x: e.clientX - bbox.left * (canvas.width / bbox.width),
  		    y: e.clientY - bbox.top * (canvas.height / bbox.height) 
  		}];

	else {
		let touches = e.originalEvent.touches,
			arr = [];
		for (var i=0; i<touches.length; i++) 
			if (touches[i].target.id == 'canvas')
				arr.push({ x: touches[i].pageX, y: touches[i].pageY });

		return arr; 
	}
}


/**
 * Scale down value 
 * scalar - max value of the new resolution 
 */
export function scaleValue(value, max, scalar) {
	return ~~((value*100/max) * scalar * .01) ;
}


/**
 * Translate HSV to RGB+hex 
 *  
 */
export function hsv2rgb(h, s, v) {
    var H, X, C, r=0, g=0, b=0, m, hex;
	C = v / 100 * s / 100;
	m = (v / 100) - C;
    H = h / 60;
	X = C * (1 - Math.abs(H % 2 - 1));
	if (H >= 0 && H < 1){
        r = C;	g = X;
	} else if (H >= 1 && H < 2) {
        r = X;	g = C;
    } else if (H >= 2 && H < 3) {
        g = C;	b = X;
	} else if (H >= 3 && H < 4) {
		g = X;  b = C;
	} else if (H >= 4 && H < 5) {
        r = X;	b = C;
	} else {
		r = C;	b = X;
	}
    r = ~~((r + m) * 255); 
	g = ~~((g + m) * 255);
    b = ~~((b + m) * 255);
    hex = (r * 65536 + g * 256 + b).toString(16,6);
    if(hex.length < 6)
	   for(var i=0, l=6-hex.length; i<l; i++)
			hex = '0'+hex;
	
    return {
        r: r,
		g: g,
		b: b,
		hex: hex
	}
};