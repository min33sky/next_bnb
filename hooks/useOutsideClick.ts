import { useEffect, useRef, useState } from 'react';

/**
 * 특정 DOM의 바깥 공간을 클릭했는지 판단하는 훅
 * @returns Hook to judge outer space
 */
export default function useClickOutside<T extends HTMLElement>() {
  const [isClickedOutside, setIsClickedOutside] = useState(false); // 로그인 유저 메뉴 버튼 클릭 여부

  const buttonRef = useRef<T>(null); // 메뉴 버튼 Ref
  const menuRef = useRef<T>(null); // 메뉴 Ref

  const onClickOutside = (e: MouseEvent) => {
    const el = e.target;

    if (buttonRef.current && menuRef.current) {
      if (el instanceof Node && !buttonRef.current.contains(el) && !menuRef.current.contains(el)) {
        setIsClickedOutside(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  return {
    buttonRef,
    menuRef,
    isClickedOutside,
    setIsClickedOutside,
  };
}
