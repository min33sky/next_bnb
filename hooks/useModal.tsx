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
  z-index: 11; //? Header의 z-index는 10이므로 헤더 위에 출력된다.
`;

const ModalBackground = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
`;

/**
 * 모달을 관리하는 훅
 * @returns Modal Hook
 */
const useModal = () => {
  const [modalOpened, setModalOpened] = useState(false);

  /**
   * Open modal handler
   */
  const openModal = () => {
    setModalOpened(true);
  };

  /**
   * Close modal handler
   */
  const closeModal = () => {
    setModalOpened(false);
  };

  interface IProps {
    children: React.ReactNode;
  }

  /**
   * 모달 포탈
   * @param children Modal Component
   * @returns {openModal, closeModal, Modal}
   */
  function ModalPortal({ children }: IProps) {
    const ref = useRef<Element | null>(); // 모달을 보여줄 DOM의 ref
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      /**
       * 컴포넌트가 마운트 됐을 때 모달을 보여줄 DOM의 ref를 설정
       */
      setMounted(true);
      if (document) {
        const dom = document.querySelector('#root-modal');
        ref.current = dom;
      }
    }, []);

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
