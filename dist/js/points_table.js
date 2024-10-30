let a=document.getElementById("icon")
let b=document.getElementById("search")
a.addEventListener('click',()=>{
b.classList.toggle("hidden")
})

let c=document.getElementById("bar")
let d=document.getElementById("sidebar")
c.addEventListener('click',()=>{
d.classList.toggle("hidden")
})
// points_table.js

// Sample data for different seasons
const pointsTableData = {
    "SEASON 24": [
        { no: 1, team: "RCB", play: 15, win: 12, lose: 3, noResult: 0, points: 24 },
        { no: 2, team: "MI", play: 15, win: 10, lose: 5, noResult: 0, points: 20 },
        { no: 3, team: "CSK", play: 15, win: 8, lose: 7, noResult: 0, points: 16 },
        { no: 4, team: "KKR", play: 15, win: 6, lose: 9, noResult: 0, points: 12 }
    ],
    "SEASON 23": [
        { no: 1, team: "MI", play: 15, win: 13, lose: 2, noResult: 0, points: 26 },
        { no: 2, team: "RCB", play: 15, win: 11, lose: 4, noResult: 0, points: 22 },
        { no: 3, team: "CSK", play: 15, win: 9, lose: 6, noResult: 0, points: 18 },
        { no: 4, team: "KKR", play: 15, win: 7, lose: 8, noResult: 0, points: 14 }
    ],
    // Add more seasons as needed
};

document.addEventListener("DOMContentLoaded", function() {
    const seasonSelect = document.getElementById("seasonSelect");
    const tableBody = document.getElementById("pointsTableBody");

    function updateTable(season) {
        console.log("Updating table for:", season);
        
        // Clear existing rows
        tableBody.innerHTML = "";

        // Get data for the selected season
        const data = pointsTableData[season];

        // Create new rows
        data.forEach(row => {
            const tr = document.createElement("tr");
            tr.classList.add("bg-white", "border-b", "dark:border-gray-700");

            tr.innerHTML = `
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-black">${row.no}</th>
                <td class="px-6 py-4">
                    <div class="flex items-center">
                        <img class="w-10 h-10 rounded-full" src="../image/points_table/rcb.png" alt="Player Image" />
                        <div class="ml-3">
                            <p class="font-bold ">${row.team}</p>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4">${row.play}</td>
                <td class="px-6 py-4">${row.win}</td>
                <td class="px-10 py-4">${row.lose}</td>
                <td class="px-16 py-4">${row.noResult}</td>
                <td class="px-14 py-4">${row.points}</td>
            `;

            tableBody.appendChild(tr);
        });
    }

    // Initial load
    updateTable(seasonSelect.value);

    // Update table on season change
    seasonSelect.addEventListener("change", function() {
        console.log("Season changed to:", seasonSelect.value);
        updateTable(seasonSelect.value);
    });
});
