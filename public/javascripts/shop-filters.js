(function () {
  const cards = Array.from(document.querySelectorAll(".product-card"));
  const grid = document.getElementById("product-grid");
  const emptyState = document.getElementById("shop-empty");
  const countEl = document.getElementById("product-count");
  const statusEl = document.getElementById("filter-status");

  if (!grid || cards.length === 0) return;

  const state = {
    sortby: "popular",
    collection: "all",
    filter: "",
  };

  const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;

  function getCardData(card) {
    return {
      el: card,
      discount: Number(card.dataset.discount) || 0,
      inStock: card.dataset.instock !== "false",
      createdAt: Number(card.dataset.created) || 0,
    };
  }

  function matchesCollection(item) {
    if (state.collection === "discounted") return item.discount > 0;
    if (state.collection === "new") {
      if (item.createdAt > 0) return item.createdAt >= thirtyDaysAgo;
      return true;
    }
    return true;
  }

  function matchesFilter(item) {
    if (state.filter === "discount") return item.discount > 0;
    if (state.filter === "availability") return item.inStock;
    return true;
  }

  function sortItems(items) {
    const list = [...items];
    if (state.sortby === "newest" || state.collection === "new") {
      list.sort((a, b) => b.createdAt - a.createdAt);
    } else {
      list.sort((a, b) => {
        if (b.discount !== a.discount) return b.discount - a.discount;
        return b.createdAt - a.createdAt;
      });
    }
    return list;
  }

  function setActiveButtons() {
    document.querySelectorAll("[data-shop-action]").forEach((btn) => {
      const action = btn.dataset.shopAction;
      const value = btn.dataset.shopValue || "";
      let active = false;
      if (action === "sortby") active = state.sortby === value;
      if (action === "collection") active = state.collection === value;
      if (action === "filter") active = state.filter === value;
      btn.classList.toggle("shop-side-active", active);
    });
  }

  function updateStatus(visible) {
    const labels = [];
    if (state.collection === "new") labels.push("New Collection");
    else if (state.collection === "discounted") labels.push("Discounted");
    else labels.push("All Products");
    labels.push(state.sortby === "newest" ? "Newest" : "Popular");
    if (state.filter === "availability") labels.push("In stock");
    if (state.filter === "discount") labels.push("On sale");
    if (statusEl) statusEl.textContent = labels.join(" · ");
    if (countEl) countEl.textContent = String(visible);
  }

  function applyFilters() {
    const data = cards.map(getCardData);
    let visible = data.filter((item) => matchesCollection(item) && matchesFilter(item));
    visible = sortItems(visible);

    cards.forEach((c) => {
      c.classList.add("hidden");
    });

    visible.forEach((item) => {
      item.el.classList.remove("hidden");
      grid.appendChild(item.el);
    });

    const showEmpty = visible.length === 0;
    if (emptyState) emptyState.classList.toggle("hidden", !showEmpty);
    grid.classList.toggle("hidden", showEmpty);

    updateStatus(visible.length);
    setActiveButtons();
  }

  document.querySelectorAll("[data-shop-action]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const action = btn.dataset.shopAction;
      const value = btn.dataset.shopValue || "";

      if (action === "sortby") state.sortby = value;
      if (action === "collection") {
        state.collection = value;
        if (value === "new") state.sortby = "newest";
      }
      if (action === "filter") {
        state.filter = state.filter === value ? "" : value;
      }
      if (action === "reset") {
        state.sortby = "popular";
        state.collection = "all";
        state.filter = "";
        const select = document.getElementById("sortby-select");
        if (select) select.value = "popular";
      }

      applyFilters();
    });
  });

  const sortSelect = document.getElementById("sortby-select");
  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      state.sortby = sortSelect.value;
      applyFilters();
    });
  }

  applyFilters();
})();
