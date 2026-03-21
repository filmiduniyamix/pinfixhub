// Simple search functionality on /search.html
if (document.getElementById('search-input')) {
  const searchInput = document.getElementById('search-input');
  const resultsDiv = document.getElementById('search-results');

  fetch('/posts.json')
    .then(response => response.json())
    .then(posts => {
      searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        const filtered = posts.filter(post =>
          post.title.toLowerCase().includes(query) ||
          post.description.toLowerCase().includes(query) ||
          post.categories.some(c => c.toLowerCase().includes(query)) ||
          post.tags.some(t => t.toLowerCase().includes(query))
        );
        renderResults(filtered);
      });
    });

  function renderResults(posts) {
    if (!posts.length) {
      resultsDiv.innerHTML = '<p>No posts found.</p>';
      return;
    }
    resultsDiv.innerHTML = posts.map(post => `
      <div class="post-card">
        <a href="${post.url}">
          <img src="${post.featured_image}" alt="${post.title}">
          <div class="card-content">
            <h2>${post.title}</h2>
            <p>${post.description}</p>
          </div>
        </a>
      </div>
    `).join('');
  }
}