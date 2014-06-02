# Cluster Calendar

Google Calendar API account: cluster.calendar@gmail.com

## Background

Cluster(a/k/a Bull Pen) is not available as a resource in Outlook Calendar. 
This causes scheduling conflicts and confusion about how to reserve/use this 
room for meetings and intra-team collaboration.


## Problem

We don't have a way to track Cluster's schedule. Requests are always ad-hoc and 
not publicly available. Unless communicated to the rest of the team by the 
administrator no one really knows when Cluster is available for use.


## Solution

Create a single page web app. 


Some useful resources (similar apps built by others and relevant articles on Google Calendar API)

* http://stackoverflow.com/a/21000850/463398
* http://www.dillingermediaonline.com/atlanta-web-developer/angularjs-calendar-2261/
* http://www.jonathanbroquist.com/building-a-google-calendar-booking-app-with-mongodb-expressjs-angularjs-and-node-js-part-1/

## What technology is being used?

So far we have:

* [FullCalendar](http://arshaw.com/fullcalendar/), a very nice Calendar library based on jQuery/jQueryUI.
* [AngularJS](http://angularjs.org/) a very popular front end development framework by Google.
* [AngularUI](http://angular-ui.github.io/) companion UI library for AngularJS. Also provides an AngularJS wrapper for Fullcalendar jQuery plugin.
* [Bootstrap](http://getbootstrap.com) easy to use easy to expand CSS framework.
* [HTML5Boilerplate](http://html5boilerplate.com/) a nice project template for any web app.
* [Google Calendar](https://developers.google.com/google-apps/calendar/?csw=1) An API as backend for handling events.