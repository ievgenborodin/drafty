$(function(){
/*  ////    VARIABLES   //// */
var canvas = $('#canvas'),
    context = canvas[0].getContext('2d'),
    undo = $('#undo').addClass('disabled'),        
    redo = $('#redo').addClass('disabled'),
    tools = $('.tool-cols > div'),
    tinyText = $('#tiny-text'),
    undoIndex = 0,
    lenx=0,leny=0, x0=0, y0=0,
    radius1=0, radius2=0, radius=0, 
    tool = '',
    draw = false, color = '#f00', size=1, loc, loc0,
    inputText='',
    modLink=0, textFont,
    imageSV = $('#pickerBG'), 
    cursorSV = $('#pointerBG'), 
    imageH = $('#pickerColor'),
    cursorH = $('#pointerColor'), 
    imageSVwidth = imageSV.width(),
    imageSVheight = imageSV.height(),
    imageHheight = imageH.height(),
    colorSpot = $('.colorSpot'), 
    colorHash = $('#colorHash'),
    result = imageSV.css('background-color'),
    locHue = {x: 0, y: 0}, 
    locSaVa ={x: imageSVwidth, y: 0}, 
    h = 359, s = 100, v =100, r=255, g=0, b=0, hex= 0xff0000,
    editRight = $('#edit-right'),
    editLeft = $('#edit-left'),
    header = $('#header');
    window.mousedown = 0;
    

/*	SCREEN STATE	*/
function screenState(){
	width = window.innerWidth;
	height = window.innerHeight;
    if (width<768)
        editRight.innerHeight(height - header.innerHeight() - editLeft.innerHeight() + 'px');
    else if (width >= 768 && width < 1300)
        editRight.innerHeight(height - header.innerHeight() + 'px');
    else 
        editRight.innerHeight(editLeft.innerHeight() + 'px');
    canvas.attr('width', editRight.width()-2 + 'px').attr('height', editRight.height()-6 + 'px');
    imageSVwidth = imageSV.width();
    imageSVheight = imageSV.height();
    imageHheight = imageH.height();
}    
screenState();  

/* ///   Collisions     ////  */
inObject = function(cur, obj) {
    var collide = false;
    if (obj.figure){
        switch (obj.tool) {
            case 'box':
            case 'background':
               collide = cur.x < obj.x + obj.xn && cur.x > obj.x &&
            cur.y < obj.y + obj.yn && cur.y > obj.y; 
                break;
            case 'circle':
                collide = obj.radius > Math.sqrt(Math.pow((obj.x - cur.x),2)+Math.pow((obj.y - cur.y),2));
                break;
            case 'text':
                console.log("text width = "+obj.x + context.measureText(obj.puts).width + ", text height = " + obj.y + obj.size);
               collide = cur.x < obj.x + context.measureText(obj.puts).width && cur.x > obj.x && cur.y < obj.y + obj.size && cur.y > obj.y; 
                break;
        }
    }
    return collide;
};

/*  ///     Message     ////  */    
message = function(textParam, timeParam){
    var divMessage = $('#message'),
        textMessage = textParam || "You can't move background!",
        timeMessage = timeParam || 1000;
    divMessage.html(textMessage).show();
    setTimeout(function(){
        divMessage.hide();                    
    }, timeMessage);
} 
        
/* ///   RE-RENDER acts     ////  */
reRender = function() {
    /* inactive mods */
    for (var i=acts.length-1; i>0; i--)
        if(!acts[i].figure && !acts[i].active && acts[i].link !== undefined)
            if (acts[i].link.active)
                acts[i].draw(context);
    /* active mods */
    for (var i=1; i<acts.length; i++)
        if(!acts[i].figure && acts[i].active && acts[i].link !== undefined)
            if (acts[i].link.active)
                acts[i].draw(context);
    /* figures */
    for (var i=0; i<acts.length; i++)
        if(acts[i].figure && acts[i].active)
            acts[i].draw(context);
}
  
/* ////     MODS kings function  //// */
modsKing = function(king){
    for(var i = 0; i<undoIndex; i++)
        if (!acts[i].figure)
            if (acts[i].tool === king.tool)
                if (king.link.id === acts[i].link.id)
                    acts[i].active = false;    
}

/*	/////    WINDOW TO CANVAS	///// */
wtc = function(canvas, x, y) {
	var bbox = canvas.getBoundingClientRect();
	return { x: x - bbox.left * (canvas.width / bbox.width),
			y: y - bbox.top * (canvas.height / bbox.height)
	};
};

    
outData = function(H, S, V, R, G, B, Hex){
	h = H;   s = S;   v = V; 
    r = R;   g = G;   b = B; 
    hex = Hex;  
    switch (arguments.length){
        case 9:
            locSaVa.y = arguments[7];
            locSaVa.x = arguments[8];
            break;
        case 8:
            locHue.y = arguments[7];
            imageSV.css('background-color', '#'+hsv2rgb(h,100,100).hex);
            break;
        case 10:
            locHue.y = arguments[7];
            locSaVa.y = arguments[8];
            locSaVa.x = arguments[9];
    		imageSV.css('background-color', '#'+hsv2rgb(h,100,100).hex);
            break;
    }
	colorHash.val(hex);
    colorSpot.css('background-color', '#'+hex);
    cursorH.css({top: locHue.y+'px'});
    cursorSV.css('top', locSaVa.y + 'px').css('left', locSaVa.x + 'px');  
    color = "#"+hex;
};    
    
/* ///   HSV - TO - RGB      //// */
hsv2rgb = function(h, s, v){
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
    r = Math.floor((r + m) * 255); 
	g = Math.floor((g + m) * 255);
    b = Math.floor((b + m) * 255);
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

/*  /////     RGB - TO - HSV     /////  */    
rgb2hvs = function(r, g, b, hex){
    var h, s, v, m, M, c, hy, sy, vx;
    r /= 255;
	g /= 255;
	b /= 255;
	M = Math.max(r, g, b);
	m = Math.min(r, g, b);
	c = M - m;
	if (c == 0) h = 0;
	else if (M == r) 
        h = (((g - b) / c) % 6) * 60;
	else if (M == g) 
        h = ((b - r) / c + 2) * 60;
	else 
        h = ((r - g) / c + 4) * 60;
	if (h < 0) 
        h += 360;
	v = M * 100;
    s = (!M) ? 0 : (c / M * 100);
    
    return {
        h: h.toFixed(0),
        s: s.toFixed(0),
        v: v.toFixed(0),
        hy: imageHheight - Math.floor(imageHheight * h / 360),
        sy: imageSVheight - Math.floor(imageSVheight * s / 100),
        vx: Math.floor(imageSVwidth * v / 100)
    }
};
    
/*  ////////////////////   EVENTS   ///////////////////////// */
/*  ///     TOOL buttons    /// */
$(window).resize(screenState);    
    
tools.on('click',function(){
    tool = $(this).attr('id');
    tools.removeClass("active-tool");
    $(this).addClass("active-tool");
    if (tool === 'save'){
        $.post("html/save.php", {
            data: canvas[0].toDataURL("image/png")
        }, function (file) {
            window.location.href =  "html/download.php?path=" + file
        });
    }
    else if (tool === 'text')
       tinyText.show(); 
    else 
        tinyText.hide();
});

/* ////     Console check   ///// */   
$('#chk').on('click', function(){
    console.log("Undo Index = "+ undoIndex);
});    
    
    
/*  ////    UNDO    ////   */
undo.on('click', function(e){    
    acts[undoIndex].active = false;
    
    /*  code before   */
    if (undoIndex > 0){
        --undoIndex;
        redo.removeClass('disabled');
        acts[undoIndex].active = true;
    } 
    if (undoIndex === 0)
        $(this).addClass('disabled');
    
    reRender();
});
    
/*  ////    REDO    ////   */
redo.on('click', function(e){
    
    if (undoIndex < acts.length-1){
        undoIndex++;
        undo.removeClass('disabled');
    }
    if (undoIndex === acts.length-1)
        $(this).addClass('disabled');
    /*  code below   */
    acts[undoIndex].active = true;
    
    reRender();
});    

var pHolder = $('#divPickerHolder'),
    pGreyIsh = $('#greyIsh'),
    doc = $(document);
$('#color').on('click', function(){
    pGreyIsh.height(doc.height());
    pGreyIsh.css('display', 'block');
    pHolder.css('display', 'block');
});
    
    
pHolder.css('display', 'none');    
$('#btnOk').on('click', function(){
    pGreyIsh.css('display', 'none');
    pHolder.css('display', 'none');
});    
    
/*  SIZE CHANGE  */    
$('#size').change(function(){
    size = $(this).val();
});        
    
/*  KEY INPUT PRESS    */
document.onkeypress = function(e){  
    if (tool==='text'){
        acts[acts.length-1].puts += String.fromCharCode(e.which);
        reRender();
    }
}
    
/*  ////   DOWN     /// */ 
canvas.on('touchstart', function(e) { 
 	e.preventDefault(e); 
 	 loc0 = wtc(canvas[0],e.originalEvent.touches[0].pageX,e.originalEvent.touches[0].pageY); 
 	  
 	downEvents();
 });
 canvas.on('mousedown', function(e) { 	
 	e.preventDefault(e); 
 	 loc0 = wtc(canvas[0],e.clientX,e.clientY); 
 	  
 	 downEvents();
 });
  
function downEvents(){
 	if (acts.length === 0){
        /*   BACKGROUND as acts[0]  */      
        acts[0] = Object.create(Act).params(true, "background", "white", 0, 0, 0, canvas[0].width, canvas[0].height, true);
    }
    draw = true;
    redo.addClass('disabled');
    context.strokeStyle = color;
    context.fillStyle = color;
    acts.length = undoIndex + 1;
    switch (tool) {
        case 'hand':
            for(var i=acts.length-1; i>=0; i--){
                if (i && inObject(loc0, acts[i])){
                    undoIndex++;
                    modLink = acts[undoIndex] = Object.create(Act).params(false, tool, acts[i]);
                    break; 
                }
                if (!i){
                    message();
                }
            }
            break;
        case 'star':
            context.lineWidth = 1;
            context.beginPath();
            for(var j=0; j<10; j++){
                context.moveTo(loc0.x, loc0.y);
                context.lineTo(loc0.x-size*3+Math.random()*size*6, loc0.y-size*3+Math.random()*size*6);
            };
            context.stroke();
            break;
        case 'bucket':
            for(var i=acts.length-1; i>=0; i--){
                if (inObject(loc0, acts[i])){
                    undoIndex++;
                    acts[undoIndex] = Object.create(Act).params(false, tool, acts[i], acts[i].color, color);
                    modsKing(acts[undoIndex]);                    
                    break; 
                }
            }
            reRender();
            break;
        case 'box':
        case 'circle':
        case 'line':
        case 'brush':
            ++undoIndex;
            acts[undoIndex] = Object.create(Act).params(true, tool, color, size, loc0.x, loc0.y);
            break;
        case 'text':
            undoIndex++;
            textFont = size * 2 + 10;
            acts[undoIndex] = Object.create(Act).params(true, tool, color, textFont, loc0.x, loc0.y);
            tinyText.val('').css({ fontSize: textFont, fontFamily: "sans-serif", left: loc0.x, top: loc0.y - textFont}).focus();
		    break;
    }
}
    

/*  ////   MOVE     /// */ 
canvas.on('touchmove', function(e) { 
 	e.preventDefault(e); 
 	 loc = wtc(canvas[0],e.originalEvent.touches[0].pageX,e.originalEvent.touches[0].pageY); 
 	  
 	moveEvents();
 });
 canvas.on('mousemove', function(e) { 	
 	e.preventDefault(e); 
 	 loc = wtc(canvas[0],e.clientX,e.clientY);
 	  
 	 moveEvents();
 });

function moveEvents(){
    if (draw){
        switch (tool){
            case 'hand':
                if (modLink!==0){
                    modLink.x = loc.x;
                    modLink.y = loc.y;
                    reRender();
                }
                break;
            case 'brush': 
                context.fillRect(loc.x - size/2, loc.y - size/2, size,size); 
                acts[acts.length-1].dots.push(new Dot(loc.x, loc.y));
                break;
            case 'pencil':
                context.beginPath();
                //context.moveTo(loc0.x, loc0.y);
                //context.lineTo(loc.x, loc.y);
                context.arc(loc.x, loc.y, size/2, 0, Math.PI*2);
                context.fill();
                //loc0 = loc;
                break;
            case 'eraser':
                context.clearRect(loc.x - size/2, loc.y - size/2, size,size); 
                break;
            case 'box':
                lenx = loc.x - loc0.x;
                leny = loc.y - loc0.y;
                acts[acts.length-1].x = x0 = (lenx >=0) ? loc0.x : loc0.x + lenx;
                acts[acts.length-1].y = y0 = (leny >=0) ? loc0.y : loc0.y + leny;
                acts[acts.length-1].xn = lenx=Math.abs(lenx);
                acts[acts.length-1].yn = leny=Math.abs(leny);    
                context.fillRect(loc0.x, loc0.y, lenx, leny);
                console.log(loc0.x +' '+ loc0.y +' '+ loc.x +' '+ loc.y +' '+ lenx +' '+ leny );
                reRender();
                break;
            case 'circle':
                radius1 = Math.abs(loc.x - loc0.x);
                radius2 = Math.abs(loc.y - loc0.y);
                acts[acts.length-1].radius = radius = (radius1-radius2>=0) ? radius1 : radius2;
                reRender();
                break;
            case 'line':
                acts[acts.length-1].xn = loc.x;
                acts[acts.length-1].yn = loc.y;
                reRender();
                break;
        }
    }
}

    
/*  ////   UP     /// */ 
canvas.on('touchend', function(e) { 
 	e.preventDefault(e);
   
 	upEvents();
});

canvas.on('mouseup', function(e) { 	
 	e.preventDefault(e);
      
 	 upEvents();
});

function upEvents(){
    draw = false;
    if (tool === 'hand')
        modsKing(modLink); 
    if (undoIndex > 0)
        undo.removeClass('disabled');
    loc = {};
    loc0 = {};
    radius1 = radius2 = radius = 0;
    lenx = leny = 0;
    modLink = 0;
}

/*  /////   DOWN     ////// */ 
imageH.on('touchstart', function(e) { 
 	e.preventDefault(e); 
    locHue = wtc(imageH[0],e.originalEvent.touches[0].pageX,e.originalEvent.touches[0].pageY); 
 	downHue();
 });
 imageH.on('mousedown', function(e) { 	
 	e.preventDefault(e); 
 	locHue = wtc(imageH[0],e.clientX,e.clientY); 
    downHue();
 });
downHue = function(){
    h = Math.floor((imageHheight - locHue.y) / imageHheight * 360);
    h = (h < 0) ? 0 : (h>=360) ? 359 : h;
    temp = hsv2rgb(h,s,v);
    outData(h, s, v, temp.r, temp.g, temp.b, temp.hex, locHue.y);
}

imageSV.on('touchstart', function(e) { 
 	e.preventDefault(e); 
    locSaVa = wtc(imageSV[0],e.originalEvent.touches[0].pageX,e.originalEvent.touches[0].pageY); 
 	downSaVa();
 });
imageSV.on('mousedown', function(e) { 	
 	e.preventDefault(e); 
 	locSaVa = wtc(imageSV[0],e.clientX,e.clientY); 
    downSaVa();
 });
downSaVa = function(){
    s = Math.floor((imageSVheight - locSaVa.y) / imageSVheight * 100);
    v = Math.floor(locSaVa.x / imageSVwidth * 100);
    s = (s < 0) ? 0 : (s>100) ? 100 : s;
    v = (v < 0) ? 0 : (v>100) ? 100 : v;
	temp = hsv2rgb(h, s, v);
    outData(h, s, v, temp.r, temp.g, temp.b, temp.hex, locSaVa.y, locSaVa.x);
}



 /*  ///////   MOVE     /////// */ 
imageH.on('touchmove', function(e) { 
 	e.preventDefault(e); 
    locHue = wtc(imageH[0],e.originalEvent.touches[0].pageX,e.originalEvent.touches[0].pageY); 
 	moveHue();
 });

$(window).on('mousedown mouseup', function(e) {
    this.mousedown = (e.type === 'mousedown') ? 1 : 0;
});    
    
imageH.on('mousemove', function(e) { 	
 	e.preventDefault(e); 
    locHue = (window.mousedown) ? wtc(imageH[0],e.clientX,e.clientY) : locHue; 
    moveHue();
 });
    
moveHue = function(){
    h = Math.floor((imageHheight - locHue.y) / imageHheight * 360);
    h = (h < 0) ? 0 : (h>=360) ? 359 : h;
    temp = hsv2rgb(h,s,v);
    outData(h, s, v, temp.r, temp.g, temp.b, temp.hex, locHue.y);
}

imageSV.on('touchmove', function(e) { 
 	e.preventDefault(e); 
    locSaVa = wtc(imageSV[0],e.originalEvent.touches[0].pageX,e.originalEvent.touches[0].pageY); 
 	moveSaVa();
 });
imageSV.on('mousemove', function(e) { 	
 	e.preventDefault(e);
    locSaVa = (window.mousedown) ? wtc(imageSV[0],e.clientX,e.clientY) : locSaVa;
    moveSaVa();
 });
moveSaVa = function(){
    s = Math.floor((imageSVheight - locSaVa.y) / imageSVheight * 100);
    v = Math.floor(locSaVa.x / imageSVwidth * 100);
    s = (s < 0) ? 0 : (s>100) ? 100 : s;
    v = (v < 0) ? 0 : (v>100) ? 100 : v;
	temp = hsv2rgb(h, s, v);
    outData(h, s, v, temp.r, temp.g, temp.b, temp.hex, locSaVa.y, locSaVa.x);
} 

/*  ////////   UP     /////// */ 
imageH.on('touchend', function(e) { 
 	e.preventDefault(e);
 	tmpLocHue = 0;
 });
    
imageSV.on('touchend', function(e) { 
 	e.preventDefault(e);
 	tmpLocSaVa = 0;
 });
    

    
/*  COLOR CHANGE  */
colorHash.blur(function(){
    var hex = $(this).val(),
        tmp;
    switch (hex.length){
        case 6:
            r = parseInt(hex.substr(0,2), 16);
            g = parseInt(hex.substr(2,2), 16);
            b = parseInt(hex.substr(4,2), 16);
            tmp = rgb2hvs(r, g, b, hex);
            outData(tmp.h, tmp.s, tmp.v, r, g, b, hex, tmp.hy, tmp.sy, tmp.vx);
            break;
        case 3:
            r = parseInt(hex.substr(0,1), 16);
            g = parseInt(hex.substr(1,1), 16);
            b = parseInt(hex.substr(2,1), 16);
            tmp = rgb2hvs(r, g, b, hex);
            outData(tmp.h, tmp.s, tmp.v, r, g, b, hex, tmp.hy, tmp.sy, tmp.vx);
            break;
    }
});
});