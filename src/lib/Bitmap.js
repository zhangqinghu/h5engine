class Bitmap{
	constructor(canvas, img, x, y){
		this.ctx = canvas.getContext('2d');
		this.img = img;
		this._x = x;
		this._y = y;


		//这里的占位矩形，自行计算
		this.rectangle = {x:x,y:y, width:img.width,height:img.height}; 

	}

	draw(){		
		this.ctx.drawImage(this.img, this._x, this._y);
		//drawImage(image, dx, dy);
		//drawImage(image, dx, dy, dw, dh);
		//drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
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
    	return "[Bitmap]";
    }



  	
}

export default Bitmap;