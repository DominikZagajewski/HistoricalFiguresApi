const button = document.getElementById("search-button");

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    button.click();
  }
});

document.getElementById("search-button").addEventListener("click", function () {
  const query = document.getElementById("search-input").value;
  fetchHistoricalFigure(query);
});

async function fetchHistoricalFigure(name) {
  const apiKey = "CZbQqQ1kn1RtcUVX8FZcfw==st0lHTQXlPNE7QR3";
  const url = `https://api.api-ninjas.com/v1/historicalfigures?name=${name}`;

  try {
    const response = await fetch(url, {
      headers: {
        "X-Api-Key": apiKey,
      },
    });

    if (!response.ok) {
      throw new Error("Błąd sieci");
    }

    const data = await response.json();
    displayResult(data);
  } catch (error) {
    console.error("Wystąpił problem z fetch:", error);
  }
}

function displayResult(data) {
  if (data.length === 0) {
    alert("Nie znaleziono postaci");
    return;
  }

  const figure = data[0];

  document.getElementById("name").innerText = figure.name || "Brak danych";
  document.getElementById("title").innerText = `Tytuł: ${
    figure.title || "Brak danych"
  }`;
  document.getElementById("birth").innerText = `Urodziny: ${
    figure.info.born || "Brak danych"
  }`;

  document.getElementById("death").innerText = `Śmierć: ${
    figure.info.died || "Brak danych"
  }`;
}
