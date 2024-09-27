# Dynamic Table with Product Filters and Variants

This project is a dynamic table-based UI that enables users to add, remove, and reorder rows (representing states) and columns (representing design variants). The project is built using **React** and styled with **Advanced CSS** for consistency and responsiveness.

## 🚀 Features

1. **Dynamic Rows (States):**  
   Users can dynamically add and delete rows. Each row corresponds to a state with a product filter.

2. **Dynamic Columns (Variants):**  
   Users can dynamically add and remove variant columns, with each column representing a design variant.

3. **Row Reordering (Drag-and-Drop):**  
   The table supports row reordering via drag-and-drop to rearrange states.

4. **Design Insertion (Optional):**  
   Users can insert a design into any specific variant column.

5. **Scrollable for Multiple Variants:**  
   When more than four variant columns are added, a scroll is implemented to maintain the layout's cleanliness and responsiveness.

## 🛠️ Tech Stack

- **React:** Core framework for building the UI.
- **Advanced CSS:** For styling and ensuring the UI is responsive.
- **React Beautiful DnD:** For implementing drag-and-drop functionality in the table rows.

## 🖥️ Getting Started

### Prerequisites

Ensure you have the following installed on your local environment:

- **Node.js** (v14 or above)
- **npm** or **yarn**

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/repository-name.git
   cd repository-name
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
   or if using yarn:
   ```bash
   yarn install
   ```

### Running the Project

To run the development server locally:

```bash
npm start
```

or with yarn:

```bash
yarn start
```

The application will be available at `http://localhost:3000`.

### Building for Production

To create a production build:

```bash
npm run build
```

or with yarn:

```bash
yarn build
```

After the build process, you can deploy the project on your preferred hosting platform.

### Deployment

This project can be deployed using platforms like **Netlify** or **Vercel**:

1. Create an account on [Netlify](https://netlify.com) or [Vercel](https://vercel.com).
2. Connect your GitHub repository.
3. Follow the steps to deploy the project directly from your repository.

## 📂 Project Structure

Here’s an overview of the project's file structure:

```
├── components
│   ├── DynamicTable.js      # Main component for the dynamic table
│   ├── Modal.js             # Component for handling modals
│   └── ...
├── pages
│   ├── App.js               # Entry point for the application
│   └── ...
├── styles
│   └── DynamicTable.css          # Responsive styles for Advanced UI
└── public
    └── assets               # Images and other assets
```

## 📜 Notes

- **Responsiveness:** The UI is fully responsive and adapts to various screen sizes.
- **Advanced CSS:** Used for clean, consistent design across the application.
- **React:** Provides a dynamic and interactive user experience.

## 💻 Demo

You can access the live demo of this project here: [Live Demo](https://retainiq-frontend-gautam.netlify.app/)

## 🛠️ Future Enhancements

- **Enhanced Design Insertion:** Further improving the design insertion experience.
- **Variant Management:** Adding the ability to manage the order of variant columns.

## 👨‍💻 Author

- **Your Name** - [Gautam Mishra](https://github.com/gautam1103)
