function middleware(iob, currenttemp, glucose, profile, autosens, meal, reservoir, clock) {
 	
	const BG = glucose[0].glucose;
	// To turn off change to false
	var chrisFormula = true;
	// Change to your own TDD
	const TDD = 58;
	const currentMinTarget = profile.min_bg;
  	const minLimitChris = profile.autosens_min;
	const maxLimitChris = profile.autosens_max;
	const adjustmentFactor = 1;
	var exerciseSetting = false;
	var log = "";
	
	// Checks if an exercise mode is on
 	if (profile.high_temptarget_raises_sensitivity == true || profile.exercise_mode == true) {
		exerciseSetting = true;
	}
	
  	// Turns off AutoISF when using Chris's formula
  	if (chrisFormula == true && profile.use_autoisf == true) {
    		profile.use_autoisf = false;
  	}
  
	// Turn off Chris' formula and AutoISF when using a temp target >= 118 (6.5 mmol/l) and if an exercise setting is enabled.
	if (currentMinTarget >= 118 && exerciseSetting == true) {
		chrisFormula = false;
		profile.use_autoisf = false;
		log = "Chris' formula off due to a high temp target/exercising. Current min target: " + currentMinTarget;
	}   
  
	if (chrisFormula == true && TDD > 0) {
		var newRatio = profile.sens / (277700 / (adjustmentFactor  * TDD * BG));
		log = "New ratio using Chris' formula is " + newRatio.toPrecision(4) + " with ISF: " + (profile.sens / newRatio).toPrecision(4) + ". TDD past 24h is: " + TDD;

		// Respect autosens.max and autosens.min limits
		if (newRatio > maxLimitChris) {
			newRatio = maxLimitChris;
			log = "Chris' formula hit limit by autosens_max setting: " + maxLimitChris + ". ISF: " + (profile.sens / newRatio).toPrecision(4);
		} else if (newRatio < minLimitChris) {
			newRatio = minLimitChris;
			log = "Chris' formula hit limit by autosens_min setting: " + minLimitChris + ". ISF: " + (profile.sens / newRatio).toPrecision(4);
		  }

		// Set the new ratio
    		autosens.ratio = newRatio;
	
		return log;
	} else { return "Chris' formula is disabled." }	
}
