# Expense & Budget Visualizer

**A simple and intuitive expense tracking dashboard with visual spending analysis.**

A mobile-friendly web application built with vanilla JavaScript that helps users track daily expenses, monitor total spending, and visualize spending distribution by category.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=flat&logo=chartdotjs&logoColor=white)

---

## 📋 Overview

**Expense & Budget Visualizer** is a client-side expense tracking application designed for individuals who want to monitor their daily spending habits without complex tools or sign-ups. The application runs entirely in your browser using Local Storage, ensuring your financial data stays private and secure on your device.

### What You Can Do:
- ✅ Add expense transactions with item name, amount, and category
- ✅ View complete transaction history with sorting options
- ✅ Track total balance and monthly spending summary
- ✅ Analyze expenses through interactive pie charts
- ✅ Switch between light and dark themes
- ✅ Access your data across browser tabs in real-time

**Target Users:** Anyone looking for a lightweight, privacy-focused expense tracker without the overhead of account creation or cloud storage.

---

## ✨ Features

### 🧾 **Expense Input**
- **Add Transactions:** Record expenses with item name, amount, and category
- **Category Selection:** Choose from predefined categories (Food, Transport, Fun)
- **Form Validation:** Ensures all fields are filled correctly before submission
- **Real-time Feedback:** Visual error messages and success notifications

### 📊 **Transaction Management**
- **Transaction History:** View all recorded expenses in a clean, organized list
- **Delete Functionality:** Remove transactions with a single click
- **Sort Options:** 
  - Latest (newest first)
  - Highest Amount (most expensive first)
  - Lowest Amount (least expensive first)
- **Visual Category Badges:** Color-coded badges for easy category identification

### 💰 **Dashboard Statistics**
- **Total Balance:** Real-time calculation of total spending
- **Transaction Count:** Track the number of recorded expenses
- **Monthly Summary:** View current month's total spending
- **Highest Category:** Identify which category you spend most on each month

### 📈 **Data Visualization**
- **Interactive Pie Chart:** Visual spending distribution powered by Chart.js
- **Category Breakdown:** See spending percentages for each category
- **Dynamic Updates:** Chart automatically updates when transactions change
- **Tooltips:** Hover over chart sections to see detailed amounts and percentages
- **Top Category Indicator:** Quickly identify your highest spending category

### 🎨 **Theme Customization**
- **Dark/Light Mode Toggle:** Switch themes based on your preference
- **Persistent Theme:** Your theme choice is saved and restored on next visit
- **Smooth Transitions:** Elegant animations when switching themes
- **Chart Adaptation:** Visualizations automatically adjust to match the selected theme

### 💾 **Data Persistence**
- **Local Storage:** All data is stored securely in your browser
- **Cross-Tab Sync:** Changes sync automatically across multiple tabs
- **No Account Required:** Complete privacy with no sign-up or login
- **Offline Capable:** Works without internet connection after initial load

---

## 🖼️ Screenshots

### Light Mode - Dashboard Overview
![Light Mode Dashboard](screenshots/light-mode-dashboard.png)
*Clean interface showing total balance, monthly summary, and transaction list*

### Dark Mode - Visual Analytics
![Dark Mode Analytics](screenshots/dark-mode-chart.png)
*Dark theme with interactive pie chart for spending visualization*

### Transaction Management
![Transaction List](screenshots/transaction-list.png)
*Sortable transaction history with category badges and delete functionality*

### Mobile Responsive Design
![Mobile View](screenshots/mobile-responsive.png)
*Fully responsive layout optimized for mobile devices*

---

### 📸 How to Add Screenshots

To display screenshots in this README:

1. **Create a `screenshots` folder** in the project root directory
2. **Take screenshots** of your running application:
   - `light-mode-dashboard.png` - Dashboard in light theme
   - `dark-mode-chart.png` - Chart visualization in dark theme
   - `transaction-list.png` - Transaction management interface
   - `mobile-responsive.png` - Mobile view (use browser DevTools)
3. **Save images** in the `screenshots/` folder
4. **Push to GitHub** - Images will automatically display in the README

**Screenshot Tips:**
- Use high resolution (1920x1080 recommended)
- Add sample transactions for better demonstration
- For mobile: Use Chrome DevTools responsive mode (375px width)
- Use browser extensions like "Awesome Screenshot" for full-page capture

---

## 🚀 How to Run Locally

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Git (for cloning the repository)
- No other dependencies required!

### Quick Start

**Step 1: Clone the repository**
```bash
git clone https://github.com/yourusername/expense-budget-visualizer.git
```

**Step 2: Navigate to project folder**
```bash
cd expense-budget-visualizer
```

**Step 3: Open in browser**

**Option A: Direct File (Simple)**
```bash
# Just double-click index.html
# OR use command line:
start index.html        # Windows
open index.html         # Mac
xdg-open index.html     # Linux
```

**Option B: Local Server (Recommended)**

Using **Python** (if installed):
```bash
# Python 3.x
python -m http.server 8000

# Python 2.x
python -m SimpleHTTPServer 8000
```

Using **Node.js** (if installed):
```bash
npx http-server
```

Using **PHP** (if installed):
```bash
php -S localhost:8000
```

**Step 4: Access the application**
- **Direct file:** Browser opens automatically
- **Local server:** Open `http://localhost:8000` in your browser

---

### ⚡ Alternative: Run Without Cloning

**Live Server (VS Code)**
1. Install "Live Server" extension in VS Code
2. Right-click `index.html`
3. Select "Open with Live Server"

**GitHub Pages**
Visit the live demo: `https://yourusername.github.io/expense-budget-visualizer/`

---

## 📖 Usage Guide

### Adding an Expense
1. Fill in the **Item Name** (e.g., "Coffee", "Bus Fare")
2. Enter the **Amount** (numeric value)
3. Select a **Category** (Food, Transport, or Fun)
4. Click **Add Transaction** button
5. The expense appears immediately in the transaction list

### Managing Transactions
- **View:** All transactions are displayed in the history section
- **Sort:** Use the dropdown to sort by Latest, Highest, or Lowest amount
- **Delete:** Click the trash icon next to any transaction to remove it

### Viewing Analytics
- **Total Balance:** Displayed at the top of the dashboard
- **Monthly Summary:** Shows current month's spending and top category
- **Pie Chart:** Visual breakdown of spending by category with percentages

### Theme Switching
- Click the **moon/sun icon** in the header to toggle between light and dark mode
- Your preference is saved automatically

---

## 🛠️ Technology Stack

| Technology | Purpose |
|------------|---------|
| **HTML5** | Semantic structure and accessibility |
| **CSS3** | Modern styling with CSS custom properties (variables) |
| **Vanilla JavaScript** | Core application logic (ES6+) |
| **Chart.js v4.4.1** | Interactive pie chart visualization |
| **Local Storage API** | Client-side data persistence |

### Architecture
- **No frameworks:** Pure vanilla JavaScript for lightweight performance
- **No backend:** 100% client-side application
- **No dependencies:** Except Chart.js for visualization
- **IIFE Pattern:** Encapsulated code to prevent global scope pollution

---

## 📁 Project Structure

```
expense-budget-visualizer/
│
├── index.html              # Main HTML file
├── css/
│   └── style.css          # All styling and theme definitions
├── js/
│   └── script.js          # Application logic and functionality
├── screenshots/           # Application screenshots (for README)
└── README.md             # Project documentation
```

### Code Organization (`script.js`)
1. **DOM Elements** - Element references
2. **State Management** - Application state and constants
3. **Local Storage** - Data persistence functions
4. **Transaction Functions** - Add/delete operations
5. **Calculation Functions** - Balance and category totals
6. **Chart Functions** - Chart.js initialization and updates
7. **Event Listeners** - User interaction handlers
8. **Initialization** - App setup and data loading

---

## 🎯 Key Highlights

### ✅ **Mobile-First Design**
Fully responsive interface that works seamlessly on smartphones, tablets, and desktop computers.

### ✅ **Real-Time Updates**
All calculations, charts, and statistics update instantly when transactions are added or removed.

### ✅ **Data Privacy**
Your financial data never leaves your browser. No servers, no tracking, no data collection.

### ✅ **Cross-Tab Synchronization**
Open the app in multiple browser tabs and see changes sync automatically.

### ✅ **Accessible Design**
Built with semantic HTML, ARIA labels, and keyboard navigation support.

### ✅ **Professional UI/UX**
Clean, modern interface with smooth animations and intuitive interactions.

---

## 🔧 Browser Support

| Browser | Minimum Version |
|---------|----------------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |

**Features Used:**
- ES6+ JavaScript (arrow functions, template literals, destructuring)
- CSS Custom Properties (CSS variables)
- Local Storage API
- Flexbox and CSS Grid
- SVG icons

---

## 📝 Data Storage

The application uses the **Browser Local Storage API** to persist data:

### Stored Data:
- **Transactions:** Array of expense objects with id, name, amount, category, and timestamp
- **Theme Preference:** User's selected theme (light/dark)

### Storage Keys:
- `ebv_transactions` - Transaction data
- `ebv_theme` - Theme preference

### Data Format Example:
```javascript
{
  id: "lj5k8m9n",
  name: "Coffee",
  amount: 25000,
  category: "Food",
  createdAt: 1726646400000
}
```

---

## 🤝 Contributing

Contributions are welcome! If you'd like to improve this project:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines:
- Maintain vanilla JavaScript (no frameworks)
- Follow existing code style and structure
- Test on multiple browsers before submitting
- Update README if adding new features

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

**Akmal Nasirudin Muzaki**

- GitHub: [@Kuzon-CL](https://github.com/Kuzon-CL)
- Project Repository: [Expense & Budget Visualizer](https://github.com/Kuzon-CL/CodingCamp-14September26-AkmalNasirudinMuzaki)

---

## 🙏 Acknowledgments

- **Chart.js** - Beautiful, simple charts for the web
- **Google Fonts (Inter)** - Professional typography
- **Lucide Icons** - Icon design inspiration
- **MDN Web Docs** - JavaScript and Web API references

---

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/expense-budget-visualizer/issues) page
2. Create a new issue with detailed information
3. Star ⭐ the repository if you find it useful!

---

## 🔮 Future Enhancements (Potential)

While the current version is feature-complete, potential future additions could include:
- Export data to CSV/JSON
- Custom category creation
- Budget limit warnings
- Date range filtering
- Multiple currency support

*These are not commitments, but ideas for community contributions.*

---

<div align="center">

**By Akmal, Built with ❤️ using Vanilla JavaScript**

⭐ Star this repository if you find it helpful!

</div>
