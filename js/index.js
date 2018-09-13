let recordVideo = () => {

}

let stopVideoRecording = () => {
  
}

let streamWebcam = (stream) => {
  document.getElementById('welcome-texts').style.display = "none";
  document.getElementById('detect-and-start').style.display = "none";
  document.getElementsByClassName('video-area')[0].style.display = "block";
  const video = document.getElementById('video');
  video.src = window.URL.createObjectURL(stream);
  video.play();
}

let errorHandler = (e) => {

  if (e.name === 'NotAllowedError') {
    document.getElementById('detect-text').innerHTML = 'You should have given permission to use the webcam';
  }
  console.log('error: ' + e.name);
}

let isUserMediaDetected = (detected) => {
  if (detected) {
    document.getElementById('detect-text').innerHTML = 'cool, let\'s start';
  } else {
    document.getElementById('detect-text').innerHTML = 'uh, could not detect a webcam. sorry 🤷‍';
  }
}

let showVideoArea = () => {
  navigator.getUserMedia({ video: true, audio: true }, streamWebcam, errorHandler);
}


let detectUserMedia = () => {
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.oGetUserMedia || navigator.msGetUserMedia;
  if (navigator.getUserMedia) {
    document.getElementById('detect-text').innerHTML = 'cool, let\'s start';
    setTimeout(() => {
      document.getElementById('start-video-button').style.display = 'inline-block';
    }, 1000);
  } else {
    document.getElementById('detect-text').innerHTML = 'uh, could not detect a webcam. sorry 🤷‍';
  }
}

let onboard = () => {
  setTimeout(() => {
    document.getElementById('welcome-text-1').style.opacity = 1;
  }, 1000);

  setTimeout(() => {
    document.getElementById('welcome-text-2').style.opacity = 1;
  }, 2000);

  setTimeout(() => {
    detectUserMedia();
  }, 4000);
}


window.onload = () => {
  document.getElementById('start-video-button').onclick = showVideoArea;
  document.getElementById('video-record-button').onclick = recordVideo;
  document.getElementById('video-stop-button').onclick = stopVideoRecording;
  
  onboard();
}

