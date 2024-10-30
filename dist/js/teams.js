document.addEventListener('DOMContentLoaded', function () {
    let a = document.getElementById("icon");
    let b = document.getElementById("search");
    a.addEventListener('click', () => {
        b.classList.toggle("hidden");
    });

    let c = document.getElementById("bar");
    let d = document.getElementById("sidebar");
    c.addEventListener('click', () => {
        d.classList.toggle("hidden");
    });

    let url = 'http://localhost:8080/capl/team/listOf/Teams';
    
    function updateTeamSection(data) {
        document.getElementById("display-teamimg").src = data.teamProfilePhotoUrl;
        document.getElementById("team-name").textContent = data.teamName;
    }
    
    async function getTeam() {
        try {
            let response = await fetch(url);
            let data = await response.json();
            console.log(data);
            const teamimg = document.getElementById('teamimg'); // Ensure this element exists
            teamimg.innerHTML = ''; // Clear existing content first

            let count = 0
            data.forEach(element => {
                if(count == 0)
                {
                    generatePlayerCards(element.playerList)
                    count++;
                }
                let teamDiv = document.createElement('div');
                teamDiv.className = "box h-[80px] md:h-[100px] sm:w-[250px] w-[200px] bg-white md:mx-8 mx-2 mb-10 shadow-md transition duration-1000 rounded-md bg-cover bg-no-repeat bg-center";
                teamDiv.style.backgroundImage = `url('${element.teamProfilePhotoUrl}')`;
    
                console.log('Creating teamDiv for:', element);
                
                teamDiv.addEventListener('click', () => { 
                    updateTeamSection(element); 
                });
                
                
                teamimg.appendChild(teamDiv);
            });
        } catch (error) {
            console.error('Error fetching team data:', error);
        }
    }
    function generatePlayerCards(players) {
        const playerCardsContainer = document.getElementById('player-cards');
        playerCardsContainer.innerHTML = ''

        players.forEach(player => {
            const card = document.createElement('div');
            card.className = 'bg-white rounded-lg items-center justify-center';

            card.innerHTML = `
                <div class="flex justify-between mt-3">
                    <i class="fa-solid fa-hand text-2xl ml-5"></i>
                    <i class="fa-solid fa-c bg-slate-400 p-2 rounded-full mr-5"></i>
                </div>
                <div class="flex justify-center items-center md:flex-col">
                    <img class="h-[220px]" src="${player.playerProfilePhotoUrl}" alt="${player.playerName}">
                    <div class="flex justify-center">
                        <div>
                            <h1 class="text-2xl font-bold">${player.playerName}</h1>
                            <h2 class="text-lg">batter</h2>
                        </div>
                    </div>
                </div>
            `;

            playerCardsContainer.appendChild(card);
        });
    }

    getTeam();
    
});
