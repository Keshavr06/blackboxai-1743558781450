// Netflix Clone - Main JavaScript
const moviesKey = 'netflix-movies';
const authKey = 'netflix-admin';

// Load movies from storage or use mock data
let movies = JSON.parse(localStorage.getItem(moviesKey)) || [
    {
        id: 1,
        title: "Stranger Things",
        image: "https://images.pexels.com/photos/3945317/pexels-photo-3945317.jpeg",
        description: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments."
    },
    {
        id: 2,
        title: "The Crown",
        image: "https://images.pexels.com/photos/33129/popcorn-movie-party-entertainment.jpg",
        description: "This drama follows the political rivalries and romance of Queen Elizabeth II's reign."
    },
    {
        id: 3,
        title: "Money Heist",
        image: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg",
        description: "An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history."
    }
];

// Add movie function
function addMovie(newMovie) {
    movies.push(newMovie);
    localStorage.setItem(moviesKey, JSON.stringify(movies));
}

// Movie rendering function
function renderMovies(container) {
    if (!container) return;
    container.innerHTML = '';
    movies.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'movie-card p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition duration-200';
        card.innerHTML = `
            <img src="${movie.image}" alt="${movie.title}" class="w-full h-64 object-cover rounded-lg">
            <h3 class="text-lg font-semibold mt-2">${movie.title}</h3>
        `;
        container.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Render movies on index page
    renderMovies(document.querySelector('.movie-grid'));

    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Mock movie data
    const movies = [
        {
            id: 1,
            title: "Stranger Things",
            image: "https://images.pexels.com/photos/3945317/pexels-photo-3945317.jpeg",
            description: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments."
        },
        {
            id: 2,
            title: "The Crown",
            image: "https://images.pexels.com/photos/33129/popcorn-movie-party-entertainment.jpg",
            description: "This drama follows the political rivalries and romance of Queen Elizabeth II's reign."
        },
        {
            id: 3,
            title: "Money Heist",
            image: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg",
            description: "An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history."
        }
    ];

    // Search functionality
    const searchInput = document.querySelector('input[type="text"]');
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                window.location.href = `search.html?q=${encodeURIComponent(this.value)}`;
            }
        });
    }

    // Login form validation
    const loginForm = document.querySelector('form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            const password = this.querySelector('input[type="password"]').value;
            
            if (!email || !password) {
                alert('Please fill in all fields');
                return;
            }
            
            // Mock authentication
            localStorage.setItem('netflix-auth', 'true');
            window.location.href = 'index.html';
        });
    }

    // Check authentication status
    if (window.location.pathname.includes('index.html') && !localStorage.getItem('netflix-auth')) {
        window.location.href = 'login.html';
    }

    // Modal functionality
    const modal = document.getElementById('modal');
    if (modal) {
        const modalImg = document.getElementById('modal-img');
        const closeBtn = document.getElementsByClassName('close')[0];
        
        // When the user clicks on movie cards
        document.querySelectorAll('.movie-card').forEach(card => {
            card.addEventListener('click', function() {
                const movieId = this.dataset.movieId;
                const movie = movies.find(m => m.id == movieId);
                if (movie) {
                    modal.style.display = "block";
                    modalImg.src = movie.image;
                    modalImg.alt = movie.title;
                }
            });
        });

        // When the user clicks on (x)
        closeBtn.onclick = function() {
            modal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }
});