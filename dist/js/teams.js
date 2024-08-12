/* ----- NAVBAR ----- */

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

/* ----- TEAM SECTION ----- */
function tap(event) {
    var element = event.target; // Get the element that triggered the event
    element.style.borderColor = "yellow"; // Change border color to yellow
    element.style.borderWidth = '2px';    // Change border width to 2px
    let img=document.getElementById("teamimg")
    img.src="../image/teams/csk.jpg"
    document.getElementById('coach').innerHTML="&nbsp; Gaurav Bhaiya"
    document.getElementById('captain').innerHTML="&nbsp; Gaurav Bhaiya"
   
}


// tailwind.config = {
//     theme: {
//         extend:{
//             Keyframes:{
//             fullSpin:{
//                 '100%':{
//                     transform: 'rotate(-360deg)'
//                 }
//             }
//             },
//             animation:{
//                 fullSpin:'fullSpin 3s linear infinite'
//             }
//         }
//     }
// }
