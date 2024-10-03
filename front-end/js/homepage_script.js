document.getElementById('play-button').addEventListener('click', function(e) {
    e.preventDefault(); 
    document.querySelector('.view-deep').style.transform = 'scale(1)';
    document.querySelector('.view-deep').style.opacity = '1';
    document.querySelector('.view-deep').style.pointerEvents = 'auto'; 

    document.querySelector('.view-initial').style.transform = 'scale(0.5)';
    document.querySelector('.view-initial').style.opacity = '0';
    document.querySelector('.view-initial').style.pointerEvents = 'none'; 
    document.querySelector('.background').style.transform = 'scale(0.9)';
});
document.getElementById("back-button").addEventListener("click", function() {

    document.querySelector('.view-deep').style.transform = 'scale(0.5)';
    document.querySelector('.view-deep').style.opacity = '0';
    document.querySelector('.view-deep').style.pointerEvents = 'none'; 

    document.querySelector('.view-initial').style.transform = 'scale(1)';
    document.querySelector('.view-initial').style.opacity = '1';
    document.querySelector('.view-initial').style.pointerEvents = 'auto'; 


});

function goToGame(difficulty)
{
    localStorage.setItem("difficulty",difficulty);
    window.open("StreetSeekerGame.html");
}


