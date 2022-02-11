function middleware(iob, currenttemp, glucose, profile, autosens, meal, reservoir, clock) {
	const hours = clock.getHours();

	//enable SMB with High Targets at night and disable after 6am
	var nightlySMBHT = true;
	var reasonSMBHT = "Nightly SMB with HighTarget-Logic disabled. ";

	// Turn SMB`s with High targets on during nights
	if (nightlySMBHT=true) {
		if (hours >= 0 && hours <= 6) {
			profile.allowSMB_with_high_temptarget = true;
			reasonSMBHT = "SMB with HT enabled due to nighttime. "
		}else{
			profile.allowSMB_with_high_temptarget = false
			reasonSMBHT = "SMB with HT disabled due to daytime. "
		}
	}
	// end function and supply log output
	return `${reasonSMBHT}`
}