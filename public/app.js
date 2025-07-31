document.addEventListener('DOMContentLoaded', function() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.section');

    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetSection = this.dataset.section;
            
            // Retirer la classe active de tous les boutons et sections
            navButtons.forEach(btn => btn.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            // Ajouter la classe active au bouton cliqué et à la section correspondante
            this.classList.add('active');
            document.getElementById(targetSection).classList.add('active');
        });
    });

    // Test de connexion à l'API
    fetch('/')
        .then(response => response.json())
        .then(data => {
            console.log('API connectée:', data.message);
        })
        .catch(error => {
            console.error('Erreur API:', error);
        });
});
