

 

// gsap scrollTrigger plugin 
gsap.registerPlugin(ScrollTrigger);
// gsap scrollTrigger plugin 





// Initialize Lenis
const lenis = new Lenis({
    // duration: 0.5,    // smoothness control
    lerp: 0.05,
    // smooth:true
  });
// Initialize Lenis






lenis.on("scroll",
    ScrollTrigger.update);

    
    
    
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    
    gsap.ticker.lagSmoothing(0);
    
    
    ScrollTrigger.refresh();








// gsap time line
const tl = gsap.timeline();
// gsap timeline

    


// done






const hamburger = document.getElementById("hamburger")
const sidebar = document.getElementById("sidebar")
const overlay = document.getElementById("overlay")

hamburger.addEventListener("click",()=>{
hamburger.classList.toggle("active")
sidebar.classList.toggle("active")
overlay.classList.toggle("active")
})

overlay.addEventListener("click",()=>{
hamburger.classList.remove("active")
sidebar.classList.remove("active")
overlay.classList.remove("active")
})


// mobile side menu ends




// ===== Search Bar Functionality Start =====

// search bar mobile 

// search input toggle
const searchBtn =
document.querySelector(".search-btn");

const searchInput =
document.querySelector("#search-input");

searchBtn.addEventListener("click", () => {
  searchInput.classList.toggle("active");
});
// search input toggle




// close search input on outside click

document.addEventListener("click", (e) => {

  if (
    !searchBtn.contains(e.target) &&
    !searchInput.contains(e.target)
  ) {
    searchInput.classList.remove("active");
  }

});
// close search input on outside click



// search bar mobile 

// ===== Search Bar Functionality ends =====








// aniamtion gsap 






// Header



// hambuger 3 lines

gsap.from("header .top-bar .hamburger", {
   x: -100,
  //  stagger: 0.5,
});

// hambuger 3 lines



// search icon 

gsap.from("header .top-bar label", {
  x: 100,
})

// search icon 



// Header 






// aniamtion gsap 





// homepage bg sound 

const audioBtn = document.querySelector(".audio-btn");

const audioTip = document.querySelector(".audio-tip");

const audio = document.querySelector("#bg-music");

const icon = audioBtn.querySelector("span");


// check tooltip already shown or not
const tooltipSeen = localStorage.getItem("audioTipSeen");


// show tooltip only first time
if (!tooltipSeen){

    setTimeout(() => {

        audioTip.classList.add("show");

    }, 1000);

}


// audio button click
audioBtn.addEventListener("click", () => {


  const slash = document.querySelector(".slash");


  if (audio.paused){
  
      audio.play();
  
      slash.style.display = "block";
  
  }
  
  else{
  
      audio.pause();
  
      slash.style.display = "none";
  
  }


    // hide tooltip forever
    audioTip.classList.remove("show");

    localStorage.setItem("audioTipSeen", "true");

});



// homepage bg sound
