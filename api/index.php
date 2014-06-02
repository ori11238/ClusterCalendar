<?php
require_once 'config.php';

/*  Opening the Session */
session_start();

$app = new \Slim\Slim();

$calendarServiceObj = new Google_Service_Calendar($client);

//@Todo take start/end dates
$app->get('/listEvents', function() use ($client, $calendarServiceObj) {
	//$now = date('c');
	//$params = array('singleEvents' => 'true', 'orderBy' => 'startTime', 'timeMin' => $now);
	$events = $calendarServiceObj->events->listEvents('cluster.calendar@gmail.com'/*, $params*/);

	$fullCalendarEvents = array();
	$i = 0;
	while(true) {
		foreach ($events->getItems() as $event) {
			$fullCalendarEvents[$i]['id'] = $event->getId();
			$fullCalendarEvents[$i]['title'] = $event->getSummary();
			$fullCalendarEvents[$i]['description'] = $event->getDescription();
			//$fullCalendarEvents[$i]['email'] = $event->getCreator()->getEmail();
			$fullCalendarEvents[$i]['start'] = $event->getStart()->getDateTime(); //@TODO take start
			$fullCalendarEvents[$i]['start_microtime'] = strtotime($event->getStart()->getDateTime()) * 1000; // JS expects time in milliseconds
			$fullCalendarEvents[$i]['end'] = $event->getEnd()->getDateTime(); //@TODO take end
			$fullCalendarEvents[$i]['end_microtime'] = strtotime($event->getEnd()->getDateTime()) * 1000; // JS expects time in milliseconds
			$fullCalendarEvents[$i]['allDay'] = false;
			$i++;
		}

		// If we have paginated results this is where we flip through them
		$pageToken = $events->getNextPageToken();
		if ($pageToken) {
		 $optParams = array('pageToken' => $pageToken);
		 $events = $calendarServiceObj->events->listEvents('cluster.calendar@gmail.com'/*, $optParams*/);
		} else {
		 break;
		}
	}

	echo jsonify($fullCalendarEvents);
});

$app->post('/createEvent', function() use ($client, $calendarServiceObj) {
	$whitelistPostFields = array('title', 'description', 'start', 'end', 'allDay');
	$POST = array();
	
	foreach($_POST as $k => $v) {
		if(in_array($k, $whitelistPostFields)) {
			$POST[$k] = trim($v); 
			if($k == 'allDay') {
				$POST[$k] = false;
			}
		}
	}
	
	$event = new Google_Service_Calendar_Event();
	$event->setSummary($POST['title']);
	$event->setDescription($POST['description']);
	$event->setLocation('Cluster');
	$start = new Google_Service_Calendar_EventDateTime();
	$start->setDateTime($POST['start']);
	$event->setStart($start);
	$end = new Google_Service_Calendar_EventDateTime();
	$end->setDateTime($POST['end']);
	$event->setEnd($end);
	$createdEvent = $calendarServiceObj->events->insert('cluster.calendar@gmail.com', $event);
	
	echo jsonify(array('id' => $createdEvent->getId()));
});

$app->run();

/**
 * @param array $result
 * @return json encoded array prepended with JSON Vuln. Protection
 */
function jsonify($result = array()) {
	return JSON_PROTECTION_STRING . json_encode($result);
}