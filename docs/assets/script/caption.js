const micCaptionElement = document.getElementById('mic-caption');
const audioCaptionElement = document.getElementById('audio-caption');
const maxLines = 3;
const captionLines = [];

for (let i = 0; i < maxLines; i++) {
  captionLines.push('');
}

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioContext.createAnalyser();

navigator.mediaDevices
  .getUserMedia({ audio: true })
  .then(stream => {
    const audioSource = audioContext.createMediaStreamSource(stream);
    audioSource.connect(analyser);

    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const updateAudioCaptions = () => {
      analyser.getByteFrequencyData(dataArray);

    };
    updateAudioCaptions();
  })
  .catch(error => {
    console.error('Error capturing audio:', error);
  });