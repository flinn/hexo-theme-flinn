(function(e){e.fn.jqEye=function(t){function r(e,t,n,r){var i={x:e,y:t};if(e>n/2)i.x=n/2;if(e<-n/2)i.x=-n/2;if(t>r/2)i.y=r/2;if(t<-r/2)i.y=-r/2;return i}function i(e,t,n){var r={x:e,y:t};if(e*e+t*t>n*n){if(e!==0){var i=t/e;r.x=Math.sqrt(n*n/(i*i+1));r.x=e>0?r.x:-r.x;r.y=Math.abs(i*r.x);r.y=t>0?r.y:-r.y}else{r.y=t>0?n:-n}}return r}function s(e,t,n,r){var i={x:e,y:t};if(e*e/(n*n)+t*t/(r*r)>1){if(e!==0){var s=t/e;i.x=Math.sqrt(1/(1/(n*n)+s*s/(r*r)));i.x=e>0?i.x:-i.x;i.y=Math.abs(s*i.x);i.y=t>0?i.y:-i.y}else{i.y=t>0?r:-r}}return i}function o(e,t,n,s,o){var u={x:e,y:t};var a=n/2-o;var f=s/2-o;if(Math.abs(e)>a&&Math.abs(t)>f){var l=i(Math.abs(e)-a,Math.abs(t)-f,o);u.x=e>0?l.x+a:-(l.x+a);u.y=t>0?l.y+f:-(l.y+f)}else{u=r(e,t,n,s)}return u}var n=e.extend({shape:"circle",radius:20,width:40,height:40},t);return this.each(function(){var t=e(this);var u=e(this).position().left+e(this).width()/2;var a=e(this).position().top+e(this).height()/2;var f=e(this).offset().left+e(this).width()/2;var l=e(this).offset().top+e(this).height()/2;e(document).mousemove(function(e){var c=e.clientX;var h=e.clientY;var p=c-f;var d=h-l;if(n.shape==="rectangle"){var v=r(p,d,n.width,n.height);p=v.x;d=v.y}if(n.shape==="circle"){var m=i(p,d,n.radius);p=m.x;d=m.y}if(n.shape==="ellipse"){var g=s(p,d,n.width/2,n.height/2);p=g.x;d=g.y}if(n.shape==="rounded rectangle"){var y=o(p,d,n.width,n.height,n.radius);p=y.x;d=y.y}p=p+u-t.width()/2;d=d+a-t.height()/2;t.css({left:p,top:d})})});}})($);
$(document).ready(function() {

  $("#bioseyes div.pupil").jqEye({shape: "circle", radius:3});
  
  $( window ).resize(function() {
     $("#bioseyes div.pupil").removeAttr('style');
     $("#bioseyes div.pupil").jqEye({shape: "circle", radius:3});
  });

  var biosClicks = 0;
  var barkAudio = new Audio('/audio/bark.mp3');
  var playing = false;

  $('#bios').click(function() {        
      $('#bios').addClass('animated pulse');
      if (!playing) {
        barkAudio.play();
        playing = true;
      }
      setTimeout(function() {
        $('#bios').removeClass('animated pulse');
        playing = false;
      }, 1000);
  });

});
