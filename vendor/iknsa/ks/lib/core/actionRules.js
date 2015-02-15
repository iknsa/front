// actionRules.js ------------------------------------------

// Required by the core.js to create rules. Each rule defined is
// checked by the core for constraints defined in the concerning
// field. Then the core dispatches each rule to the appropriate
// strategy. All strategies are functions whose name must follow
// the following format "ks_strategy_" + validationRule 
// 
// Each strategy is a plugin. Be sure to have the plugin in case
// of undefined function.

actionRules = ["max", "min", "maxlength", "required",
                   "email", "digits", "currency", "date", "time", "firstCapital", "toggleSlide"];
ks_init('#search', actionRules);
ks_init('.breadcrumb', actionRules);
ks_init('.toggleSlide', actionRules);
