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