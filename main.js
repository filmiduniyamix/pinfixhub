// js/main.js
(function() {
    // Helper: convert title to slug
    function slugify(title) {
        return title
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')     // remove special characters
            .replace(/\s+/g, '-')         // replace spaces with -
            .replace(/--+/g, '-')         // replace multiple dashes
            .trim();
    }

    // Get all posts with computed slugs
    function getPosts() {
        return window.postsData.map(post => ({
            ...post,
            slug: slugify(post.title)
        }));
    }

    // Find post by slug
    function findPostBySlug(slug) {
        const posts = getPosts();
        return posts.find(post => post.slug === slug);
    }

    // Render the list of posts (homepage)
    function renderPostList() {
        const posts = getPosts();
        const app = document.getElementById('app');
        if (!app) return;

        if (posts.length === 0) {
            app.innerHTML = '<p>No posts yet.</p>';
            return;
        }

        let html = '<ul class="post-list">';
        posts.forEach(post => {
            // Create a short excerpt (first 150 characters of plain text)
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = marked.parse(post.content);
            const plainText = tempDiv.textContent || tempDiv.innerText || '';
            const excerpt = plainText.length > 150 ? plainText.substring(0, 150) + '…' : plainText;

            html += `
                <li>
                    <h2><a href="/post/${post.slug}">${escapeHtml(post.title)}</a></h2>
                    <div class="post-meta">${escapeHtml(post.date)}</div>
                    <div class="post-excerpt">${escapeHtml(excerpt)}</div>
                </li>
            `;
        });
        html += '</ul>';
        app.innerHTML = html;
    }

    // Render a single post
    function renderPost(post) {
        const app = document.getElementById('app');
        if (!app) return;

        const contentHtml = marked.parse(post.content);
        app.innerHTML = `
            <article>
                <h1>${escapeHtml(post.title)}</h1>
                <div class="post-meta">${escapeHtml(post.date)}</div>
                <div class="post-content">${contentHtml}</div>
                <a href="/" class="back-link">← Back to all posts</a>
            </article>
        `;
    }

    // Simple escape to prevent XSS
    function escapeHtml(str) {
        if (!str) return '';
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    // Router: decide what to show based on current path
    function route() {
        const path = window.location.pathname;
        const app = document.getElementById('app');
        if (!app) return;

        // Show loading indicator
        app.innerHTML = '<div class="loading">Loading...</div>';

        // Check if this is a post URL
        const match = path.match(/^\/post\/([^\/]+)\/?$/);
        if (match) {
            const slug = match[1];
            const post = findPostBySlug(slug);
            if (post) {
                renderPost(post);
            } else {
                app.innerHTML = '<p>Post not found. <a href="/">Go back home</a></p>';
            }
        } else {
            // Home page – show list of posts
            renderPostList();
        }
    }

    // Handle navigation (pushState) so we don't reload the whole page
    function navigateTo(url) {
        history.pushState(null, '', url);
        route();
    }

    // Listen for clicks on internal links (delegate)
    document.addEventListener('click', (e) => {
        let target = e.target;
        while (target && target.tagName !== 'A') {
            target = target.parentElement;
        }
        if (target && target.tagName === 'A') {
            const href = target.getAttribute('href');
            // Only intercept internal links (same origin)
            if (href && href.startsWith('/') && !href.startsWith('//')) {
                e.preventDefault();
                navigateTo(href);
            }
        }
    });

    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => {
        route();
    });

    // Initial route
    route();
})();