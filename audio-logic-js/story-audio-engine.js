



/* =========================
   AGESCAPE STORY AUDIO ENGINE
   FINAL CLEAN CINEMATIC VERSION

   FEATURES:
   - Manual story control
   - Cinematic BG volume ducking
   - No auto next redirect
   - Clean progress system
   - Multi page safe
   - Fully optimized
========================= */



/* =========================
   WAIT FOR DOM READY
========================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {





/* =========================
   STORY AUDIO OBJECT
========================= */



// Main story audio

const storyMusic =
new Audio();



// Story should not loop

storyMusic.loop = false;



// Story volume

storyMusic.volume = 1;





/* =========================
   CURRENT PAGE
========================= */



// Current page name

const currentPage =

document.body.dataset.page;





/* =========================
   CURRENT PAGE AUDIO
========================= */



// Current page audio data

const currentAudio =

audioMap[currentPage];




/* =========================
   SAFETY CHECK
========================= */

// Agar page audio data
// ya story audio missing hai

if (
  !currentAudio ||
  !currentAudio.story
) {

  console.log(
    "No story audio found"
  );

  return;

}





/* =========================
   STORY AUDIO SOURCE
========================= */

// Story audio source

storyMusic.src =

currentAudio.story;




/* =========================
   UI ELEMENTS
========================= */



// Play / Pause button

const storyPlayBtn =

document.getElementById(
  "story-play-btn"
);



// Seekbar

const seekbar =

document.getElementById(
  "story-seekbar"
);



// Current time text

const currentTimeText =

document.getElementById(
  "current-time"
);



// Duration text

const durationText =

document.getElementById(
  "duration"
);





/* =========================
   BG VOLUME SYSTEM
========================= */



// Story play hote hi
// BG volume low hoga

function lowerBGVolume() {

  if (window.bgMusic) {

    window.bgMusic.volume =
    0.2;

  }

}





// Story pause/end par
// BG volume normal hoga

function restoreBGVolume() {

  if (window.bgMusic) {

    window.bgMusic.volume =
    0.8;

  }

}





/* =========================
   LOAD STORY DURATION
========================= */



storyMusic.addEventListener(
  "loadedmetadata",
  () => {





    // Total duration UI

    if (durationText) {

      durationText.innerText =

      formatTime(
        storyMusic.duration
      );

    }

  }
);






/* =========================
   PLAY / PAUSE SYSTEM
========================= */




if (storyPlayBtn) {




  storyPlayBtn.addEventListener(
    "click",
    () => {





      /* =========================
         PLAY STORY
      ========================= */

      if (storyMusic.paused) {





        // Play story audio

        storyMusic.play()

        .then(() => {





          // Update button text

          storyPlayBtn.innerHTML =

          '<i class="bi bi-pause-fill"></i>';






          /* =========================
             START BG AUDIO
          ========================= */

          // BG engine hook

          if (
            window.startBGWithStory
          ) {

            window.startBGWithStory();

          }






          /* =========================
             LOWER BG VOLUME
          ========================= */

          lowerBGVolume();

        })





        .catch(() => {

          console.log(
            "Story play blocked"
          );

        });

      }







      /* =========================
         PAUSE STORY
      ========================= */

      else {





        // Pause story

        storyMusic.pause();






        // Restore BG volume

        restoreBGVolume();






        // Update button text

        storyPlayBtn.innerHTML =

        '<i class="bi bi-play-fill"></i>';

      }

    }
  );

}









/* =========================
   STORY PROGRESS SYSTEM
========================= */



storyMusic.addEventListener(
  "timeupdate",
  () => {





    /* =========================
       PROGRESS %
    ========================= */

    const progress =

      (
        storyMusic.currentTime
        /

        storyMusic.duration
      )

      * 100;






    // Update seekbar

    if (seekbar) {

      seekbar.value = progress;

    }






    /* =========================
       CURRENT TIME
    ========================= */

    if (currentTimeText) {

      currentTimeText.innerText =

      formatTime(
        storyMusic.currentTime
      );

    }






    /* =========================
       TOTAL DURATION
    ========================= */

    if (durationText) {

      durationText.innerText =

      formatTime(
        storyMusic.duration
      );

    }

  }
);










/* =========================
   SEEKBAR CONTROL
========================= */




if (seekbar) {




  seekbar.addEventListener(
    "input",
    () => {





      // Audio jump system

      storyMusic.currentTime =

        (
          seekbar.value / 100
        )

        *

        storyMusic.duration;

    }
  );

}






/* =========================
   10 SECOND SKIP CONTROLS
========================= */

// Back Button
const storyBackBtn =
document.getElementById("story-back-btn");

// Forward Button
const storyForwardBtn =
document.getElementById("story-forward-btn");


// 10 Seconds Back
if (storyBackBtn) {

  storyBackBtn.addEventListener(
    "click",
    () => {

      storyMusic.currentTime = Math.max(
        0,
        storyMusic.currentTime - 10
      );

    }
  );

}


// 10 Seconds Forward
if (storyForwardBtn) {

  storyForwardBtn.addEventListener(
    "click",
    () => {

      storyMusic.currentTime = Math.min(
        storyMusic.duration,
        storyMusic.currentTime + 10
      );

    }
  );

}








/* =========================
   VOLUME CONTROL
========================= */

// Volume Slider

const storyVolumeSlider =

document.getElementById(
  "story-volume-slider"
);


// Volume Button

const storyVolumeBtn =

document.getElementById(
  "story-volume-btn"
);





// Safety Check

if (

  storyVolumeSlider &&

  storyVolumeBtn

) {





  /* =========================
     DEFAULT VOLUME
  ========================= */

  storyMusic.volume =

  storyVolumeSlider.value / 100;






  /* =========================
     VOLUME SLIDER
  ========================= */

  storyVolumeSlider.addEventListener(

    "input",

    () => {





      // Update volume

      storyMusic.volume =

      storyVolumeSlider.value / 100;






      // Agar volume 0 hai

      if (

        storyVolumeSlider.value == 0

      ) {

        storyMusic.muted = true;

        storyVolumeBtn.innerHTML =

        '<i class="bi bi-volume-mute-fill"></i>';

      }






      // Agar volume 0 se upar hai

      else {

        storyMusic.muted = false;

        storyVolumeBtn.innerHTML =

        '<i class="bi bi-volume-up-fill"></i>';

      }

    }

  );






  /* =========================
     MUTE / UNMUTE BUTTON
  ========================= */

  storyVolumeBtn.addEventListener(

    "click",

    () => {





      // Agar muted hai

      if (

        storyMusic.muted

      ) {





        // Unmute

        storyMusic.muted = false;






        // Agar slider 0 par hai
        // to default volume 100%

        if (

          storyVolumeSlider.value == 0

        ) {

          storyVolumeSlider.value = 100;

          storyMusic.volume = 1;

        }






        // Change icon

        storyVolumeBtn.innerHTML =

         '<i class="bi bi-volume-up-fill"></i>';

      }






      // Agar muted nahi hai

      else {





        // Mute

        storyMusic.muted = true;






        // Change icon

       storyVolumeBtn.innerHTML =

          '<i class="bi bi-volume-mute-fill"></i>';

      }

    }

  );

}















/* =========================
   STORY SPEED CONTROL
========================= */



// Speed button

const storySpeedBtn =

document.getElementById(
  "story-speed-btn"
);





// Available playback speeds

const speedList = [

  0.75,
  1,
  1.25,
  1.5,
  2

];





// Default speed index
// 1 = 1x

let speedIndex = 1;





// Safety check

if (storySpeedBtn) {




  storySpeedBtn.addEventListener(

    "click",

    () => {





      /* =========================
         NEXT SPEED
      ========================= */

      speedIndex++;





      // Last speed ke baad
      // fir first speed

      if (

        speedIndex >=
        speedList.length

      ) {

        speedIndex = 0;

      }






      /* =========================
         APPLY SPEED
      ========================= */

      storyMusic.playbackRate =

      speedList[speedIndex];






      /* =========================
         UPDATE BUTTON TEXT
      ========================= */

      storySpeedBtn.textContent =

      speedList[speedIndex] + "x";

    }

  );

}




/* =========================
   STORY LANGUAGE SWITCH
========================= */

// Language Button

const storyLanguageBtn =
document.getElementById(
  "story-language-btn"
);


// English Story

const englishStory =
document.getElementById(
  "english-story"
);


// Hindi Story

const hindiStory =
document.getElementById(
  "hindi-story"
);


// Safety Check

if (

  storyLanguageBtn &&

  englishStory &&

  hindiStory

) {


  /* =========================
     DEFAULT LANGUAGE
  ========================= */

  // Hindi Story Visible

  hindiStory.style.display =
  "block";


  // English Story Hidden

  englishStory.style.display =
  "none";


  // Button shows next language

  storyLanguageBtn.textContent =
  "Eng";


  // Current Language

  let currentLanguage =
  "hindi";



  /* =========================
     LANGUAGE SWITCH BUTTON
  ========================= */

  storyLanguageBtn.addEventListener(

    "click",

    () => {


      /* =========================
         HINDI → ENGLISH
      ========================= */

      if (

        currentLanguage ===
        "hindi"

      ) {

        // Hide Hindi

        hindiStory.style.display =
        "none";


        // Show English

        englishStory.style.display =
        "block";


        // Button now shows Hindi

        storyLanguageBtn.textContent =
        "हिन्दी";


        // Update Current Language

        currentLanguage =
        "english";

      }



      /* =========================
         ENGLISH → HINDI
      ========================= */

      else {

        // Hide English

        englishStory.style.display =
        "none";


        // Show Hindi

        hindiStory.style.display =
        "block";


        // Button now shows English

        storyLanguageBtn.textContent =
        "Eng";


        // Update Current Language

        currentLanguage =
        "hindi";

      }

    }

  );

}









/* =========================
   STORY END SYSTEM
========================= */



// Story khatam hone par
// sirf UI reset hoga

storyMusic.addEventListener(
  "ended",
  () => {





    // Restore BG volume

    restoreBGVolume();






    // Reset button text

    if (storyPlayBtn) {

      storyPlayBtn.innerHTML  =

      '<i class="bi bi-play-fill"></i>';

    }

  }
);










/* =========================
   PAGE EXIT SAFETY
========================= */



window.addEventListener(
  "beforeunload",
  () => {





    // Stop story

    storyMusic.pause();






    // Reset story time

    storyMusic.currentTime = 0;






    // Restore BG volume

    restoreBGVolume();

  }
);












/* =========================
   TIME FORMAT FUNCTION
========================= */



function formatTime(time) {




  // Invalid time safety

  if (isNaN(time)) {

    return "0:00";

  }






  // Minutes

  const minutes =

  Math.floor(time / 60);






  // Seconds

  const seconds =

  Math.floor(time % 60);






  // Final formatted time

  return `${minutes}:${
    seconds < 10
    ? "0"
    : ""
  }${seconds}`;

}












/* =========================
   GLOBAL STORY STOP
========================= */



// Optional global stop hook

window.stopStoryAudio =
function () {





  // Pause story

  storyMusic.pause();






  // Reset story

  storyMusic.currentTime = 0;






  // Restore BG volume

  restoreBGVolume();






  // Reset button text

  if (storyPlayBtn) {

    storyPlayBtn.innerHTML =

    '<i class="bi bi-play-fill"></i>';

  }

};





}
);








