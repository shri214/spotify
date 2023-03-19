let songindex = 0;
let audioElement = new Audio("1.mp3");
let masterPlay = document.getElementById("masterPlay");
let runner = document.getElementById("runner");
let gif = document.getElementById("gif");
let timespan = document.getElementById("timespan");
let songitems = Array.from(document.getElementsByClassName("songitems"));
// audioElement.play();
let showsongname = document.getElementById("showsongname");
let nn = Array.from(document.getElementsByClassName("songname"));
let songs = [
  {
    songName: "Dil deewan dhoodhata hai",
    filePath: "1.mp3",
    coverPath: "1196306.jpg",
  },
  {
    songName: "Pata nahi kis roop me narayan",
    filePath: "2.mp3",
    coverPath: "54f33b54b1409e167e385f098f401e64.jpg",
  },
  {
    songName: "jabse dekha tumko khoye khoye",
    filePath: "3.mp3",
    coverPath: "71b3e4159892bb319292ab3b76900930.jpg",
  },
  {
    songName: "Dekhane walo ne kya kya dekha",
    filePath: "4.mp3",
    coverPath: "81af2e641be60a7a5db12e1e32a088a1.jpg",
  },
  {
    songName: "Jabase maine tumhe dekha sanam",
    filePath: "5.mp3",
    coverPath: "5cbc418707a54c8190a17ae0f8314e91.jpg",
  },
  {
    songName: "shiv tandav",
    filePath: "6.mp3",
    coverPath: "5d67009f94cf72a8d5c3cf7bc1af2955.jpg",
  },
  {
    songName: "Main bhola tandav kara karu",
    filePath: "7.mp3",
    coverPath: "5ebc82c6c0cb997ec65d2c6431539f7c.jpg",
  },
  {
    songName: "Bhojpuri song",
    filePath: "8.mp3",
    coverPath: "76db8a56b32de25b3522a5ab8c574192.jpg",
  },
  {
    songName: "Haye mera dil",
    filePath: "9.mp3",
    coverPath: "1271796.jpg",
  },
];
//updating coverimage and songname by javascript
songitems.forEach((element, i) => {
  // console.log(element, i);
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.querySelectorAll(".songname")[0].textContent = songs[i].songName;
});

// making a master button it make default song and play
// using click events through it we have control over the song paly and pause
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.textContent = "pause_circle";
    showsongname.textContent = "Dil deewan dhoodhata hai";
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.textContent = "play_circle";
    makeplayall();
    gif.style.opacity = 0;
  }
});

//using timeupdat event which can help to track the song time
//when song start it also start to time updating
// that itme update to runner value;
//besically it move with song
audioElement.addEventListener("timeupdate", () => {
  // console.log("timeupdate");
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  runner.value = progress;
  console.log(runner.value);
  if (runner.value == 100) {
    runner.value = 0;
    masterPlay.textContent = "play_circle";
    gif.style.opacity = 0;
  }
});

// when we click on runner at any particular place than we can calculate
//the time and make song time at value to rnner value
runner.addEventListener("change", () => {
  audioElement.currentTime = (runner.value * audioElement.duration) / 100;
});

//make all list song initailly pause
const makeplayall = () => {
  Array.from(document.getElementsByClassName("songplayitem")).forEach((e) => {
    e.textContent = "play_circle";
  });
};
Array.from(document.getElementsByClassName("songplayitem")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      console.log(e.target.id);
      songindex = parseInt(e.target.id);
      makeplayall();
      audioElement.src = `${songindex}.mp3`;

      //updating song name in control panner
      for (let i = songindex - 1; i < songindex; i++) {
        let element = nn[i];
        showsongname.textContent = element.textContent;
      }

      audioElement.currentTime = 0;
      audioElement.play();
      e.target.textContent = "pause_circle";
      gif.style.opacity = 1;
      document.getElementById("masterPlay").textContent = "pause_circle";
    });
  }
);

document.getElementById("next").addEventListener("click", () => {
  if (songindex >= 9) {
    songindex = 1;
  } else {
    songindex += 1;
  }
  audioElement.src = `${songindex}.mp3`;
  audioElement.currentTime = 0;
  audioElement.play();
  //updating song name in control panner
  for (let i = songindex - 1; i < songindex; i++) {
    let element = nn[i];
    showsongname.textContent = element.textContent;
  }
  gif.style.opacity = 1;
  document.getElementById("masterPlay").textContent = "pause_circle";
});
document.getElementById("prev").addEventListener("click", () => {
  if (songindex <= 1) {
    songindex = 9;
  } else {
    songindex -= 1;
  }
  audioElement.src = `${songindex}.mp3`;
  audioElement.currentTime = 0;
  audioElement.play();
  //updating song name in control panner
  for (let i = songindex - 1; i < songindex; i++) {
    let element = nn[i];
    showsongname.textContent = element.textContent;
  }
  gif.style.opacity = 1;
  document.getElementById("masterPlay").textContent = "pause_circle";
});
