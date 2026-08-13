/* ========================= ELEMENTS ========================= */

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");

const videoCards = document.querySelectorAll(".video-card");
const categoryButtons = document.querySelectorAll(".categories button");

const profileBtn = document.querySelector(".profile-btn");
const notificationBtn = document.querySelector(".notification-btn");

const sideItems = document.querySelectorAll(".side-item");

/* ========================= SIDEBAR ========================= */

if (menuBtn && sidebar) {
    menuBtn.addEventListener("click", () => {
        sidebar.classList.toggle("collapsed");
    });
}

/* ========================= SEARCH ========================= */

function searchVideos(query) {
    query = query.trim().toLowerCase();

    videoCards.forEach(card => {

        const title = card.querySelector(".video-info h3").textContent.toLowerCase();

        const channel = card.querySelector(".video-info p").textContent.toLowerCase();

        if (query === "" || title.includes(query) || channel.includes(query)) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });
}

if (searchForm) {
    searchForm.addEventListener("submit", e => {
        e.preventDefault();
        searchVideos(searchInput.value);
    });
}

if (searchInput) {
    searchInput.addEventListener("input", () => {
        searchVideos(searchInput.value);
    });
}

/* ========================= CATEGORY ========================= */

categoryButtons.forEach(button => {
    button.addEventListener("click", () => {

        categoryButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const selectedCategory = button.textContent.trim().toLowerCase();

        searchInput.value = "";

        videoCards.forEach(card => {

            const cardCategory = card.dataset.category;

            if (selectedCategory === "all" || cardCategory === selectedCategory) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }
        });
    });
});

/* ========================= SIDEBAR ACTIVE ========================= */

sideItems.forEach(item => {
    item.addEventListener("click", () => {
        sideItems.forEach(i => i.classList.remove("active"));

        item.classList.add("active");
    });
});

/* ========================= THUMBNAIL CLICK ========================= */

videoCards.forEach(card => {
    const thumbnail = card.querySelector(".thumbnail");

    if (thumbnail) {
        thumbnail.addEventListener("click", e => {
            e.preventDefault();

            const title = card.querySelector(".video-info h3").textContent;

            alert("Playing: " + title);
        });
    }
});

/* ========================= PROFILE ========================= */

if (profileBtn) {
    profileBtn.addEventListener("click", () => {

        alert("Profile Clicked");
    });
}

/* ========================= NOTIFICATIONS ========================= */

if (notificationBtn) {
    notificationBtn.addEventListener("click", () => {

        const badge = notificationBtn.querySelector("span");

        if (badge) {
            badge.style.display = "none";
        }

        alert("Notifications Opened");
    });
}

/* ========================= ESC ========================= */

document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
        searchInput.blur();
    }
});

console.log("YouTube Clone Loaded Successfully ✅");
