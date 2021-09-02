const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
const ratio = window.devicePixelRatio;

const screenWidth = screen.width;
const screenHeight = screen.height;

console.log(screenWidth, screenHeight);
console.log(windowWidth, windowHeight, ratio);

window.onload = () => {
  const date = document.getElementById('date');
  date.textContent = localStorage.getItem('reportDate');
};
