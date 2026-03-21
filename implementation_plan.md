# InventAI Implementation Plan

## Goal Description
Build "InventAI", a modern, premium web application for SMEs to manage inventory, orders, billing, and get smart insights. The UI will follow a "Navy Gold Premium" aesthetic using Vanilla CSS, focus on practical usage without heavy ERP complexity, and include special features like PDF invoices and an integrated AI assistant.

## Proposed Changes

### Setup & Infrastructure
- Initialize React standard project with Vite & TypeScript
- Set up React Router for navigation
- Set up global state management using React Context (for MVP simplicity and mock data sharing)

### Design System (Vanilla CSS)
- **Colors**: Deep Navy (`#0A192F`), Slate (`#112240`), Muted Gold (`#D4AF37`), Light Gray (`#F3F4F6`), White (`#FFFFFF`)
- **Typography**: Inter or Roboto (Google Fonts)
- **Components**: Premium cards with soft shadows, smooth sidebar with subtle 3D scale effects

### Modules to Implement
- **Mock DB**: Implement a mock data store with pre-seeded realistic SME data.
- **Auth**: Simple mock login screen.
- **Layout**: Sidebar with navigation, mobile responsive.
- **Dashboard**: High-level metrics, AI assistant summary.
- **Inventory**: Product list, status badging, add/edit modals.
- **Orders**: Order creation flow, automatic inventory decrement.
- **Billing**: PDF generation using `jspdf` and `jspdf-autotable`.
- **Customers & Notifications**: List views and simple log tracking.
- **Analytics**: Mock charts using simple CSS or a lightweight chart library (e.g. `recharts`).
- **AI Assistant**: A floating or sidebar chatbot mimicking insights integration.

## Verification Plan
### Automated Tests
- Type checking with TypeScript (`tsc`)
- Vite build verification (`npm run build`)

### Manual Verification
- Test normal user flows (login -> dashboard -> create order -> check inventory -> generate invoice).
- Verify styling matches the premium "Navy/Gold" requirements.
- Verify PDF generation correctly formats in ₹ and downloads.
