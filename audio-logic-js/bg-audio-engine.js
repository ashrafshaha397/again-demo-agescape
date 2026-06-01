

/* =========================
   AGESCAPE BG AUDIO ENGINE
   FINAL CINEMATIC VERSION 🎬
   =========================

   FEATURES:

   ✅ Overlay unlock system
   ✅ Hard refresh reset
   ✅ Session based permission
   ✅ Session based BG ON/OFF memory
   ✅ Multi tab safe
   ✅ Home auto BG
   ✅ Story hook support
   ✅ Tooltip support
   ✅ Manual BG control
   ✅ Only active tab audio
========================= */









/* =========================
   REFRESH DETECTION SYSTEM
========================= */

// Page refresh detect

const navEntries =

performance.getEntriesByType(
  "navigation"
);


// Agar refresh hua

if (

  navEntries.length > 0

  &&

  navEntries[0].type === "reload"

) {

  // Audio permission reset

  sessionStorage.removeItem(
    "audioUnlocked"
  );



  // BG state reset

  sessionStorage.removeItem(
    "bgMusicEnabled"
  );

}













/* =========================
   DOM READY
========================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {





/* =========================
   BG AUDIO OBJECT
========================= */



// Background music object

const bgMusic =
new Audio();



// Global access for story engine

window.bgMusic = bgMusic;

// Global access for story engine


// BG audio loop ON

bgMusic.loop = true;





/* =========================
   CURRENT PAGE
========================= */



// Current page name
// Example:
// home
// story-1
// story-2

const currentPage =

document.body.dataset.page;





/* =========================
   AUDIO MAP DATA
========================= */



// Current page audio data

const currentAudio =

audioMap[currentPage];





/* =========================
   SAFETY CHECK
========================= */



// Agar audio data nahi mila

if (!currentAudio) {

  console.log(
    "No BG audio found"
  );

  return;

}





/* =========================
   BG AUDIO SOURCE
========================= */



// Current page bg source

bgMusic.src =

currentAudio.bg;





/* =========================
   UI ELEMENTS
========================= */



// Overlay

const audioOverlay =

document.getElementById(
  "audioOverlay"
);



// Audio button

const audioBtn =

document.querySelector(
  ".audio-btn"
);



// Volume ON icon

const volumeIcon =

document.querySelector(
  ".bi-volume-up"
);



// Volume OFF icon

const muteIcon =

document.querySelector(
  ".bi-volume-mute"
);



// Audio tooltip

const audioTip =

document.querySelector(
  ".audio-tip"
);





/* =========================
   STORAGE SYSTEM
========================= */



/*
   AUDIO PERMISSION
   ----------------
   sessionStorage use hua hai

   RESULT:
   ✅ same tab page change → permission rahegi
   ✅ story pages → permission rahegi
   ✅ hard refresh → reset
*/

const audioUnlocked =

sessionStorage.getItem(
  "audioUnlocked"
) === "true";




/*
   BG MUSIC STATE
   ----------------
   sessionStorage use hua hai

   RESULT:
   ✅ user BG OFF kare
      to pages change par OFF rahega

   ✅ refresh par reset
*/

const savedBGState =

sessionStorage.getItem(
  "bgMusicEnabled"
);




// Default BG state

let bgEnabled =

savedBGState !== "false";





/* =========================
   DEFAULT ICON STATE
========================= */



// Default mute icon hide

if (muteIcon) {

  muteIcon.style.display =
  "none";

}





/* =========================
   APPLY SAVED BG STATE
========================= */



// Agar BG OFF saved hai

if (!bgEnabled) {

  if (volumeIcon) {

    volumeIcon.style.display =
    "none";

  }

  if (muteIcon) {

    muteIcon.style.display =
    "inline";

  }

}





/* =========================
   PLAY BG FUNCTION
========================= */



function playBG() {




  // Agar BG disabled hai
  // to play mat karo

  if (!bgEnabled) {

    return;

  }






  bgMusic.play()

  .then(() => {





    // Current active tab save

    localStorage.setItem(
      "AGESCAPE_ACTIVE_TAB",
      currentPage
    );






    // ON icon show

    if (volumeIcon) {

      volumeIcon.style.display =
      "inline";

    }






    // OFF icon hide

    if (muteIcon) {

      muteIcon.style.display =
      "none";

    }

  })






  .catch(() => {

    console.log(
      "BG autoplay blocked"
    );

  });

}





/* =========================
   PAUSE BG FUNCTION
========================= */



function pauseBG() {




  // BG pause

  bgMusic.pause();






  // ON icon hide

  if (volumeIcon) {

    volumeIcon.style.display =
    "none";

  }






  // OFF icon show

  if (muteIcon) {

    muteIcon.style.display =
    "inline";

  }

}





/* =========================
   FIRST VISIT OVERLAY
========================= */



// Agar permission nahi mili

if (!audioUnlocked) {




  // Overlay show

  if (audioOverlay) {

    audioOverlay.style.display =
    "flex";

  }






  // Tooltip show

  if (audioTip) {

    audioTip.classList.add(
      "show"
    );

  }

}





/* =========================
   RETURN VISIT
========================= */



// Agar permission mil chuki

else {




  // Overlay hide

  if (audioOverlay) {

    audioOverlay.style.display =
    "none";

  }






  // Tooltip hide

  if (audioTip) {

    audioTip.classList.remove(
      "show"
    );

  }






  // Home page auto BG

  if (

    currentPage === "home"

    &&

    bgEnabled

  ) {

    playBG();

  }

}





/* =========================
   GLOBAL CLICK UNLOCK
========================= */



/*
   Screen par kahi bhi click:

   ✅ overlay
   ✅ button
   ✅ page
   ✅ anywhere

   → audio unlock
*/

document.addEventListener(

  "click",

  () => {





    // Agar already unlocked hai

    if (

      sessionStorage.getItem(
        "audioUnlocked"
      ) === "true"

    ) {

      return;

    }






    /* =========================
       SAVE AUDIO PERMISSION
    ========================= */

    sessionStorage.setItem(
      "audioUnlocked",
      "true"
    );






    /* =========================
       HIDE OVERLAY
    ========================= */

    if (audioOverlay) {

      audioOverlay.style.display =
      "none";



      audioOverlay.style.opacity =
      "0";



      audioOverlay.style.pointerEvents =
      "none";

    }






    /* =========================
       HIDE TOOLTIP
    ========================= */

    if (audioTip) {

      audioTip.classList.remove(
        "show"
      );

    }






    /* =========================
       HOME PAGE AUTO BG
    ========================= */

    if (

      currentPage === "home"

      &&

      bgEnabled

    ) {

      playBG();

    }

  }

);





/* =========================
   BG TOGGLE BUTTON
========================= */



if (audioBtn) {




  audioBtn.addEventListener(
    "click",
    () => {





      /* =========================
         TURN ON BG
      ========================= */

      if (bgMusic.paused) {




        // BG enabled

        bgEnabled = true;






        // Save state

        sessionStorage.setItem(
          "bgMusicEnabled",
          "true"
        );






        // Play BG

        playBG();

      }







      /* =========================
         TURN OFF BG
      ========================= */

      else {




        // BG disabled

        bgEnabled = false;






        // Save state

        sessionStorage.setItem(
          "bgMusicEnabled",
          "false"
        );






        // Pause BG

        pauseBG();

      }

    }
  );

}





/* =========================
   MULTI TAB CONTROL
========================= */



window.addEventListener(
  "storage",
  (event) => {





    // Active tab changed

    if (

      event.key ===
      "AGESCAPE_ACTIVE_TAB"

    ) {






      /* =========================
         OTHER TAB ACTIVE
      ========================= */

      if (

        event.newValue !==
        currentPage

      ) {

        pauseBG();

      }







      /* =========================
         CURRENT TAB ACTIVE
      ========================= */

      else {




        if (

          sessionStorage.getItem(
            "audioUnlocked"
          ) === "true"

          &&

          bgEnabled

        ) {

          playBG();

        }

      }

    }

  }
);





/* =========================
   TAB FOCUS SYSTEM
========================= */



window.addEventListener(
  "focus",
  () => {





    // Current tab active save

    localStorage.setItem(
      "AGESCAPE_ACTIVE_TAB",
      currentPage
    );






    // Auto resume only home

    if (

      currentPage === "home"

      &&

      sessionStorage.getItem(
        "audioUnlocked"
      ) === "true"

      &&

      bgEnabled

    ) {

      playBG();

    }

  }
);





/* =========================
   TAB HIDE SYSTEM
========================= */



document.addEventListener(
  "visibilitychange",
  () => {





    // Agar tab hidden hai

    if (document.hidden) {

      pauseBG();

    }

  }
);





/* =========================
   STORY ENGINE HOOK
========================= */



/*
   Story engine use karega:

   story play →
   bg auto start
*/

window.startBGWithStory =
function () {




  if (

    sessionStorage.getItem(
      "audioUnlocked"
    ) === "true"

    &&

    bgEnabled

  ) {

    playBG();

  }

};





/* =========================
   GLOBAL STOP FUNCTION
========================= */



window.stopAllAGESCAPEAudio =
function () {

  pauseBG();

};





}
);