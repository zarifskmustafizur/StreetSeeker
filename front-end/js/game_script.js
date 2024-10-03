const difficultySelected = localStorage.getItem("difficulty"); //To Be Passed from the home page #TODO
const apiKey = "AIzaSyB8pkH9hGuBpnaW_4c3zDXVCkDnWEXTInY" //NEVER DO THIS IN A PROPPER APPLICATION
const difficultySet = ({ "1": 0.5, "2": 1, "3": 2 });
const Dp = 4;
let difficulty = difficultySet["1"];
if (difficultySelected == "1" || difficultySelected == "2" || difficultySelected == "3") {
    difficulty = difficultySet[difficultySelected];
}
let startPos = ({ "latitude": 0, "longitude": 0 });
let currentPos = ({ "latitude": 0, "longitude": 0 });
let endPos = ({ "latitude": 0, "longitude": 0 });

//START Location logic
async function requestLocation() {
    await getLocation();
}

async function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successgetCurrentPosition, errorgetCurrentPosition);
    } else {
        console.error('Geolocation is not supported by this browser.');
    }
}

function successgetCurrentPosition(position) {
    const latitude = parseFloat((position.coords.latitude).toFixed(Dp));//latitude is 1 char longer than the longitude in the uk. this is a bad way to do it, TO BAD!
    const longitude = parseFloat((position.coords.longitude).toFixed(Dp));
    startPos["latitude"] = latitude;
    startPos["longitude"] = longitude;
    generateTargetLocation()
}

function errorgetCurrentPosition(error) {
    console.error('Error getting location:', error.message);
}

//UPDATE Location Logic
function checkLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successgetUpdatedPosition, errorgetCurrentPosition);
    } else {
        console.error('Geolocation is not supported by this browser.');
    }
}

function successgetUpdatedPosition(position2) {

    //This Part Is broken Some how?
    //This needs to be done
    //Hours Spent: 4
    //TWO LETTERS...
    let currentLatitude = parseFloat((position2.coords.latitude).toFixed(Dp));
    let currentLongitude = parseFloat((position2.coords.longitude).toFixed(Dp));
    //I hate this
    currentPos["latitude"] = currentLatitude;
    currentPos["longitude"] = currentLongitude;
    if ((currentPos["latitude"] <= endPos["latitude"] + 0.0001 && currentPos["latitude"] >= endPos["latitude"] - 0.0001) && (currentPos["longitude"] <= endPos["longitude"] + 0.0001 && currentPos["longitude"] >= endPos["longitude"] - 0.0001)) {
        stopTimer();
    }
}


async function generateTargetLocation() {
    attempts = 0;

    do {
        distance = (0.01 * difficulty + (Math.random() * (difficulty / 1000))); //11m * 1, 3, or 5

        direction = (Math.random() * 2 * Math.PI);
        endLat = (startPos["latitude"] + (distance * Math.sin(direction))).toFixed(4);
        endLong = (startPos["longitude"] + (distance * Math.cos(direction))).toFixed(4);
        endPos["latitude"] = endLat;
        endPos["longitude"] = endLong;
        testCoords = endPos["latitude"] + ',' + endPos["longitude"];
        response = await fetch(`https://maps.googleapis.com/maps/api/streetview/metadata?size=0x0&location=${testCoords}&key=${apiKey}`);
        data = await response.json();

        const reg = /Google/;
        if (data.status == 'OK' && reg.test(data.copyright)) {
            break;
        }
        else {
        }
        attempts += 1
    }
    while (data.status !== 'OK' || attempts < 10)
    if (attempts == 10) {
        alert("Cannot display an location at this time");

    }
    else {
        displayLocation();
    }
}

function displayLocation() {

    Coords = endPos["latitude"] + ',' + endPos["longitude"];
    document.getElementById('streetViewImage1').src = `https://maps.googleapis.com/maps/api/streetview?size=320x640&location=${Coords}&fov=45&heading=0&key=${apiKey}`;
    document.getElementById('streetViewImage1').style.display = 'inline';
    document.getElementById('streetViewImage2').src = `https://maps.googleapis.com/maps/api/streetview?size=320x640&location=${Coords}&fov=45&heading=45&key=${apiKey}`;
    document.getElementById('streetViewImage2').style.display = 'inline';
    document.getElementById('streetViewImage3').src = `https://maps.googleapis.com/maps/api/streetview?size=320x640&location=${Coords}&fov=45&heading=90&key=${apiKey}`;
    document.getElementById('streetViewImage3').style.display = 'inline';
    document.getElementById('streetViewImage4').src = `https://maps.googleapis.com/maps/api/streetview?size=320x640&location=${Coords}&fov=45&heading=135&key=${apiKey}`;
    document.getElementById('streetViewImage4').style.display = 'inline';
    document.getElementById('streetViewImage5').src = `https://maps.googleapis.com/maps/api/streetview?size=320x640&location=${Coords}&fov=45&heading=180&key=${apiKey}`;
    document.getElementById('streetViewImage5').style.display = 'inline';
    document.getElementById('streetViewImage6').src = `https://maps.googleapis.com/maps/api/streetview?size=320x640&location=${Coords}&fov=45&heading=225&key=${apiKey}`;
    document.getElementById('streetViewImage6').style.display = 'inline';
    document.getElementById('streetViewImage7').src = `https://maps.googleapis.com/maps/api/streetview?size=320x640&location=${Coords}&fov=45&heading=270&key=${apiKey}`;
    document.getElementById('streetViewImage7').style.display = 'inline';
    document.getElementById('streetViewImage8').src = `https://maps.googleapis.com/maps/api/streetview?size=320x640&location=${Coords}&fov=45&heading=315&key=${apiKey}`;
    document.getElementById('streetViewImage8').style.display = 'inline';
    startTimer();
}

function pageLoad() {
    requestLocation();
}

//TIMER LOGIC
//Note: I Hate it but it works - H
var checkOn5 = 0

function startTimer() {
    //Giving startTime a variable type breaks the everything?
    startTime = Date.now(); //Gets the time based on clock
    var cancel = setInterval(incrementTimer, 1000);
    gameEnded = false;
}

function incrementTimer() {
    if (gameEnded == false) {
        var currentTime = Date.now(); //Gets the time based on clock
        var time = Math.round((currentTime - startTime) / 1000);
        document.getElementById("timer").innerText = ("Time: " + time);
        checkOn5 += 1;

        if (checkOn5 == 5) {
            checkLocation();
            checkOn5 = 0;
        }
    }
}
function stopTimer() {
    gameEnded = true;
    var stopTime = Date.now() //Gets the time based on clock
    var time = Math.round((stopTime - startTime) / 1000);
    document.getElementById("timer").innerText = "Final Time: " + time;
    gameEnd();
}

function giveUp() {
    gameEnded = true;
    time = 0;
    gameEnd();
}

function gameEnd() {
    if (time == 0) {
        //Faliure State #TODO
        //will be in the state: time = 0
        document.getElementById("timer").innerText = "Game Over: Gave Up";
    }
    else {
        document.getElementById("timer").innerText = ("Game Over: Time = " +time)
        //submitScores()
    }
}

// function submitScores()
// {
// // Assuming you have the necessary data in variables
// const finalTime = 300;//time;
// const username = "hamish";//localStorage.getItem("username");
// // const id = 1/* Player's unique ID */;
// const difficultyWon = difficulty; 
// fetch('back-end/leaderboard.php', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     body: new URLSearchParams({
//         time: finalTime,
//         username: username,
//         // id: id,
//         difficulty: difficultyWon
//     })
// })
// .then(response => response.text())
// .then(data => {
//     console.log(data);
// })
// .catch(error => {
//     console.error('Error:', error);
// });
// }
    

//CHECK FOR MOBILE BROWSER FUNCTION
window.mobileCheck = function () {
    //FUNCTION CREDIT GOES TO http://detectmobilebrowsers.com/
    let check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
}


window.onload = pageLoad;

