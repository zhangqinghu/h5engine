class MovieClip{

	/*
	canvas     画布
	imgArr     img数组
	x
	y
	rotation   旋转
	loopCount  循环次数
	callBack   播放完成回调
	*/
	constructor(canvas, imgArr, x, y, rotation, loopCount, callBack){
		this.ctx = canvas.getContext('2d');
		this._img_arr= imgArr;
		this.x = x;
		this.y = y;
		this.rotation = rotation;
		
		this._tempTimer = 0;
		this._isPlaying = false;        
		this._frameId = 0;  
		  
		this.loopCount = loopCount || -1;//循环次数
		this._tempCount = 0;//当前的循环次数，用来计数
		this._callBackFun = callBack || null;
		
		//这里的占位矩形，自行计算
		this.rectangle = {x:x,y:y, width:this._img_arr[0].width,height:this._img_arr[0].height}; 

	}


	//播放方法			
	play(){
		this._isPlaying = true;
	}
	//停止
	stop(){
		this._isPlaying = false;
	}
	 
	//循环绘制图片
	draw(){
		 if(this._isPlaying){
			 if(this._tempTimer++ > 1){
				this._tempTimer=0;		
			 }
			 if(this._tempTimer == 0){
				//console.log("draw",this._tempTimer);	
				if(this._frameId < this._img_arr.length-1){
					this._frameId++;
				}else{
					this._tempCount++;
					this._frameId= 0;
				}
			}			 
		 }
		 
		
		 
		this.ctx.save();//保存状态
		this.ctx.translate(this.x, this.y);//设置画布上的(0,0)位置，也就是旋转的中心点
		this.ctx.rotate(this.rotation*Math.PI/180);
		
		var pic = this._img_arr[this._frameId];		
		this.ctx.drawImage(pic, 0, 0);//上面translate坐标了，这里就直接00就好了
		//this.ctx.drawImage(pic, this.x, this.y);	
		this.ctx.scale(3,3);
		this.ctx.restore();//恢复状态
		
		//完成播放动作判断
		if(this.loopCount != -1 && this._tempCount == this.loopCount){
			this._tempCount = 0;
			this.stop();
			typeof this._callBackFun == "function" &&  this._callBackFun();
		}
		 
	}
	 
	 //这个简易点击不支持旋转
	handleClick(mouse){
		if (this.rectangle.x < mouse.x && 
		    this.rectangle.x + this.rectangle.width > mouse.x && 
		    this.rectangle.y < mouse.y && 
		    this.rectangle.y + this.rectangle.height > mouse.y) {            		
		    return true; 
		}     
		return false;
	}

	

	



  	
}

export default MovieClip;