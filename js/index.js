const video = document.getElementById('video');
let recorder;
let STREAM;

let startVideoRecording = () => {

  initializeUserMedia();
  document.getElementById('record-start-button').classList.add('disabled');

  video.setAttribute('controls', 'true');
  video.muted = true;

  recorder = new RecordRTCPromisesHandler(STREAM, {
    mimeType: 'video/webm',
    bitsPerSecond: 128000
  });

  recorder.startRecording().then(function () {
    console.info('Recording video ...');
  }).catch(function (error) {
    console.error('Cannot start video recording: ', error);
  });

  recorder.stream = STREAM;

  document.getElementById('record-stop-button').classList.remove('disabled');

}

let stopVideoRecording = () => {

  document.getElementById('record-stop-button').classList.add('disabled');

  recorder.stopRecording().then(function () {
    console.info('stopRecording success');

    // Retrieve recorded video as blob and display in the preview element
    var blob = recorder.getBlob();
    video.src = URL.createObjectURL(blob);
    video.play();

    video.muted = false;

    recorder.stream.stop();

    document.getElementById('record-start-button').classList.remove('disabled');
    video.setAttribute('controls', 'true');
  })
}

let streamWebcam = (stream) => {
  STREAM = stream;
  document.getElementById('welcome-texts').style.display = "none";
  document.getElementById('detect-and-start').style.display = "none";
  document.getElementsByClassName('video-area')[0].style.display = "block";
  video.src = window.URL.createObjectURL(stream);
  video.play();
  video.muted = true;
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

let initializeUserMedia = () => {
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
  document.getElementById('start-video-button').onclick = initializeUserMedia;
  document.getElementById('record-start-button').onclick = startVideoRecording;
  document.getElementById('record-stop-button').onclick = stopVideoRecording;

  onboard();
}

