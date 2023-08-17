const mobil = document.getElementById('mobil');
const batu = document.getElementById('rock');
const playerScore = document.getElementById('score');

let score = 0;
let canTriggerEvent = true;
let interval = null;

// Fungsi untuk mengupdate skor
let jumlahScore = () => {
  score++;
  playerScore.innerHTML = `Score : ${score} `;
};

// Fungsi untuk menghentikan penambahan skor
function stopInterval() {
  clearInterval(interval);
}

// Fungsi untuk mencegah seleksi saat interaksi
function preventSelection() {
  if (window.getSelection) {
    window.getSelection().removeAllRanges();
  } else if (document.selection) {
    document.selection.empty();
  }
}

mobil.addEventListener('mouseover', () => {
  if (canTriggerEvent) {
    canTriggerEvent = false;

    mobil.style.top = '-80px'; // Mengangkat mobil sejauh 80px

    setTimeout(() => {
      mobil.style.top = '0px'; // Mengembalikan mobil ke posisi semula
    }, 1000);

    setTimeout(() => {
      canTriggerEvent = true; // Memungkinkan event dipicu lagi setelah 1 detik
    }, 1500);

    interval = setInterval(jumlahScore, 100); // Memulai penambahan skor setiap 100ms
  }
});

// Cek tabrakan antara bagian belakang mobil dan batu secara berkala
const checkCollisionInterval = setInterval(function () {
  const carPosition = mobil.getBoundingClientRect();
  const rockPosition = batu.getBoundingClientRect();

  // Periksa tabrakan berdasarkan bagian belakang mobil
  if (
    carPosition.x + carPosition.width > rockPosition.x &&
    carPosition.x + carPosition.width < rockPosition.x + rockPosition.width &&
    carPosition.y + carPosition.height > rockPosition.y
  ) {
    stopInterval(); // Menghentikan penambahan skor
    batu.style.animation = 'none';
    batu.style.display = 'none';

    // Menghindari seleksi saat terjadi tabrakan
    preventSelection();

    if (confirm('Bagian belakang mobil kamu nabrak batu, mulai ulang?')) {
      window.location.reload();
    }
  }
}, 100); // Periksa tabrakan setiap 100ms
