
document.addEventListener('DOMContentLoaded', function() {
// Predefined data for the leaderboard, separated by distance and region
let leaderboardData = {
    '1km': {
        'local': [
            { name: 'Alice', time: '2:10' },
            { name: 'Bob', time: '2:20' },
            { name: 'Ivy', time: '2:30' },
            { name: 'Jill', time: '2:40' },
            { name: 'Ken', time: '2:50' },
            { name: 'Leo', time: '3:00' },
            { name: 'Mia', time: '3:10' },
            { name: 'Nina', time: '3:20' },
            { name: 'Oscar', time: '3:30' },
            { name: 'Pete', time: '3:40' },
            { name: 'Pete', time: '3:45' }
        ],
        'global': [
            { name: 'Charlie', time: '2:00' },
            { name: 'Dave', time: '2:09' },
            { name: 'Alice', time: '2:10' },
            { name: 'Quinn', time: '2:18' },
            { name: 'Rachel', time: '2:27' },
            { name: 'Steve', time: '2:36' },
            { name: 'Tina', time: '2:45' },
            { name: 'Uma', time: '2:54' },
            { name: 'Victor', time: '3:03' },
            { name: 'Wendy', time: '3:12' },
        ]
    },
    '3km': {
        'local': [
            { name: 'Eve', time: '6:30' },
            { name: 'Frank', time: '6:45' },
            { name: 'Yolanda', time: '7:00' },
            { name: 'Zach', time: '7:15' },
            { name: 'Amy', time: '7:30' },
            { name: 'Brian', time: '7:45' },
            { name: 'Cathy', time: '8:00' },
            { name: 'Derek', time: '8:15' },
            { name: 'Elle', time: '8:30' },
            { name: 'Felix', time: '8:45' }
        ],
        'global': [
            { name: 'Grace', time: '6:20' },
            { name: 'Heidi', time: '6:35' },
            { name: 'Gus', time: '6:50' },
            { name: 'Hannah', time: '7:05' },
            { name: 'Ian', time: '7:20' },
            { name: 'Jackie', time: '7:35' },
            { name: 'Kyle', time: '7:50' },
            { name: 'Linda', time: '8:05' },
            { name: 'Mike', time: '8:20' },
            { name: 'Nora', time: '8:35' }
        ]
    },
    '5km': {
        'local': [
            { name: 'Adam', time: '12:30' },
            { name: 'Barbara', time: '12:50' },
            { name: 'Carlos', time: '13:10' },
            { name: 'Diana', time: '13:30' },
            { name: 'Eli', time: '13:50' },
            { name: 'Fiona', time: '14:10' },
            { name: 'George', time: '14:30' },
            { name: 'Hilda', time: '14:50' },
            { name: 'Ingrid', time: '15:10' },
            { name: 'Jerry', time: '15:30' }
        ],
        'global': [
            { name: 'Natalie', time: '11:30' },
            { name: 'Antonio', time: '11:50' },
            { name: 'Freyja', time: '12:10' },
            { name: 'Kyra', time: '12:15' },
            { name: 'Coral', time: '12:20' },
            { name: 'Alisa', time: '12:20' },
            { name: 'Fay', time: '12:23' },
            { name: 'Wiktor', time: '12:24' },
            { name: 'Zak', time: '12:28' },
            { name: 'Adam', time: '12:30' }
        ]
    }
}
const userScores = {
    '1km': { name: 'You', time: '04:55' },
    '3km': { name: 'You', time: '14:35' },
    '5km': { name: 'You', time: '24:45' }
};

// Converts a time string in format "mm:ss" to total seconds for comparison
function timeStringToSeconds(timeString) {
    const parts = timeString.split(':'); // Split the time string into minutes and seconds
    const minutes = parseInt(parts[0], 10); // Parse the minute part to an integer
    const seconds = parseInt(parts[1], 10); // Parse the second part to an integer
    return minutes * 60 + seconds; // Convert minutes to seconds and add to the seconds part
}

function addUserScoreToAllLeaderboards(userScores) {
    // Loop through each distance category (1km, 3km, 5km)
    Object.keys(userScores).forEach((difficulty) => {
        // For each region (local, global)
        ['local', 'global'].forEach((region) => {
            // Add the user's score to the leaderboard for the current distance and region
            leaderboardData[difficulty][region].push(userScores[difficulty]);

            // Sort the leaderboard based on time, converting time strings to seconds for comparison
            leaderboardData[difficulty][region].sort(function(a, b) {
                return timeStringToSeconds(a.time) - timeStringToSeconds(b.time);
            });
        });
    });

    // Update the displayed leaderboard based on the current difficulty and region
    const currentDifficulty = getCurrentDifficulty();
    const currentRegion = getCurrentRegion();
    updateLeaderboard(currentDifficulty, currentRegion);
}
    // Initially display the local leaderboard for 1km distance
    updateLeaderboard('1km', 'local');
    // Add user score to all leaderboards and sort them
    addUserScoreToAllLeaderboards(userScores);

    // Event listeners for difficulty buttons
    document.querySelectorAll('.difficulty button').forEach(button => {
        button.addEventListener('click', function() {
            updateLeaderboard(this.id.split('-')[1], getCurrentRegion());
        });
    });

    document.querySelectorAll('.region button').forEach(button => {
        button.addEventListener('click', function() {
            updateLeaderboard(getCurrentDifficulty(), this.id.split('-')[1]);
        });
    });

    function getCurrentDifficulty() {
        // Select the active difficulty button and extract its ID
        return document.querySelector('.difficulty button.active')?.id.split('-')[1] || '1km';
    }

    function getCurrentRegion() {
        // Helper function to get the currently selected region
        return document.querySelector('.region button.active')?.id.split('-')[1] || 'local';
    }

    function updateLeaderboard(difficulty) {
        const region = 'local'; // Default to 'local' region
        const data = leaderboardData[difficulty][region];
        const listElement = document.getElementById('leaderboard-list');
        listElement.innerHTML = ''; // Clear the current leaderboard list
    
        const userScore = userScores[difficulty];
        const userRanking = data.findIndex(item => item.name === userScore.name);
    
        data.slice(0, 10).forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${index + 1}. ${item.name} - ${item.time}`;
            listElement.appendChild(listItem);
        });
    
        if (userRanking >= 10) {
            const userListItem = document.createElement('li');
            userListItem.textContent = `${userRanking + 1}. ${userScore.name} - ${userScore.time}`;
            userListItem.classList.add('user-score'); // Add a class for styling if needed
            listElement.appendChild(userListItem);
        }
    
        // Update the active status of the buttons based on the selected difficulty
        document.querySelectorAll('.difficulty button').forEach(button => {
            button.classList.remove('active');
        });
        document.getElementById(`difficulty-${difficulty}`).classList.add('active');
    }
    
});
