import styled from "styled-components";

const ModalContainer = styled.div`
  display: flex;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.8);
  width: 80%;
  max-width: 600px;
  padding: 20px;
  border-radius: 5px;
  color: white;
`

const Container = styled.div`
button {
  position: fixed;
  right: 10%;
  border: none;
  background-color: transparent;
  color: white;
  font-size: larger;
 :hover {
    color: red;
    cursor: pointer;
  }
}

  span, li{
    margin: 10px; 
  }

 .title {
  width: fit-content;
    font-size: larger;
    font-weight: bold;
  }
  .poster {
    margin: 10px;
    width: 20vw;
    height: 40vh;
  }
`

const ContentContainer = styled.div`
display: flex;`

const DetailContainer = styled.div`
display: flex;
flex-direction: column;
`

 // 영화 정보 렌더링
function Modal(props) {

const { movieData, setIsModalOpen } = props;

const closeModal = () => {
  setIsModalOpen(false);
};
  return (
  <ModalContainer >
    <Container>
    <span className="title">Title: {movieData.original_title}</span>
    <button onClick={closeModal}>X</button>
    <ContentContainer>
    <img className="poster"
                // 사진 주소 입력
                src={`https://www.themoviedb.org/t/p/w440_and_h660_face/${movieData.poster_path}`}
                alt={movieData.original_title} />
               
    <DetailContainer>
    <ul>
      <li>Overview: {movieData.overview}</li>
      <li>Released At: {movieData.release_date}</li>
      <li>평점: {movieData.vote_average}</li>
    </ul>
    
    </DetailContainer>
    </ContentContainer>
    
    {/* *{//장르, overview, 포스터, 개봉일, 평점 추가}* */}
    </Container>
    
  </ModalContainer>
  )
  
}

export default Modal;
