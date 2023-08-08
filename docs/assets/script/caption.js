const micCaptionElement = document.getElementById('mic-caption');
const audioCaptionElement = document.getElementById('audio-caption');
const maxLines = 3;
const captionLines = [];

for (let i = 0; i < maxLines; i++) {
  captionLines.push('');
}

// Set up Web Audio API context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioContext.createAnalyser();

// Set up WebRTC API to capture audio
navigator.mediaDevices
  .getUserMedia({ audio: true })
  .then(stream => {
    const audioSource = audioContext.createMediaStreamSource(stream);
    audioSource.connect(analyser);

    // Analyze audio data and update captions
    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const updateAudioCaptions = () => {
      analyser.getByteFrequencyData(dataArray);


      // Update the audio caption element with the visualization
      audioCaptionElement.innerHTML = audioVisualization;
      requestAnimationFrame(updateAudioCaptions);
    };

    updateAudioCaptions();
  })
  .catch(error => {
    console.error('Error capturing audio:', error);
  });