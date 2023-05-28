import React, { useEffect } from "react";
import styled from "styled-components";
import { useState, useRef } from "react";
import Loading from "./Loading";

const Container = styled.div`
  display: flex;
  width: 70em;
  flex-wrap: wrap;
`;

const List = styled.div`
  .title {
    font-size: larger;
    font-weight: bold;
  }

  .poster {
    width: 15em;
  }
`;

function MovieList() {
  const [data, setData] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  // 초기 화면 렌더링 시, page 1 데이터 불러오기
  fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}`
  )
    .then((response) => response.json())
    .then((response) => {
      setData(response.results);
    })
    .catch((err) => console.error(err));

  // 페이지 수에 맞추어 데이터 fetch 요청하기

  // 관측 -> 페이지 수 증가 시, 데이터 fetch 요청 호출하기
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
    )
      .then((res) => res.json)
      .then((res) => setData(...data, res.results))
      .catch((err) => console.error(err));
  }, [page]);

  // 관측될 시, 페이지 수를 올려줄 함수 작성

  // intersection observer 작성
  // const pageEnd = useRef();
  // useEffect(() => {
  //   const loadMore = () => {
  //     setPage(page + 1);
  //   };

  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       if (entries[0].isIntersecting) {
  //         loadMore();
  //       }
  //     },
  //     { threshold: 1 }
  //   );
  //   observer.observe(pageEnd.current);
  // }, [page]);

  return (
    <div>
      <h1>영화 리스트</h1>
      <Container>
        {data &&
          data.map((el) => (
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
      <Loading />
    </div>
  );
}

export default MovieList;
