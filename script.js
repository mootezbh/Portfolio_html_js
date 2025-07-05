// age
const birthDate = new Date("2000-07-11T00:00:00Z");

function updateAge() {
  const now = new Date();
  const ageInMilliseconds = now - birthDate;
  const msPerYear = 1000 * 60 * 60 * 24 * 365.2425;
  const age = ageInMilliseconds / msPerYear;

  document.getElementById("age").textContent = age.toFixed(8) + " years old";
}
setInterval(updateAge, 50);

const city = "Sousse";

// weather
async function fetchWeather() {
  try {
    const url = `https://wttr.in/${encodeURIComponent(city)}?format=j1`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Weather data fetch failed");

    const data = await response.json();

    const current = data.current_condition[0];
    const tempC = current.temp_C;
    const description = current.weatherDesc[0].value;
    const windSpeed = current.windspeedKmph;
    const humidity = current.humidity;
    const precipitation = current.precipInches;

    const feelsLike = current.FeelsLikeC;
    const visibility = current.visibility;
    const uvIndex = current.uvIndex;
    const pressure = current.pressure;

    document.getElementById("temp").textContent = `${tempC}°C`;
    document.getElementById("description").textContent = description;
    document.getElementById("windSpeed").textContent = `${windSpeed} km/h`;
    document.getElementById("humidity").textContent = `${humidity}% Humidity`;
    document.getElementById("precipitation").textContent = `${(
      parseFloat(precipitation) * 100
    ).toFixed(0)}%`;
    document.getElementById(
      "detailedDescription"
    ).textContent = `Feels like: ${feelsLike}°C | Visibility: ${visibility} km | UV Index: ${uvIndex} | Pressure: ${pressure} mb`;
  } catch (error) {
    console.error("Failed to load weather:", error);
  }
}
fetchWeather();
setInterval(fetchWeather, 10 * 60 * 1000);

// music player
const audio = document.getElementById("audioPlayer");
const playBtn = document.getElementById("playBtn");
const playIcon = document.getElementById("playIcon");
const progressBar = document.getElementById("progressBar");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");

let isPlaying = false;

playBtn.addEventListener("click", () => {
  if (isPlaying) {
    audio.pause();
  } else {
    audio.play();
  }
});

audio.addEventListener("play", () => {
  isPlaying = true;
  playIcon.innerHTML = `<path d="M6 4h4v16H6zM14 4h4v16h-4z"/>`; // pause icon
});

audio.addEventListener("pause", () => {
  isPlaying = false;
  playIcon.innerHTML = `<path d="M5 3l14 9-14 9V3z" />`; // play icon
});

audio.addEventListener("timeupdate", () => {
  const current = audio.currentTime;
  const duration = audio.duration;
  const percent = (current / duration) * 100;
  progressBar.style.width = `${percent}%`;

  currentTimeEl.textContent = formatTime(current);
  durationEl.textContent = formatTime(duration);
});

function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${min}:${sec}`;
}
