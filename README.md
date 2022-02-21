# middleware
For use with FreeAPS X.

You can copy and paste into FAX, but at your own risk, so please be careful!

Telegram group for interaction and sharing:
https://t.me/middleware_freeaps_x


---------------------------------------
<B> Chris_formula_autosensRatio.js </B>

Chris' formula for <I>dynamic ISF=277700 / (TDD * BG)</I> is currently a challange to implement it in <B>FreeAPS X</B> (FAX) via middlware file due to missing TDD info in FAX.

Thus, it has been created an experimental formula by replacing <B>TDD</B> with <B>autosensRatio</B> resulting in the following formula: <I>dISF=277700 / (adjustableFactor * autosensRatio * BG)</I>. Autosens Ratio value is visible in <I>FAX > Settings > Insulin Sensitivities</I>. 

As autosens' typical values are between 0.7 and 1.2 (the limits are adjusted with preference settings autosens MAX/MIN), it has been added an <B>adjustableFactor</B> for tuning the formula. It's recommended to start with <B>adjustableFactor = 25</B>. Lower number = milder dynamic ISF profile.

In order to identify the optimal value of adjustableFactor, it has been created a simulation file <B>Variable ISF simulation.numbers</B> to simulate the dynamic ISF curve vs static ISF. AutosensRatio should be equal to 1. 

<B>Please note that this is an experimental approach, so be careful and use it at your own risk!</B>

---------------------------------------
<B> Chris_with_calculated_TDD.js </B>

This is for testing. It calculates past 24 hours of total daily dose (TDD) of insulin from pumphistory-24h-zoned.json every loop, for use with Chris Wilson's formula. Autosens min/max settings are respected. WHen using a high temp target (>= 117 mg/dl) toghether with an exercise setting, Chris' formula is turned off (as well as AutoISF, if this is used).

In order to use this middleware you first need to make the pump history accessible to FreeAPS X. This requires a commit from my freeaps/pumphistory branch. 

<B>Please do not change TDD = 0, because that will result in doubling your TDD, since it counts from 0. Please note that the TDD calculation has only been tested with Omnipod and are not yet handling all corner cases. </B>

---------------------------------------
