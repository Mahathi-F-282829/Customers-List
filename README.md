# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.


# Prerequisites

- **Node.js**: **20.19+** or **22.12+** (recommended: Node 20 LTS)  
- **npm**: v9+ (bundled with Node)

**Check versions:**
```bash
node -v
npm -v
```
# Install Dependencies

_I have submitted the code without `node_modules`, so install them first._
```bash
cd customers-list 
```
```bash
npm install
```
* * *

# Start the Dev Server
```bash
npm run dev
```

Open the URL Vite prints (typically):
```bash
http://localhost:5173
```

# Implemented Features

- Generated **1 million customer records** locally with fields:  
  `id, name, phone, email, score, lastMessageAt, addedBy, avatar`.

- Displayed data in a **table view** with:
  - **30 rows per page**
  - **Infinite scroll** to load more rows smoothly

- **Search functionality** (by name, email, or phone) with **250ms debounce**.

- **Sorting** on all major columns (Customer, Score, Email, Last Message Sent, Added By).  
  Sorting toggles between ascending/descending order with visual indicators.  
  ⚠️ Note: As the dataset has **1M rows**, sorting may take a little extra time.

- **Filters dropdown** (dummy UI only, no filtering logic).

- **Sticky headers** that remain visible while scrolling.

- **Row hover effects** for better readability.

- **Formatted dates** for last message in a human-readable format.

- **Added by column** includes both user name and an icon.

- Fully styled with **plain CSS only** (no frameworks).
