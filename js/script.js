/* ============================================================
   Expense & Budget Visualizer — Application Logic
   Sections:
   1. DOM Elements
   2. State Management
   3. Local Storage
   4. Transaction Functions
   5. Calculation Functions
   6. Chart Functions
   7. Event Listeners
   8. Initialization
   ============================================================ */

(function () {
  "use strict";

  /* ---------------------------------------------------------
     1. DOM ELEMENTS
     --------------------------------------------------------- */
  const dom = {
    form: document.getElementById("transaction-form"),
    itemName: document.getElementById("item-name"),
    amount: document.getElementById("amount"),
    category: document.getElementById("category"),
    formMessage: document.getElementById("form-message"),
    totalBalance: document.getElementById("total-balance"),
    balanceHint: document.getElementById("balance-hint"),
    monthlyTotal: document.getElementById("monthly-total"),
    monthlyCategory: document.getElementById("monthly-category"),
    transactionList: document.getElementById("transaction-list"),
    emptyState: document.getElementById("empty-state"),
    sortSelect: document.getElementById("sort-select"),
    chartCanvas: document.getElementById("spending-chart"),
    chartEmpty: document.getElementById("chart-empty"),
    chartCount: document.getElementById("chart-count"),
    chartTop: document.getElementById("chart-top"),
    environmentNotice: document.getElementById("environment-notice"),
    themeToggle: document.getElementById("theme-toggle"),
  };

  /* ---------------------------------------------------------
     2. STATE MANAGEMENT
     --------------------------------------------------------- */
  const STORAGE_KEYS = {
    transactions: "ebv_transactions",
    theme: "ebv_theme",
  };

  const CATEGORIES = ["Food", "Transport", "Fun"];

  const CATEGORY_COLORS = {
    Food: "#f59e0b",
    Transport: "#3b82f6",
    Fun: "#8b5cf6",
  };

  /**
   * Inline SVG icon set (Lucide-style, consistent 1.8 stroke weight).
   * Icons are injected via innerHTML so markup stays out of the HTML file.
   */
  const ICONS = {
    utensils:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h1a2 2 0 0 0 2-2V2"/><path d="M5 2v20"/><path d="M15 2v20"/><path d="M21 2c-1.7 0-3 1.3-3 3v5c0 1.1.9 2 2 2h1V2Z"/></svg>',
    car:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 17H3v-5l2-5h14l2 5v5h-2"/><path d="M5 17a2 2 0 1 0 4 0 2 2 0 1 0-4 0"/><path d="M15 17a2 2 0 1 0 4 0 2 2 0 1 0-4 0"/><path d="M9 17h6"/><path d="M3 12h18"/></svg>',
    gamepad:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 12h4"/><path d="M8 10v4"/><path d="M15 13h.01"/><path d="M18 11h.01"/><rect width="20" height="12" x="2" y="6" rx="6"/></svg>',
    trash:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>',
    sun:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>',
    moon:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>',
  };

  /** Map a category to its icon key. */
  const CATEGORY_ICONS = {
    Food: "utensils",
    Transport: "car",
    Fun: "gamepad",
  };

  const state = {
    transactions: [],
    sortMode: "latest",
    theme: "light",
    chart: null,
  };

  /* ---------------------------------------------------------
     3. LOCAL STORAGE
     --------------------------------------------------------- */

  /** Safely read and parse a JSON value from localStorage. */
  function readStorage(key, fallback) {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw === null) return fallback;
      return JSON.parse(raw);
    } catch (error) {
      console.warn(`Failed to read "${key}" from localStorage:`, error);
      return fallback;
    }
  }

  /** Safely write a JSON value to localStorage. */
  function writeStorage(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Failed to write "${key}" to localStorage:`, error);
      showFormMessage("Could not save your data. Storage may be full or disabled.", "error");
    }
  }

  /** Load transactions and validate their shape. */
  function loadTransactions() {
    const stored = readStorage(STORAGE_KEYS.transactions, []);
    if (!Array.isArray(stored)) return [];

    return stored.filter(function (item) {
      return (
        item &&
        typeof item.id !== "undefined" &&
        typeof item.name === "string" &&
        typeof item.amount === "number" &&
        isFinite(item.amount) &&
        item.amount > 0 &&
        CATEGORIES.indexOf(item.category) !== -1
      );
    });
  }

  /**
   * Persist the current transactions array.
   * Returns true on success, false on failure so callers can roll back.
   */
  function saveTransactions() {
    try {
      window.localStorage.setItem(
        STORAGE_KEYS.transactions,
        JSON.stringify(state.transactions)
      );
      return true;
    } catch (error) {
      console.warn(`Failed to write "${STORAGE_KEYS.transactions}" to localStorage:`, error);
      showFormMessage("Could not save your data. Storage may be full or disabled.", "error");
      return false;
    }
  }

  /**
   * Cross-tab sync: react when another tab changes a storage key.
   * The `storage` event only fires in OTHER tabs, never the writer.
   */
  function handleStorageEvent(event) {
    if (event.key === STORAGE_KEYS.transactions) {
      // 1 & 2. Reload from localStorage and replace in-memory state.
      state.transactions = loadTransactions();
      // 3 & 4. Refresh list, balance, monthly summary and chart.
      updateUI();
    } else if (event.key === STORAGE_KEYS.theme) {
      const theme = event.newValue === "dark" ? "dark" : "light";
      applyTheme(theme);
    }
  }

  /* ---------------------------------------------------------
     4. TRANSACTION FUNCTIONS
     --------------------------------------------------------- */

  /** Generate a reasonably unique id. */
  function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }

  /** Add a new transaction from the form values. Returns boolean success. */
  function addTransaction(event) {
    event.preventDefault();

    const validation = validateForm();
    if (!validation.valid) {
      showFormMessage(validation.message, "error");
      return false;
    }

    const transaction = {
      id: generateId(),
      name: validation.name,
      amount: validation.amount,
      category: validation.category,
      createdAt: Date.now(),
    };

    // Backup first, then mutate. Roll back if persistence fails.
    const previous = state.transactions.slice();
    state.transactions.push(transaction);

    if (!saveTransactions()) {
      state.transactions = previous;
      return false;
    }

    updateUI();
    dom.form.reset();
    clearInvalidState();
    showFormMessage("Transaction added successfully.", "success");
    dom.itemName.focus();
    return true;
  }

  /** Delete a transaction by id. Rolls back if persistence fails. */
  function deleteTransaction(id) {
    const index = state.transactions.findIndex(function (t) {
      return String(t.id) === String(id);
    });

    if (index === -1) return;

    // Backup first, then mutate. Roll back if persistence fails.
    const previous = state.transactions.slice();
    state.transactions.splice(index, 1);

    if (!saveTransactions()) {
      state.transactions = previous;
      return;
    }

    updateUI();
    showFormMessage("Transaction deleted.", "success");
  }

  /** Validate the add-transaction form. */
  function validateForm() {
    const name = dom.itemName.value.trim();
    const rawAmount = dom.amount.value.trim();
    const category = dom.category.value;

    clearInvalidState();

    if (name === "") {
      markInvalid(dom.itemName);
      return { valid: false, message: "Please enter an item name." };
    }

    if (rawAmount === "") {
      markInvalid(dom.amount);
      return { valid: false, message: "Please enter an amount." };
    }

    const amount = Number(rawAmount);
    if (!isFinite(amount) || isNaN(amount)) {
      markInvalid(dom.amount);
      return { valid: false, message: "Amount must be a valid number." };
    }

    if (amount <= 0) {
      markInvalid(dom.amount);
      return { valid: false, message: "Amount must be greater than zero." };
    }

    if (category === "" || CATEGORIES.indexOf(category) === -1) {
      markInvalid(dom.category);
      return { valid: false, message: "Please select a category." };
    }

    return { valid: true, name: name, amount: amount, category: category };
  }

  /** Timer handle so success messages can auto-clear without stacking. */
  let successMessageTimer = null;

  /** Show a validation / status message below the form. */
  function showFormMessage(message, type) {
    if (!dom.formMessage) return;

    if (successMessageTimer) {
      clearTimeout(successMessageTimer);
      successMessageTimer = null;
    }

    dom.formMessage.textContent = message || "";
    dom.formMessage.classList.remove("is-error", "is-success");

    if (type === "error") dom.formMessage.classList.add("is-error");

    if (type === "success") {
      dom.formMessage.classList.add("is-success");
      // Success messages disappear automatically; errors persist.
      successMessageTimer = setTimeout(function () {
        if (dom.formMessage.classList.contains("is-success")) {
          dom.formMessage.textContent = "";
          dom.formMessage.classList.remove("is-success");
        }
      }, 2500);
    }
  }

  function markInvalid(element) {
    if (element) element.classList.add("is-invalid");
  }

  function clearInvalidState() {
    [dom.itemName, dom.amount, dom.category].forEach(function (el) {
      if (el) el.classList.remove("is-invalid");
    });
  }

  /** Return transactions ordered per the active sort mode. */
  function getSortedTransactions() {
    const list = state.transactions.slice();

    switch (state.sortMode) {
      case "highest":
        return list.sort(function (a, b) { return b.amount - a.amount; });
      case "lowest":
        return list.sort(function (a, b) { return a.amount - b.amount; });
      case "latest":
      default:
        return list.sort(function (a, b) {
          return (b.createdAt || 0) - (a.createdAt || 0);
        });
    }
  }

  /* ---------------------------------------------------------
     5. CALCULATION FUNCTIONS
     --------------------------------------------------------- */

  /** Total of all recorded expenses. */
  function calculateTotal() {
    return state.transactions.reduce(function (sum, t) {
      return sum + t.amount;
    }, 0);
  }

  /** Sum amounts for a given category. */
  function calculateCategoryTotal(category) {
    return state.transactions.reduce(function (sum, t) {
      return t.category === category ? sum + t.amount : sum;
    }, 0);
  }

  /** Totals keyed by category for the chart. */
  function calculateCategoryTotals() {
    return CATEGORIES.map(function (category) {
      return calculateCategoryTotal(category);
    });
  }

  /** Determine the category with the highest total, or null when empty. */
  function getHighestCategory() {
    let highest = null;
    CATEGORIES.forEach(function (category) {
      const total = calculateCategoryTotal(category);
      if (total > 0 && (!highest || total > highest.total)) {
        highest = { category: category, total: total };
      }
    });
    return highest;
  }

  /** Transactions that fall within the current calendar month and year. */
  function getCurrentMonthTransactions() {
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();
    return state.transactions.filter(function (t) {
      if (!t.createdAt) return false;
      const date = new Date(t.createdAt);
      return date.getMonth() === month && date.getFullYear() === year;
    });
  }

  /** Total spending for the current month only. */
  function calculateMonthlyTotal() {
    return getCurrentMonthTransactions().reduce(function (sum, t) {
      return sum + t.amount;
    }, 0);
  }

  /** Human-readable label for the top category, or an em dash when empty. */
  function highestCategoryLabel() {
    const highest = getHighestCategory();
    return highest ? highest.category : "\u2014";
  }

  /** Highest spending category within the current month, or null. */
  function getMonthlyHighestCategory() {
    const monthly = getCurrentMonthTransactions();
    let highest = null;
    CATEGORIES.forEach(function (category) {
      const total = monthly.reduce(function (sum, t) {
        return t.category === category ? sum + t.amount : sum;
      }, 0);
      if (total > 0 && (!highest || total > highest.total)) {
        highest = { category: category, total: total };
      }
    });
    return highest;
  }

  /** Reusable Indonesian Rupiah formatter (e.g. "Rp 25.000"). */
  const rupiahFormatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  /** Format a numeric amount as Indonesian Rupiah (e.g. "Rp 25.000"). */
  function formatCurrency(value) {
    const safe = isFinite(value) ? value : 0;
    // Intl emits a non-breaking space; normalize it to a regular space so the
    // UI consistently shows "Rp 25.000".
    return rupiahFormatter.format(Math.round(safe)).replace(/\u00a0/g, " ");
  }

  /* ---------------------------------------------------------
     6. CHART FUNCTIONS
     --------------------------------------------------------- */

  /** Create the Chart.js pie chart instance (once). */
  function initChart() {
    if (state.chart || typeof window.Chart === "undefined") return;

    const ctx = dom.chartCanvas.getContext("2d");
    state.chart = new window.Chart(ctx, {
      type: "pie",
      data: {
        labels: CATEGORIES,
        datasets: [
          {
            data: [0, 0, 0],
            backgroundColor: CATEGORIES.map(function (c) { return CATEGORY_COLORS[c]; }),
            borderColor: "#ffffff",
            borderWidth: 2,
            hoverOffset: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 400 },
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              usePointStyle: true,
              pointStyle: "circle",
              padding: 16,
              color: getComputedStyle(document.body).color,
            },
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                const total = context.dataset.data.reduce(function (a, b) { return a + b; }, 0);
                const value = context.parsed || 0;
                const percent = total > 0 ? Math.round((value / total) * 100) : 0;
                return ` ${context.label}: ${formatCurrency(value)} (${percent}%)`;
              },
            },
          },
        },
      },
    });
  }

  /** Push fresh category data into the chart. */
  function updateChart() {
    const totals = calculateCategoryTotals();
    const hasData = totals.some(function (v) { return v > 0; });

    // Toggle the empty-state hint while the canvas stays in the layout.
    dom.chartEmpty.style.display = hasData ? "none" : "block";
    dom.chartCanvas.style.display = hasData ? "block" : "none";

    // Analytics meta sourced from real transaction data only.
    if (dom.chartCount) {
      dom.chartCount.textContent = String(state.transactions.length);
    }
    if (dom.chartTop) {
      dom.chartTop.textContent = highestCategoryLabel(totals);
    }

    // Chart is always created during init(); nothing to update if it failed.
    if (!state.chart) return;

    state.chart.data.datasets[0].data = totals;
    state.chart.update();
  }

  /** Refresh chart text colors so they follow the active theme. */
  function refreshChartTheme() {
    if (!state.chart) return;
    const textColor = getComputedStyle(document.body).color;
    const borderColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--bg-card")
      .trim() || "#ffffff";

    state.chart.options.plugins.legend.labels.color = textColor;
    state.chart.data.datasets[0].borderColor = borderColor;
    state.chart.update();
  }

  /* ---------------------------------------------------------
     7. UI RENDERING
     --------------------------------------------------------- */

  /** Re-render balance, list, monthly summary and chart. */
  function updateUI() {
    renderBalance();
    renderTransactionList();
    renderMonthlySummary();
    updateChart();
  }

  function renderBalance() {
    dom.totalBalance.textContent = formatCurrency(calculateTotal());

    if (dom.balanceHint) {
      const count = state.transactions.length;
      dom.balanceHint.textContent =
        count === 0
          ? "No expenses recorded yet"
          : count + " transaction" + (count === 1 ? "" : "s") + " recorded";
    }
  }

  function renderTransactionList() {
    const list = getSortedTransactions();
    dom.transactionList.innerHTML = "";

    if (list.length === 0) {
      dom.emptyState.style.display = "block";
      return;
    }

    dom.emptyState.style.display = "none";

    // Build list items in a fragment for efficient DOM updates.
    const fragment = document.createDocumentFragment();

    list.forEach(function (transaction) {
      const categoryKey = transaction.category.toLowerCase();
      const li = document.createElement("li");
      li.className = "transaction-item";

      const icon = document.createElement("span");
      icon.className = "transaction-icon transaction-icon--" + categoryKey;
      icon.setAttribute("aria-hidden", "true");
      icon.innerHTML = ICONS[CATEGORY_ICONS[transaction.category]] || "";

      const info = document.createElement("div");
      info.className = "transaction-info";

      const name = document.createElement("span");
      name.className = "transaction-name";
      name.textContent = transaction.name;

      const amount = document.createElement("span");
      amount.className = "transaction-amount";
      amount.textContent = formatCurrency(transaction.amount);

      info.appendChild(name);
      info.appendChild(amount);

      const meta = document.createElement("div");
      meta.className = "transaction-meta";

      const badge = document.createElement("span");
      badge.className = "badge badge--" + categoryKey;
      badge.textContent = transaction.category;

      const deleteBtn = document.createElement("button");
      deleteBtn.type = "button";
      deleteBtn.className = "btn-delete";
      deleteBtn.setAttribute("aria-label", `Delete transaction: ${transaction.name}`);
      deleteBtn.innerHTML =
        '<span class="btn-delete__icon" aria-hidden="true">' + ICONS.trash + "</span>";
      deleteBtn.addEventListener("click", function () {
        deleteTransaction(transaction.id);
      });

      meta.appendChild(badge);
      meta.appendChild(deleteBtn);

      li.appendChild(icon);
      li.appendChild(info);
      li.appendChild(meta);
      fragment.appendChild(li);
    });

    dom.transactionList.appendChild(fragment);
  }

  function renderMonthlySummary() {
    dom.monthlyTotal.textContent = formatCurrency(calculateMonthlyTotal());

    const highest = getMonthlyHighestCategory();
    dom.monthlyCategory.textContent = highest
      ? `Highest Category: ${highest.category}`
      : "Highest Category: —";
  }

  /* ---------------------------------------------------------
     THEME HANDLING
     --------------------------------------------------------- */

  function applyTheme(theme) {
    state.theme = theme === "dark" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", state.theme);

    // Dark mode shows a sun (to switch back to light); light mode shows a moon.
    const themeIcon = dom.themeToggle.querySelector(".theme-icon");
    if (themeIcon) {
      themeIcon.innerHTML = state.theme === "dark" ? ICONS.sun : ICONS.moon;
    }
    dom.themeToggle.setAttribute("aria-pressed", state.theme === "dark" ? "true" : "false");

    refreshChartTheme();
  }

  function toggleTheme() {
    const next = state.theme === "dark" ? "light" : "dark";
    applyTheme(next);
    writeStorage(STORAGE_KEYS.theme, next);
  }

  /* ---------------------------------------------------------
     8. EVENT LISTENERS
     --------------------------------------------------------- */

  function bindEvents() {
    dom.form.addEventListener("submit", addTransaction);

    dom.sortSelect.addEventListener("change", function (event) {
      state.sortMode = event.target.value;
      renderTransactionList();
    });

    dom.themeToggle.addEventListener("click", toggleTheme);

    // Cross-tab synchronization for localStorage changes.
    window.addEventListener("storage", handleStorageEvent);

    // Clear invalid highlight as the user corrects inputs.
    [dom.itemName, dom.amount, dom.category].forEach(function (el) {
      el.addEventListener("input", function () { el.classList.remove("is-invalid"); });
      el.addEventListener("change", function () { el.classList.remove("is-invalid"); });
    });
  }

  /* ---------------------------------------------------------
     9. INITIALIZATION
     --------------------------------------------------------- */

  /**
   * Show a neutral informational notice ONLY when the app is opened directly
   * from the filesystem (file://). It stays hidden on localhost, HTTPS and
   * GitHub Pages so normal users never see an environment warning.
   */
  function warnIfFileProtocol() {
    if (!dom.environmentNotice) return;
    const isFileProtocol = window.location.protocol === "file:";
    dom.environmentNotice.hidden = !isFileProtocol;
  }

  function init() {
    // 1. Restore theme preference before rendering values.
    state.theme = readStorage(STORAGE_KEYS.theme, "light");
    applyTheme(state.theme);

    // 2. Restore transactions.
    state.transactions = loadTransactions();

    bindEvents();

    // 3. Create the chart instance before rendering. Chart.js loads with
    //    `defer`, so retry once it is available if not ready yet.
    function startChart() {
      initChart();
      updateUI();
      refreshChartTheme();
    }

    if (typeof window.Chart === "undefined") {
      window.addEventListener("load", startChart);
    } else {
      startChart();
    }

    // 4. Non-blocking environment warning.
    warnIfFileProtocol();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
