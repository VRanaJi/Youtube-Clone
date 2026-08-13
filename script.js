/* =========================   ELEMENTS========================= */

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");

const categories = document.querySelectorAll(".category");
const videoCards = document.querySelectorAll(".video-card");
const moreButtons = document.querySelectorAll(".more-btn");

const navItems = document.querySelectorAll(".nav-item");
const profileBtn = document.querySelector(".profile-btn");
const notificationBtn = document.querySelector(".notification-btn");

/* =========================SIDEBAR========================= */

menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
});


/* =========================SEARCH========================= */

function searchVideos(query) {
    query = query.trim().toLowerCase();

    videoCards.forEach((card) => {
        const title = card.querySelector(".video-details h3").textContent.toLowerCase();

        const channel = card.querySelector(".video-details p").textContent.toLowerCase();

        const matches = query === "" || title.includes(query) || channel.includes(query);

        card.style.display = matches ? "" : "none";
    });
}

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    searchVideos(searchInput.value);
});

searchInput.addEventListener("input", () => {
    searchVideos(searchInput.value);
});

/* =========================CATEGORY FILTER========================= */

categories.forEach((category) => {

    category.addEventListener("click", () => {
        categories.forEach((item) => {
            item.classList.remove("active");
        });

        category.classList.add("active");

        const selectedCategory = category.textContent.trim().toLowerCase();

        searchInput.value = "";

        videoCards.forEach((card) => {
            const cardCategory = card.dataset.category;

            if (selectedCategory === "all") {
                card.style.display = "";
                return;
            }

            if (cardCategory === selectedCategory) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }
        });
    });
});

/* =========================   SIDEBAR NAVIGATION========================= */

navItems.forEach((item) => {
    item.addEventListener("click", () => {
        navItems.forEach((nav) => {
            nav.classList.remove("active");
        });

        item.classList.add("active");
    });
});

/* =========================   MORE OPTIONS========================= */

moreButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();

        const oldMenu = document.querySelector(".options-menu");

        if (oldMenu) {
            oldMenu.remove();
        }

        const menu = document.createElement("div");

        menu.className = "options-menu";

        menu.innerHTML = `
            <button type="button" class="option-item">
                <svg viewBox="0 0 24 24">
                    <path d="M12 5v14"></path>
                    <path d="M5 12h14"></path>
                </svg>
                <span>Save to Watch later</span>
            </button>

            <button type="button" class="option-item">
                <svg viewBox="0 0 24 24">
                    <path d="M4 5h16v14H4z"></path>
                    <path d="m9 9 6 3-6 3z"></path>
                </svg>
                <span>Add to playlist</span>
            </button>

            <button type="button" class="option-item">
                <svg viewBox="0 0 24 24">
                    <path d="M6 6l12 12"></path>
                    <path d="M18 6 6 18"></path>
                </svg>
                <span>Not interested</span>
            </button>
        `;

        document.body.appendChild(menu);

        const rect = button.getBoundingClientRect();

        let top = rect.bottom + 6;
        let left = rect.left - 190;

        if (left < 10) {
            left = 10;
        }

        if (top + 150 > window.innerHeight) {
            top = rect.top - 155;
        }

        menu.style.position = "fixed";
        menu.style.top = `${top}px`;
        menu.style.left = `${left}px`;
    });
});


/* =========================   CLOSE MENU========================= */

document.addEventListener("click", (event) => {

    const menu = document.querySelector(".options-menu");

    if (!menu) {
        return;
    }

    if (!menu.contains(event.target)) {
        menu.remove();
    }
});

/* =========================   ESCAPE KEY========================= */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        const menu = document.querySelector(".options-menu");

        if (menu) {
            menu.remove();
        }

        searchInput.blur();
    }
});

/* =========================   VIDEO CLICK========================= */

videoCards.forEach((card) => {

    const thumbnail = card.querySelector(".thumbnail");

    thumbnail.addEventListener("click", (event) => {

        event.preventDefault();

        const title = card.querySelector(".video-details h3").textContent;

        console.log("Video clicked:", title);
    });
});

/* =========================   PROFILE========================= */

if (profileBtn) {
    profileBtn.addEventListener("click", () => {
        console.log("Profile button clicked");
    });
}


/* =========================   NOTIFICATIONS========================= */

if (notificationBtn) {
    notificationBtn.addEventListener("click", () => {

        const count = notificationBtn.querySelector(".notification-count");

        if (count) {
            count.style.display = "none";
        }
        console.log("Notifications opened");
    });
}

/* =========================   CREATE BUTTON========================= */

const headerButtons = document.querySelectorAll(".header-right .icon-btn");

const createButton = headerButtons[0];

if (createButton) {
    createButton.addEventListener("click", () => {
        console.log("Create button clicked");
    });
}

console.log("YouTube Clone loaded successfully.");