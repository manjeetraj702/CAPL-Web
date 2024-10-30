document.addEventListener('DOMContentLoaded', function () {
  
   
    const upcomingButton = document.getElementById('upcoming');
    const previousButton = document.getElementById('previous');
    
    const previousmathces = document.getElementById('previousMatches')
    const upcomingmathces = document.getElementById('upcomingMatches')
    // Active and inactive styles
    upcomingmathces.innerHTML=''

    const activeClass = 'bg-[#1f306b] text-white';
    const inactiveClass = 'bg-gray-300 text-black';

    // Function to set active and inactive styles
    function setActiveButton(activeButton, inactiveButton) {
        activeButton.classList.add(...activeClass.split(" "));
        activeButton.classList.remove(...inactiveClass.split(" "));
        
        inactiveButton.classList.add(...inactiveClass.split(" "));
        inactiveButton.classList.remove(...activeClass.split(" "));
        if(activeButton == previousButton)
        {
            previousmathces.classList.remove('hidden')
            upcomingmathces.classList.add('hidden')
        }
        else{

            upcomingmathces.classList.remove('hidden')
            previousmathces.classList.add('hidden')
        }
    }

    // Event listeners to toggle styles on click
    upcomingButton.addEventListener('click', function () {
        setActiveButton(upcomingButton, previousButton);
    });

    previousButton.addEventListener('click', function () {
        setActiveButton(previousButton, upcomingButton);
    });
    
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

          listItem.appendChild(anchor);
          tournamentDropdown.appendChild(listItem);
      });
  }

  // Call the async function to fetch and display the seasons
  getSeasons();
  
  
  async function fetchTeamById(teamId) {
    const url = `http://localhost:8080/capl/team/getTeamById?teamId=${teamId}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch data for team ID: ${teamId}`);
        
        const teamData = await response.json();
        console.log("Team Data:", teamData); // Log the team data for debugging
        
        // Process the team data here (e.g., update the UI with the team's info)
        return teamData
        
    } catch (error) {
        console.error("Error fetching team data:", error);
    }
}

  // Fetch match data from the API
  async function fetchMatches() {
      try {
          let response = await fetch('http://localhost:8080/capl/match/matches');
          if (!response.ok) throw new Error('Network response was not ok');
          
          let matchesData = await response.json();
          console.log(matchesData); // Check the structure of the data
          
          // Process each match and append it to the container
          matchesData.forEach(match => {
              const matchCard = createMatchCard(match);
              upcomingmathces.appendChild(matchCard);
          });
      } catch (error) {
          console.error('Error fetching match data:', error);
      }
  }

  // Create match card based on API data
  function createMatchCard(match) {
      const card = document.createElement('div');
      card.className = "bg-white lg:mx-40 mt-10 mb-10 mx-5 border-2 border-gray-500 shadow-md rounded-md";
      const firstteam = fetchTeamById(match.firstTeamId)
      const secondteam = fetchTeamById(match.secondTeam)
      console.log(firstteam)
      // HTML structure with dynamic data
      card.innerHTML = `
          <div class="border-b-2 border-gray-400 lg:pl-10 pl-5 lg:py-5 py-3">
              <h2 class="text-gray-800 font-semibold lg:text-lg text-sm">${"Kankarbagh"}</h2>
              <h2 class="text-gray-600 lg:text-sm text-xs">${match.matchDate || "Date"} / ${match.matchTime || "Time"}</h2>
              <div class="md:flex pt-5 lg:pl-10 pl-5 md:justify-evenly lg:justify-evenly lg:flex">
                  <div class="flex">
                      <div><img src="${firstteam.teamProfilePhotoUrl}" alt="${firstteam.teamName}" class="lg:w-16 w-10 rounded-full border-blue-950 border-2"></div>
                      <div class="font-serif font-bold lg:text-lg text-xs mt-2 ml-2">${firstteam.teamName}</div>
                  </div>
                  <div><img src="../image/home/vs.png" alt="VS" class="lg:w-7 w-5 py-2 ml-24 lg:ml-0"></div>
                  <div class="flex">
                      <div><img src="${secondteam.logoteamProfilePhotoUrlUrl}" alt="${secondteam.teamName}" class="lg:w-16 w-10 rounded-full border-blue-950 border-2"></div>
                      <div class="font-serif font-bold lg:text-lg text-xs mt-2 ml-2">${secondteam.teamName}</div>
                  </div>
              </div>
          </div>
      `;

      return card;
  }

  // Call the function to fetch and display matches
  fetchMatches();
});
