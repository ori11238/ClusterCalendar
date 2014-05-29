<?php
ini_set('display_errors', 1);
ini_set('include_path', ini_get('include_path') . PATH_SEPARATOR . '../vendor/');

require_once 'Slim/Slim.php';
\Slim\Slim::registerAutoloader();

require_once 'Google/Client.php';
require_once 'Google/Service/Calendar.php';

define('APP_NAME', 'Cluster Calendar');
/**
 * Google API Credentials for Cluster.calendar@gmail.com
 */
define('CLIENT_ID', '313619168179-3kcthqmo7p5ar1smu02l729d9eqpa8np.apps.googleusercontent.com');
define('SERVICE_ACCOUNT_NAME', '313619168179-3kcthqmo7p5ar1smu02l729d9eqpa8np@developer.gserviceaccount.com');
define('DEVELOPER_KEY', 'AIzaSyAu6pRwaaLJPgr7tghI_ek5Svr9D9rt8Co');
define('KEY_FILE', 'aa2f5f2c30bb8d8e8de3d87af6a0591b7cc05d25-privatekey.p12');
define('JSON_PROTECTION_STRING', ")]}',\n");
define('UTC_TIMEZONE', '-0400');

$key = file_get_contents('../creds/'.KEY_FILE);

$credentialObj = new Google_Auth_AssertionCredentials(
	SERVICE_ACCOUNT_NAME,
	'https://www.google.com/calendar/feeds/cluster.calendar/private/full/',
	$key
);

/**
 * Create a globally accessible Google Client object
 * Authenticate using Service account creds and set application params
 */
$client = new Google_Client();
$client->setApplicationName(APP_NAME);
$client->setClientId(CLIENT_ID);
$client->setAssertionCredentials($credentialObj);
$client->setClientId(CLIENT_ID);
