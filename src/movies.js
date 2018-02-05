import React from "react";
import { Connect, query } from "urql";

import Movie from "./movie";

const MovieQuery = query(`
{
  movies {
    id,
    title,
    releaseDate,
    poster {
      uri
    }
  }
}
`);

export default class Movies extends React.Component {
  state = {
    selected: null
  };
  setSelected = id => {
    this.setState({
      selected: id
    });
  };
  unsetSelected = () => {
    this.setState({
      selected: null
    });
  };
  render() {
    return (
      <div>
        <Connect
          query={MovieQuery}
          render={({ loaded, data }) => {
            return loaded === false ? (
              "loading"
            ) : (
              <div>
                <ul className="movie-list">
                  {data.movies.map(d => (
                    <li key={d.id} className="movie-list-item">
                      <button
                        type="button"
                        onClick={this.setSelected.bind(null, d.id)}
                        className="button-wrapper"
                      >
                        <img src={d.poster.uri} alt="movie poster" />
                        <h2>{d.title}</h2>
                        <p>Release: {d.releaseDate}</p>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            );
          }}
        />
        {this.state.selected && (
          <Movie id={this.state.selected} onClose={this.unsetSelected} />
        )}
      </div>
    );
  }
}
