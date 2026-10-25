
const photoIds = [
  'assets/1 (5).jfif',
  'assets/1 (2).jfif',
  'assets/1 (3).jfif',
  'assets/1 (6).jfif',
  'assets/1 (7).jfif',
  'assets/1 (8).jfif',
  'assets/1 (9).jfif',
 'assets/1 (10).jfif',
  'assets/1 (11).jfif',
  'assets/1 (12).jfif',
  'assets/1 (13).jfif',
  'assets/1 (14).jfif',
  'assets/1 (15).jfif',
  'assets/1 (16).jfif',
  'assets/1 (17).jfif',
  'assets/1 (18).jfif',
  'assets/1 (19).jfif',
  'assets/1 (20).jfif',
  'assets/1 (21).jfif',
  'assets/1 (22).jfif',
  'assets/1 (23).jfif',
  'assets/1 (24).jfif',
  'assets/1 (25).jfif',
  'assets/1 (26).jfif',

];

const captions = [
  'If I could pause a moment, it would be one with you.',
  'Your arms are my favorite place to rest.',
  'Somehow, you make everything softer.',
  'The prettiest part of my day is you.',
  'A little laughter, a little love, a lot of us.',
  'The kind of happiness I want to keep choosing.',
  'Hold my hand; we can figure the world out together.',
  'My favorite memories are still waiting to happen.',
  'Every ordinary day can become our story.',
  'I would watch a thousand sunsets with you.',
  'Flowers are pretty, but you are my favorite.',
  'Love is finding beauty in the little things.',
  'A reminder that you deserve gentle things.',
  'You make my heart feel at home.',
  'I hope life gives you as much joy as you give me.',
  'If the world gets loud, come close to me.',
  'I want to be your calm after a long day.',
  'You are the plot twist I am grateful for.',
  'Laugh with me until we forget what was funny.',
  'A future full of little adventures sounds perfect.',
  'For all the times I forget to say it: thank you.',
  'You deserve love that feels kind and safe.',
  'You make even the quiet moments meaningful.',
  'Somewhere between the stars, I would still choose you.',
  'A soft life, a warm hug, and your hand in mine.',
  'May we keep growing, gently and together.',
  'I hope I make you feel as special as you are.',
  'You are one of my favorite reasons to smile.',
  'Pretty moments are better when they are shared.',
  'The best part of this story is that it is ours.'
];

const grid = document.getElementById('galleryGrid');
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalCaption = document.getElementById('modalCaption');
const toast = document.getElementById('toast');

let currentImage = 0;
let toastTimer;
let reasonIndex = 0;

const reasons = [
  'You make the future feel like something beautiful I get to look forward to.',
  'You notice little things that other people miss.',
  'Even a simple conversation with you can make my day.',
  'You inspire me to become someone who loves more thoughtfully.',
  'Your happiness matters to me, even in the smallest moments.',
  'You feel like sunshine after a long, difficult day.',
  'I can be a work in progress around you and still feel loved.',
  'I love the little world we create when it is just us.',
  'You are worth the patience, effort, and honest conversations.',
  'You are not just someone I love; you are someone I deeply appreciate.'
];

// Use local image files only.
function getImagePath(index) {
  return photoIds[index];
}

// Create the 30-picture gallery.
photoIds.forEach((path, i) => {
  const button = document.createElement('button');

  button.className = 'gallery-item';
  button.style.setProperty('--i', i);
  button.type = 'button';
  button.setAttribute('aria-label', `Open romantic picture ${i + 1}`);

  const img = document.createElement('img');

  img.loading = 'lazy';
  img.decoding = 'async';
  img.alt = captions[i];
  img.src = path;

  // Show a message if a local image is missing.
  img.onerror = () => {
    img.onerror = null;
    img.alt = `Picture ${i + 1} is missing. Check ${path}`;
    img.style.objectFit = 'contain';
  };

  button.appendChild(img);

  button.addEventListener('click', () => openModal(i));

  grid.appendChild(button);
});

// Open the full-size image viewer.
function openModal(i) {
  currentImage = i;

  modalImage.onerror = () => {
    modalImage.onerror = null;
    modalImage.alt = `Image not found: ${photoIds[currentImage]}`;
  };

  modalImage.src = getImagePath(i);
  modalImage.alt = captions[i];
  modalCaption.textContent = captions[i];

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');

  document.body.style.overflow = 'hidden';
}

// Close the image viewer.
function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');

  document.body.style.overflow = '';
}

// Navigate through the pictures.
function moveImage(n) {
  openModal(
    (currentImage + n + photoIds.length) % photoIds.length
  );
}

// Modal controls.
document.getElementById('modalClose')
  .addEventListener('click', closeModal);

document.getElementById('prevImage')
  .addEventListener('click', () => moveImage(-1));

document.getElementById('nextImage')
  .addEventListener('click', () => moveImage(1));

// Close when clicking outside the image.
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

// Keyboard navigation.
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();

  if (modal.classList.contains('open')) {
    if (e.key === 'ArrowRight') moveImage(1);
    if (e.key === 'ArrowLeft') moveImage(-1);
  }
});

// Show temporary notification messages.
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

// Create floating hearts and sparkles.
function heartRain(count = 36) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const h = document.createElement('span');

      h.className = 'heart-particle';
      h.setAttribute('aria-hidden', 'true');
      h.textContent = ['♡', '♥', '✧', '💗'][
        Math.floor(Math.random() * 4)
      ];

      h.style.left = Math.random() * 100 + 'vw';
      h.style.top = '-35px';
      h.style.fontSize = (13 + Math.random() * 20) + 'px';
      h.style.animationDuration = (2 + Math.random() * 2) + 's';

      document.body.appendChild(h);

      setTimeout(() => h.remove(), 4500);
    }, i * 45);
  }
}

// Heart rain button.
document.getElementById('heartRainBtn')
  .addEventListener('click', () => {
    heartRain(42);
    showToast('A little rain of love, just for you. ♡');
  });

// Surprise button.
document.getElementById('surpriseBtn')
  .addEventListener('click', () => {
    heartRain(25);
    showToast(
      'Surprise! Someone thinks you are absolutely wonderful. 💗'
    );
  });

// Romantic message button.
document.getElementById('readMoreBtn')
  .addEventListener('click', () => {
    showToast(
      'The best part of my day is knowing you are in my life. I love you, pretty girl. ♡'
    );

    heartRain(16);
  });

// Show a new reason each time the button is clicked.
document.getElementById('reasonBtn')
  .addEventListener('click', () => {
    document.getElementById('extraReason').textContent =
      '“' + reasons[reasonIndex % reasons.length] + '”';

    reasonIndex++;
    heartRain(8);
  });

// Reveal the final love message.
document.getElementById('finalBtn')
  .addEventListener('click', () => {
    document.getElementById('finalMessage')
      .classList.toggle('show');

    heartRain(55);

    showToast(
      'This little corner of the internet belongs to you. ♡'
    );
  });

// Animate sections when they enter the screen.
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.section-frame').forEach((section) => {
    observer.observe(section);
  });
} else {
  document.querySelectorAll('.section-frame').forEach((section) => {
    section.classList.add('in-view');
  });
}
