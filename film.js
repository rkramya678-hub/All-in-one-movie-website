const movies = [
  { id: 1, title: "Action Hero", genre: "Action", desc: "High-energy action movie." },
  { id: 2, title: "Love Story", genre: "Drama", desc: "Emotional drama film." },
  { id: 3, title: "Funny Days", genre: "Comedy", desc: "Light-hearted comedy." }
];

const movieList = document.getElementById("movieList");
const searchInput = document.getElementById("search");
const genreFilter = document.getElementById("genreFilter");

const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const bookingForm = document.getElementById("bookingForm");
const seatsInput = document.getElementById("seats");
const totalPrice = document.getElementById("totalPrice");
const reviewText = document.getElementById("reviewText");
const addReviewBtn = document.getElementById("addReview");
const reviewList = document.getElementById("reviewList");

let selectedMovie = null;

function renderMovies(list) {
  movieList.innerHTML = "";
  list.forEach(movie => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${movie.title}</h3>
      <p>${movie.genre}</p>
    `;
    card.onclick = () => openModal(movie);
    movieList.appendChild(card);
  });
}

function openModal(movie) {
  selectedMovie = movie;
  modalTitle.textContent = movie.title;
  modalDesc.textContent = movie.desc;
  reviewList.innerHTML = "";
  totalPrice.textContent = "";
  modal.classList.remove("hidden");
}

closeModal.onclick = () => modal.classList.add("hidden");

searchInput.addEventListener("input", filterMovies);
genreFilter.addEventListener("change", filterMovies);

function filterMovies() {
  const text = searchInput.value.toLowerCase();
  const genre = genreFilter.value;

  const filtered = movies.filter(m =>
    m.title.toLowerCase().includes(text) &&
    (genre === "all" || m.genre === genre)
  );

  renderMovies(filtered);
}

bookingForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const seats = Number(seatsInput.value);
  const pricePerSeat = 150;
  totalPrice.textContent = `Total Price: ₹${seats * pricePerSeat}`;
});

addReviewBtn.addEventListener("click", function () {
  if (reviewText.value.trim() === "") return;
  const li = document.createElement("li");
  li.textContent = reviewText.value;
  reviewList.appendChild(li);
  reviewText.value = "";
});

renderMovies(movies);
