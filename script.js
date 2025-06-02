document.getElementById("diagnostic-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Empêche le rechargement de la page

    let surface = parseFloat(document.getElementById("surface").value);
    let phosphore = parseFloat(document.getElementById("phosphore").value);
    let resultatsDiv = document.getElementById("resultats");

    if (surface > 0 && phosphore > 0) {
        let tailleIlot = (surface * 0.07).toFixed(2); // Exemple basé sur le 7% évoqué
        resultatsDiv.innerHTML = `<p>Vous devriez envisager un îlot végétalisé d'environ <strong>${tailleIlot} m²</strong>.</p>`;
    } else {
        resultatsDiv.innerHTML = `<p>Veuillez entrer des valeurs valides.</p>`;
    }
});
