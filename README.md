# 기능구현챌린지 1 - 무한스크롤
TMDB API를 이용하여 무한스크롤 기능을 구현했습니다.

## 요구사항
1. 첫 렌더링 시 기본 20개의 영화 카드 렌더링
2. 스크롤이 하단에 닿을 때, 추가 20개의 영화 카드 렌더링

## 구현 화면
![Screen_Recording_2023-05-30_at_14_04_27_AdobeExpress](https://github.com/ImGyuriKim/infinite-scrolling/assets/111730140/4855e0fd-3ea3-4433-9aa2-a59419a17ab9)

## 배포 링크
https://movie-infinite-scrolling.vercel.app/

## 사용 기술
- Intersection Observer API
- JavaScript
- React
- styled-components
- Vercel

## 에러 해결의 여정 기록
- [교차 전에 observer 콜백함수가 실행되는 에러 해결](https://growingtangerine.tistory.com/70)
- [useEffect 의존성 배열 버그 해결](https://growingtangerine.tistory.com/71)
- [의도하지 않은 네트워크 요청 발생 에러 해결](https://growingtangerine.tistory.com/73)
- [비동기 네트워크 요청 버그 해결](https://growingtangerine.tistory.com/74)
