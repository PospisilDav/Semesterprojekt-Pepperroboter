document.addEventListener('DOMContentLoaded', function() {
  // Animate the developer cards with a staggered delay
  const developerCards = document.querySelectorAll('.developer-card');
  developerCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
  });
  
  // Add a confetti effect when the page loads
  createConfetti();
  
  function createConfetti() {
    // Create confetti container
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'confetti-container';
    document.body.appendChild(confettiContainer);
    
    // Create confetti pieces
    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.animationDelay = `${Math.random() * 5}s`;
      confetti.style.backgroundColor = getRandomColor();
      confettiContainer.appendChild(confetti);
    }
  }
  
  function getRandomColor() {
    const colors = ['#6DD1E9', '#52AD59', '#FFC107', '#FF5722', '#9C27B0'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
  
  // Add confetti styles
  const style = document.createElement('style');
  style.textContent = `
    .confetti-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: -1;
    }
    
    .confetti {
      position: absolute;
      top: -10px;
      width: 10px;
      height: 10px;
      border-radius: 20%;
      animation: confetti-fall 8s linear infinite;
    }
    
    @keyframes confetti-fall {
      0% {
        transform: translateY(0) rotate(0deg);
        opacity: 1;
      }
      75% {
        opacity: 0.7;
      }
      100% {
        transform: translateY(100vh) rotate(720deg);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
});