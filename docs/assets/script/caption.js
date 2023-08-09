const clockElement = document.getElementById('clock');
const keepAliveInterval = 1000;
const updateClock = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = (hours % 12) || 12;

  clockElement.textContent = `${displayHours}:${minutes} ${ampm}`;
};
setInterval(updateClock, keepAliveInterval);

const captionElement = document.getElementById('caption');
const captionElement1 = document.getElementById('caption1');
const captionElement2 = document.getElementById('caption2');
const maxLines = 3; 
const captionLines = [];

for (let i = 0; i < maxLines; i++) {
  captionLines.push('');
}

if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

  recognition.continuous = true;

  recognition.onresult = (event) => {
    const lastResultIndex = event.results.length - 1;
    const lastResult = event.results[lastResultIndex][0].transcript;

    const lines = lastResult.split('\n').slice(0, maxLines);

    // Shift the lines up by one
    for (let i = 0; i < maxLines - 1; i++) {
      captionLines[i] = captionLines[i + 1];
    }

    captionLines[maxLines - 1] = lines[0] || '';

    // Update the caption elements
    captionElement.textContent = captionLines[0];
    captionElement1.textContent = captionLines[1];
    captionElement2.textContent = captionLines[2];
  };

  recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
  };

  recognition.start();
} else {
  captionElement.textContent = 'Speech recognition is not supported in this browser.';
  captionElement1.textContent = 'Speech recognition is not supported in this browser.';
  captionElement2.textContent = 'Speech recognition is not supported in this browser.';
}
