# 📝 Blog Frontend

This is the frontend part of a full-stack blog application built using **Next.js**, **React 19**, **Redux Toolkit**, **Material UI**, and **TypeScript**. The app allows users to view, create, update, and delete blog posts, as well as add comments.

## 🚀 Features

* 📄 View all blog posts
* 🗒️ View a single post with comments
* ✍️ Create a new post
* ✏️ Edit an existing post
* ❌ Delete a post
* 💬 Add comments to a post
* ✅ Client-side input validation
* 🔔 Error message handling

## 🧰 Tech Stack

* **Next.js 15**
* **React 19**
* **Redux Toolkit**
* **TypeScript**
* **Material UI v7**
* **Tailwind CSS**
* **Emotion Styled Components**
* **JWT Decode**
* **lodash.debounce**

## 📦 Installation

```bash
git clone https://github.com/vlasiuk-anatolii/blog-front
cd blog-front/front
npm install
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)

## ⚙️ Configuration

Create a `.env` file in the `front/` directory with the following content:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 📁 Project Structure

```
front/
├── app/
│ ├── auth/ // Authentication pages and logic
│ ├── comments/ // Comment-related pages and logic
│ ├── common/ // Shared components/utilities
│ ├── header/ // Header layout and navigation
│ ├── posts/ // Post-related pages (CRUD)
│ ├── search/ // Search functionality
│ ├── store/ // Redux store and slices
│ ├── dark.theme.ts // Custom MUI dark theme
│ ├── favicon.ico // Favicon for the app
│ └── globals.css // Global CSS styles
├── .next/ // Next.js build output (auto-generated)
├── package.json // Project metadata and dependencies
├── tailwind.config.js // Tailwind CSS configuration
└── tsconfig.json // TypeScript configuration
```

## ✅ Implemented

* [x] Display all posts
* [x] View a post with comments
* [x] Create a new post
* [x] Edit a post
* [x] Delete a post
* [x] Add comments to a post
* [x] Client-side validation
* [x] Error handling
* [x] Search (basic)
* [x] Responsive design

## ➕ Optional Enhancements

* [ ] Pagination
* [ ] Lite Mode

## 📝 Notes

* The backend should be running on `http://localhost:3001` or the address set in `NEXT_PUBLIC_API_URL`.
* All forms include basic validation with helpful error messages.

## 📄 License

MIT © 2025 [Anatolii Vlasiuk](https://github.com/vlasiuk-anatolii)
