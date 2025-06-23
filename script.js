const API_KEY = "5e0fca7e9475cf284a95d2c3fb8d5de7";

document.getElementById("getWeather").addEventListener("click", async () => {
  const city = document.getElementById("city").value.trim();
  const error = document.getElementById("error");
  const result = document.getElementById("weatherResult");
  error.classList.add("hidden");
  result.classList.add("hidden");

  if (!city) return;

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    if (!res.ok) throw new Error("City not found");

    const data = await res.json();
    document.getElementById("location").innerText = `${data.name}, ${data.sys.country}`;
    document.getElementById("temp").innerText = `🌡️ ${Math.round(data.main.temp)}°C`;
    document.getElementById("desc").innerText = data.weather[0].description;
    document.getElementById("icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    result.classList.remove("hidden");
  } catch (err) {
    error.innerText = "City not found. Please try again.";
    error.classList.remove("hidden");
  }
});

document.getElementById("toggle-theme").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});
