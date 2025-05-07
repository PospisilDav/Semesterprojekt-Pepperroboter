document.addEventListener("DOMContentLoaded", function() {
  // Get the avatar container
  const avatarContainer = document.querySelector('.header-avatar-container');
  
  // Add click event listener
  if (avatarContainer) {
    avatarContainer.addEventListener('click', function() {
      // Add the clicked class to trigger animation
      this.classList.add('clicked');
      
      // Remove the class after animation completes to allow it to be triggered again
      setTimeout(() => {
        this.classList.remove('clicked');
      }, 800); // Match this to the animation duration
    });
  }
});