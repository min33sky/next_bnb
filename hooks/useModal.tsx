import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
`;

const ModalBackground = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
`;

/**
 * Modal Hook
 */
const useModal = () => {
  const [modalOpened, setModalOpened] = useState(false);

  const openModal = () => {
    setModalOpened(true);
  };

  const closeModal = () => {
    setModalOpened(false);
  };

  interface IProps {
    children: React.ReactNode;
  }

  /**
   * 모달 포탈
   * @param children 보여줄 모달 컴포넌트
   */
  function ModalPortal({ children }: IProps) {
    const ref = useRef<Element | null>();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
      if (document) {
        const dom = document.querySelector('#root-modal');
        ref.current = dom;
      }
    }, []);

    // ref가 dom을 가리키고 모달포탈 컴포넌트가 마운트 그리고 모달 상태가 오픈이 되면 모달 표시
    if (ref.current && mounted && modalOpened) {
      return createPortal(
        <Container>
          <ModalBackground role="presentation" onClick={closeModal} />
          {children}
        </Container>,
        ref.current
      );
    }

    return null;
  }

  return {
    openModal,
    closeModal,
    ModalPortal,
  };
};

export default useModal;
