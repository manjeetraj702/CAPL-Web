document.addEventListener('DOMContentLoaded', function () {
  


    let seasons;
    const seasonUrl = "http://localhost:8080/season/details/getSeasons";  // Replace with your actual API URL
  
    async function getSeasons() {
        try {
            let response = await fetch(seasonUrl);
            seasons = await response.json();  // Wait for JSON data
            console.log(seasons)
            const seasonDropdown = document.getElementById("season-dropdown");
        
            seasonDropdown.innerHTML = ''
  
            // Loop over the seasons array and create each <li> element
            seasons.forEach(season => {
                const listItem = document.createElement("li");
  
                const anchor = document.createElement("a");
                anchor.href = "#";  // Set this to the desired link
                anchor.className = "block bg-white text-black pl-2 font-bold w-40 h-17 border-gray-300 place-content-center border-b-2 hover:pl-10 hover:text-xl";
                anchor.textContent = `Season ${season.seasonYear}`;  // Set the text to the season name
  
                anchor.addEventListener('click', function() {
                    getTournaments(season.tournamentList)
                    seasonDropdown.classList.add('hidden'); // Close dropdown after selection
                });
  
                listItem.appendChild(anchor);
                seasonDropdown.appendChild(listItem);
            });
        } catch (error) {
            console.error('Error fetching seasons:', error);
        }
    }
  
     function getTournaments(tournamentList) {
        const tournamentDropdown = document.getElementById('tournamentDropdown')
        tournamentDropdown.innerHTML = '';
  
        tournamentList.forEach(tournament => {
            const listItem = document.createElement("li");
            const anchor = document.createElement("a");
            anchor.href = "#";  // Set this to the desired link
            anchor.className = "block bg-white text-black pl-2 font-bold w-40 h-17 border-gray-300 place-content-center border-b-2 hover:pl-10 hover:text-xl";
            anchor.textContent = `Tournament ${tournament.tournamentName}`;  // Assuming 'name' is a property in tournament data
            
            anchor.addEventListener('click', function() {
                getTeamsByTournamentId(tournament.tournamentId)
                seasonDropdown.classList.add('hidden'); // Close dropdown after selection
            });
            listItem.appendChild(anchor);
            tournamentDropdown.appendChild(listItem);
        });
    }
    async function getTeamsByTournamentId(tournamentId) {
        try {
            const response = await fetch(`http://localhost:8080/capl/tournament/getListOfTeam/ByTournamentId?tournamentId=${tournamentId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const teams = await response.json();

            // Populate the dropdown with team data
            populateTeamDropdown(teams);
        } catch (error) {
            console.error('Error fetching team data:', error);
        }
    }

    function populateTeamDropdown(teams) {
        const teamDropdown = document.getElementById('teamDropdown');
        teamDropdown.innerHTML = ''; // Clear existing items

        teams.forEach(team => {
            const listItem = document.createElement('li');
            const anchor = document.createElement('a');
            anchor.href = team.link || '#'; // Set the link if provided, or default to '#'
            anchor.className = 'flex bg-white text-black p-2 font-bold w-40 h-12 border-gray-300 border-b-2 hover:pl-10 hover:text-xl';
            
            const img = document.createElement('img');
            img.src = team.imageSrc || ''; // Set the team image source if provided
            img.alt = `${team.name} logo`;
            img.className = 'h-5 rounded-3xl mr-5';
            
            const teamName = document.createElement('h1');
            teamName.textContent = team.name;

            anchor.appendChild(img);
            anchor.appendChild(teamName);
            listItem.appendChild(anchor);
            teamDropdown.appendChild(listItem);
        });
    }
  
    // Call the async function to fetch and display the seasons
    getSeasons();
    getTournaments(seasons[0].tournamentList)
    
  
  
  });
  