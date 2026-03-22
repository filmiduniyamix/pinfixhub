# Vista - Modern Pinterest-Style Blog

Vista is a beautiful, modern aesthetic blogging system built with React, Vite, and Tailwind CSS. It features a responsive Pinterest-style grid layout, infinite load pagination, image lightbox viewers, dynamic client-side searching, filtering by tags, custom reading time estimates, and a persistence storage like/vote and comment system.

## ✨ Features

- **Pinterest Masonry Grid**: Elegant layouts for posts of different heights.
- **Deep Routing (SPA UI)**: Accessible paths for `/` and post slugs.
- **Image Lightbox & Gallery Viewer**: Click any image to view in full-screen sliding viewer.
- **Dynamic Interactions**: Clients can submit comments, like, and save items (powered by `localStorage`).
- **Rich Media Focus Support**: Native aspect-ratio responsive image rendering for art-focused text.

## 📂 Folder Structure

The project conforms to modern standard modern standards:

```text
├── public/                # Static assets
│   └── images/            # Custom AI generated feature imagery
│       ├── travel.jpg
│       ├── food.jpg
│       ├── tech.jpg
│       └── fashion.jpg
├── src/
│   ├── App.tsx            # Full Blogging System Architecture Context
│   ├── main.tsx           # Runtime mounts
│   ├── index.css          # Tailwind imports
│   └── utils/
│       └── cn.ts          # Classname utilities
├── package.json           # Runtime profiles
├── tsconfig.json          # TS typing
└── vite.config.ts         # Bundling
```

## 🚀 Step-by-Step GitHub Pages Deployment Guide

Since this is powered by Vite + React:

### 1. Pre-requisites
- NodeJS active installation.
- Working GitHub account.

### 2. Standard Deployment (GitHub Actions Setup)
1. Push this repository profile to your master branch.
2. In your GitHub repository setup, navigate to **Settings** → **Pages**.
3. Under **Build and deployment**, switch the dropdown source to **GitHub Actions**.
4. Create a deployment profile file inside `.github/workflows/deploy.yml` with the following context:

```yaml
name: Deploy static content to Pages

on:
  push:
    branches: ["main"]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: "18"
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Setup Pages
        uses: actions/configure-pages@v3
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v1
        with:
          path: './dist'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```

### 3. Alternative (Static Build with standard push)
If utilizing standard terminal profiles:
1. Compile visual outputs locally: `npm run build`
2. Push standard folder contents from outputs into standard profiles.

The architecture is fully compliant with modern static standards without dynamic server attachments.
