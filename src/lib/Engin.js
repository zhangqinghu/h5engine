class Engin{
	constructor(canvas){
		this.displayObject = new Array();
		this.ctx = canvas.getContext('2d');

		//获取canvas边距
		this.canvasPosition = {	x: canvas.offsetLeft, y: canvas.offsetTop };

		this.isSupportTouch = "ontouchend" in document ? true : false;
		this.eventName = this.isSupportTouch ? 'touchstart' : 'click'; 

		canvas.addEventListener(this.eventName, (e)=>{
			this.touchStartHandler(e);
		});


	}



  	//整个canvas点击处理
	touchStartHandler (e){
		var position = this.getPosition(e);	
		for (var i=0; i < this.displayObject.length; i++) { 
			var hitTest = this.displayObject[i].handleClick(position); 
			console.log(this.displayObject[i].x,this.displayObject[i].y, position.x,position.y);
			if (hitTest) { 
				//这里抛出事件，传出被点击的对象
				alert("点了"+this.displayObject[i].toString());
			}		
		}
		/*对游戏对象数组进行排序,从最顶层开始往下找 碰撞gameObject(x, y, zIndex, width, height) 
		for (var i=0; i < sortedGameObjectArray.length; i++) { 
			var hitTest = sortedGameObjectArray[i].onclick(mouse); 			
			// stop as soon as one hit test succeeds 
			if (hitTest) { 
				break; // break out of the hit test 
			} 
		}*/
		return false; 
	}

	//规范化鼠标和触摸事件
	getPosition(e) { 
		var position = {x: null, y: null}; 		
		if (this.isSupportTouch) { 	
			if (e.touches && e.touches.length > 0) { 
				position.x = e.touches[0].pageX - this.canvasPosition.x; 
				position.y = e.touches[0].pageY - this.canvasPosition.y; 
			} 
		} 
		else { 
			position.x = e.pageX - this.canvasPosition.x; 
			position.y = e.pageY - this.canvasPosition.y; 
		}     
		return position; 
	}

	addChild(obj){		
		this.displayObject.push(obj);		
	}
	removeChild(){
		
	}

	update(){
		this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);		
		for(var i in this.displayObject){
			//刷新所有显示对象,暂无深度概念		
			this.displayObject[i].draw();

			//console.log(this.displayObject[i]);
		}
	}
	

	toString(){
    	return "[Engin]";
    }
}

export default Engin;