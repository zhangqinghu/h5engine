import Engin from './lib/Engin.js';
import Circle from './lib/Circle.js';
import DrawLayout from './lib/DrawLayout.js';
import Bitmap from './lib/Bitmap.js';
import MovieClip from './lib/MovieClip.js';

let canvas = document.getElementById("can")
let eng = new Engin(canvas);



var circle1 = new Circle(canvas,100,250,40);
var circle2 = new Circle(canvas,500,150,40);
var circle3 = new Circle(canvas,0,400,40);

eng.addChild(circle1);
eng.addChild(circle2);
eng.addChild(circle3);

//
var drawLayout = new DrawLayout(canvas);
drawLayout.init();
eng.addChild(drawLayout);


var bmp=null;

var img = new Image();
img.src = "assets/images/pic.jpg";    
img.onload = function(){        
   bmp = new Bitmap(canvas,img,200, 300); 	   
   eng.addChild(bmp);        
};




function go(){
	circle3.x = circle3.x+1;
	if(circle3.x>800)circle3.x=0;i
	if(bmp){
		bmp.y+=1;
		if(bmp.y>600)bmp.y=100;
	}
	eng.update();
	requestAnimationFrame(go);
}

requestAnimationFrame(go);










var imgArr=[];

for(var i=1;i<=35;i++){
	var img2 = new Image();
	img2.onload = function(){
		imgArr.push(this);
		if(imgArr.length == 35 ){
			console.log('ok..');

			var mc = new MovieClip(canvas,imgArr,0,0,0 );
			mc.play();
			eng.addChild(mc);  
		}
	}
	if(i < 10){
		img2.src = "assets/images/frame/movie000"+i+".png";
	}else if(i>=10 && i<100){
		img2.src = "assets/images/frame/movie00"+i+".png";
	}else{
		img2.src = "assets/images/frame/movie0"+i+".png";
	}
}


