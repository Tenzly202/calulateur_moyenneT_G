// Mise à jour dynamique des matières selon la classe choisie
function updateFields() {
    const classe = document.getElementById("classe").value;

    if (!classe) return;

    fetch(`/get_coeffs?classe=${classe}`)
        .then(response => response.json())
        .then(data => {
            const coeffs = data.coeffs;
            const fields = document.querySelectorAll(".note-field");

            fields.forEach((field, index) => {
                if (coeffs[index] === 0) {
                    field.style.display = "none";
                    field.querySelector("input").value = "";
                } else {
                    field.style.display = "block";
                }
            });
        });
}

// Animation sur les champs lors de la saisie
document.addEventListener("input", function (e) {
    if (e.target.matches("input[type='number']")) {
        e.target.style.backgroundColor = "#eef6ff";
        setTimeout(() => {
            e.target.style.backgroundColor = "white";
        }, 300);
    }
});

// Exécuter automatiquement au chargement (utile après un calcul)
window.onload = function () {
    updateFields();
};
