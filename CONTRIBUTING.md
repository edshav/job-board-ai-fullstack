# Contributing to Job Board

Thanks for your interest in contributing! This project uses Next.js App Router with TypeScript, Tailwind, and modern best practices. Please read the following guidelines before making a pull request.

---

## 📁 Folder & File Structure

We use the **App Router** in Next.js. Here's how we structure the `app/` directory:

- `app/page.tsx` – homepage route.
- `app/(jobseeker)/` – job seeker layout and routes.
- `app/(employer)/` – employer dashboard and routes.
- `app/components/` – shared UI components.

### ✅ Naming Conventions

#### Files

- Components use `PascalCase.tsx`
- Route handlers use `route.ts`
- Client components are named like `SidebarClient.tsx`
- **Internal client-only helpers** within `app/` are prefixed with `_`, e.g. `_AppSideClient.tsx`

> Underscored files indicate they are not routes and are only used internally.

#### Folders

- Group related features under `features/<feature-name>/`
- Use `components/`, `db/`, `lib/`, and `cache/` subfolders inside each feature

---

## 🧱 Component Guidelines

- Prefer server components by default
- Add `"use client"` only when necessary (e.g. hooks, event handlers)
- Use `shadcn/ui` for UI components
- Extract repeated logic into reusable hooks or components

---

## 🧪 Testing & Dev Notes

- Use `npm run dev` to run the local dev server
- Run `npm run lint` before submitting a PR
- Database migrations via Drizzle:
  - Generate: `npm run db:generate`
  - Push: `npm run db:push`
  - Studio: `npm run db:studio`

---

## ✅ Pull Request Checklist

- [ ] Follow file/folder naming conventions
- [ ] Revalidate cache tags if modifying dynamic content
- [ ] Check responsiveness (mobile/desktop)
- [ ] Add meaningful commit messages
- [ ] Describe changes clearly in the PR body

---

## 💬 Questions?

Feel free to open an issue or start a discussion if you're unsure about something.

Thanks again for contributing!
