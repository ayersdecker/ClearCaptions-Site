const captionElement = document.getElementById('caption');

// Check if the browser supports the Web Speech API
if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

  // Set continuous to true for live captions
  recognition.continuous = true;

  // When speech recognition returns a result
  recognition.onresult = (event) => {
    const lastResultIndex = event.results.length - 1;
    const lastResult = event.results[lastResultIndex][0].transcript;

    // Update the caption text with the latest recognized speech
    captionElement.textContent = lastResult;
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