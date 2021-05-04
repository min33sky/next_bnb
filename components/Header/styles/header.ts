import styled from 'styled-components';

export const Container = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 80px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 12px;
  z-index: 10;

  .header-logo-wrapper {
    display: flex;
    align-items: center;

    /* 로고 아이콘 */
    .header-logo {
      margin-right: 6px;
    }
    /* react-outside-click-handelr div의 포지션 설정 */
    /* & + div {
      position: relative; //? 포지션이 absoulte인 사용자 메뉴의 위치를 잡기 위해서
    } */
  }
`;
