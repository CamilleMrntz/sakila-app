import "./App.css";
import { useState } from "react";
import Axios from "axios";
import React from "react";

function App() {
  const [pageLength, setPageLength] = useState("10");
  const [movieList, setMovieList] = useState([]);
  const [pageNumber, setPageNumber] = useState(["1"]);
  const [order, setOrder] = useState(["f.title"]);
  const [ascDesc, setInvertOrder] = useState(["ASC"]);

  const number_of_movies = 1000;
  const number_of_pages = Math.ceil(number_of_movies / pageLength);

  function getMovies() {
    Axios.get(
      `https://sakila.herokuapp.com/movies/${pageLength}/${pageNumber}/${order}/${ascDesc}`
    ).then((response) => {
      setMovieList(response.data);
    });
  }

  return (
    <div className="App">
      <div>
        <div className="movies_filter">
          <label>Nombre de ligne : </label>
          <input
            type="number"
            value={pageLength}
            max={number_of_movies}
            min="1"
            onChange={(event) => {
              setPageLength(event.target.value);
            }}
          />
          <label>Page : </label>
          <input
            type="number"
            value={pageNumber}
            max={number_of_pages}
            min="1"
            onChange={(event) => {
              setPageNumber(event.target.value);
            }}
          />
          <p>sur : {number_of_pages}</p>
        </div>

        <div className="movies_filter">
          <label for="filter_order">Trier par : </label>
          <select
            name="order"
            id="filter_order"
            onChange={(event) => {
              setOrder(event.target.value);
            }}
          >
            <option value="f.title">film</option>
            <option value="c.name">category</option>
            <option value="N.nb_of_rent">nombre de locations</option>
          </select>

          <label for="filter_tri">Ordre du tri : </label>
          <select
            name="tri"
            onChange={(event) => {
              setInvertOrder(event.target.value);
            }}
          >
            <option value="ASC">dans l'ordre</option>
            <option value="DESC">ordre inverse</option>
          </select>
        </div>

        <button className="btn" onClick={getMovies}>Afficher les tables</button>

        {movieList.map((val, key) => {
          return (
            <div className="movies" key={key}>
              <div className="moviesList_section">
                <p className="category">{val.name}</p>
                <h3>{val.title}</h3>
              </div>
              <div className="moviesList_section">
                <div className="movies_info">
                  <p className="movies_info_label">Prix de la location : </p>
                  <p>${val.rental_rate}</p>
                </div>
                <div className="movies_info">
                  <p className="movies_info_label">Classement : </p>
                  <p>{val.rating}</p>
                </div>
                <div className="movies_info">
                  <p className="movies_info_label">Nombre de fois loué : </p>
                  <p>{val.nb_of_rent}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
