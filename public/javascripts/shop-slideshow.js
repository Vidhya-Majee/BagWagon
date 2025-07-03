// Slideshow images (user-provided, bag/lifestyle focused)
const slideshowImages = [
  'https://plus.unsplash.com/premium_photo-1723649902752-6838dff3835e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGJhZ3MlMjBzY2hvb2x8ZW58MHx8MHx8fDA%3D',
  'https://images.unsplash.com/photo-1631387965708-f9c275d9a3d4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJhZ3MlMjBzY2hvb2x8ZW58MHx8MHx8fDA%3D',
  'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGZhc2hpb258ZW58MHx8MHx8fDA%3D',
  'https://images.unsplash.com/photo-1630830607408-261889eb4968?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmFncyUyMHNjaG9vbHxlbnwwfHwwfHx8MA%3D%3D'
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