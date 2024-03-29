# middleware
For use with FreeAPS X.

Normally you can copy and replace the FAX middleware function, but some of the MWs here require a special branch.

To access middleware on your phone, first enable debug settings.

![image](https://user-images.githubusercontent.com/53905247/168448905-c0a948b2-c4e3-49a6-8218-081d30e7610c.jpeg)


Then replace the MW here:


![image](https://user-images.githubusercontent.com/53905247/168448911-4cb870d8-f458-42ec-b1f8-c551334ea7ab.jpeg)




Please be careful and monitor your BG closely. 


Telegram group for interaction and sharing:
https://t.me/middleware_freeaps_x

---------------------------------------
<B>Dynamic_ISF_with_calculated_TDD.js </B>

THIS MW IS OUTDATED. I NOW HAVE A bdb BRANCH INSTEAD WITH LOTS OF IMPROVEMENTS.

Calculates past 24 hours of total daily dose (TDD) of insulin from pumphistory-24h-zoned.json every loop. If not enough data in pump history (<23.5 h), your scheduled basal rate insulin will replace the missing hours. But normally if you've run FAX for 24 hours, pump history data will be enough.

A new autosens ratio is set using Chris Wilson's formula: newRatio = profile.sens * adjustmentFactor * TDD * BGG / 277700 .
profile.sens: your ISF in profile.
Your new ISF = profile.sens / newRatio .

Autosens min/max settings are respected, for me 0.7 - 1.3 works well. This middleware by-passes the normal autosens, unless when using a high temp target while exercising, and the autosens limits are instead used for limiting the dynamic ISF. 

When using a high temp target (>= 118 mg/dl) together with an exercise setting, Chris' formula is temporarily turned off. 

adjustmentFactor is used for tuning of the constant 277700 in Chris Wilson's formula. More  dramatic ISF change > 1 > less dramtaic ISF change. 1 is set as default. 

<B>Please do not change TDD = 0, because that will result in doubling your TDD, since it counts from 0. </B>


---------------------------------------                                                                                                           
<B>dynRatios.js </B>

THIS MW IS OUTDATED. I NOW HAVE A bdb BRANCH INSTEAD WITH LOTS OF IMPROVEMENTS.

Like Dynamic_ISF_with_calculated_TDD.js but with access to FAX preferences, which means the adjustment factor and a toggle to enable/disable Chris' formula can be set in FAX preferences.

With optional Dynamic CR and logarithmic formula and TDD output in FreeAPS X pop up (the blue and purple boxes).

<B>Only works with my branch "dynRatios" </B>
  
--------------------------------------- 
<B>dISF_autosensRatio.js </B>

Chris' formula for <I>dynamic ISF=277700 / (TDD * BG)</I> is currently a challange to implement it in <B>FreeAPS X</B> (FAX) via middlware file due to missing TDD info in FAX.

Thus, it has been created an experimental formula by replacing <B>TDD</B> with <B>autosensRatio</B> resulting in the following formula: <I>dISF=277700 / (25 * adjustableFactor * autosensRatio * BG)</I>. Autosens Ratio value is visible in <I>FAX > Settings > Insulin Sensitivities</I>. 

As autosens' typical values are between 0.7 and 1.2 (the limits are adjusted with preference settings autosens MAX/MIN), it has been added an <B>adjustableFactor</B> for tuning the formula. It's recommended to start with <B>adjustableFactor = 1</B>. Lower number = milder dynamic ISF profile.

In order to identify the optimal value of adjustableFactor, it has been created a simulation file <B>Variable ISF simulation.numbers</B> to simulate the dynamic ISF curve vs static ISF. AutosensRatio should be equal to 1. 

<B>Please note that this is an experimental approach, so be careful and use it at your own risk!</B>

---------------------------------------
<B>bdb_branch.js </B> 
 
THIS MW IS OUTDATED. I NOW HAVE A bdb BRANCH INSTEAD WITH LOTS OF IMPROVEMENTS.

-----------------------------------------------------------------------
<B>sigmoid_function.js </B>

This MW uses a sigmoid function for ISF. The autosens.min/max limits determines the height of the graph (Y-interval) and where the sigmoid curve flattens out. The Adjustment settings adjusts the slope of the curve. A lower value ==> less steep. Is only used when the Dynamic ISF setting is off in FAX settings. Dyanmic CR is used when the setting 'Enable Dynamic CR' is enabled in FAX setting. 

To have access to these settings you'll have to use my bdb branch: https://github.com/Jon-b-m/freeaps/tree/bdb

-----------------------------------------------------------------------

Want to buy me a coffe? My PayPal is jon.m@live.se (Sweden, Europe)
