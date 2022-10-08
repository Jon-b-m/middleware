function middleware(iob, currenttemp, glucose, profile, autosens, meal, reservoir, clock, pumphistory, preferences, basalprofile, tdd, tdd_averages) {

    function round(value, digits) {
        if (! digits) { digits = 0; }
        var scale = Math.pow(10, digits);
        return Math.round(value * scale) / scale; 
    }

    // Change to false if you don't want to use sigmoid ISF adjustment anymore. Sigmoid ISF will not be used when dynamic ISF setting is on. 
    const enable_sigmoid = true;
    // Is dynamic ISF enabled?
    const dyn_enabled = profile.enableChris;
    const current_bg = glucose[0].glucose;
    const as_min = profile.autosens_min;
    const autosens_interval = profile.autosens_max - as_min;
    
    //Blood glucose deviation from set target (the lower BG target) converted to mmol/l to fit current formula. 
    const bg_dev = (current_bg - profile.min_bg) * 0.0555;
    // Account for TDD of insulin. Compare last 2 hours with total data (up to 14 days)
    const tdd_factor = tdd_averages.weightedAverage / tdd_averages.average_total_data;
    // Reduce to make less aggressive
    const adjustment_factor = profile.adjustmentFactor;
    const max_minus_one = profile.autosens_max - 1;
    //Makes sigmoid factor(y) = 1 when BG deviation(x) = 0.
    const fix_offset = (Math.log10(1/max_minus_one-as_min/max_minus_one) / Math.log10(Math.E));
    //Exponent used in sigmoid formula
    const exponent = bg_dev * adjustment_factor * tdd_factor + fix_offset;
    
    const sigmoid_factor = autosens_interval / (1 + Math.exp(-exponent)) + as_min;
    

    //Only use when dynISF is off and enable_sigmoid = true.
    if (enable_sigmoid && !dyn_enabled) { 
        // Replace the autosens.ratio with this calculation
        autosens.ratio = sigmoid_factor;
        const new_isf = profile.sens/autosens.ratio;
        return "Using Middleware function, the autosens ratio has been adjusted with sigmoid factor to: " + round(autosens.ratio, 2) + ". New ISF = " + round(new_isf, 2) + " mg/dl (" + round(0.0555 * new_isf, 2) + " (mmol/l)";
    } else { return "Nothing changed"; }
    
}
