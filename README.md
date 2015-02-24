KS Front End Framework
======================

#This Framework uses jquery 1.11.2 and the nicolas gallagger/ johnathan neal normalize css. Both of which are saved as dependencies in bower.json


Even though some very powerful frameworks exists, one of their problem is that the comes with a lot, and here I really mean a lot of codes that we will never use in our project. If we take for example the bootstrap framework, which is a very good one, his main problem is that it comes with a lot of different which are not used. I have never built a web site which uses more than 50% of twitter bootstrap and I think that if your website uses more than these 50%, either its a very special one or you have a problem in the conception.

Having said this, I must still mention that I love twitter bootstrap and I for some quick small project where performance is not really an issue.

WEB 2.0 with KS Front End Framework
===================================

I have been working for a decent number of companies now and for the last couple of years I've been asked to improve the performance of their websites and every time I have been removing huge libraries which are imported to do some simple basic things. Having spent quite some time doing over and over again what was already done differently with the slight problem that it was not optimized.

I then had the idea to build a framework which keeps your HTML clean and neat without having to add extra divs or too many tags to do simple things.

THE GOAL
========

The point behind all this is to have elements which are totally independent so that the can be reused in other projects without having to bring up whole libraries but just what is needed for a specific part.

HOW TO ACHIEVE THIS GOAL
========================

This goal can be achieved by building each section seperately using the same architecture. For example, for a dock, I built a lib for a specific dock. If someone needs this dock with different configuration, he just needs to change the configurations. If someone else needs to build a different dock, he can modify the original code but should then push it to a new repository so that it becomes a totally different dock. In this way we only develop specific plugin which are totally independent. 

HOW TO AVOID CODE DUPLICATION
=============================

To avoid code duplication, we will be using sass mixins as much as possible such that the code in a mixin can be reused else where if needed. We will also be using as much compass as we can.

For the jquery part, I have designed a core.js which is a basic light factory which has for purpose to get different classes and properties on a page and check them with a predefined array and redirects to a function with a specific name. In this way we make sure that we can reuse our code in any project. For optimum use, each function will only do one thing. This way it can be reused anywhere and it becomes easier to test.

I agree that it takes more time to develop but the result on reusability while keeping high performance is huge.



HOW WILL IT BE USED
===================

To use it, developpers will have a package.json in which they will add all their needs and thus get only what they needs.

----------------------------------------------------------------------------------------------------------------------------------------

Since I started just a few weeks ago, I am very open to any comment or contribution. The whole structure can be reviewed. For ease at the begining i've put all the libraries in one folder but they will all be different git repositories. Everything and anything can be reviewed if you have anything better to propose.

Don't hesitate to fork follow and create pull request.
