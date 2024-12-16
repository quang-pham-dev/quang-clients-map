# Quang Clients Map

## Project Overview

An interactive mapping application that showcases my client portfolio and professional journey. The website features:

- Interactive 3D globe visualization of client locations worldwide
- Detailed client history and project information
- Timeline of professional collaborations past and present
- Modern React components with TypeScript
- Responsive and animated UI for engaging user experience
- Performance-optimized for smooth globe interactions
- Custom-themed interface with professional aesthetics

This application serves as a visual representation of my professional network, highlighting collaborations and projects across different regions and industries throughout my career.

## Tech Stack

### Core Technologies:

- [Next.js](https://nextjs.org/) (v15.1.0)
- [React](https://react.dev/) (v19.0.0)
- [React DOM](https://reactjs.org/docs/react-dom.html) (v19.0.0)
- [TypeScript](https://www.typescriptlang.org/) (v5)

### 3D Rendering:

- [Three.js](https://threejs.org/) (v0.171.0)
- [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) (v9.0.0-rc.1)
- [@react-three/drei](https://drei.pmnd.rs/) (v9.120.4)

### UI and Styling:

- [Tailwind CSS](https://tailwindcss.com/) (v3.4.1)
- [Radix UI](https://www.radix-ui.com/) components:
  - [@radix-ui/react-dialog](https://www.radix-ui.com/primitives/docs/components/dialog) (v1.1.3)
  - [@radix-ui/react-scroll-area](https://www.radix-ui.com/primitives/docs/components/scroll-area) (v1.2.2)
  - [@radix-ui/react-slot](https://www.radix-ui.com/primitives/docs/utilities/slot) (v1.1.1)
- [Lucide React](https://lucide.dev/) (v0.468.0)
- [class-variance-authority](https://cva.style/docs) (v0.7.1)
- [clsx](https://github.com/lukeed/clsx) (v2.1.1)
- [tailwind-merge](https://github.com/dcastil/tailwind-merge) (v2.5.5)
- [tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate) (v1.0.7)
- [Vaul](https://vaul.emilkowal.ski/) (v1.1.2)

### Development Tools:

- [ESLint](https://eslint.org/) (v9)
- [react-scan](https://www.npmjs.com/package/react-scan) (v0.0.46)
- [react-error-boundary](https://github.com/bvaughn/react-error-boundary) (v4.1.2)

## Getting Started

### Prerequisites:

- Node.js
- npm, yarn, pnpm, or bun

### Development

1. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

2. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Development Features

- **Turbopack Enabled**: Using Next.js with Turbopack for faster development
- **Hot Reload**: The page auto-updates as you edit files
- **React Scan**: Includes development tools for React component analysis
- **TypeScript**: Strict type checking enabled
- **Custom Font**: Utilizes [Geist](https://vercel.com/font) font family
