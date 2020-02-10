{
"LTanimCircleOpac" : function(t) {
var	delay = (1/25)*13; 
trigger = thisComp.layer("trigger");
if (trigger.marker.numKeys > 0){ // if marker available
	m = trigger.marker.nearestKey(t).index;
  if (trigger.marker.key(m).time + delay > t){m--;}} // m = current step
if (m == 0  || m == trigger.marker.numKeys){opac = 0} else {opac = 100} // Opacity 0 bevor marker #1 and after last marker
return opac;
},
"StrokeOpac" : function(t) {
	// only visible for 13 (?) frame animation
trigger = thisComp.layer("trigger");
if (trigger.marker.numKeys > 0){ // if marker available
  m = trigger.marker.nearestKey(t).index;
  if (trigger.marker.key(m).time > t){m--;}} // m = current step
if (t>=thisComp.layer("trigger").marker.key(1).time){
  animStart = thisComp.layer("trigger").marker.key(m).time;
opac = thisComp.layer("animation").transform.opacity.valueAtTime(t-animStart);
} else {opac = 0;}
return opac;
},
"StepNumber" : function(t) {
delay = (1/25)*13; 
trigger = thisComp.layer("trigger");
if (trigger.marker.numKeys > 0){ // if marker available
  m = trigger.marker.nearestKey(t).index;
  if (trigger.marker.key(m).time +delay > t){m--;}} // m = current step
if (m == 0){m = " "} // text layer empty bevor marker #1
return m;
},
"AnimScale" : function(t) {
trigger = thisComp.layer("trigger");
if (trigger.marker.numKeys > 0){ // if marker available
  m = trigger.marker.nearestKey(t).index;
  if (trigger.marker.key(m).time > t){m--;}} // m = current step
if (t>=thisComp.layer("trigger").marker.key(1).time){ //animation starts with the first marker
  animStart = thisComp.layer("trigger").marker.key(m).time; //animation starts at the current marker
size = thisComp.layer("animation").transform.scale.valueAtTime(t-animStart)[1]; // animation from layer "animation" with time offset 
} else {size = 0;}
var sizeArr = [size,size]

return sizeArr;
},
"CircleTrim": function(t) {
delay = (1/25)*22; // waits for circle animation
trigger = thisComp.layer("trigger");
if (trigger.marker.numKeys > 0){ // if marker available
  m = trigger.marker.nearestKey(t).index;
  if (trigger.marker.key(m).time > t){m--;}} // m = current step
if (t >= trigger.marker.key(1).time && t <= trigger.marker.key(trigger.marker.numKeys).time) { // do nothing bevor marker 1 and last marker
start = trigger.marker.key(m).time+delay;
end = trigger.marker.key(m+1).time
circle_trim = (t-start) * (100/(end-start));
// var circle_trim = linear (t, trigger.marker.key(m).time+delay, trigger.marker.key(m+1).time, 0, 100) // linear transition between 0 and 100, starts at current marker and ends at next marker
} else { circle_trim = 0 }
return circle_trim;
}


}




// footage("lower_thirds-AE_expressions.jsx").sourceData.LTanimCircleOpac()

/* 
delay = (1/25)*13; 
trigger = thisComp.layer("trigger");
if (trigger.marker.numKeys > 0){ // if marker available
  m = trigger.marker.nearestKey(time).index;
  if (trigger.marker.key(m).time +delay > time){m--;}} // m = current step
if (m == 0  || m == trigger.marker.numKeys){m = 0} else {m = 100} // Opacity 0 bevor marker #1 and after last marker
m

*/