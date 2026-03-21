// Mobile menu toggle
document.querySelector('.menu-toggle')?.addEventListener('click', () => {
  document.querySelector('nav').classList.toggle('show');
});

// Like system (localStorage)
document.querySelectorAll('.like-btn').forEach(btn => {
  const postId = btn.dataset.postId;
  const countSpan = btn.querySelector('.like-count');
  let likes = localStorage.getItem(`like_${postId}`) || 0;
  countSpan.textContent = likes;

  btn.addEventListener('click', () => {
    let current = parseInt(localStorage.getItem(`like_${postId}`) || 0);
    current++;
    localStorage.setItem(`like_${postId}`, current);
    countSpan.textContent = current;
  });
});