# Landing Page Folder Guide

This guide explains exactly where to place your landing page code and assets
when migrating them into this Next.js application.

---

## Workshop Route Folders

Each workshop URL is controlled by a `page.tsx` file inside its route folder.
Replace the placeholder `page.tsx` with your actual landing page component.

| URL                             | Route folder                          | Page file                                    |
| ------------------------------- | ------------------------------------- | -------------------------------------------- |
| `/workshops/ytempirebuilder1`   | `app/workshops/ytempirebuilder1/`     | `app/workshops/ytempirebuilder1/page.tsx`     |
| `/workshops/ytempirebuilder2`   | `app/workshops/ytempirebuilder2/`     | `app/workshops/ytempirebuilder2/page.tsx`     |
| `/workshops/ytempirebuilder3`   | `app/workshops/ytempirebuilder3/`     | `app/workshops/ytempirebuilder3/page.tsx`     |
| `/workshops/ytempirebuilder4`   | `app/workshops/ytempirebuilder4/`     | `app/workshops/ytempirebuilder4/page.tsx`     |
| `/workshops/ytempirebuilder5`   | `app/workshops/ytempirebuilder5/`     | `app/workshops/ytempirebuilder5/page.tsx`     |

## LMS Offer Page Folder

| URL      | Route folder   | Page file            |
| -------- | -------------- | -------------------- |
| `/learn` | `app/learn/`   | `app/learn/page.tsx` |

---

## Asset Folders

Images, videos, and other static files used by each page should be placed in
the corresponding folder inside `public/`. These files are served at the root
URL path automatically by Next.js.

| Page                          | Asset folder                          | Example URL in code                     |
| ----------------------------- | ------------------------------------- | --------------------------------------- |
| Workshop 1                    | `public/workshops/ytempirebuilder1/`  | `/workshops/ytempirebuilder1/hero.jpg`  |
| Workshop 2                    | `public/workshops/ytempirebuilder2/`  | `/workshops/ytempirebuilder2/hero.jpg`  |
| Workshop 3                    | `public/workshops/ytempirebuilder3/`  | `/workshops/ytempirebuilder3/hero.jpg`  |
| Workshop 4                    | `public/workshops/ytempirebuilder4/`  | `/workshops/ytempirebuilder4/hero.jpg`  |
| Workshop 5                    | `public/workshops/ytempirebuilder5/`  | `/workshops/ytempirebuilder5/hero.jpg`  |
| LMS offer page                | `public/learn/`                       | `/learn/banner.png`                     |

For example, if you place `hero.jpg` inside `public/workshops/ytempirebuilder1/`,
you can reference it in your component as:

```tsx
<img src="/workshops/ytempirebuilder1/hero.jpg" alt="Workshop hero" />
```

---

## What to Migrate

From each of your local landing page projects, copy **only** these items into
the corresponding route folder:

- **Page component** → replaces `page.tsx`
- **Supporting components** → place in the route folder or a shared
  `components/` directory
- **CSS / style files** → place alongside the components or in the route folder
- **Static assets** (images, fonts, videos) → place in the matching
  `public/workshops/ytempirebuilderN/` folder

---

## What NOT to Copy

> **Do not paste a complete separate Next.js project directly inside a route
> folder.**

Each of your five local projects is a standalone Next.js application with its
own configuration. If you copy the entire project directory into a route folder,
the build will break.

**Never copy these files or folders from your local projects:**

| Item                    | Reason                                                       |
| ----------------------- | ------------------------------------------------------------ |
| `package.json`          | This app already has its own dependencies                    |
| `package-lock.json`     | Same as above                                                |
| `node_modules/`         | Will be installed from the root `package.json`               |
| `.git/`                 | This app has its own Git history                             |
| `.next/`                | Build output — regenerated automatically                     |
| `next.config.js` / `.ts`| The main app already has its own Next.js config              |
| `tsconfig.json`         | The main app already has its own TypeScript config            |
| `.env` / `.env.local`   | Environment variables are set at the project root or Vercel  |
| `vercel.json`           | Deployment config lives at the project root only             |
| `public/` (as a folder) | Move assets into the matching `public/workshops/…` folder    |

---

## Quick Checklist

1. Open the route folder for the workshop you want to update (e.g.,
   `app/workshops/ytempirebuilder1/`).
2. Replace `page.tsx` with your landing page component.
3. Place any supporting components in the same folder or import from a shared
   location.
4. Copy images and assets to `public/workshops/ytempirebuilder1/`.
5. Delete the `.gitkeep` file from the asset folder once you have real assets.
6. Run `npm run build` to verify everything compiles.
7. Test the URL locally at `http://localhost:3000/workshops/ytempirebuilder1`.
