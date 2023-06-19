import React, { forwardRef, useEffect } from "react";
import Modal from "./Modal";
import styled from "styled-components";
import { useState, useRef } from "react";
import { Oval } from "react-loader-spinner";
import { AiOutlineDownCircle } from "react-icons/ai";
import { BiMoviePlay } from "react-icons/bi";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  background-color: lightgrey;
  width: 85vw;
  flex-wrap: wrap;
  box-shadow: 3px 3px 3px 3px grey;
  border-radius: 10px;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 20vw;
  height: 50vh;
  margin: 4px;

  .title {
    text-align: center;
    font-size: 20px;
    font-weight: bold;
  }

  .poster {
    width: 15vw;
    height: 40vh;
    align-items: center;
  }

  &:hover {
    background-color: grey;
    border-radius: 5px;
    cursor: pointer;
    .poster {
      box-shadow: 5px 5px 5px black;
      width: 17vw;
      height: 43vh;
    }
    .title {
      font-weight: bolder;
      text-shadow: 2px 2px 2px grey;
    }
  }
`;

// 로딩 컴포넌트, target 역할
const Loading = forwardRef((props, ref) => {
  return (
    <Container ref={ref}>
      <Oval color="#ff0000" height={80} width={80} />
    </Container>
  );
});

function MovieLists() {
  // 영화 데이터 상태관리
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const target = useRef();

  // 모달 상태관리
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 첫 렌더링 + page 수 증가 시, fetch 요청 작성
  useEffect(
    () => async () => {
      await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
      )
        .then((response) => response.json())
        .then((response) => {
          setData((prevData) => [...prevData, ...response.results]);
        })
        .catch((err) => console.error(err));
    },

    [page]
  );

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

  return (
    <div>
      <h1>Movies</h1>
      <p>
        <AiOutlineDownCircle /> scroll down to see more movies
      </p>
      <p>
        <BiMoviePlay /> click the movie card to see the details
      </p>
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
      <Loading ref={target} />
    </div>
  );
}

export default MovieLists;
