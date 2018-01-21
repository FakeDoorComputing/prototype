var notification_count=0;

$(document).on('pageinit', function() {

	$("#status").text("Idle");
	$("#conDis").text("Connect");
});

$(document).click("#conDis", function(){
	connect();
})

function connect(){
	bluetoothSerial.connect("B8:27:EB:D2:4A:3F", conSuccess, conFailure);
}

function disconnect(){
	bluetoothSerial.disconnect(disSuccess, disFailure);
}

function conSuccess(){
	$("#status").text("Connected");
	receiveStatus()
}

function conFailure(){
	$("#status").text("Connection Refused");
	exitProgram()
}

function disSuccess(){
	$("#status").text("Disconnected");
}

function disFailure(){
	$("#status").text("Check Device");
}

function receiveStatus(){
	bluetoothSerial.read(function(data){
		$("#status").text(data);
	},function(){
		$("#status").text("No data received");
	});
	bluetoothSerial.clear();
}

function exitProgram(){
	disconnect();
	$("status").text("Program Ended");
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
        title: 		"ALERT!",
        message: 	"Your Front Door Is Currently Unlocked",
				icon: 'http://climberindonesia.com/assets/icon/ionicons-2.0.1/png/512/android-chat.png',
        date: 		notificationTime,
        badge: 		notification_count++
   	});

}
