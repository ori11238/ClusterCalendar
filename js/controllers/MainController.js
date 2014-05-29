'use strict';

cCalApp.controller('MainController', 
	function MainController($scope, googleServiceData) {
		$scope.showForm = false;
		$scope.showAlert = false;
		
		$scope.event = {};
		
		$scope.gcalEventFunction = googleServiceData.fetchEventsList;
		
		$scope.$watch('events', googleServiceData.fetchEventsList(null, null, function(result){
					$scope.events = result;
				})
		);

		var date = new Date();
		var d = date.getDate();
		var m = date.getMonth();
		var y = date.getFullYear();

		/**
		 * Event source that pulls from google.com 
		 * ToDo Add a UI checkbox to en/dis/able this event source 
		 */
		$scope.googlePublicCal = {
						url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
						className: 'gcal-event',           // an option!
						currentTimezone: 'America/New_York' // an option!
		};

		/* alert on eventClick */
		$scope.alertOnEventClick = function(event, allDay, jsEvent, view){
				$scope.showAlert = true;
				var event_desc = (event.description) ? event.description : 'N/A';
				$scope.alertMessage =   'Summary: ' + event.title + '\n' +
																'Description: ' + event_desc  + '\n' +
																'Start: ' + event.start + '\n' +
																'End: ' + event.end;
		};
		/* alert on Drop */
		 $scope.alertOnDrop = function(event, dayDelta, minuteDelta, allDay, revertFunc, jsEvent, ui, view){
			 $scope.alertMessage = ('Event Droped to make dayDelta ' + dayDelta);
		};
		/* alert on Resize */
		$scope.alertOnResize = function(event, dayDelta, minuteDelta, revertFunc, jsEvent, ui, view ){
			 $scope.alertMessage = ('Event Resized to make dayDelta ' + minuteDelta);
		};
		/* add and removes an event source of choice */
		$scope.addRemoveEventSource = function(sources,source) {
			var canAdd = 0;
			angular.forEach(sources,function(value, key){
				if(sources[key] === source){
					sources.splice(key,1);
					canAdd = 1;
				}
			});
			if(canAdd === 0){
				sources.push(source);
			}
		};
		
		$scope.addFormEvent = function(calendar, event) {
			var start	= $scope.clusterCalendar.fullCalendar('formatDate', event.start, 'yyyy-MM-dd\'T\'HH:mm:ss-0400');
			var end = $scope.clusterCalendar.fullCalendar('formatDate', event.end, 'yyyy-MM-dd\'T\'HH:mm:ss-0400');
			
			$scope.new_event = {
				title: event.title,
				description: event.description,
				start: start,
				end: end,
				allDay: false
			};
			//$scope.events.push(new_event);
			googleServiceData.createEvent($scope.new_event, function(data){
				// console.log(data); // log newly returned event Id to the console
				$scope.renderCalender(calendar);
				$scope.showForm = false;
			});			
		};
		
		/* add custom event*/
		$scope.addEventOnSelect = function(startDate, endDate, allDay, jsEvent, view) {
			var start = $scope.clusterCalendar.fullCalendar('formatDate', startDate, 'yyyy-MM-dd\'T\'HH:mm:ss-0400');
			var end = $scope.clusterCalendar.fullCalendar('formatDate', endDate, 'yyyy-MM-dd\'T\'HH:mm:ss-0400');

			$scope.showForm = true;
			
			$scope.event = {
				title: ' ',
				description: ' ',
				start: start,
				end: end,
				allDay: allDay
			};
			if ($scope.event.title) {
					$scope.clusterCalendar.fullCalendar('renderEvent', $scope.event, true /*make the event "stick"*/);
			}
			$scope.clusterCalendar.fullCalendar('unselect');
			
			// Persist new event and refetch events to update the calendar view
			
		};
		/* remove event */
		$scope.remove = function(index) {
			$scope.events.splice(index,1);
		};    
		/* Change View */
		$scope.changeView = function(view,calendar) {
			calendar.fullCalendar('changeView',view);
		};
		/* Change View */
		$scope.renderCalender = function(calendar) {
			if(calendar){
				calendar.fullCalendar('render');
			}
		};
		/* config object */
		$scope.uiConfig = {
			calendar:{
				defaultView: 'agendaWeek',
				editable: true,
				header:{
					left: 'today prev,next',
					center: 'title',
					right: 'month,agendaWeek,agendaDay'
				},
				selectable: true,
				selectHelper: true,
				select: $scope.addEventOnSelect,								
				weekends: false,
				eventClick: $scope.alertOnEventClick,
				//eventDrop: $scope.alertOnDrop,
				//eventResize: $scope.alertOnResize
			}
		};

		/* event sources array*/
		$scope.eventSources = [$scope.gcalEventFunction, $scope.googlePublicCal];
	}
);