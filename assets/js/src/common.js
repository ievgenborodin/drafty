/**
 * Set Canvas Size
 * 
 */
export function setCanvasSize(ui, settings) {
	let data = ui.context.getImageData(0,0, canvas.width, canvas.height);
	let w = window.innerWidth;
	if (settings.manualMode)
		w -= 50;
	ui.canvas.attr('width', w + 'px').attr('height', window.innerHeight + 'px');
	ui.context.putImageData(data, 0, 0);
	ui.context.lineCap = "round";
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
	return getObjectLoc(e, canvas, isMouse, 'canvas');
}

/**
 * Get Object Location 
 * 
 */
export function getObjectLoc(e, object, isMouse, id) {
	e.preventDefault(e); 

	let loc, 
		bbox = object.getBoundingClientRect();

	if (isMouse) 
		return [{ 
			x: e.clientX - bbox.left * (~~object.width / bbox.width),
  		    y: e.clientY - bbox.top * (~~object.height / bbox.height) 
  		}];

	else {
		let touches = e.originalEvent.touches,
			arr = [];
		for (var i=0; i<touches.length; i++) 
			if (touches[i].target.id == id)
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


/**
 * Clear screen
 * 
 */
export function clrscr(ui, settings) {
	ui.context.fillStyle = "#fff";
	ui.context.fillRect(0,0, ui.canvas[0].width, ui.canvas[0].height);
	ui.context.fillStyle = settings.color;
}



export function setColor(ui, color) {
	if ( ! ui.currentColor)
		return 

	//ui.currentColor.css({borderColor: color});
	ui.currentColor.css({background: color});
}