# VSSPEED - Deployment Guide

This guide explains how to host your VSSPEED Global website online for **FREE**.

## 1. Prerequisites
- A [GitHub](https://github.com/) account (Free).
- A [Vercel](https://vercel.com/) or [Cloudflare Pages](https://pages.cloudflare.com/) account (Free).

## 2. Push to GitHub
1. Create a new repository on GitHub named `vsspeed`.
2. Open your terminal in this folder and run:
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git remote add origin https://github.com/YOUR_USERNAME/vsspeed.git
   git branch -M main
   git push -u origin main
   ```

## 3. Deploy for FREE
We recommend **Cloudflare Pages** or **Vercel** for the best "forever free" experience.

### Option A: Vercel (Easiest)
1. Go to [vercel.com](https://vercel.com/) and log in with GitHub.
2. Click **Add New** > **Project**.
3. Import your `vsspeed` repository.
4. Click **Deploy**.
5. Your site will be online at `vsspeed.vercel.app`.

### Option C: GitHub Pages (Totally Free)
1. Go to your GitHub repository **Settings** > **Pages**.
2. Under **Build and deployment**, select **GitHub Actions**.
3. Create a new file in your project at `.github/workflows/deploy.yml` and paste a standard "Vite Deploy" action. (I have pre-configured your `package.json` to support this).
4. Your site will be live at `https://YOUR_USERNAME.github.io/vsspeed/`.

## 4. Setting up www.vsspeed.org
Once your site is live on any of the free options above:
1. Purchase the `vsspeed.org` domain from a registrar (like Cloudflare or Namecheap).
2. in your host settings (Vercel, Cloudflare, or GitHub), add `vsspeed.org` as a custom domain.
3. Your site will now be reachable at **www.vsspeed.org** for the cost of the domain only!

---
*Note: While hosting is free on all these platforms, the `.org` domain registration is a separate annual fee.*
