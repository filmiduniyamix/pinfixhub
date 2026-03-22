// js/main.js
(function() {
    // Helper: convert title to slug
    function slugify(title) {
        return title
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/--+/g, '-')
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

    // Update meta tags for SEO (title, description, og:title, etc.)
    function updateMetaTags(post, isHome = true) {
        const defaultTitle = "My Blog";
        const defaultDescription = "A simple static blog with automatic title‑based URLs.";
        const defaultImage = "https://yourusername.github.io/images/default-og.jpg"; // change to your default image

        let title = defaultTitle;
        let description = defaultDescription;
        let image = defaultImage;

        if (!isHome && post) {
            title = post.title + " - My Blog";
            // Extract first 150 characters of plain text as description
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = marked.parse(post.content);
            const plainText = (tempDiv.textContent || tempDiv.innerText || '').trim();
            description = plainText.length > 150 ? plainText.substring(0, 150) + '…' : plainText;
            // You could also add a custom image per post if you include an image field in posts.js
        }

        document.title = title;
        document.querySelector('meta[name="description"]')?.setAttribute('content', description);
        document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
        document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
        document.querySelector('meta[property="og:image"]')?.setAttribute('content', image);
        document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', title);
        document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', description);
        document.querySelector('meta[name="twitter:image"]')?.setAttribute('content', image);
    }

    // Render the list of posts (homepage)
    function renderPostList() {
        const posts = getPosts();
        const app = document.getElementById('app');
        if (!app) return;

        updateMetaTags(null, true);

        if (posts.length === 0) {
            app.innerHTML = '<p>No posts yet.</p>';
            return;
        }

        let html = '<ul class="post-list">';
        posts.forEach(post => {
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

        updateMetaTags(post, false);

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

        app.innerHTML = '<div class="loading">Loading...</div>';

        const match = path.match(/^\/post\/([^\/]+)\/?$/);
        if (match) {
            const slug = match[1];
            const post = findPostBySlug(slug);
            if (post) {
                renderPost(post);
            } else {
                updateMetaTags(null, false);
                app.innerHTML = '<p>Post not found. <a href="/">Go back home</a></p>';
            }
        } else {
            renderPostList();
        }
    }

    // Handle navigation with pushState
    function navigateTo(url) {
        history.pushState(null, '', url);
        route();
    }

    // Intercept internal link clicks
    document.addEventListener('click', (e) => {
        let target = e.target;
        while (target && target.tagName !== 'A') {
            target = target.parentElement;
        }
        if (target && target.tagName === 'A') {
            const href = target.getAttribute('href');
            if (href && href.startsWith('/') && !href.startsWith('//')) {
                e.preventDefault();
                navigateTo(href);
            }
        }
    });

    window.addEventListener('popstate', () => {
        route();
    });

    route();
})();