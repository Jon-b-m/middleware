function middleware(iob, currenttemp, glucose, profile, autosens, meal, reservoir, clock, pumphistory, preferences, basalprofile, oref2_variables) {
  //Turn on or off
  var useSigmoid = true;
  const useDynCR = true;

  const myGlucose = glucose[0].glucose;
  const minimumRatio = profile.autosens_min;
  const maximumRatio = profile.autosens_max;
  var exerciseSetting = false;
  const target = profile.min_bg;
  const adjustmentFactor = profile.adjustmentFactor;
  
  // Guards
  if (minimumRatio == maximumRatio) {
     useSigmoid = false;
  }
  if (profile.high_temptarget_raises_sensitivity || profile.exercise_mode || oref2_variables.isEnabled) {
    exerciseSetting = true;
  }
  if (target >= 118 && exerciseSetting) {
      useSigmoid = false;
  }

  // Sigmoid Function
  if (useSigmoid) {  
      const minimumRatio = profile.autosens_min;
      const maximumRatio = profile.autosens_max;
      const ratioInterval = maximumRatio - minimumRatio;

      //Blood glucose deviation from set target (the lower BG target) converted to mmol/l to fit current formula. 
      const deviation = (myGlucose - target) * 0.0555;
      // Use Autosense as a factor
      const autosensRatio = autosens.ratio;
      var max_minus_one = maximumRatio - 1;
      // Avoid division by 0
      if (maximumRatio == 1) {
          max_minus_one = maximumRatio + 0.01 - 1;
      } 
     //Makes sigmoid factor(y) = 1 when BG deviation(x) = 0.
     const fix_offset = (Math.log10(1/max_minus_one-minimumRatio/max_minus_one) / Math.log10(Math.E));
     //Exponent used in sigmoid formula
     const exponent = deviation * adjustmentFactor * autosensRatio + fix_offset;

     // The sigmoid function
     var sigmoidFactor = ratioInterval / (1 + Math.exp(-exponent)) + minimumRatio;
       
     //Respect min/max ratios
     sigmoidFactor = Math.max(Math.min(maximumRatio, sigmoidFactor), sigmoidFactor, minimumRatio);

      // Sets the new ratio
     autosens.ratio = sigmoidFactor;

     var log = "Middleware adjusted ISF by ratio of " + sigmoidFactor;

     //Sets the new CR
     if (useDynCR) {
        profile.carb_ratio /= sigmoidFactor;
        log += ". Middleware adjusted CR by ratio of " + sigmoidFactor;
     }
     return log;
  }
}
