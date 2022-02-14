function middleware(iob, currenttemp, glucose, profile, autosens, meal, reservoir, clock) {
 	
	const BG = glucose[0].glucose;
	var chrisFormula = true;
	// Change to your own TDD
  	const TDD = 45;
	const minLimitChris = profile.autosens_min;
	const maxLimitChris = profile.autosens_max;
  	const adjustmentFactor = 1;
	// >= this value Chris' formula will not be used
 	 const bgMaxLimit = 144.14;
	const currentMinTarget = profile.min_bg;
	var exerciseSetting = false;
	var log = "";
	
	
	if (profile.high_temptarget_raises_sensitivity == true || profile.exercise_mode == true) {
		exerciseSetting = true;
	}
	
	// Turn off Chris' formula (and AutoISF, if uncommented) when using a temp target >= 118 (6.5 mol/l) and if an exercise setting is enabled.
	if (currentMinTarget >= 118 && exerciseSetting == true) {
		//profile.use_autoisf = false;
		chrisFormula = false;
		log = "Chris' formula off due to a high temp target/exercising. Current min target: " + currentMinTarget;
	} 

	// Turn off Chris' dynamic ISF when BG > bgMaxLimit 
	if (BG >= bgMaxLimit) {
		chrisFormula = false;
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

		autosens.ratio = newRatio;
	
		return log;
	} else { return "Chris' formula is disabled." }	
}
