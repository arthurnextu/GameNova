const carouselImages = document.querySelector('.carousel-images');
const images = carouselImages.querySelectorAll('img');
let currentIndex = 0;
const totalImages = images.length;
let autoSlideInterval;

// Fonction pour passer à l'image suivante
function showNextImage() {
    currentIndex = (currentIndex + 1) % totalImages;
    const offset = -currentIndex * 100;
    carouselImages.style.transform = `translateX(${offset}vw)`;
}

// Fonction pour passer à l'image précédente
function showPrevImage() {
    currentIndex = (currentIndex - 1 + totalImages) % totalImages;
    const offset = -currentIndex * 100;
    carouselImages.style.transform = `translateX(${offset}vw)`;
}

// Fonction pour redémarrer le défilement automatique
function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(showNextImage, 7000); 
}

// Défilement automatique toutes les 7 secondes
autoSlideInterval = setInterval(showNextImage, 7000);

// Navigation manuelle
document.querySelector('.btn-left').addEventListener('click', () => {
    showPrevImage();
    resetAutoSlide();
});

document.querySelector('.btn-right').addEventListener('click', () => {
    showNextImage();
    resetAutoSlide();
});

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let statusMessage = document.getElementById('status-message');
    statusMessage.textContent = "Message envoyé avec succès !";
    statusMessage.style.color = "#00ADEF";

    // Réinitialiser le formulaire après soumission
    this.reset();

    // Supprimer le message après quelques secondes
    setTimeout(() => {
        statusMessage.textContent = "";
    }, 3000);
});
