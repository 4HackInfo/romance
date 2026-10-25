const photoIds = [
  'photo-1516589178581-6cd7833ae3b2','photo-1522673607200-164d1b6ce486','photo-1518199266791-5375a83190b7','photo-1517841905240-472988babdf9','photo-1529333166437-7750a6dd5a70',
  'photo-1511988617509-a57c8a288659','photo-1516589178581-6cd7833ae3b2','photo-1523438885200-e635ba2c371e','photo-1529636798458-92182e662485','photo-1470252649378-9c29740c9fa8',
  'photo-1490750967868-88aa4486c946','photo-1494972308805-463bc619d34e','photo-1518895949257-7621c3c786d7','photo-1499209974431-9ddddcece7f0','photo-1474552226712-ac0f0961a954',
  'photo-1516589178581-6cd7833ae3b2','photo-1522673607200-164d1b6ce486','photo-1518199266791-5375a83190b7','photo-1529333166437-7750a6dd5a70','photo-1511988617509-a57c8a288659',
  'photo-1490750967868-88aa4486c946','photo-1518895949257-7621c3c786d7','photo-1499209974431-9ddddcece7f0','photo-1470252649378-9c29740c9fa8','photo-1523438885200-e635ba2c371e',
  'photo-1529636798458-92182e662485','photo-1494972308805-463bc619d34e','photo-1474552226712-ac0f0961a954','photo-1517841905240-472988babdf9','photo-1529636798458-92182e662485'
];
const captions = [
  'If I could pause a moment, it would be one with you.','Your arms are my favorite place to rest.','Somehow, you make everything softer.','The prettiest part of my day is you.','A little laughter, a little love, a lot of us.',
  'The kind of happiness I want to keep choosing.','Hold my hand; we can figure the world out together.','My favorite memories are still waiting to happen.','Every ordinary day can become our story.','I would watch a thousand sunsets with you.',
  'Flowers are pretty, but you are my favorite.','Love is finding beauty in the little things.','A reminder that you deserve gentle things.','You make my heart feel at home.','I hope life gives you as much joy as you give me.',
  'If the world gets loud, come close to me.','I want to be your calm after a long day.','You are the plot twist I am grateful for.','Laugh with me until we forget what was funny.','A future full of little adventures sounds perfect.',
  'For all the times I forget to say it: thank you.','You deserve love that feels kind and safe.','You make even the quiet moments meaningful.','Somewhere between the stars, I would still choose you.','A soft life, a warm hug, and your hand in mine.',
  'May we keep growing, gently and together.','I hope I make you feel as special as you are.','You are one of my favorite reasons to smile.','Pretty moments are better when they are shared.','The best part of this story is that it is ours.'
];
const grid = document.getElementById('galleryGrid');
photoIds.forEach((id,i)=>{
  const button=document.createElement('button'); button.className='gallery-item'; button.style.setProperty('--i',i); button.type='button'; button.setAttribute('aria-label',`Open romantic picture ${i+1}`);
  const img=document.createElement('img'); img.loading='lazy'; img.alt=captions[i]; img.src=`https://images.unsplash.com/${id}?auto=format&fit=crop&w=500&q=75`;
  img.onerror=()=>{img.onerror=null;img.src=`https://picsum.photos/seed/love-${i+13}/500/650`;};
  button.appendChild(img);button.addEventListener('click',()=>openModal(i));grid.appendChild(button);
});
const modal=document.getElementById('imageModal'), modalImage=document.getElementById('modalImage'), modalCaption=document.getElementById('modalCaption');let currentImage=0;
function openModal(i){currentImage=i;modalImage.src=`https://images.unsplash.com/${photoIds[i]}?auto=format&fit=max&w=1200&q=90`;modalImage.onerror=()=>{modalImage.onerror=null;modalImage.src=`https://picsum.photos/seed/love-${i+13}/900/1200`;};modalCaption.textContent=captions[i];modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';}
function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';}
function moveImage(n){openModal((currentImage+n+photoIds.length)%photoIds.length)}
document.getElementById('modalClose').addEventListener('click',closeModal);document.getElementById('prevImage').addEventListener('click',()=>moveImage(-1));document.getElementById('nextImage').addEventListener('click',()=>moveImage(1));modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();if(modal.classList.contains('open')&&e.key==='ArrowRight')moveImage(1);if(modal.classList.contains('open')&&e.key==='ArrowLeft')moveImage(-1)});
const toast=document.getElementById('toast');let toastTimer;function showToast(message){toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2800)}
function heartRain(count=36){for(let i=0;i<count;i++){setTimeout(()=>{const h=document.createElement('span');h.className='heart-particle';h.textContent=['♡','♥','✧','💗'][Math.floor(Math.random()*4)];h.style.left=Math.random()*100+'vw';h.style.top='-35px';h.style.fontSize=(13+Math.random()*20)+'px';h.style.animationDuration=(2+Math.random()*2)+'s';document.body.appendChild(h);setTimeout(()=>h.remove(),4500)},i*45)}}
document.getElementById('heartRainBtn').addEventListener('click',()=>{heartRain(42);showToast('A little rain of love, just for you. ♡')});
document.getElementById('surpriseBtn').addEventListener('click',()=>{heartRain(25);showToast('Surprise! Someone thinks you are absolutely wonderful. 💗')});
document.getElementById('readMoreBtn').addEventListener('click',()=>{showToast('The best part of my day is knowing you are in my life. I love you, pretty girl. ♡');heartRain(16)});
const reasons=['You make the future feel like something beautiful I get to look forward to.','You notice little things that other people miss.','Even a simple conversation with you can make my day.','You inspire me to become someone who loves more thoughtfully.','Your happiness matters to me, even in the smallest moments.','You feel like sunshine after a long, difficult day.','I can be a work in progress around you and still feel loved.','I love the little world we create when it is just us.','You are worth the patience, effort, and honest conversations.','You are not just someone I love; you are someone I deeply appreciate.'];let reasonIndex=0;document.getElementById('reasonBtn').addEventListener('click',()=>{document.getElementById('extraReason').textContent='“'+reasons[reasonIndex%reasons.length]+'”';reasonIndex++;heartRain(8)});
document.getElementById('finalBtn').addEventListener('click',()=>{document.getElementById('finalMessage').classList.toggle('show');heartRain(55);showToast('This little corner of the internet belongs to you. ♡')});
// Gentle reveal as sections enter view.
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target)}}),{threshold:.12});document.querySelectorAll('.section-frame').forEach(section=>observer.observe(section));}
