var notification_count=0;

$(document).on('pageinit', function() {

	$('#messageButton').on('click', function() {
		createMessage();
	});

	$('#dialogButton').on('click', function() {
		createDialog();
	});


	$('#notificationButton').on('click', function() {
		createNotification();
	});


});



function createMessage(){
	//phoneGap and jQueryMobile do not support toast messages directly
    //so we can add this using toast.js
    new Toast({content: 'This displays for 5 seconds.', duration: 5000});
		new Toast({content: "This is a second message", duration: 5000});
}


function createDialog() {

	//phonegap supports native dialog boxes.
	//here's a simple example

	navigator.notification.confirm(
    	'Are you Hungry?',  // message
        dialogDismissed,         // callback
        'Llama Takeaway',            // title
        ['Yes!', 'No']                  // buttons
    );

}



function dialogDismissed(buttonIndex) {

	if(buttonIndex==1){
		new Toast({content: "Take a break and eat a plate of Human Hands, Sir?", duration: 3000});
		var currentTime = new Date().getTime(); //current time
    var notificationTime = new Date(currentTime + 30000); //delayed time  - add 1 second
 		cordova.plugins.notification.local.schedule({
 		id: 		1,
 			title: 		"Hey you",
 			message: 	"Get back to work swiftly once you have eaten",
 			date: 		notificationTime,
 			badge: 		notification_count++
 		});
	 }
   	else if(buttonIndex==2) new Toast({content: 'Very good, Sir, carry on working', duration: 3000});

}



function createNotification() {

	//
    //generate a time to post notification
    //
    var currentTime = new Date().getTime(); //current time
    var notificationTime = new Date(currentTime + 5000); //delayed time  - add 1 second

    //
    //setup notification
    //

    cordova.plugins.notification.local.schedule({
    	id: 		1,
        title: 		"Weyland-Utani",
        message: 	"Building Better Worlds",
        date: 		notificationTime,
        badge: 		notification_count++
   	});

}
