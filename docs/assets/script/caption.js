const captionElement = document.getElementById('caption');
const maxLines = 3; // Set the maximum number of lines for captions
const captionLines = [];

// Initialize the caption lines
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

    // Shift the lines up and add the new result to the last line
    captionLines.shift();
    captionLines.push(lastResult);

    // Update the caption text with the latest recognized speech lines
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