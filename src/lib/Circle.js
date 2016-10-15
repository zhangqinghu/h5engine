class Circle{
	constructor(canvas, x, y, radius){
		this.ctx = canvas.getContext('2d');
		this._x = x;
		this._y = y;
		this.radius = radius;

		//这里的占位矩形，自行计算
		this.rectangle = {x:x,y:y, width:radius*2,height:radius*2}; 


	}

	draw(){
		this.ctx.beginPath();
		//this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
		//这里使用圆的左上角作为 0点坐标，而不使用中心
		this.ctx.arc(this._x+this.radius, this._y+this.radius, this.radius, 0, Math.PI*2, true);
		this.ctx.closePath();
		this.ctx.fillStyle = 'green';
		this.ctx.fill();
	}

	handleClick(mouse){
        if (this.rectangle.x < mouse.x && 
            this.rectangle.x + this.rectangle.width > mouse.x && 
            this.rectangle.y < mouse.y && 
            this.rectangle.y + this.rectangle.height > mouse.y) {            		
            return true; 
        }     
        return false; 
	}

	


	get x() {  
        return this._x;  
    };  
    set x(val) {
        this._x = this.rectangle.x = val;  
    }; 
    
    get y() {  
        return this._y;  
    };  
    set y(val) {
        this._y = this.rectangle.y = val;  
    };

    toString(){
    	return "[Circle]";
    }

  	
}

export default Circle;