$(function(){
/*  ////    VARIABLES   //// */
var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    undo = $('#undo').addClass('disabled'),        
    redo = $('#redo').addClass('disabled'),
    tools = $('.tool-cols > div'),
    tinyText = $('#tiny-text'),
    undoIndex = 0,
    lenx=0,leny=0, x0=0, y0=0,
    radius1=0, radius2=0, radius=0, 
    tool = '',
    draw = false, color = 'black', size=1, loc, loc0,
    inputText='',
    modLink=0, textFont;
    
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
        
/* ///   reRender object     ////  */
reRender = function() {
    for (var i=1; i<acts.length; i++)
        if(!acts[i].figure && acts[i].active)
            acts[i].draw(canvas, context);
    for (var i=0; i<acts.length; i++)
        if(acts[i].figure && acts[i].active)
            acts[i].draw(canvas, context);
}
    
/*	/////    WINDOW TO CANVAS	///// */
wtc = function(canvas, x, y) {
	var bbox = canvas.getBoundingClientRect();
	return { x: x - bbox.left * (canvas.width / bbox.width),
			y: y - bbox.top * (canvas.height / bbox.height)
	};
};

/*  ////////////////////   EVENTS   ///////////////////////// */
/*  ///     TOOL buttons    /// */
tools.on('click',function(){
    tool = $(this).attr('id');
    tools.removeClass("active-tool");
    $(this).addClass("active-tool");
    if (tool === 'save'){
        $.post("save.php", {
            data: canvas.toDataURL("image/png")
        }, function (file) {
            window.location.href =  "download.php?path=" + file
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
        //acts[undoIndex].active = true;
        redo.removeClass('disabled');
    } 
    if (undoIndex === 0)
        $(this).addClass('disabled');
    
    reRender();
});
    
/*  ////    REDO    ////   */
redo.on('click', function(e){
    
    if (undoIndex < acts.length-1){
        //acts[undoIndex].active = false;
        undoIndex++;
        undo.removeClass('disabled');
    }
    if (undoIndex === acts.length-1)
        $(this).addClass('disabled');
    /*  code below   */
    acts[undoIndex].active = true;
    
    reRender();
});    
    
/*  COLOR CHANGE  */
$('#color').change(function(){
    color = $(this).val();
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
canvas.ontouchstart = function(e) { 
 	e.preventDefault(e); 
 	 loc0 = wtc(canvas,e.touches[0].pageX,e.touches[0].pageY); 
 	  
 	downEvents();
 }
 canvas.onmousedown = function(e) { 	
 	e.preventDefault(e); 
 	 loc0 = wtc(canvas,e.clientX,e.clientY); 
 	  
 	 downEvents();
 }
  
function downEvents(){
 	if (acts.length === 0){
        /*   BACKGROUND as acts[0]  */      
        acts[0] = Object.create(Act).params(true, "background", "white", 0, 0, 0, canvas.width, canvas.height, true);
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
                    modLink = acts[undoIndex] = Object.create(Act).params(false, tool, acts[i], acts[i].x, acts[i].y);
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
canvas.ontouchmove = function(e) { 
 	e.preventDefault(e); 
 	 loc = wtc(canvas,e.touches[0].pageX,e.touches[0].pageY); 
 	  
 	moveEvents();
 }
 canvas.onmousemove = function(e) { 	
 	e.preventDefault(e); 
 	 loc = wtc(canvas,e.x,e.y);
 	  
 	 moveEvents();
 }

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
canvas.ontouchend = function(e) { 
 	e.preventDefault(e);
    
 	upEvents();
 }
 canvas.onmouseup = function(e) { 	
 	e.preventDefault(e);
     
 	 upEvents();
 }

function upEvents(){
    draw = false;
    if (undoIndex > 0)
        undo.removeClass('disabled');
    loc = {};
    loc0 = {};
    radius1 = radius2 = radius = 0;
    lenx = leny = 0;
    modLink = 0;
}

$('#canvas').attr('width', $('#edit-right').width() ).attr('height', $('#edit-right').width()/1.25 );    
});