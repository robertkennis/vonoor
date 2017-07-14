var Index = {};

var rotINT,pulseINT;
var Rs=[],Ps=[];
var shapes=["#shape1","#shape2","#shape3","#shape4","#shape5"];
var circles=["#circle1","#circle2","#circle3","#circle4"];

$(".banner-img").on('load',function(){
    //alert("FINISHED");
});

$(document).ready(
    function(){
    
        $(".logo").animate({'opacity':1},3000);
        $(".banner-img").animate({'opacity':1},3000);
        
        for(var i=0;i<circles.length;i++){
            var val=[$(circles[i]).width(),$(circles[i]).width()*1.2,$(circles[i]).width(),0,true];
            Ps.push(val);
            console.log(Ps[i]);
        }
        
        for(var i=0;i<shapes.length;i++){
            Rs.push(0);
        }
        
        clearInterval(pulseINT);
        for(var i=0;i<circles.length;i++)
           pulseINT=setInterval("startPulsing("+i+")",70);
        
        clearInterval(rotINT);
        for(var i=0;i<shapes.length;i++)
            rotINT=setInterval("startRotate("+i+")",20);
        
        
});

function startPulsing(i)
{
    var circle=$(circles[i]);
    var incrementing=Ps[i][4];
    
    if(incrementing){
        Ps[i][2]++;
        //Ps[i][3]--;
        circle.width(Ps[i][2]);
//        circle.css('top',Ps[i][3]);
//        circle.css('left',Ps[i][3]);
        if(Ps[i][2]>=Ps[i][1])
            Ps[i][4]=false;
    }
    else{
        Ps[i][2]--;
        //Ps[i][3]++;
        circle.width(Ps[i][2]);
//        circle.css('top',Ps[i][3]);
//        circle.css('left',Ps[i][3]);
        if(Ps[i][2]<=Ps[i][0])
            Ps[i][4]=true;
    }
    
}

function startRotate(i)
{
    var triangle=$(shapes[i]);
    Rs[i]=Rs[i]-1;
    triangle.css('transform',"rotate(" + Rs[i] + "deg)");
    triangle.css('webkitTransform',"rotate(" + Rs[i] + "deg)");
    triangle.css('OTransform',"rotate(" + Rs[i] + "deg)");
    triangle.css('MozTransform',"rotate(" + Rs[i] + "deg)");
    if (Rs[i]===360){
        Rs[i]===0;
    }
}