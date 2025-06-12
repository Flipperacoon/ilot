document.addEventListener("DOMContentLoaded", function () {
    const activiteRadios = document.querySelectorAll('input[name="activite"]');
    const formBachage = document.getElementById("form-bachage");
    const formIlot = document.getElementById("form-ilot");
    const polluantsSelect = document.getElementById("polluants");
    const concentrationsDiv = document.getElementById("concentrations");
    const recommandationsDiv = document.getElementById("recommandations");
    const plantesRecommandeesDiv = document.getElementById("plantes-recommandees");
    const tailleIlotDiv = document.getElementById("taille-ilot");
    const permisNecessairesDiv = document.getElementById("permis-necessaires");
    const listePermis = document.getElementById("liste-permis");

    // Fonction pour afficher le bon formulaire
    function afficherFormulaire() {
        const activiteChoisie = document.querySelector('input[name="activite"]:checked');
        if (activiteChoisie) {
            if (activiteChoisie.value === "bachage") {
                formBachage.style.display = "block";
                formIlot.style.display = "none";
                recommandationsDiv.style.display = "none";
                permisNecessairesDiv.style.display = "none";
            } else if (activiteChoisie.value === "ilot_flottant") {
                formBachage.style.display = "none";
                formIlot.style.display = "block";
                recommandationsDiv.style.display = "none";
                permisNecessairesDiv.style.display = "none";
            }
        }
    }
    


    // Fonction pour afficher les recommandations
function afficherRecommandations() {
    const concentrationInitiale = parseFloat(document.getElementById("phosphore").value); // Concentration initiale en microgramme/L
    const surfaceLac = parseFloat(document.getElementById("surface").value); // Surface du lac en m²
    const volumeLac = parseFloat(document.getElementById("surface").value) * parseFloat(document.getElementById("profondeur").value); // Volume du lac en m3
   
    const tauxRetraitPhosphore = 1000000; // microgramme de phosphore retiré par m² d'îlot
    const phosphoreSeuil = 20; // Seuil de phosphore en microgamme/L
    const pourcentageCouverture = parseFloat(document.getElementById("couverture").value)/100; 
    const densitePlantation = 20; // 10 plantes/m²
    const surfaceCouverte = parseFloat(document.getElementById("surface").value) * pourcentageCouverture; 

    // Calcul de la quantité totale de phosphore dans le lac
    const quantiteTotalePhosphore = concentrationInitiale * volumeLac; // microgramme

    // Calcul de la quantité nécessaire pour atteindre 3 microgramme/L
    const quantiteNecessairePour3micg = phosphoreSeuil * volumeLac; // microg

    // Calcul du phosphore à retirer
    const phosphoreARetirer = quantiteTotalePhosphore - quantiteNecessairePour3micg;

    // Calcul de la quantité de phosphore retirée par saison
    const phosphoreRetireParSaison = surfaceCouverte * tauxRetraitPhosphore; // micg

    // Estimation du nombre de saisons nécessaires
    const nombreSaisons = phosphoreARetirer / phosphoreRetireParSaison;
    const surfaceIlot = 1.72; // Surface d'un îlot en m²
     
    const nombreTotalPlantes = surfaceCouverte * densitePlantation; 
    const nombreTotalIlots = (surfaceLac * pourcentageCouverture) / surfaceIlot;;
    
    



    
    const phosphoreRetire = surfaceCouverte * tauxRetraitPhosphore;

    // Recommandations de plantes selon les polluants
    const selectedOptions = Array.from(polluantsSelect.selectedOptions).map(option => option.value);
    const plantesRecommandees = {
        hydrocarbures: "Organismes recommandées : Typha latifolia, Iris p. et Spartina p., Pleurotus ostreatus, Trametes versicolor (sous conditions)",
        metaux_lourds: "Plantes recommandées :Typha latifolia, Iris p. et Spartina p.,Phragmites australis.",
        azote: "Plantes recommandées : Typha latifolia, Iris p. et Spartina p."
    };

    const recommandationsPlantes = selectedOptions.map(option => plantesRecommandees[option]).join("<br/>");
    plantesRecommandeesDiv.innerHTML = recommandationsPlantes || "typha latifolia";

    // Calcul de la taille de l'îlot
    const tailleIlot1 = (surfaceLac * 0.01).toFixed(3);
    const tailleIlot5 = (surfaceLac * 0.05).toFixed(3);
    tailleIlotDiv.innerHTML = `Taille de la couverture recommandée de l'îlot pour un retablissement rapide :entre ${tailleIlot1} m² (1% de la surface) et ${tailleIlot5} m² (5% de la surface).`;

    // Affichage du nombre total de plantes
    plantesRecommandeesDiv.innerHTML += `<br/>Nombre total de plantes recommandées : ${nombreTotalPlantes} plantes.
    ce qui correspond à: ${nombreTotalIlots} ilots` ;
    plantesRecommandeesDiv.innerHTML += `<br/>Quantité totale de phosphore retirée par saison de croissance: ${phosphoreRetire} microgrammes.`;
    plantesRecommandeesDiv.innerHTML +=`<br/>Nombre de saisons nécessaires pour atteindre 20 microgramme/L de phosphore (seuil d'oligotrophie déterminé par le CCME): ${Math.ceil(nombreSaisons)} saison(s).`;
   //  plantesRecommandeesDiv.innerHTML +=`<br/>Nombre de saisons nécessaires pour atteindre un seuil d'amélioration visible à l'oeil nu: ${Math.ceil(nombreSaisons)} saison(s).`;

    // Affichage des recommandations et des permis
    recommandationsDiv.style.display = "block";
    afficherPermisNecessaires();
}
    
    

    // Fonction pour afficher les permis nécessaires
    function afficherPermisNecessaires() {
    const pourcentageCouverture = parseFloat(document.getElementById("couverture").value) / 100; 
    const surfaceLac = parseFloat(document.getElementById("surface").value); // Surface du lac en m²
    const surfaceIlot = 1.72; // Surface d'un îlot en m²

    // Calculer la surface couverte
    const surfaceCouverte = surfaceLac * pourcentageCouverture;

    // Calculer le nombre d'îlots
    const nombreIlots = surfaceCouverte / surfaceIlot;

    const permis = [
        "L'installation d'un îlot flottant épurateur est automatiquement un déclencheur d'autorisation ministérielle en vertu de l'article 22 de la loi sur la qualité de l'environnement.",
        "Selon les directives locales, une autorisation de la municipalité pourrait être nécessaire",
        "<a href='https://www.environnement.gouv.qc.ca/autorisations/autorisations-ministerielles.html'>Lien vers les autorisations</a>"
    ];

    // Afficher les permis nécessaires
    listePermis.innerHTML = permis.map(item => `<li>${item}</li>`).join("");

    // Afficher LA SURFACE (IMPORTANT) et le nombre d'îlots 
    const resultatIlots = `Nombre d'îlots nécessaires : ${Math.ceil(nombreIlots)}`; // Utiliser Math.ceil pour arrondir à l'entier supérieur
    
    listePermis.innerHTML += `<li>${resultatIlots}</li>`;
    listePermis.innerHTML += `<p> Surface d'ilot prévue: ${surfaceCouverte} m2</p>`;

    // Vérifier si la surface couverte est inférieure à 20 m²
    if (surfaceCouverte > 20) {
        const warningMessage = "Avertissement : La superficie de l'îlot est supérieure à 20 mètres carrés. Cela constitue un déclencheur d'autorisation provinciale concernant sa structure. ";
        listePermis.innerHTML += `<li style="color: red;">${warningMessage}</li>`; // Afficher le message d'avertissement en rouge
    }

    permisNecessairesDiv.style.display = "block";
}



    // Écouteur d'événements pour les boutons radio
    activiteRadios.forEach(radio => {
        radio.addEventListener("change", afficherFormulaire);
    });

    // Écouteur d'événements pour le formulaire d'îlot flottant
    formIlot.addEventListener("submit", function (event) {
        event.preventDefault(); // Empêche l'envoi du formulaire
        afficherRecommandations();
    });

    // Écouteur d'événements pour le select des polluants
      polluantsSelect.addEventListener("change", function () {
        const selectedOptions = Array.from(polluantsSelect.selectedOptions).map(option => option.value);
        
        // Afficher ou masquer les champs de concentration en fonction des polluants sélectionnés
         const concentrations = document.querySelectorAll('.polluant-group');
    concentrations.forEach(group => {
        const polluant = group.id.split('_')[1]; // Récupère le nom du polluant à partir de l'ID
        group.style.display = selectedOptions.includes(polluant) ? "block" : "none";
    });

        // Afficher les champs de concentration si au moins un polluant est sélectionné
        concentrationsDiv.style.display = selectedOptions.length > 0 ? "block" : "none";
    });
});
