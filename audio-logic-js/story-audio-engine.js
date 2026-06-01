

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



// Agar audio missing hai

if (!currentAudio) {

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
    0.4;

  }

}





// Story pause/end par
// BG volume normal hoga

function restoreBGVolume() {

  if (window.bgMusic) {

    window.bgMusic.volume =
    0.9;

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

          storyPlayBtn.innerText =

          "pause story";






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

        storyPlayBtn.innerText =

        "play story";

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

      storyPlayBtn.innerText =

      "play story";

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

    storyPlayBtn.innerText =

    "play story";

  }

};









}
);