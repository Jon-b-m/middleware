function middleware(iob, currenttemp, glucose, profile, autosens, meal, reservoir, clock) {
//define BG  
  const BG = glucose[0].glucose;
//enable or disable dISF (Chris Formula)
  const dISF = true;
//define autosensRatio 
  var autosensRatio = autosens.ratio;
//define adjustableFactor, middle point is 25. Lower number = milder dISF profile
  var adjustableFactor = 45;
 
  if (dISF == true) {
 const newRatio = profile.sens / (277700  / (adjustableFactor * autosensRatio * BG));
  autosens.ratio = newRatio;
  return "New ratio using Chris' formula is " + newRatio + " with ISF: " + profile.sens / newRatio + ". autosensRatio is: " + autosensRatio;
 } else  { return "Chris' formula is off. autosensRatio is: " + autosensRatio; }
}
