// Função que captura o pressionamento de Enter e simula o clique no botão
document.getElementById("city-input").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        document.getElementById("submit-btn").click();
    }
});

// Função para obter o clima e informações da cidade
function getWeatherByCity() {
    const city = document.getElementById("city-input").value.trim();

    if (city === "") {
        alert("Por favor, insira o nome de uma cidade.");
        return;
    }

    const apiKey = "af7e3f17809ce951167ee4aca3cabb92";
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=${apiKey}`;
    const geocodeApiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${city}`;

    // Busca informações meteorológicas
    fetch(weatherApiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Cidade não encontrada");
            }
            return response.json();
        })
        .then(data => {
            document.getElementById("city-name").innerText = `${data.name}, ${data.sys.country}`;
            document.getElementById("temperature").innerText = data.main.temp;
            document.getElementById("weather").innerText = data.weather[0].description;
            document.getElementById("humidity").innerText = data.main.humidity;
            document.getElementById("wind-speed").innerText = (data.wind.speed * 3.6).toFixed(2); // Convertendo m/s para km/h

            // Exibe as informações do clima
            document.getElementById("weather-info").classList.remove("d-none");

            // Busca informações geográficas adicionais
            return fetch(geocodeApiUrl);
        })
        .then(response => response.json())
        .then(geoData => {
            if (geoData.length > 0) {
                const info = geoData[0];
                document.getElementById("state").innerText = info.state || "Não disponível";
                document.getElementById("country").innerText = info.country || "Não disponível";
                document.getElementById("region").innerText = info.region || "Não disponível";
                document.getElementById("continent").innerText = info.continent || "Não disponível";
            } else {
                alert("Não foi possível obter informações geográficas adicionais.");
            }
        })
        .catch(error => {
            alert("Erro ao obter os dados.");
            console.error(error);
        });
}

// Evento de clique no botão para obter o clima
document.getElementById("submit-btn").addEventListener("click", getWeatherByCity);
