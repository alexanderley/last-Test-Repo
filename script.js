// Canvas setup
const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");

// Pac-Man setup
const pacman = {
  x: 200, // starting x position
  y: 200, // starting y position
  radius: 15,
  mouthOpen: false,
  mouthAngle: 0,
  speed: 3,
};

// Game loop
function gameLoop() {
  // Clear canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Update Pac-Man's mouth
  pacman.mouthAngle += 0.1;
  if (pacman.mouthAngle >= 2) {
    pacman.mouthOpen = !pacman.mouthOpen;
    pacman.mouthAngle = 0;
  }

  // Move Pac-Man
  if (38 in keysDown) {
    pacman.y -= pacman.speed;
  }
  if (40 in keysDown) {
    pacman.y += pacman.speed;
  }
  if (37 in keysDown) {
    pacman.x -= pacman.speed;
  }
  if (39 in keysDown) {
    pacman.x += pacman.speed;
  }

  // Draw Pac-Man
  context.beginPath();
  context.arc(
    pacman.x,
    pacman.y,
    pacman.radius,
    pacman.mouthAngle * Math.PI,
    (2 - pacman.mouthAngle) * Math.PI
  );
  context.lineTo(pacman.x, pacman.y);
  context.closePath();
  context.fillStyle = "yellow";
  context.fill();

  // Request next frame
  requestAnimationFrame(gameLoop);
}

// Keyboard input
const keysDown = {};
window.addEventListener("keydown", (event) => {
  keysDown[event.keyCode] = true;
});
window.addEventListener("keyup", (event) => {
  delete keysDown[event.keyCode];
});

// Start the game loop
gameLoop();
