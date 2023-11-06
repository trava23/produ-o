document.addEventListener("DOMContentLoaded", function () {
    const inCheck = document.querySelector('#inCheck');
    const rangeTemperatura = document.querySelector('#inTemp');
    const rangeUmidade = document.querySelector('#inUmidade');
    const selectLavoura = document.querySelector('select');
    const outSugestao = document.getElementById('outSugestao');
    const outTemperatura = document.getElementById('outTemperatura');
    const outUmidade = document.getElementById('outUmidade');
    const outPrevisao = document.getElementById('outPrevisao');

    function atualizarDashboard() {
        let temperatura = rangeTemperatura.value;
        let umidade = rangeUmidade.value;
        let tipoLavoura = selectLavoura.value;

        outTemperatura.innerHTML = temperatura;
        outUmidade.innerHTML = umidade;

        // Chama a API para obter a previsão de chuva
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let response = JSON.parse(this.responseText);
                let previsao = response.forecast.forecastday[0].day.daily_chance_of_rain;
                outPrevisao.innerHTML = previsao;
            
                let regouHoje = inCheck.checked;
                let temperaturaModerada = temperatura <= 25;
                let temperaturaQuente = temperatura > 25;
                let soloUmido = umidade > 70;
                let soloPoucoUmido = umidade < 70;
            
                // Faz as verificações para sugerir algo ao agricultor
                if (previsao >= 80) {
                    outSugestao.textContent = "Há uma alta chance de chuva. Não é necessário regar a lavoura no momento.";
                } else if (regouHoje) {
                    outSugestao.textContent = "Você já regou a lavoura hoje. Não há necessidade de irrigação. Continue monitorando sua lavoura.";
                } else if (tipoLavoura == 'cafe') {
                    if (temperaturaModerada && soloPoucoUmido) {
                        outSugestao.textContent = "A temperatura esta moderada e o solo está pouco úmido. É recomendável regar a lavoura de Café.";
                    } else if (temperaturaQuente && soloPoucoUmido) {
                        outSugestao.textContent = "A temperatura esta quente e o solo está pouco úmido. Escolha regar quando o clima estiver mais fresco";
                    } else if (temperaturaQuente && soloUmido) {
                        outSugestao.textContent = "A temperatura esta quente e o solo está úmido. Escolha regar quando o clima estiver mais fresco";
                    } else if (temperaturaModerada && soloUmido) {
                        outSugestao.textContent = "A temperatura esta moderada e o solo está úmido. Não é necessário regar a lavoura de Café no momento.";
                    }
            
                } else if (tipoLavoura == 'milho') {
                    if (temperaturaQuente && soloPoucoUmido) {
                        outSugestao.textContent = "As condições estão secas e quentes. É recomendável regar a lavoura de Milho.";
                    } else if (temperaturaQuente && soloUmido) {
                        outSugestao.textContent = "A temperatura esta quente e o solo está úmido. Não é necessário regar a lavoura de Milho no momento.";
                    } else if (temperaturaModerada && soloUmido) {
                        outSugestao.textContent = "A temperatura esta moderada e o solo está úmido. Não é necessário regar a lavoura de Milho no momento.";
                    } else if (temperaturaModerada && soloPoucoUmido) {
                        outSugestao.textContent = "A temperatura esta moderada e o solo está pouco úmido. Não é necessário regar a lavoura de Milho.";
                    }
            
                } else if (tipoLavoura == 'tomate') {
                    if (temperaturaModerada && soloPoucoUmido) {
                        outSugestao.textContent = "A temperatura esta moderada e o solo está pouco úmido. É recomendável regar a lavoura de Tomate.";
                    } else if (temperaturaQuente && soloPoucoUmido) {
                        outSugestao.textContent = "A temperatura esta quente e o solo pouco úmido. Escolha regar quando o clima estiver mais fresco";
                    } else if (temperaturaQuente && soloUmido) {
                        outSugestao.textContent = "A temperatura esta quente e o solo úmido. Não é necessário regar a lavoura de Tomate no momento.";
                    } else if (temperaturaModerada && soloUmido) {
                        outSugestao.textContent = "A temperatura esta moderada e o solo está úmido. Não é necessário regar a lavoura de Tomate no momento.";
                    }
                }
            }            
        };
        xhttp.open("GET", "http://api.weatherapi.com/v1/forecast.json?key=444c0448c742407a9fc144318230611&q=-19.8050229,-40.6774014&days=1&aqi=no&alerts=no", true);
        xhttp.send();
    }
    atualizarDashboard();

    rangeTemperatura.addEventListener('input', atualizarDashboard);
    rangeUmidade.addEventListener('input', atualizarDashboard);
    selectLavoura.addEventListener('change', atualizarDashboard);
    inCheck.addEventListener('change', atualizarDashboard);
});