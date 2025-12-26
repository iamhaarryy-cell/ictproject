// script.js - All JavaScript logic with detailed comments

// Updated restaurants array with reliable, working image URLs (no errors)
const restaurants = [
    {
        name: "McDonald's",
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/06/c0/56/img-20181013-142845-largejpg.jpg?w=1000&h=1000&s=1",
        description: "Quick, reliable fast food with burgers, fries and happy meals – perfect for families and late-night cravings.",
        vibes: ["Quick Snack", "Family Dinner", "Late Night"],
        walk: "4 min walk",
        rating: 4.3,
        reviews: 312
    },
    {
        name: "KFC",
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/28/59/4c/73/caption.jpg?w=400&h=-1&s=1",
        description: "Crispy fried chicken, zinger burgers and hot wings – the ultimate comfort food spot.",
        vibes: ["Quick Snack", "Family Dinner", "Late Night"],
        walk: "5 min walk",
        rating: 4.2,
        reviews: 289
    },
    {
        name: "Burning Brownie",
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/22/05/44/37/burning-brownie.jpg?w=900&h=500&s=1",
        description: "Heaven for dessert lovers – signature sizzling brownies, cakes and milkshakes that melt in your mouth.",
        vibes: ["Late Night", "Coffee & Chill"],
        walk: "3 min walk",
        rating: 4.6,
        reviews: 156
    },
    {
        name: "Second Cup",
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/27/d9/bd/counter.jpg?w=900&h=500&s=1",
        description: "Cozy atmosphere and excellent coffee – perfect for chilling with friends or quiet work sessions.",
        vibes: ["Coffee & Chill", "Best View"],
        walk: "6 min walk",
        rating: 4.4,
        reviews: 203
    },
    {
        name: "Pizza Hut",
        image: "https://lookaside.instagram.com/seo/google_widget/crawler/?media_id=3757028892377631112",
        description: "Freshly baked pan pizzas with unlimited toppings – ideal for group hangouts and family dinners.",
        vibes: ["Family Dinner", "Late Night"],
        walk: "7 min walk",
        rating: 4.1,
        reviews: 267
    },
    {
        name: "Wild Wings",
        image: "https://www.youlinmagazine.com/articles/wild-wings-restaurant-islamabad-2.jpg",
        description: "Exceptional wings in multiple flavors with great sides – perfect for casual dining and sports nights.",
        vibes: ["Family Dinner", "Late Night"],
        walk: "5 min walk",
        rating: 4.5,
        reviews: 178
    }
];

// Check if open (12 PM to 2 AM)
function isOpen() {
    const hour = new Date().getHours();
    return hour >= 12 || hour < 2;
}

// Generate star rating HTML
function generateStars(rating) {
    let html = '';
    const full = Math.floor(rating);
    for (let i = 1; i <= 5; i++) {
        html += i <= full ? '<span class="filled">★</span>' : '<span class="empty">☆</span>';
    }
    return `<div class="rating"><div class="stars">${html}</div> ${rating.toFixed(1)}</div>`;
}

// Create card HTML
function createCard(r) {
    const status = isOpen() ? 'OPEN' : 'CLOSED';
    const cls = isOpen() ? '' : 'closed';  // '' for open, 'closed' for closed
    const vibes = r.vibes.map(v => `<span class="vibe-tag">${v}</span>`).join('');
    const reviewText = r.reviews === 1 ? 'review' : 'reviews';

    return `
        <div class="restaurant-card">
            <img src="${r.image}" alt="${r.name}">
            <span class="status-badge ${cls}">🕒 ${status}</span>  <!-- Badge right after img -->
            <div class="card-content">
                <h3>${r.name}</h3>
                <div class="rating">
                    <div class="stars">${generateStars(r.rating)}</div> ${r.rating} (${r.reviews} ${reviewText})
                </div>
                <p class="restaurant-description">${r.description}</p>
                <div class="vibe-tags">${vibes}</div>
                <div class="walk-distance">${r.walk}</div>
            </div>
        </div>`;
}

// Create table row
function createRow(r) {
    const status = isOpen() ? 'OPEN' : 'CLOSED';
    return `
        <tr>
            <td>${r.name}</td>
            <td>${r.cuisine}</td>
            <td>${r.avgPrice}</td>
            <td>${r.hours}</td>
            <td>${r.wifi}</td>
            <td>${generateStars(r.rating)}</td>
            <td>${status}</td>
        </tr>`;
}

// Render cards
function renderCards(list, id = 'restaurant-grid') {
    const grid = document.getElementById(id);
    if (grid) {
        grid.innerHTML = '';
        list.forEach(r => grid.innerHTML += createCard(r));
    }
}

// Render table
function renderTable() {
    const tbody = document.getElementById('restaurant-table');
    if (tbody) {
        tbody.innerHTML = '';
        restaurants.forEach(r => tbody.innerHTML += createRow(r));
    }
}

// Mood filter buttons
function setupFilters() {
    document.querySelectorAll('#mood-filter button').forEach(btn => {
        btn.addEventListener('click', () => {
            const mood = btn.dataset.mood;
            const filtered = mood === 'all' ? restaurants : restaurants.filter(r => r.moods.includes(mood));
            renderCards(filtered);
            // Update active button style
            document.querySelectorAll('#mood-filter button').forEach(b => {
                b.classList.remove('button'); b.classList.add('secondary');
            });
            btn.classList.remove('secondary'); btn.classList.add('button');
        });
    });
}

// Randomizer
function setupRandomizer() {
    const spin = document.getElementById('spin-button');
    if (spin) {
        spin.onclick = () => {
            const rand = restaurants[Math.floor(Math.random() * restaurants.length)];
            document.getElementById('random-restaurant').innerHTML = createCard(rand);
            document.getElementById('modal').style.display = 'flex';
        };
    }
}

// Modal close
function setupModal() {
    const close = document.querySelector('.close');
    if (close) close.onclick = () => document.getElementById('modal').style.display = 'none';
}

// Directory tabs
function setupTabs() {
    const cardTab = document.getElementById('card-tab');
    const tableTab = document.getElementById('table-tab');
    const cardView = document.getElementById('card-view');
    const tableView = document.getElementById('table-view');
    if (cardTab && tableTab) {
        cardTab.onclick = () => {
            cardTab.classList.add('active'); tableTab.classList.remove('active');
            cardView.style.display = 'block'; tableView.style.display = 'none';
        };
        tableTab.onclick = () => {
            tableTab.classList.add('active'); cardTab.classList.remove('active');
            tableView.style.display = 'block'; cardView.style.display = 'none';
        };
    }
}

// On load
window.onload = () => {
    if (document.getElementById('mood-filter')) {
        setupFilters();
        setupRandomizer();
        setupModal();
        document.querySelector('[data-mood="all"]').click(); // show all initially
    }
    if (document.getElementById('restaurant-grid') && !document.getElementById('mood-filter')) {
        renderCards(restaurants);
    }
    renderTable();
    setupTabs();
};