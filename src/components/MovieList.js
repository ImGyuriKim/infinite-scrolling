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
  const [page, setPage] = useState(1);
  const target = useRef();

  // 초기 화면 렌더링 시, page 1 데이터 불러오기
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}`
    )
      .then((response) => response.json())
      .then((response) => {
        setData(response.results);
      })
      .catch((err) => console.error(err));
  }, []);

  // Intersection observer 설정
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { root: null, threshold: 0.1 }
    );

    if (target.current) {
      observer.observe(target.current);
    }
    const targetElement = target.current;

    return () => {
      if (targetElement) {
        observer.unobserve(targetElement);
      }
    };
  }, []);

  // page 수 증가 시, fetch 요청 작성
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
    )
      .then((response) => response.json())
      .then((response) => {
        setData((prevData) => [...prevData, ...response.results]);
        console.log(response.results);
      })
      .catch((err) => console.error(err));
  }, [page]);

  if (page === 3) {
    console.log(data);
  }
  return (
    <div>
      <h1>영화 리스트</h1>
      <Container>
        {data &&
          data.map((el) => (
            <List key={el.id}>
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
      <div ref={target}> div 입니다</div>
    </div>
  );
}

export default MovieList;
