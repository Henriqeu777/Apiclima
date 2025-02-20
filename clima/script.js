// Função que captura o pressionamento de Enter e simula o clique no botão
document.getElementById("city-input").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        document.getElementById("submit-btn").click();  // Simula o clique no botão
    }
});

// Função para obter o clima da cidade
function getWeatherByCity() {
    const city = document.getElementById("city-input").value.trim();

    if (city === "") {
        alert("Por favor, insira o nome de uma cidade.");
        return;
    }

    const apiKey = "af7e3f17809ce951167ee4aca3cabb92";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Cidade não encontrada");
            }
            return response.json();
        })
        .then(data => {
            // Verifica se o estado está disponível
            const state = data.sys.state ? data.sys.state : 'Não disponível';
            
            // Exibe as informações do clima
            document.getElementById("city-name").innerText = `${data.name}, ${state}, ${data.sys.country}`;
            document.getElementById("temperature").innerText = data.main.temp;
            document.getElementById("weather").innerText = data.weather[0].description;
            document.getElementById("humidity").innerText = data.main.humidity;
            document.getElementById("wind-speed").innerText = (data.wind.speed * 3.6).toFixed(2); // Convertendo m/s para km/h
            document.getElementById("weather-info").classList.remove("d-none");

        })
        .catch(error => {
            alert("Erro ao obter os dados do clima.");
            console.error(error);
        });
}
