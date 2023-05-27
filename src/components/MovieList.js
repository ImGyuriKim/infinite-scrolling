import React from "react";
import styled from "styled-components";
import { useState } from "react";

const Container = styled.div`
  display: flex;
  width: 70em;
  flex-wrap: wrap;
`;

const List = styled.div`
  .title {
    font-size: larger;
  }

  .poster {
    width: 15em;
  }
`;

function MovieList() {
  const [data, setData] = useState([]);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };
  fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      setData(response.results);
    })
    .catch((err) => console.error(err));
  console.log(data);
  return (
    <div>
      <h1>영화 리스트</h1>
      <Container>
        {data.map((el) => (
          <List>
            <div className="title">{el.original_title}</div>
            <img
              className="poster"
              // 사진 주소 입력
              src={`https://www.themoviedb.org/t/p/w440_and_h660_face/${el.poster_path}`}
              alt={el.original_title}
            ></img>
          </List>
        ))}
      </Container>
    </div>
  );
}

export default MovieList;
