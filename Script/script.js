// Array of messages
const messages = [
    "I know im not ur first boyfriend",
    "I know im not the first boy u call handsome",
    "I know im not the first boy u loved",
    "I know im not the first boy u said \"i love u\" to",
    "I know im not the first boy that made u happy",
    "I know im not the first boy that made u smile and laugh",
    "But...",
    "I wanted to be the last boy u do those things with, because u are the girl i want to be with forever...",
    "I really really love u so much even if we had small fights or didn’t understand each other...",
    "I can't imagine losing you, because if I do, I lose myself too..",
    "I love u..."
];

const typewriterElement = document.getElementById('typewriter-text');
const typeSound = document.getElementById('type-sound'); // Ambil elemen suara ketikan
const backgroundMusic = document.getElementById('background-music'); // Ambil elemen musik latar
const startButton = document.getElementById('start-button'); // Ambil tombol start
let currentMessageIndex = 0;
let currentCharIndex = 0;
const typingSpeed = 105; // Kecepatan mengetik lebih halus (milidetik per karakter)
const messageDisplayTime = 1500; // Waktu untuk setiap pesan (sebelum berganti), kecuali kalimat terakhir
const lastMessageDisplayTime = 2000; // Durasi kalimat terakhir

// Fungsi untuk mengetik karakter demi karakter
function typeNextCharacter() {
    if (currentCharIndex < messages[currentMessageIndex].length) {
        const charSpan = document.createElement('span');
        charSpan.classList.add('char'); // Tambahkan class 'char' untuk setiap huruf
        charSpan.textContent = messages[currentMessageIndex].charAt(currentCharIndex);
        typewriterElement.appendChild(charSpan);
        
        currentCharIndex++;
        setTimeout(typeNextCharacter, typingSpeed);
    } else {
        // Stop suara ketikan setelah kalimat selesai
        typeSound.pause();
        typeSound.currentTime = 0; // Reset ke awal untuk kalimat berikutnya
        currentCharIndex = 0;
        currentMessageIndex++;

        if (currentMessageIndex < messages.length) {
            const delay = currentMessageIndex === messages.length - 1 ? lastMessageDisplayTime : messageDisplayTime;
            setTimeout(showNextMessage, delay);
        } else {
            // Jika sudah selesai mengetik semua kalimat, tampilkan gambar satu per satu
            setTimeout(displayImagesSequentially, 1000);
        }
    }
}

// Fungsi untuk menghapus pesan dan memulai yang baru
function showNextMessage() {
    typewriterElement.innerHTML = ''; // Kosongkan elemen
    if (currentMessageIndex < messages.length) {
        // Ubah background ke hitam untuk semua pesan kecuali pesan terakhir
        document.body.style.backgroundColor = "black";

        // Mulai suara ketikan setiap kali kalimat baru dimulai
        try {
            typeSound.play();
        } catch (error) {
            console.error("Suara ketikan tidak bisa diputar:", error);
        }

        setTimeout(typeNextCharacter, 200); // Tambahkan jeda sebelum mengetik lagi
    }
}

// Fungsi untuk menampilkan gambar dengan cepat
function displayImagesSequentially() {
    const images = document.querySelectorAll('.hidden-image'); // Ambil semua elemen gambar
    let imageIndex = 0;

    function showNextImage() {
        if (imageIndex < images.length) {
            images[imageIndex].classList.add('visible-image'); // Tampilkan gambar
            setTimeout(() => {
                images[imageIndex].classList.remove('visible-image'); // Hapus gambar setelah ditampilkan
                imageIndex++;
                showNextImage(); // Panggil fungsi ini lagi untuk gambar berikutnya
            }, 300); // Jeda 300 ms antar gambar
        }
    }

    showNextImage(); // Mulai menampilkan gambar pertama
}

// Fungsi untuk memulai semua
function startAll() {
    startButton.style.display = 'none'; // Sembunyikan tombol
    backgroundMusic.loop = false; // Set loop false jika kamu tidak ingin mengulang musik
    backgroundMusic.play(); // Mulai musik saat tombol ditekan

    // Mulai mengetik pesan pertama
    setTimeout(() => {
        // Mulai suara ketikan dari awal untuk memastikan langsung dimulai
        try {
            typeSound.play();
        } catch (error) {
            console.error("Suara ketikan tidak bisa diputar:", error);
        }

        typeNextCharacter();
    }, 1000); // Jeda 1 detik sebelum mulai
}

// Tambahkan event listener ke tombol
startButton.addEventListener('click', startAll);
