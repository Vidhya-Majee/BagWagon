// Slideshow images (trendy, modern, bag-focused)
const slideshowImages = [
  'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80', // Trendy handbags on display
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80', // Fashionable woman with bag
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80', // Modern backpacks in urban setting
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80', // Colorful bags in boutique
];

let currentSlide = 0;
const heroSection = document.querySelector('.shop-hero-slideshow');
const heroImg = document.querySelector('.shop-hero-img');

function showSlide(index) {
  if (heroImg) {
    heroImg.src = slideshowImages[index];
  }
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slideshowImages.length;
  showSlide(currentSlide);
}

if (heroImg) {
  setInterval(nextSlide, 3000); // Change image every 3 seconds
} 