// product-manager.js
document.addEventListener("DOMContentLoaded", function () {
  // Initialize Product Manager
  const productManager = new ProductManager();
  productManager.init();

  // Make it globally available for debugging
  window.productManager = productManager;
});

class ProductManager {
  constructor() {
    this.currentCategory = "gloves";
    this.productsData = window.productsData;
  }

  init() {
    console.log("Product Manager initialized");
    this.setupModal();
    this.loadCategories();
    this.loadProducts();
    this.setupEventListeners();
  }

  setupModal() {
    console.log("Setting up modal...");
    this.productPopup = document.getElementById("productPopup");
    this.closePopupBtn = document.getElementById("closePopup");

    if (!this.productPopup) {
      console.error("Product popup element not found!");
      return;
    }

    console.log("Modal elements found:", {
      popup: !!this.productPopup,
      closeBtn: !!this.closePopupBtn,
    });

    // Close popup when clicking outside
    this.productPopup.addEventListener("click", (e) => {
      if (e.target === this.productPopup) {
        this.closeProductPopup();
      }
    });

    // Close popup with Escape key
    document.addEventListener("keydown", (e) => {
      if (
        e.key === "Escape" &&
        this.productPopup.classList.contains("active")
      ) {
        this.closeProductPopup();
      }
    });
  }

  loadCategories() {
    console.log("Loading categories...");
    const container = document.querySelector(".categories-grid");
    if (!container) {
      console.error("Categories container not found!");
      return;
    }

    const categories = this.productsData.categories;
    console.log("Found categories:", categories.length);

    // Update category buttons
    document.querySelectorAll(".category-card").forEach((card, index) => {
      if (index < categories.length) {
        const category = categories[index];
        const button = card.querySelector(".cta-button");
        if (button) {
          // Change from <a> to <button>
          const newButton = document.createElement("button");
          newButton.className = button.className;
          newButton.innerHTML = button.innerHTML;
          newButton.style.cssText = button.style.cssText;
          newButton.setAttribute("data-category", category.id);
          newButton.addEventListener("click", (e) => {
            e.preventDefault();
            this.handleCategoryClick(category.id);
          });
          button.parentNode.replaceChild(newButton, button);
        }
      }
    });
  }

  loadProducts(categoryId = "gloves") {
    console.log("Loading products for category:", categoryId);
    this.currentCategory = categoryId;
    const products = this.productsData.getProductsByCategory(categoryId);
    const category = this.productsData.getCategoryById(categoryId);

    console.log("Found products:", products.length);

    if (products.length === 0) {
      console.warn("No products found for category:", categoryId);
      return;
    }

    // Update product cards with new data and event listeners
    this.updateProductCards(products);

    // Update active category buttons
    this.updateActiveCategoryButtons(categoryId);
  }

  updateProductCards(products) {
    console.log("Updating product cards...");
    const productCards = document.querySelectorAll(".product-card-detailed");

    productCards.forEach((card, index) => {
      if (index < products.length) {
        const product = products[index];
        console.log(`Updating card ${index + 1} with product:`, product.name);

        // Update SKU
        const skuElement = card.querySelector(".product-sku");
        if (skuElement) skuElement.textContent = product.sku;

        // Update title
        const titleElement = card.querySelector("h3");
        if (titleElement) titleElement.textContent = product.name;

        // Update description
        const descElement = card.querySelector(".product-description-detailed");
        if (descElement)
          descElement.textContent =
            product.description.substring(0, 100) + "...";

        // Update price
        const priceElement = card.querySelector(".product-price-large");
        if (priceElement) priceElement.textContent = `$${product.price}`;

        // Update specs
        const specsContainer = card.querySelector(".product-specs");
        if (specsContainer) {
          const specs = Object.entries(product.specs).slice(0, 4);
          specsContainer.innerHTML = specs
            .map(
              ([key, value]) => `
            <div class="spec-item">
              <span class="spec-label">${this.formatSpecKey(key)}</span>
              <span class="spec-value">${value}</span>
            </div>
          `,
            )
            .join("");
        }

        // Update button
        const button = card.querySelector(".view-product-btn");
        if (button) {
          button.setAttribute("data-product-id", product.id);
          button.setAttribute("data-product", product.id); // Keep for backward compatibility
          button.removeEventListener("click", this.handleProductClick);
          button.addEventListener("click", (e) => {
            e.preventDefault();
            console.log("Product button clicked:", product.id);
            this.openProductPopup(product.id);
          });
        }

        // Update image icon
        const iconElement = card.querySelector(".product-image-detailed i");
        if (iconElement) {
          iconElement.className = product.icon;

          // Update background color based on category
          const imageContainer = card.querySelector(".product-image-detailed");
          const category = this.productsData.getCategoryById(product.category);
          if (imageContainer && category) {
            imageContainer.style.background = category.color;
          }
        }

        // Update badges
        const badgesContainer = card.querySelector(".product-badges");
        if (badgesContainer) {
          badgesContainer.innerHTML = product.badges
            .map((badge) => {
              const badgeClass = badge.includes("BEST")
                ? "best"
                : badge.includes("NEW")
                  ? "new"
                  : "";
              return `<div class="product-badge ${badgeClass}">${badge}</div>`;
            })
            .join("");
        }
      }
    });
  }

  formatSpecKey(key) {
    return (
      key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1")
    );
  }

  updateActiveCategoryButtons(activeCategoryId) {
    document.querySelectorAll("[data-category]").forEach((btn) => {
      const categoryId = btn.getAttribute("data-category");
      if (categoryId === activeCategoryId) {
        btn.classList.add("active");
        btn.innerHTML = '<i class="fas fa-check"></i> Viewing Products';
      } else {
        btn.classList.remove("active");
        btn.innerHTML = '<i class="fas fa-eye"></i> View Products';
      }
    });
  }

  handleCategoryClick(categoryId) {
    console.log("Category clicked:", categoryId);
    this.loadProducts(categoryId);

    // Scroll to products section
    setTimeout(() => {
      const productsSection = document.getElementById("gloves");
      if (productsSection) {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition = productsSection.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    }, 100);
  }

  handleProductClick = (e) => {
    e.preventDefault();
    const button = e.currentTarget;
    const productId =
      button.getAttribute("data-product-id") ||
      button.getAttribute("data-product");
    console.log("Product click handler called:", productId);

    if (productId) {
      this.openProductPopup(parseInt(productId));
    }
  };

  openProductPopup(productId) {
    console.log("Opening product popup for ID:", productId);
    const product = this.productsData.getProductById(productId);

    if (!product) {
      console.error("Product not found:", productId);
      return;
    }

    console.log("Found product:", product.name);

    // Update popup content
    this.updatePopupContent(product);

    // Show popup with animation
    if (this.productPopup) {
      this.productPopup.classList.add("active");
      document.body.style.overflow = "hidden";
      console.log("Modal shown");

      // Focus close button for accessibility
      setTimeout(() => {
        if (this.closePopupBtn) {
          this.closePopupBtn.focus();
        }
      }, 100);
    } else {
      console.error("Product popup element not found!");
    }
  }

  updatePopupContent(product) {
    console.log("Updating popup content for:", product.name);

    // Update icon
    const popupIcon = document.getElementById("popupIcon");
    if (popupIcon) {
      popupIcon.className = `popup-icon ${product.icon}`;
      console.log("Updated icon:", popupIcon.className);
    }

    // Update badges
    const badgesContainer = document.getElementById("popupBadges");
    if (badgesContainer) {
      badgesContainer.innerHTML = product.badges
        .map((badge) => `<div class="popup-badge">${badge}</div>`)
        .join("");
      console.log("Updated badges:", product.badges.length);
    }

    // Update basic info
    const elements = [
      "popupSku",
      "popupTitle",
      "popupDescription",
      "popupPrice",
    ];
    elements.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        if (id === "popupSku") element.textContent = product.sku;
        if (id === "popupTitle") element.textContent = product.name;
        if (id === "popupDescription")
          element.textContent = product.description;
        if (id === "popupPrice") element.textContent = product.price;
        console.log(`Updated ${id}:`, element.textContent.substring(0, 50));
      }
    });

    // Update specs
    const specsContainer = document.getElementById("popupSpecs");
    if (specsContainer) {
      specsContainer.innerHTML = Object.entries(product.specs)
        .map(
          ([key, value]) => `
        <div class="spec-card-popup">
          <div class="spec-icon-popup">
            <i class="${this.getSpecIcon(key)}"></i>
          </div>
          <div class="spec-label-popup">${this.formatSpecKey(key)}</div>
          <div class="spec-value-popup">${value}</div>
        </div>
      `,
        )
        .join("");
      console.log("Updated specs:", Object.keys(product.specs).length);
    }
  }

  getSpecIcon(specKey) {
    const icons = {
      material: "fas fa-layer-group",
      protection: "fas fa-shield-alt",
      sizes: "fas fa-ruler-combined",
      certifications: "fas fa-certificate",
      thickness: "fas fa-ruler-vertical",
      lining: "fas fa-layer-group",
      cutLevel: "fas fa-cut",
      dexterity: "fas fa-hand-paper",
      cuffLength: "fas fa-ruler-vertical",
      coating: "fas fa-paint-roller",
      grip: "fas fa-hand-rock",
    };
    return icons[specKey] || "fas fa-info-circle";
  }

  closeProductPopup() {
    if (this.productPopup) {
      this.productPopup.classList.remove("active");
      document.body.style.overflow = "auto";
      console.log("Modal closed");
    }
  }

  setupEventListeners() {
    console.log("Setting up event listeners...");

    // Close popup button
    if (this.closePopupBtn) {
      this.closePopupBtn.addEventListener("click", () => {
        console.log("Close button clicked");
        this.closeProductPopup();
      });
    }

    // Add click listeners to existing product buttons
    document.querySelectorAll(".view-product-btn").forEach((button) => {
      button.addEventListener("click", this.handleProductClick);
    });

    // Category navigation links in footer
    document.querySelectorAll('.footer-links a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        if (href.startsWith("#") && href !== "#") {
          const categoryId = href.substring(1);
          const category = this.productsData.categories.find(
            (c) => c.id === categoryId,
          );

          if (category) {
            e.preventDefault();
            this.handleCategoryClick(categoryId);
          }
        }
      });
    });

    console.log("Event listeners setup complete");
  }
}
