const movieList = document.querySelector("#movie-list");
const genreListDiv = document.querySelector("#genre-list");
const api_key = '46e4b90df63d0a5a760928740c57c129';
let popupContainer = document.querySelector(".popup-container");
let popupCard = document.querySelector(".popup-card");
let currentData;
fetchAPI();
genreList();

function popupCardCreate(movieId) {
    if(popupContainer){
        popupContainer.remove();
    }

    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}`)
        .then(response => response.json())
        .then((res) => {
            let movie = res;
            console.log(movieId);
            
            popupContainer = document.createElement("div");
            popupContainer.className = "popup-container";
            document.body.appendChild(popupContainer);


            popupCard = createElementCustom("div", "popup-card", popupContainer);
            const crossBtn = createElementCustom("i","fa-solid fa-xmark fa-2xl cross-mark",popupCard);
            crossBtn.setAttribute('onclick',"cardCloseBtn()");


            const cardLeft = createElementCustom("div", "card-left", popupCard);
            const cardImage = createElementCustom("img", null, cardLeft);
            cardImage.src = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;

            const cardRight = createElementCustom("div", "card-right", popupCard);
            const movieTitle = createElementCustom("h3","popup-title",cardRight);
            movieTitle.textContent = movie.original_title;
            const movieName = movieTitle.textContent;

            const p1 = createElementCustom("p",null,cardRight);
            const rating = movie.vote_average.toFixed(1);
            p1.innerHTML= `<i class="fa-solid fa-star"></i> ${rating}/10`;

            const p2 = createElementCustom("p",null,cardRight);
            p2.innerHTML = `${movie.runtime} minutes • ${movie.genres[0].name}`;

            const p3 = createElementCustom("p",null,cardRight);
            p3.textContent = movie.overview;

            const p4 = createElementCustom("p","ticket-price",cardRight);
            const randomPrice = Math.floor(Math.random()*(301 - 250) + 250);
            p4.textContent = `₹${randomPrice}`;

            const btn = createElementCustom("button","book-ticket-btn",cardRight);
            btn.textContent = "Book Ticket";
            btn.setAttribute('onclick', `ticketBtn("${movieName}","${randomPrice}")`);

            popupContainer.style.display ="block";
        });

}
function ticketBtn(movieName,price){
    // console.log(movieName);
    // console.log(price);
    localStorage.setItem('movieName',movieName);
    localStorage.setItem('price',price);
    window.location.href = 'checkout.html';
}
function cardCloseBtn(){
    // document.querySelector(".popup-container").innerHTML ="";
    if(popupContainer){
        popupContainer.style.display = "none";
    }
}

function searchMovieName() {
    const searchValue = document.querySelector(".search-input").value;
    if (searchValue == "") {
        alert("No value found!");
    } else {
        const searchString = searchValue.replace(/\s/g, "+");
        // console.log(searchString);
        fetch(`https://api.themoviedb.org/3/search/movie?query=${searchString}&api_key=${api_key}`)
            .then((response) => response.json())
            .then((res) => {
                let data = res.results;
                renderLIst(data);
            })
    }
}

function genreList() {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=en`)
        .then((response) => response.json())
        .then((res) => {
            let data = res.genres;
            for (let x of data) {
                let newElement = createElementCustom("div", "genres", genreListDiv);

                newElement.textContent = x.name;
                newElement.setAttribute('onclick', `showGenreMovies(${x.id})`);

            }
        });
}

function showGenreMovies(id) {
    console.log(id);
    fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&api_key=${api_key}&language=en-US&page=1&sort_by=popularity.desc&with_genres=${id}`)
        .then((response) => response.json())
        .then((res) => {
            let data = res.results;
            console.log(data);
            renderLIst(data);
        });
}


function renderLIst(data) {
    movieList.innerHTML = " ";  // remove all element from main component
    currentData = data;
    for (let movie of data) {
        // movie-card

        const movieCard = document.createElement("div");
        movieCard.className = "movie-card";
        movieCard.id = movie.id;
        movieCard.setAttribute('onclick', `popupCardCreate(${movieCard.id})`);
        movieList.appendChild(movieCard);

        // movie image
        const movieImageDiv = document.createElement("div");
        movieImageDiv.className = "movie-image";
        movieCard.appendChild(movieImageDiv);
        const img = document.createElement("img");
        img.src = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
        movieImageDiv.appendChild(img);

        // movie info
        const movieInfoDiv = document.createElement("div");
        movieInfoDiv.className = "movie-info";
        movieCard.appendChild(movieInfoDiv);

        const movieTitle = document.createElement("p");
        movieTitle.className = "movie-title";
        movieTitle.textContent = movie.original_title;
        movieInfoDiv.appendChild(movieTitle);

        const movieFooter = document.createElement("div");
        movieFooter.className = "movie-footer";
        movieInfoDiv.appendChild(movieFooter);
        const lang = document.createElement("span");
        const str = movie.original_language;
        lang.textContent = str.toUpperCase();
        movieFooter.appendChild(lang);

        const rating = document.createElement("span");
        const ratingValue = movie.vote_average.toFixed(1);
        rating.textContent = ratingValue;
        movieFooter.appendChild(rating);


    }
}
function fetchAPI() {
    fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=46e4b90df63d0a5a760928740c57c129&language=en-US&page=1').then((response) => {
        let raw = response.json();
        return raw;
    }).then((rawData) => {
        let data = rawData.results;
        renderLIst(data);
    });
}

function createElementCustom(element, clName, parent) {
    const newElement = document.createElement(element);
    newElement.className = clName;
    parent.appendChild(newElement);
    return newElement;
}