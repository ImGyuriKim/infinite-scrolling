import styled from "styled-components";

const ModalContainer = styled.div`
 position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.6);
  width: 80%;
  max-width: 600px;
  padding: 20px;
  border-radius: 5px;
  color: white;
`
const MovieTitle = styled.h2`
  text-align: center;
`;

 // 영화 정보 렌더링
function Modal(props) {

const { movieData, setIsModalOpen } = props;

const closeModal = () => {
  setIsModalOpen(false);
};
  return (
  <ModalContainer onClick={closeModal}>
    <MovieTitle>Title: {movieData.original_title}</MovieTitle>
    {/* *{//장르, overview, 포스터, 개봉일, 평점 추가}* */}
  </ModalContainer>
  )
  
}

export default Modal;
