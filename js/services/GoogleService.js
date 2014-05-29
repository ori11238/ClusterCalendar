'use strict';

cCalApp.service('googleServiceData', function($http){
	return {
		/**
		 * @returns This function is designed to be consumed by FullCalendar (EventSources)
		 * @see http://arshaw.com/fullcalendar/docs/event_data/events_function/
		 */
		fetchEventsList: function(start,end,callback){
			$http({
				method: 'GET',
				url: '/api/listEvents'
			}).success(function(data, status){
					callback(data);
			}).error(function(data, status, headers, config){
					throw data;
			});
		},
		createEvent: function(event, callback) {
			$http({
				method: 'POST',
				url: '/api/createEvent',
				data: $.param(event),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				}
			}).success(function(data, status){
				callback(data);
			}).error(function(data, status, headers, config){
					throw data;
			});
		}
	};
});