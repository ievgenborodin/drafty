var acts = [],
    idCount = 0,
    
    Dot = function (x, y) {
        this.x = x;
        this.y = y;
    },
    
    Act = {
    params: function(){
        this.figure = arguments[0];
        this.active = true;
        if (this.figure){
            this.id = idCount++;
            this.tool = arguments[1];
            this.color = arguments[2];
            this.size = parseInt(arguments[3]);
            this.x = arguments[4] || 0;
            this.y = arguments[5] || 0;
            switch (this.tool) {
                case 'line':
                    this.xn = arguments[6] || 0;
                    this.yn = arguments[7] || 0;
                    break;
                case 'box':
                case 'background':
                    this.xn = arguments[6] || 0;
                    this.yn = arguments[7] || 0;
                    this.fill = arguments[8] || false;
                    break;
                case 'circle':
                    this.radius = arguments[6] || 0;
                    this.fill = arguments[7] || false;
                    break;
                case 'brush':
                case 'pencil':
                    this.dots = [];
                    break;
                 case 'text':
                    this.ff = arguments[6] || 0;
                    this.puts = '';
                    break;
            }
        }
        else {
            this.mod = arguments[1];
            this.link = arguments[2];
            switch (this.mod) {
                case 'bucket':
                    this.exColor = arguments[3];
                    this.exFill = arguments[2].fill;
                    this.color = arguments[4];
                    this.fill = true;
                    break;
                case 'hand':
                    this.exX = arguments[2].x;
                    this.exY = arguments[2].y;
                    this.x = arguments[3] || 0;
                    this.y = arguments[4] || 0;
                    break;
            }
        }
        return this;
    },
    
    draw: function(canvas, context){
        if (this.figure && this.active){
            context.strokeStyle = this.color;
            context.lineWidth = this.size;
            context.fillStyle = this.color;
            switch (this.tool) {
                case 'line':
                    context.beginPath();
                    context.moveTo(this.x,this.y);
                    context.lineTo(this.xn, this.yn);
                    context.stroke();
                    break;
                case 'box':
                    if (this.fill)
                        context.fillRect(this.x, this.y, this.xn, this.yn);
                    else
                        context.strokeRect(this.x, this.y, this.xn, this.yn);
                    break;
                case 'background':
                    context.fillRect(this.x, this.y, this.xn, this.yn);
                    break;
                case 'circle':
                    context.beginPath();
                    context.arc(this.x, this.y, this.radius, 0, Math.PI*2);
                    if (this.fill)
                        context.fill();
                    else
                        context.stroke();
                    break;
                case 'brush':
                    context.fillRect(this.x - this.size/2, this.y - this.size/2, this.size, this.size); 
                    for(var dot in this.dots){
                        context.fillRect(dot.x - this.size/2, dot.y - this.size/2, this.size, this.size); 
                    }
                    break;
                 case 'text':
                    context.font = this.size + "px sans-serif"; //+ this.ff;
                    context.fillText(this.puts, this.x, this.y); 
                    break;
            }
        }
        else {
            switch (this.mod) {
                case 'bucket':
                    if (this.active){
                        this.link.color = this.color;
                        this.link.fill = this.fill;
                    }
                    else {
                        this.link.color = this.exColor;
                        this.link.fill = this.exFill;
                    }
                    this.link.draw(canvas, context);
                    break;
                case 'hand':
                    if (this.active){
                        this.link.x = this.x;
                        this.link.y = this.y;
                    }
                    else {
                        this.link.x = this.exX;
                        this.link.y = this.exY;
                    }
                    break;
                    this.link.draw(canvas, context);
            }
        }
    }
};