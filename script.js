const video = document.querySelector("video");
const speed = document.querySelector(".player-speed");
const progressRange = document.querySelector(".progress-range");
const progressBar = document.querySelector(".progress-bar");
const playBtn = document.getElementById("play-btn");
const volumeIcon = document.getElementById("volume-icon");
const volumeRange = document.querySelector(".volume-range");
const volumeBar = document.querySelector(".volume-bar");
const currentTIme = document.querySelector(".time-elapsed");
const duration = document.querySelector(".time-duration");
const fullscreenBtn = document.querySelector(".fullscreen");
const player = document.querySelector(".player");

// Play & Pause ----------------------------------- //
function showPlayIcon() {
    playBtn.classList.replace("fa-pause", "fa-play");
    playBtn.setAttribute("title", "Play");
}
function togglePlay() {
    if (video.paused) {
        video.play();
        playBtn.classList.replace("fa-play", "fa-pause");
        playBtn.setAttribute("title", "Pause");
    } else {
        video.pause();
        showPlayIcon();
    }
}

// On Video End, show play button icon
video.addEventListener("ended", showPlayIcon);

// Progress Bar ---------------------------------- //
// Calculate display bar as video plays
function displayTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    seconds = seconds > 9 ? seconds : `0${seconds}`;
    return `${minutes} : ${seconds}`;
}

// Click to seek within the video
function setProgress(e) {
    const newTime = e.offsetX / progressRange.offsetWidth;
    progressBar.style.width = `${newTime * 100}%`;
    video.currentTime = newTime * video.duration;
}
// Update Progress bar as video plays
function updateProgress() {
    progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
    currentTIme.textContent = `${displayTime(video.currentTime)} /`;
    duration.textContent = `${displayTime(video.duration)}`;
}
// Volume Controls --------------------------- //

let lastVolume = 1;

// Volume Bar
function changeVolume(e) {
    let Volume = e.offsetX / volumeRange.offsetWidth;
    // Rounding volume up or down
    if (Volume < 0.1) {
        Volume = 0;
    }
    if (Volume > 0.9) {
        Volume = 1;
    }
    volumeBar.style.width = `${Volume * 100}%`;
    video.volume = Volume;
    // Change icon depending on volume
    volumeIcon.className = "";
    if (Volume > 0.7) {
        volumeIcon.classList.add("fas", "fa-volume-up");
    } else if (Volume < 0.7 && Volume > 0) {
        volumeIcon.classList.add("fas", "fa-volume-down");
    } else if (Volume === 0) {
        volumeIcon.classList.add("fas", "fa-volume-off");
    }
    lastVolume = Volume;
}

// Mute/Unmute
function toggleMute() {
    volumeIcon.className = "";
    if (video.volume) {
        lastVolume = video.volume;
        video.volume = 0;
        volumeBar.style.width = 0;
        volumeIcon.classList.add("fas", "fa-volume-mute");
        volumeIcon.setAttribute("title", "Unmute");
    } else {
        video.volume = lastVolume;
        volumeBar.style.width = `${lastVolume * 100}%`;
        volumeIcon.classList.add("fas", "fa-volume-up");
        volumeIcon.setAttribute("title", "Mute");
    }
}
// Change Playback Speed -------------------- //
function changeSpeed() {
    video.playbackRate = speed.value;
}

// Fullscreen ------------------------------- //
/* View in fullscreen */
function openFullscreen(elem) {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
        /* Firefox */
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        /* IE/Edge */
        elem.msRequestFullscreen();
    }
    video.classList.add("video-fullscreen");
}
/* Close fullscreen */
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        /* Firefox */
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        /* IE/Edge */
        document.msExitFullscreen();
    }
    video.classList.remove("video-fullscreen");
}

let fullscreen = false;
// Toggle Fullscreen
function toggleFullScreen() {
    if (!fullscreen) {
        openFullscreen(player);
    } else {
        closeFullscreen();
    }
    fullscreen = !fullscreen;
}

// Event Listeners
playBtn.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);
video.addEventListener("timeupdate", updateProgress);
video.addEventListener("canplay", updateProgress);
progressRange.addEventListener("click", setProgress);
volumeRange.addEventListener("click", changeVolume);
volumeIcon.addEventListener("click", toggleMute);
speed.addEventListener("change", changeSpeed);
fullscreenBtn.addEventListener("click", toggleFullScreen);
