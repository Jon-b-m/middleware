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
  return "autosensRatio changed using Chris' formula from " + autosensRatio + " to: " + newRatio.toPrecision(4) + " with new ISF: " +  (profile.sens / newRatio).toPrecision(4) + " (" + ((profile.sens / newRatio) * 0.0555).toPrecision(4) + " mmol/L/U)";
 } else  { return "Chris' formula is off. autosensRatio is: " + autosensRatio; }
}
