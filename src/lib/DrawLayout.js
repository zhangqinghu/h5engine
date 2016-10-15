class DrawLayout{
	

	constructor(canvas){
		this.ctx = canvas.getContext('2d');
		this.canvas = canvas;

		this.isDraw = false;
		this.lastX = 0;
		this.lastY = 0;
		this.x = 0;
		this.y = 0;
		
		this.temp = new Array();



		this.graphicsData = new Array();
		
	}
	init(){
		this.graphicsData = new Array();
		this.canvas.addEventListener('touchstart', (e)=>{
			e.preventDefault(); 
			this.touchStart(e);			
		}, false);
		this.canvas.addEventListener('touchmove', (e)=>{
			e.preventDefault(); 
			this.touchMove(e);			
		}, false);
		this.canvas.addEventListener('touchEnd', (e)=>{
			e.preventDefault();
			this.touchEnd(e);			
		} , false);
	}


	touchStart(e){
		this.isDraw = true;
		this.temp = new Array();		
		this.temp.push({x:e.touches[0].clientX - $(this.canvas).offset().left, y:e.touches[0].clientY - $(this.canvas).offset().top});
		this.graphicsData.push(this.temp);
	}
	touchMove(e){
		if (this.isDraw) {
			this.temp.push({x:e.touches[0].clientX - $(this.canvas).offset().left, y:e.touches[0].clientY - $(this.canvas).offset().top});
		}
	}
	touchEnd(e){
		this.isDraw = false;		
	}
	
	
	draw(){		
		for(var i=0;i<this.graphicsData.length;i++){			
			for(var j=0;j<this.graphicsData[i].length;j++){
				if(j > 0){
					this.ctx.beginPath();
					this.ctx.strokeStyle = "red";
					this.ctx.lineWidth = 2;
					this.ctx.lineJoin = "round";
					
					this.ctx.moveTo(this.lastX, this.lastY);
					this.ctx.lineTo(this.graphicsData[i][j].x, this.graphicsData[i][j].y);
					this.ctx.closePath();
					this.ctx.stroke();
					
				}
				this.lastX = this.graphicsData[i][j].x;
				this.lastY = this.graphicsData[i][j].y;	
			}
		}
	}

	handleClick(mouse){		     
        return false; 
	}

  
}

export default DrawLayout;