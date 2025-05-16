# Markdown Editor

A modern, efficient markdown editor built with React. Organize, edit, and export
your markdown documents with a beautiful, responsive interface.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Terminal239/re-markdown-editor.git
   cd markdown-editor
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

## Usage

1. **Start the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

2. Open your browser and navigate to `http://localhost:5173` (or the port
   specified in your terminal).
3. Start editing and organizing your markdown files!

## Features

- **Real-time Preview:** See your formatted Markdown output instantly as you
  type.
- **File & Folder Operations:** Create, rename, and delete both markdown files
  and folders. Organize documents in a hierarchical file tree.
- **Context Menus:** Right-click on files or folders for quick actions (rename,
  delete, new file/folder).
- **Bulk Export:** Export all your markdown files and folders as a ZIP archive.
- **Single File Export:** Export the currently open markdown document as a `.md`
  file.
- **Sidebar Actions:** Quick-access buttons for creating files/folders,
  renaming, deleting, and exporting.
- **Persistent Storage:** All documents and folders are stored locally in your
  browser (IndexedDB).
- **Modern UI/UX:** Responsive design, tooltips, modals for delete confirmation,
  and a distraction-free writing environment.
- **Empty State UI:** Friendly message when no document is selected.

## Folder Structure

A brief overview of the project's main directories:

```plaintext
markdown-editor/
├── public/              # Static assets
├── src/                 # Source files
│   ├── assets/          # Project assets (images, fonts, etc.)
│   ├── components/      # Reusable UI components
│   ├── config/          # Configuration files
│   ├── context/         # React context providers
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions and libraries
│   ├── reducer/         # State management logic
│   ├── actions/         # Action creators and file/folder logic
│   ├── styles/          # Global styles and themes
│   ├── types/           # TypeScript type definitions
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # Application entry point
│   └── vite-env.d.ts    # Vite environment types
├── .gitignore           # Git ignore rules
├── index.html           # HTML entry point
├── LICENSE              # Project license file
├── package.json         # Project metadata and dependencies
├── README.md            # Project documentation
├── tsconfig.json        # TypeScript configuration
├── tsconfig.node.json   # TypeScript Node configuration
└── vite.config.ts       # Vite configuration
```

## Contribution Guidelines

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature-name`).
6. Open a Pull Request.

Please ensure your code adheres to the project's coding standards and includes
tests where appropriate.

## License

This project is licensed under the MIT License. See the `LICENSE` file for
details.
