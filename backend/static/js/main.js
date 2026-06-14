document.addEventListener("DOMContentLoaded", () => {
    // 1. Theme Toggle Management
    const themeToggle = document.getElementById("themeToggle");
    const htmlElement = document.documentElement;

    // Load saved theme or default to dark
    const savedTheme = localStorage.getItem("theme") || "dark";
    htmlElement.setAttribute("data-theme", savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const currentTheme = htmlElement.getAttribute("data-theme");
            const newTheme = currentTheme === "dark" ? "light" : "dark";
            
            htmlElement.setAttribute("data-theme", newTheme);
            localStorage.setItem("theme", newTheme);
        });
    }

    // 2. Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById("mobileMenuToggle");
    const navMenu = document.getElementById("navMenu");

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener("click", () => {
            const isActive = navMenu.classList.toggle("active");
            
            // Toggle hamburger / close icons
            const openIcon = mobileMenuToggle.querySelector(".open-icon");
            const closeIcon = mobileMenuToggle.querySelector(".close-icon");
            
            if (isActive) {
                openIcon.style.display = "none";
                closeIcon.style.display = "block";
            } else {
                openIcon.style.display = "block";
                closeIcon.style.display = "none";
            }
        });
    }

    // 3. Home Page Wood Explorer Tabs
    const woodTabs = document.querySelectorAll(".wood-tab");
    
    woodTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const targetWood = tab.getAttribute("data-wood");
            
            // Deactivate active tab & panel
            document.querySelector(".wood-tab.active")?.classList.remove("active");
            document.querySelector(".wood-panel.active")?.classList.remove("active");
            
            // Activate current tab & panel
            tab.classList.add("active");
            document.getElementById(`wood-${targetWood}`)?.classList.add("active");
        });
    });

    // 4. Shop Page Product Details Modal
    const detailsModal = document.getElementById("detailsModal");
    const modalCloseBtn = document.getElementById("modalCloseBtn");
    const modalOverlay = document.querySelector(".modal-overlay");
    
    // Elements inside modal to populate
    const modalImg = document.getElementById("modalImg");
    const modalTitle = document.getElementById("modalTitle");
    const modalWoodTag = document.getElementById("modalWoodTag");
    const modalPrice = document.getElementById("modalPrice");
    const modalDesc = document.getElementById("modalDesc");
    const qtyInput = document.getElementById("qtyInput");
    
    // Bind click events to product card view buttons
    const viewDetailBtns = document.querySelectorAll(".view-details-btn");
    
    viewDetailBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            // Find parent product card
            const card = e.target.closest(".product-card");
            if (!card) return;
            
            // Extract data attributes
            const id = card.getAttribute("data-id");
            const name = card.getAttribute("data-name");
            const price = card.getAttribute("data-price");
            const wood = card.getAttribute("data-wood");
            const image = card.getAttribute("data-image");
            const desc = card.getAttribute("data-desc");
            
            // Populate modal content
            if (modalImg) modalImg.src = image;
            if (modalTitle) modalTitle.textContent = name;
            if (modalPrice) modalPrice.textContent = price;
            if (modalDesc) modalDesc.textContent = desc;
            
            if (modalWoodTag) {
                modalWoodTag.textContent = `${wood} Wood`;
                // Reset classes
                modalWoodTag.className = "wood-badge";
                modalWoodTag.classList.add(`badge-${wood.toLowerCase()}`);
            }
            
            // Reset quantity to 1
            if (qtyInput) qtyInput.value = 1;
            
            // Open modal
            if (detailsModal) detailsModal.classList.add("active");
            document.body.style.overflow = "hidden"; // disable scroll
        });
    });

    // Close Modal helpers
    const closeModal = () => {
        if (detailsModal) detailsModal.classList.remove("active");
        document.body.style.overflow = ""; // restore scroll
    };

    if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);
    if (modalOverlay) modalOverlay.addEventListener("click", closeModal);
    
    // Close on Escape key press
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && detailsModal && detailsModal.classList.contains("active")) {
            closeModal();
        }
    });

    // 5. Quantity Selectors inside Modal
    const qtyMinus = document.getElementById("qtyMinus");
    const qtyPlus = document.getElementById("qtyPlus");
    
    if (qtyMinus && qtyInput) {
        qtyMinus.addEventListener("click", () => {
            let val = parseInt(qtyInput.value) || 1;
            if (val > 1) {
                qtyInput.value = val - 1;
            }
        });
    }

    if (qtyPlus && qtyInput) {
        qtyPlus.addEventListener("click", () => {
            let val = parseInt(qtyInput.value) || 1;
            if (val < 10) { // max 10
                qtyInput.value = val + 1;
            }
        });
    }

    const btnAddToCart = document.getElementById("btnAddToCart");
    if (btnAddToCart) {
        btnAddToCart.addEventListener("click", () => {
            const name = modalTitle ? modalTitle.textContent : "Item";
            const qty = qtyInput ? qtyInput.value : 1;
            alert(`[MOCK CART] Added ${qty}x "${name}" to your shopping cart.`);
            closeModal();
        });
    }

    // 6. VR Immersive Modal Event Handlers
    const btnLaunchVR = document.getElementById("btnLaunchVR");
    const vrModal = document.getElementById("vrModal");
    const vrCloseBtn = document.getElementById("vrCloseBtn");
    const vrOverlay = vrModal ? vrModal.querySelector(".modal-overlay") : null;
    const vrProductImg = document.getElementById("vrProductImg");
    const vrProductTitle = document.getElementById("vrProductTitle");
    const vrFurnitureStage = document.querySelector(".vr-furniture-stage");

    const btnRotateLeft = document.getElementById("btnRotateLeft");
    const btnRotateRight = document.getElementById("btnRotateRight");
    const btnZoomIn = document.getElementById("btnZoomIn");
    const btnZoomOut = document.getElementById("btnZoomOut");

    let vrRotationY = 0;
    let vrScale = 1;

    const applyVRTransform = () => {
        if (vrFurnitureStage) {
            vrFurnitureStage.style.transform = `rotateY(${vrRotationY}deg) scale(${vrScale})`;
        }
    };

    if (btnLaunchVR) {
        btnLaunchVR.addEventListener("click", () => {
            // Close details modal
            closeModal();

            // Populate VR details
            if (vrProductImg && modalImg) vrProductImg.src = modalImg.src;
            if (vrProductTitle && modalTitle) vrProductTitle.textContent = modalTitle.textContent;

            // Reset VR scale/rotation state
            vrRotationY = 0;
            vrScale = 1;
            applyVRTransform();

            // Open VR Modal
            if (vrModal) vrModal.classList.add("active");
            document.body.style.overflow = "hidden"; // disable scroll
        });
    }

    const closeVRModal = () => {
        if (vrModal) vrModal.classList.remove("active");
        document.body.style.overflow = ""; // restore scroll
    };

    if (vrCloseBtn) vrCloseBtn.addEventListener("click", closeVRModal);
    if (vrOverlay) vrOverlay.addEventListener("click", closeVRModal);

    // VR Interaction Buttons
    if (btnRotateLeft) {
        btnRotateLeft.addEventListener("click", () => {
            vrRotationY -= 30;
            applyVRTransform();
        });
    }

    if (btnRotateRight) {
        btnRotateRight.addEventListener("click", () => {
            vrRotationY += 30;
            applyVRTransform();
        });
    }

    if (btnZoomIn) {
        btnZoomIn.addEventListener("click", () => {
            if (vrScale < 1.6) {
                vrScale += 0.15;
                applyVRTransform();
            }
        });
    }

    if (btnZoomOut) {
        btnZoomOut.addEventListener("click", () => {
            if (vrScale > 0.5) {
                vrScale -= 0.15;
                applyVRTransform();
            }
        });
    }

    // Escape Key Listener also handles VR Close
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeVRModal();
        }
    });

    // 7. Contact Form interactive submission
    const contactForm = document.getElementById("contactForm");
    const contactSuccess = document.getElementById("contactSuccess");

    if (contactForm && contactSuccess) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const btnSubmit = document.getElementById("btnSubmitContact");
            if (btnSubmit) {
                btnSubmit.disabled = true;
                btnSubmit.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Sending...`;
            }
            
            // Simulate API round-trip delay
            setTimeout(() => {
                contactForm.style.display = "none";
                contactSuccess.style.display = "flex";
                
                // Scroll success card into view
                contactSuccess.scrollIntoView({ behavior: 'smooth' });
            }, 1000);
        });
    }
});
