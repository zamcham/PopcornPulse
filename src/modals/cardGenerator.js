import { handleSubmit, triggerMovieID } from './popup.js';
import { likeMovie, getLikeCount } from './likesFunctionality.js';

const templateMovieCard = document.getElementById('movieCardTemplate');
const moviesContainer = document.getElementById('moviesContainer');
const form = document.getElementById('submit');

export const activateSubmit = () => {
  form.addEventListener('submit', handleSubmit);
};

export const generateCard = (data, templateMovieCard, moviesContainer, form) => {
  for (let i = 0; i < 6; i += 1) {
    // Clone the movie card template
    const movieCard = templateMovieCard.content.cloneNode(true);

    // Fill in the details for the project
    const movieInfo = data.results[i];
    if (!movieInfo.title) {
      movieCard.querySelector('h4').textContent = movieInfo.name;
    } else {
      movieCard.querySelector('h4').textContent = movieInfo.title;
    }
    const baseImgPath = 'https://image.tmdb.org/t/p/original/';
    const posterPath = movieInfo.poster_path;
    const cleanPosterPath = baseImgPath + posterPath;
    const likeCountContainer = movieCard.getElementById('amountLikes');
    movieCard.querySelector('img').src = cleanPosterPath;
    movieCard.querySelector('button').addEventListener('click', () => {
      triggerMovieID(movieInfo, cleanPosterPath);
    });
    const likeButton = movieCard.getElementById('heartButton');
    likeButton.addEventListener('click', () => {
      likeMovie(movieInfo.id, likeCountContainer);
    });

    getLikeCount(movieInfo.id, likeCountContainer);

    // Insert the project card into the projects container
    moviesContainer.appendChild(movieCard);
  }
};

export async function getTrendingData() {
  const url = 'https://api.themoviedb.org/3/trending/all/day?api_key=65ce0d679d0529fede22e13b61a1c2c0';
  const response = await fetch(url);
  const data = await response.json();
  generateCard(data, templateMovieCard, moviesContainer, form);
}