# Axiom Trade - Token Discovery Table

A pixel-perfect, real-time token discovery table built with Next.js 14, TypeScript, Tailwind CSS, and Redux Toolkit.

## 🚀 Features

*   **Real-time Updates**: Simulated WebSocket connection with sub-second price updates.
*   **High Performance**: Optimized using Redux Entity Adapter and React.memo to handle high-frequency data changes without UI lag.
*   **Interactive UI**:
    *   **Sorting**: Multi-column sorting (Price, Age, Liquidity, etc.).
    *   **Filtering**: Toggle between New Pairs, Final Stretch, and Migrated tokens.
    *   **Details**: Click any row to view deep token details in a modal.
    *   **Tooltips & Popovers**: Contextual information and quick actions.
*   **Strict Architecture**: Follows Atomic Design principles (Atoms -> Molecules -> Organisms).

## 🛠 Tech Stack

*   **Framework**: Next.js 14 (App Router)
*   **Language**: TypeScript (Strict Mode)
*   **Styling**: Tailwind CSS + `clsx` + `tailwind-merge`
*   **State Management**: Redux Toolkit (EntityAdapter for normalization)
*   **UI Primitives**: Radix UI (Dialog, Popover, Tooltip)
*   **Icons**: Lucide React

## 🏃‍♂️ Setup & Run

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Run Development Server:**
    ```bash
    npm run dev
    ```

3.  **Build for Production:**
    ```bash
    npm run build
    npm start
    ```

## 🏗 Architecture Decisions

### 1. Atomic Design
Components are organized into `atoms` (Button, Badge), `molecules` (TokenRow, FilterTabs), and `organisms` (TokenTable) to ensure maximum reusability and isolation.

### 2. Redux Entity Adapter
To handle the frequent updates (simulating a high-frequency trading feed), we utilize `createEntityAdapter`. This normalizes the state (ID-based lookup), allowing for O(1) updates and efficient selector memoization, preventing unnecessary re-renders of the entire list.

### 3. WebSocket Simulation
A custom `MockWebSocket` service (`src/services/websocket.ts`) simulates a real exchange feed. It uses an observer pattern to push updates to the Redux store via a custom hook `useSocketConnection`.

### 4. Performance Optimizations
*   **Memoization**: `TokenRow` is wrapped in `React.memo` to ensure only rows with changed data re-render.
*   **Virtual DOM**: React handles the efficient diffing, but our state structure minimizes the diff surface area.
*   **No Layout Shift**: Fixed-width columns and skeleton loaders prevent CLS during loading and updates.

## 📷 Screenshots

*(Placeholders for screenshots)*
- **Desktop View**: Full table with sticky headers.
- **Mobile View**: Responsive card layout (hidden columns on small screens).