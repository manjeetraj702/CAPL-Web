document.addEventListener('DOMContentLoaded', function () {
  let a = document.getElementById("icon");
  let b = document.getElementById("search");
  if (a && b) {
      a.addEventListener('click', () => {
          b.classList.toggle("hidden");
      });
  }

  let c = document.getElementById("bar");
  let d = document.getElementById("sidebar");
  if (c && d) {
      c.addEventListener('click', () => {
          d.classList.toggle("hidden");
      });
  }

  const url = 'http://localhost:8080/capl/team/listOf/Teams';
  const matchesList = document.getElementById('matches-list');
  if (!matchesList) {
      console.error("Element with id 'matches-list' not found in the DOM.");
      return;
  }

  async function getTeam() {
      try {
          let response = await fetch(url);
          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
          let data = await response.json();
          console.log(data);

          matchesList.innerHTML = ''; // Clear existing content first
          data.forEach(team => {
              const listItem = document.createElement('li');
              listItem.className = 'relative bg-cover bg-center w-72 h-48 m-3 rounded-lg overflow-hidden transform transition-transform duration-300 ease-in-out shadow-lg hover:scale-105 hover:brightness-75';
              listItem.style.backgroundImage = `url('${team.teamProfilePhotoUrl}')`;
              listItem.style.filter = 'brightness(1) contrast(1.1)';

              listItem.innerHTML = `
                  <div class="absolute bottom-0 left-0 w-full p-3 bg-black bg-opacity-50 text-white text-center text-lg transition-all duration-300 ease-in-out hover:bg-opacity-75">
                      ${team.teamName}
                  </div>
              `;

              matchesList.appendChild(listItem);
          });
      } catch (error) {
          console.error('Error fetching team data:', error);
      }
  }

  getTeam();
});
