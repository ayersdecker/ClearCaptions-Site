const captionElement = document.getElementById('caption');
const maxLines = 3;
const captionLines = [];

for (let i = 0; i < maxLines; i++) {
  captionLines.push('');
}

// Check if the browser supports the Web Speech API
if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

  // Set continuous to true for live captions
  recognition.continuous = true;

  // When speech recognition returns a result
  recognition.onresult = (event) => {
    const lastResultIndex = event.results.length - 1;
    const lastResult = event.results[lastResultIndex][0].transcript;

    // Split the recognized text into lines
    const lines = lastResult.split('\n').slice(0, maxLines);

    // Update the caption lines with the latest recognized speech
    for (let i = 0; i < maxLines; i++) {
      captionLines[i] = lines[i] || '';
    }

    // Update the caption text with the lines
    captionElement.innerHTML = captionLines.map(line => `<p>${line}</p>`).join('');
  };

  // When an error occurs
  recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
  };

  // Start speech recognition
  recognition.start();
} else {
  captionElement.textContent = 'Speech recognition is not supported in this browser.';
}
