# Personal Finance Visualizer

A personal finance tracking application built with Next.js, allowing users to add, view, and delete financial transactions, and visualize their spending data.



## Features

-   **Transaction Management:**
    -   Add new transactions with amount, description, date, type (income/expense), and category.
    -   View a list of all recorded transactions.
    -   Delete individual transactions.
-   **Data Storage:** Transactions are persistently stored in a MongoDB Atlas database.
-   **Basic Data Visualization:**
    -   Displays a basic bar chart of transaction amounts (currently daily sums, will be enhanced for monthly expenses).
-   **Modern UI:**
    -   Responsive design using Tailwind CSS.
    -   Interactive components (e.g., date picker, select dropdowns) powered by `shadcn/ui`.

## Current Status

The core transaction management features (Add, View, Delete) are fully functional. Basic data visualization has been integrated, with further enhancements planned for a specific "Monthly Expenses Bar Chart."

**Completed:**
-   **Phase 1: Basic Transaction Tracking**
    -   Add/Delete transactions (amount, date, description, type, category).
    -   Transaction list view.
    -   Basic form validation.
-   **Phase 2: Data Visualization (Initial)**
    -   Integration of Recharts.
    -   Display of a bar chart summarizing transaction amounts by date.
-   **UI/UX Refinements:**
    -   Enhanced date picker.
    -   Improved overall page layout, spacing, and card styling.

**To be enhanced/added:**
-   **Edit Transaction functionality.**
-   **Chart refinement:** Specifically aggregate and display monthly expenses only.
-   More advanced data visualizations (e.g., spending by category, income trends).
-   User authentication and multi-user support.
-   Advanced UI/UX improvements.

## Technologies Used

-   **Frontend:**
    -   [Next.js](https://nextjs.org/) (React Framework)
    -   [Tailwind CSS](https://tailwindcss.com/) (Styling)
    -   [shadcn/ui](https://ui.shadcn.com/) (UI Components built on Radix UI & Tailwind CSS)
    -   [Recharts](https://recharts.org/en-US/) (Data Visualization Library)
    -   [Lucide React](https://lucide.dev/) (Icons)
    -   [date-fns](https://date-fns.org/) (Date utility library)
-   **Backend:**
    -   Next.js API Routes
    -   [Mongoose](https://mongoosejs.com/) (MongoDB Object Data Modeling - ODM)
    -   [MongoDB Atlas](https://www.mongodb.com/atlas) (Cloud Database)

## Setup and Installation

Follow these steps to get the project up and running on your local machine.

### Prerequisites

-   Node.js (LTS version recommended)
-   npm or Yarn
-   A MongoDB Atlas account (free tier is sufficient)

### 1. Clone the repository

```bash
git clone <your-repository-url> # Replace with your actual repository URL if using Git
cd personal-finance-visualizer

### 📦 2. Install Dependencies

```bash
npm install
# or
yarn install



## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
