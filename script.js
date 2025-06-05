document.addEventListener("DOMContentLoaded", function () {
    // Handle selection of activity type
    document.querySelectorAll('input[name="activite"]').forEach(radio => {
        radio.addEventListener("change", function () {
            if (this.value === "bachage") {
                document.getElementById("form-bachage").style.display = "block";
                document.getElementById("form-ilot").style.display = "none";
            } else {
                document.getElementById("form-ilot").style.display = "block";
                document.getElementById("form-bachage").style.display = "none";
            }
        });
    });

    // Handle form submissions separately
    document.getElementById("form-bachage").addEventListener("submit", function(event) {
        event.preventDefault();
        executeDiagnostic("bachage");
    });

    document.getElementById("form-ilot").addEventListener("submit", function(event) {
        event.preventDefault();
        executeDiagnostic("ilot_flottant");
    });

    // Handle pollutant selection
    document.getElementById("polluants").addEventListener("change", afficherChamps);
});

function afficherChamps() {
    let polluantsSelect = document.getElementById("polluants");
    let selectedPolluants = [...polluantsSelect.selectedOptions].map(option => option.value);
    let concentrationsDiv = document.getElementById("concentrations");

    // Show concentration fields only if pollutants are selected
    concentrationsDiv.style.display = selectedPolluants.length > 0 ? "block" : "none";

    ["hydrocarbures", "metaux_lourds", "azote"].forEach(polluant => {
        let group = document.getElementById(`group_${polluant}`);
        group.style.display = selectedPolluants.includes(polluant) ? "block" : "none";
    });
}

function executeDiagnostic(type) {
    let resultatsDiv = document.getElementById("resultats");
    let message = "";

    if (type === "bachage") {
        let surfaceBachage = parseFloat(document.getElementById("surfaceBachage").value);
        let littoral = document.querySelector('input[name="littoral"]:checked')?.value || "non spécifié";
        let travauxEcologiques = document.querySelector('input[name="travauxEcologiques"]:checked')?.value || "non spécifié";
        let invasives = document.querySelector('input[name="invasives"]:checked')?.value || "non spécifié";

        if (surfaceBachage < 75) {
            message += `<p>✅ Vous avez uniquement besoin d'une <strong>autorisation municipale</strong>.</p>`;
        } else if (
            surfaceBachage >= 75 && surfaceBachage <= 2000 &&
            littoral === "non" &&
            travauxEcologiques === "oui" &&
            invasives === "oui"
        ) {
            message += `<p style="color: green;">✅ <strong>Vous êtes admissible à une déclaration de conformité !</strong></p>`;
        } else {
            message += `<p style="color: red;">⚠️ <strong>Votre projet nécessite une autorisation environnementale spécifique.</strong></p>`;
        }
    } else if (type === "ilot_flottant") {
        let surface = parseFloat(document.getElementById("surface").value);
        let phosphore = parseFloat(document.getElementById("phosphore").value);

        if (surface > 0 && phosphore > 0) {
            let tailleIlotRapide = (surface * 0.07).toFixed(2);
            let tailleIlotMoyen = (surface * 0.03).toFixed(2);

            let nombrePlantesRapide = (tailleIlotRapide / 1.72 * 24).toFixed(0);
            let nombrePlantesMoyen = (tailleIlotMoyen / 1.72 * 24).toFixed(0);

            message += `<p>Deux options sont possibles pour combattre l’eutrophisation de votre plan d’eau :</p>
                        <ul>
                            <li><strong>${tailleIlotRapide} m²</strong> (7%) → Traitement rapide et complet, correspondant à environ <strong>${nombrePlantesRapide} plantes</strong>.</li>
                            <li><strong>${tailleIlotMoyen} m²</strong> (3%) → Rétablissement à moyen terme, correspondant à environ <strong>${nombrePlantesMoyen} plantes</strong>.</li>
                        </ul>`;
        } else {
            message += `<p style="color: red;">⚠️ Veuillez entrer des valeurs valides pour la surface et la concentration en phosphore.</p>`;
        }
    } else {
        message = `<p style="color: red;">⚠️ Veuillez choisir une activité (bachage ou îlot flottant).</p>`;
    }

    resultatsDiv.innerHTML = message;
}
