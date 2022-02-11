function middleware(iob, currenttemp, glucose, profile, autosens, meal, reservoir, clock) {
 	
	const BG = glucose[0].glucose;
	var chrisFormula = true;
	const TDD = 58;
	const minLimitChris = profile.autosens_min;
	const maxLimitChris = profile.autosens_max;
	const adjustmentFactor = 1;
	const currentMinTarget = profile.min_bg;
	var exerciseSetting = false;
	var logOutput = "";
	
	if (profile.high_temptarget_raises_sensitivity == true || profile.exercise_mode == true) {
		exerciseSetting = true;
	}
	
	// Turn off AutoISF and Chris' formula when using a temp target >= 118 (6.5 mol/l) and if an exercise setting is enabled.
	if (currentMinTarget >= 118 && exerciseSetting == true) {
		// Uncoment line below if using AutoISF
		// profile.use_autoisf = false;
		chrisFormula = false;
		logOutput = "Chris' formula off due to a high temp target/exercising. Current min target: " + currentMinTarget;
	} 

	if (chrisFormula == true && TDD > 0) {
		var newRatio = profile.sens / (277700 / (adjustmentFactor  * TDD * BG));
		logOutput = "New ratio using Chris' formula is " + newRatio.toPrecision(4) + " with ISF: " + (profile.sens / newRatio).toPrecision(4) + ". TDD past 24h is: " + TDD;

		// Respect autosens.max and autosens.min limits
		if (newRatio > maxLimitChris) {
			newRatio = maxLimitChris;
			logOutput = "Chris' formula hit limit by autosens_max setting: " + maxLimitChris + ". ISF: " + (profile.sens / newRatio).toPrecision(4);
		} else if (newRatio < minLimitChris) {
			newRatio = minLimitChris;
			logOutput = "Chris' formula hit limit by autosens_min setting: " + minLimitChris + ". ISF: " + (profile.sens / newRatio).toPrecision(4);
		  }

		// Set the new ratio
    		autosens.ratio = newRatio;
	
		return logOutput;
	} else { return "Chris' formula is disabled." }	
}
