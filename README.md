# Rishabh Kumar — Story Portfolio

A cinematic, chapter-based personal portfolio built with **Next.js 14** and **Tailwind CSS**.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
# http://localhost:3000
```

---

## 🏗️ Build for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── globals.css          ← Global styles, animations, custom cursor
│   ├── layout.tsx           ← Root layout with SEO metadata
│   └── page.tsx             ← Main page (assembles all sections)
├── components/
│   ├── Cursor.tsx           ← Custom gold cursor with trailing ring
│   ├── Nav.tsx              ← Fixed nav with mobile hamburger menu
│   ├── useReveal.ts         ← Intersection Observer scroll-reveal hook
│   ├── HeroSection.tsx      ← Hero with typewriter + animated name
│   ├── AboutSection.tsx     ← About me + stats grid
│   ├── ExperienceSection.tsx ← Timeline of internships/research
│   ├── ProjectsSection.tsx  ← Project cards grid
│   ├── SkillsSection.tsx    ← Categorized skills arsenal
│   ├── ContactSection.tsx   ← Contact links + copy-email button
│   └── Footer.tsx           ← Footer
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

---

## 🎨 Design System

| Token         | Value       | Usage                        |
|---------------|-------------|------------------------------|
| `ink`         | `#0A0A0F`   | Page background              |
| `parchment`   | `#F5ECD7`   | Primary text                 |
| `gold`        | `#C9A84C`   | Accents, borders, headings   |
| `gold-light`  | `#E8C97A`   | Hover states, gradients      |
| `fog`         | `#8B8B9A`   | Secondary text, muted labels |
| `ember`       | `#D4572A`   | Reserved for alerts/errors   |

**Fonts:**
- `Playfair Display` — serif headings
- `JetBrains Mono` — monospace labels & code
- `DM Sans` — body text

---

## ✏️ Customization

### Update your info
All personal data is stored directly in the component files. Edit these:

| What             | File                          |
|------------------|-------------------------------|
| Name, bio, intro | `components/HeroSection.tsx`  |
| Stats, about me  | `components/AboutSection.tsx` |
| Work experience  | `components/ExperienceSection.tsx` |
| Projects         | `components/ProjectsSection.tsx`   |
| Skills           | `components/SkillsSection.tsx`     |
| Contact links    | `components/ContactSection.tsx`    |
| SEO metadata     | `app/layout.tsx`              |

### Add your GitHub username
Replace `Rishabh21404` with your GitHub username in `HeroSection.tsx` and `ContactSection.tsx`.

---

## 🔧 Backend (Next Step)

When you're ready to add backend features, Next.js supports API routes out of the box:

```
app/
└── api/
    ├── contact/
    │   └── route.ts     ← Contact form handler (POST)
    └── resume/
        └── route.ts     ← Resume download endpoint
```

Example contact route:
```ts
// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();
  // Send email, save to DB, etc.
  return NextResponse.json({ success: true });
}
```

---

## 🌐 Deployment

### Vercel (Recommended — Free)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Deploy the `.next` folder
```

---

## 📦 Dependencies

| Package        | Purpose                        |
|----------------|--------------------------------|
| `next`         | React framework                |
| `react`        | UI library                     |
| `tailwindcss`  | Utility-first CSS              |
| `framer-motion`| Animations (available if needed)|
| `lucide-react` | Icon library (available if needed)|

---

Built with ☕ and curiosity by **Rishabh Kumar** · NIT Srinagar · Class of 2027
