var acts = [],
    
    Dot = function (x, y) {
        this.x = x;
        this.y = y;
    },
    
    Act = {
    params: function(){
        this.tool = arguments[0];
        this.color = arguments[1];
        this.size = parseInt(arguments[2]);
        switch (this.tool) {
            case 'line':
                this.x = arguments[3] || 0;
                this.y = arguments[4] || 0;
                this.xn = arguments[5] || 0;
                this.yn = arguments[6] || 0;
                break;
            case 'box':
                this.x = arguments[3] || 0;
                this.y = arguments[4] || 0;
                this.xn = arguments[5] || 0;
                this.yn = arguments[6] || 0;
                this.fill = arguments[7] || false;
                break;
            case 'circle':
                this.x = arguments[3] || 0;
                this.y = arguments[4] || 0;
                this.radius = arguments[5] || 0;
                this.fill = arguments[6] || false;
                break;
            case 'brush':
                this.x = arguments[3] || 0;
                this.y = arguments[4] || 0;
                this.dots = [];
                break;
        }
        return this;
    },
    draw: function(canvas, context){
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
        }
    }
};