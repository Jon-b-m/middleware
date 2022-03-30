# middleware
For use with FreeAPS X.

You can copy and paste (replace) into FAX middleware function, but at your own risk, so please be careful!
To access middleware on your phone, first enable debug settings.

Telegram group for interaction and sharing:
https://t.me/middleware_freeaps_x


---------------------------------------
<B>Dynamic_ISF_with_calculated_TDD.js </B>

Calculates past 24 hours of total daily dose (TDD) of insulin from pumphistory-24h-zoned.json every loop for use with Chris Wilson's formula. 

Autosens min/max settings are respected, for me 0.7 - 1.3 works well. This middleware by-passes the normal autosens, unless when using a high temp target while exercising, and the autosens limits are instead used for limiting the dynamic ISF. 

When using a high temp target (>= 118 mg/dl) together with an exercise setting, Chris' formula is temporarily turned off (as well as AutoISF, if this is used). 

adjustmentFactor is used for tuning of the constant 277700 in Chris Wilson's formula. More  dramatic ISF change > 1 > less dramtaic ISF change. 1 is set as default. 

In order to use this middleware you first need to have the pump history accessible to FreeAPS X. This requires use of Ivan's dev branch.

<B>Please do not change TDD = 0, because that will result in doubling your TDD, since it counts from 0. This middleware requires 24 hours of pump history data for an accurate TDD count. Middleware will only run if >= 23 hours of pumphistory data. TDD calculation has only been tested with Omnipod.</B>


---------------------------------------                                                                                                           
<B>Dynamic_ISF_with_calculated_TDD_with_preferences.js </B>

Like Dynamic_ISF_with_calculated_TDD.js but with access to FAX preferences, which means the adjustment factor and a toggle to enable/disable Chris' formula can be set in FAX preferences.
  
<B>This middleware only works when you have access to preferences.json and pumphistory-24h-zoned.json in middleware (use my branch mw_preferences). </B>
  
---------------------------------------
<B>Dynamic_ISF_and_CR_and_TDD.js </B>

Like Dynamic_ISF_with_calculated_TDD.js but with optional Dynamic CR in mw and in settings. 

<B>Only works with my branch dyn_ISF_and_CR </B>
  
--------------------------------------- 
<B>Chris_formula_autosensRatio.js </B>

Chris' formula for <I>dynamic ISF=277700 / (TDD * BG)</I> is currently a challange to implement it in <B>FreeAPS X</B> (FAX) via middlware file due to missing TDD info in FAX.

Thus, it has been created an experimental formula by replacing <B>TDD</B> with <B>autosensRatio</B> resulting in the following formula: <I>dISF=277700 / (adjustableFactor * autosensRatio * BG)</I>. Autosens Ratio value is visible in <I>FAX > Settings > Insulin Sensitivities</I>. 

As autosens' typical values are between 0.7 and 1.2 (the limits are adjusted with preference settings autosens MAX/MIN), it has been added an <B>adjustableFactor</B> for tuning the formula. It's recommended to start with <B>adjustableFactor = 25</B>. Lower number = milder dynamic ISF profile.

In order to identify the optimal value of adjustableFactor, it has been created a simulation file <B>Variable ISF simulation.numbers</B> to simulate the dynamic ISF curve vs static ISF. AutosensRatio should be equal to 1. 

<B>Please note that this is an experimental approach, so be careful and use it at your own risk!</B>

---------------------------------------
<B>c_formula_with_conditions.js </B> 
  
 This is Chris' original formula without the TDD calculation. You need to enter your TDD manually in middlware. 
  
 Autosens min/max limits in FAX settings are used to limit the dynamic ISF. Normal autosens is by-passed.
 
 adjustmentFactor to change Chris'constant. I higer value (>1) means more dramatic ISF changes, a lower (<1) means less aggresive changes. 
                                                                                                             

