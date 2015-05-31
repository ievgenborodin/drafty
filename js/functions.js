$(function(){
/*  ////    VARIABLES   //// */
var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    saveImg = document.getElementById('saveImg'),
    lenx=0,leny=0, x0=0, y0=0,
    radius1=0, radius2=0, radius=0, 
    tool = '',
    draw = false, color = 'black', size=1, loc, loc0,
    inputText='',
    undo = $('#undo').off("click").addClass('disabled'), undoIndex = 0,
    redo = $('#redo').off("click").addClass('disabled'),
    tools = $('.tool-cols > div');
    
/*  ////    SAVE SURFACE func   /// */    
saveSurface = function() {
    surface = context.getImageData(0,0,canvas.width,canvas.height);
};   
    
/*  ////    RESTORE SURFACE func   /// */    
restoreSurface = function() {
    context.putImageData(surface, 0, 0);
};

/* ///   Collisions     ////  */
collides = function(a, b) {
    return a.x < b.x + b.xn && a.x > b.x &&
        a.y < b.y + b.yn && a.y > b.y;
};

/*	/////    WINDOW TO CANVAS	///// */
wtc = function(canvas, x, y) {
	var bbox = canvas.getBoundingClientRect();
	return { x: x - bbox.left * (canvas.width / bbox.width),
			y: y - bbox.top * (canvas.height / bbox.height)
	};
};
    
/*   BACKGROUND as acts[0]  */    
setTimeout(function(){
acts.push(Object.create(Act).params("box", "white", 0, 0, 0, canvas.width, canvas.height, true));    
acts[0].draw(canvas,context);
}, 0);    
    
/*  ////////////////////   EVENTS   ///////////////////////// */
/*  ///     TOOL buttons    /// */
tools.on('click',function(){
    canvas.style.display = 'block';
    saveImg.style.display = 'none';
    tool = $(this).attr('id');
    tools.removeClass("active-tool");
    $(this).addClass("active-tool");
});

/*  ///     SAVE button     /// */
$('#save').on('click',function(){
    tools.removeClass("active-tool");
    $(this).addClass("active-tool");
    $.post("save.php", {
        data: canvas.toDataURL("image/png")
    }, function (file) {
        window.location.href =  "download.php?path=" + file
    });
});
    
/*  ////    UNDO    ////   */
undo.on('click', function(e){
    context.clearRect(0, 0, canvas.width, canvas.height);
    for(var i=0; i < undoIndex; i++){
        acts[i].draw(canvas, context);
    }
    undoIndex--;
    if (undoIndex === 0){
        $(this).off("click").addClass('disabled');    
    }
    redo.on("click").removeClass('disabled');
});
    
/*  ////    REDO    ////   */
redo.on('click', function(e){
    undoIndex++;
    undo.on("click").removeClass('disabled');
    
    context.clearRect(0, 0, canvas.width, canvas.height);
    for(var i=0; i < undoIndex; i++){
        acts[i].draw(canvas, context);
    }
    
    if (undoIndex >= acts.length){
        $(this).off("click").addClass('disabled');    
    }   
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
    inputText += String.fromCharCode(e.which);
    
    if (tool==='text'){
        restoreSurface();
        context.fillText(inputText, loc0.x, loc0.y); 
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
 	draw = true;
    context.strokeStyle = color;
    context.fillStyle = color;
    switch (tool) {
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
            if (acts.length > 0){
                for(var i=acts.length-1; i>=0; i--){
                    if (collides(loc0, acts[i])){
                        if (acts[i].tool === 'box'){
                            acts.push(Object.create(Act).params(acts[i].tool, color, 1, acts[i].x + acts[i].size*0.5, acts[i].y + acts[i].size*0.5, acts[i].xn - acts[i].size, acts[i].yn-acts[i].size, true));
                        }
                        else if (acts[i].tool === 'circle'){
                            acts.push(Object.create(Act).params(acts[i].tool, color, 1, acts[i].x, acts[i].y, acts[i].radius , true));
                        }
                        else if (acts[i].tool === 'star'){
                            acts.push(Object.create(Act).params(acts[i].tool, color, size, acts[i].x, acts[i].y, acts[i].radius-acts[i].size));
                        }
                        acts[acts.length-1].draw(canvas, context);
                        break;
                    } 
                }
            }  else {     
                context.fillRect(0,0,canvas.width,canvas.height);
            }
            break;
        case 'box':
        case 'circle':
        case 'line':
        case 'brush':
            acts.push(Object.create(Act).params(tool, color, size, loc0.x, loc0.y));
            saveSurface();
            break;
        case 'text':
            inputText = '';
            context.font = (size*2)+10 + "px sans-serif";
            
            saveSurface();
		    break;
    }
    context.beginPath();     
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
        context.strokeStyle = color;
        context.lineWidth = size;
        context.fillStyle = color;    
        switch (tool){
            case 'brush': 
                context.fillRect(loc.x - size/2, loc.y - size/2, size,size); 
                acts[acts.length-1].dots.push(new Dot(loc.x, loc.y));
                acts
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
                
            lenx=Math.abs(lenx);
            leny=Math.abs(leny); 
            
            restoreSurface();
            context.strokeRect(x0,y0,lenx,leny);
                break;
            case 'circle':
            radius1 = Math.abs(loc.x - loc0.x);
            radius2 = Math.abs(loc.y - loc0.y);
            radius = (radius1-radius2>=0) ? radius1 : radius2;
            restoreSurface();
            context.beginPath();
            context.arc(loc0.x, loc0.y, radius, 0, Math.PI*2);
            context.stroke();
                break;
            case 'line':
                restoreSurface();
            context.beginPath();
            context.moveTo(loc0.x, loc0.y);
            context.lineTo(loc.x, loc.y);
            context.stroke();
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
    switch (tool) {
        case 'box':
            restoreSurface();
            acts[acts.length-1].xn = lenx;
            acts[acts.length-1].yn = leny;
            acts[acts.length-1].draw(canvas, context);
            undoIndex++;
            break;
        case 'circle':
            restoreSurface();
            acts[acts.length-1].radius = radius;
            acts[acts.length-1].draw(canvas, context);
            undoIndex++;
            break;
        case 'line':
            restoreSurface();
            acts[acts.length-1].xn = loc.x;
            acts[acts.length-1].yn = loc.y;
            acts[acts.length-1].draw(canvas, context);
            undoIndex++;
            break;
        case 'brush':
        case 'pencil':
            undoIndex++;
            break;
    }
    if (acts.length > 0){
        undo.on("click").removeClass('disabled');
    }
    loc = {};
    loc0 = {};
    radius1 = radius2 = radius = 0;
    lenx = leny = 0;
}

$('#canvas').attr('width', $('#edit-right').width() ).attr('height', $('#edit-right').width()/1.25 );    
});