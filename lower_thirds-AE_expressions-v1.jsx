{
"circumferenceFromDiameter" : function() {
delay = (1/25)*13; 
trigger = thisComp.layer("trigger");
if (trigger.marker.numKeys > 0){ // if marker available
  m = trigger.marker.nearestKey(time).index;
  if (trigger.marker.key(m).time +delay > time){m--;}} // m = current step
if (m == 0  || m == trigger.marker.numKeys){m = 0} else {m = 100} // Opacity 0 bevor marker #1 and after last marker
return m;
}

}





/* 
delay = (1/25)*13; 
trigger = thisComp.layer("trigger");
if (trigger.marker.numKeys > 0){ // if marker available
  m = trigger.marker.nearestKey(time).index;
  if (trigger.marker.key(m).time +delay > time){m--;}} // m = current step
if (m == 0  || m == trigger.marker.numKeys){m = 0} else {m = 100} // Opacity 0 bevor marker #1 and after last marker
m

*/