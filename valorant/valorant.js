document.addEventListener('DOMContentLoaded', function () {
    const carouselImages = document.querySelector('.carousel-images');
    const images = carouselImages.querySelectorAll('img');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');

    let currentIndex = 0;
    const totalImages = images.length;

    // Fonction pour afficher l'image suivante
    function showNextImage() {
        currentIndex = (currentIndex + 1) % totalImages;
        updateCarouselPosition();
    }

    // Fonction pour afficher l'image précédente
    function showPrevImage() {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        updateCarouselPosition();
    }

    // Fonction pour mettre à jour la position du carrousel
    function updateCarouselPosition() {
        const offset = -currentIndex * 100;
        carouselImages.style.transform = `translateX(${offset}%)`;
    }

    // Ajouter un événement sur le bouton précédent
    prevButton.addEventListener('click', () => {
        showPrevImage();
    });

    // Ajouter un événement sur le bouton suivant
    nextButton.addEventListener('click', () => {
        showNextImage();
    });

    // Défilement automatique des images toutes les 5 secondes
    setInterval(showNextImage, 5000);
});
