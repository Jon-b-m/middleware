# middleware
For use with FreeAPS X.

You can copy and paste into FAX, but at your own risk, so please be careful!

Telegram group for interaction and sharing:
https://t.me/middleware_freeaps_x


---------------------------------------
<B> Chris_formula_autosensRatio.js </B>

Chris' formula for <I>dynamic ISF=277700 / (TDD * BG)</I> is currently a challange to implement it in <B>FreeAPS X</B> (FAX) via middlware file due to missing TDD info in FAX.

Thus, it has been created an experimental formula by replacing TDD with autosensRatio resulting in the following formula: <I>dISF=277700 / (adjustableFactor * autosensRatio * BG)</I>. Autosens Ratio value is visible in <I>FAX > Settings > Insulin Sensitivities</I>. 

As autosens' typical values are between 07 to 1.2 (the limits are adjusted with preferences settings autosens MAX/MIN), it has been added an adjustableFactor for tuning the formula. It's recommended to start with adjustableFactor = 25. Lower number = milder dynamic ISF profile.

In order to identify the optimal value of adjustableFactor, it has been created a simulation file <B>Variable ISF simulation.numbers</B> to simulate the dynamic ISF curve vs static ISF. AutosensRatio should be equal with 1. 

<B>Please note that this is an experimental approach, so be careful and use it at your onw risk!</B>

---------------------------------------
