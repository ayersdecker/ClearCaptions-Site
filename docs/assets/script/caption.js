const captionElement = document.getElementById('caption');
const maxLines = 3; 
const captionLines = [];

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

    for (let i = 0; i < maxLines; i++) {
      captionLines[i] = lines[i] || '';
    }

    captionElement.innerHTML = captionLines.map(line => `<p>${line}</p>`).join('');
  };

  recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
  };

  recognition.start();
} else {
  captionElement.textContent = 'Speech recognition is not supported in this browser.';
}

