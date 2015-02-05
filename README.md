KS Front End Framework
======================

This Framework uses jquery 1.11.2 and the nicolas gallagger/ johnathan neal normalize css. Both of which are saved as dependencies in bower.json 

Contains some basic css which are normally used in all projects. The form validator is made of a core.js and a validationRules.js. Both are required. All validation is made in seperate plugins. The core only check for constraint in the validationRules and call the appropriate strategy plugin.