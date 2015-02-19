CORE.JS
=======

The core.js is a small lib which pricipally does only one thing. It compares a given element (which can be either a class or a property) with a given array("actionRules"). If there is a there is a match, it will call a function depending on the class or property name with two parameters: the class if there is a parameter attached to it and the element's object.

HOW IT WORKS
============

First the core is called like this: 

ks_init(selector, actionRules)

This will retrieve the element's classes and properties of the element. 

For both we can set parameters according to a common convention.

Once we have the classes and properties of the element, we the compares them to our array("actionRules") to check if we need to take care of it.

If the class does not contain a - the class is compared to the elements in our array("actionRules").
If a class contain a - the core will split the class name at the level of the -. The first part will be compared to the array("actionRules") given on initialisation to see if there is a match. (The second part will be our parameter but we'll get to this later on).

We then check for the properties. If the property has a value (since some properties may not have values) and of course we do not take the class property since we are dealing with it seperately. We first check for the property to see if there is a match in our array("actionRules"). If there is a match we will take care of it.

Since now we know which classes and properties we need to take care of, we combine both together and we call their respective function (called strategies).

All functions that must be called by the core.js must start with "ks_strategy_". What follows the "ks_strategy_" must be what we had in our array("actionRules"). All function takes as parameter the parameter from the class/property and the elementObject automatically sent by the core.js

Knowing all this now we can easily imagine the following element: 

<input id="search" class="anything-another" someproperty="propValue">

Our array("actionRules") would contain the following: 

actionRules = ["anything", "someproperty"];

The call to initiate the core.js would be:
ks_init('#search', actionRules);

and our functions (strategies) would be:

ks_strategy_anything(param, elementObject) //Here param would be "another"
{
    // Do something
}
ks_strategy_someproperty(param, elementObject) // Here param would be "propValue"
{
    // Do something else
}