var x;
var startstop = 0;

function startStop() {
    startstop = startstop +1;
    if (startstop === 1) {
        Start();
    } else if (startstop === 2) {
        startstop = 0;
        Stop();
    }
}

// config timer
var sec = 59;
var minute = 24;

// time output to use in checktime
var secOut = 59;
var minuteOut = 24;

// buttons var
var start = document.getElementById("start");
var stop = document.getElementById("stop");
var reset = document.getElementById("reset");

// start thee function timer.
function Start() {
    x = setInterval(timer, 1000);
}

//pause the function timer.
function Stop(){
    clearInterval(x);
    document.getElementById("alert-sound").pause();
}

// reset my html and my timer.
function Reset() {
    sec = 59;
    minute = 24;

    document.getElementById("tittle").innerHTML = "Pomodoro Timer";
    document.getElementById("second").innerHTML = "00";
    document.getElementById("minute").innerHTML = "25";
}

//timer print the value in my screen 
function timer() {
    secOut = checkTime(sec);
    minuteOut = checkTime(minute);

    sec = --sec;

    if( sec == 0) {
        minute = --minute;
        sec = 59;
    }
    if( minute == 0 , sec == 1) {
        alert();
        Reset();
        document.getElementById("alert-sound").play();

    }

    document.getElementById("second").innerHTML = secOut;
    document.getElementById("minute").innerHTML = minuteOut;
    document.getElementById("tittle").innerHTML = minute + ":" + sec + " Pomodoro Timer";
}

function checkTime(i) {
    if ( i < 10 ) {
        i = "0" +i;
    }
    return i;
}


// requeste an permission from using the notifications
function requestPermission() {
    return new Promise(function(resolve, reject) {
        const perssionResult = Notification.requestPermission(function(result) {
            resolve(result);
        });
        if (perssionResult) {
            perssionResult.then(resolve, reject);
        }
    }) 
    .then(function(permissionResult){
        if(permissionResult != 'granted') {
            throw new Error('Permission not granted')
        }
    });
}

function spawnNotification(options) {
    var n = new Notification(options.title, options.opt);

    if( options.link !== '') {
        n.addEventListener("click" , function() {
            n.close();
            window.focus();
            window.location.hred = options.link;
        });
    }
}

function alert() {
    spawnNotification({
        opt: {
            body: "Time to Rest",
            icon: ""
        },
        title: "Expired Time",
        link: "/"
    })
}



Notification.requestPermission();