import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { commonActions } from '../store/common';

/**
 * 검증 모드 설정 훅
 */
export default function useValidateMode() {
  const dispatch = useDispatch();
  const validateMode = useSelector((state) => state.common.validateMode);

  const setValidateMode = useCallback(
    (value: boolean) => dispatch(commonActions.setValidateMode(value)),
    [dispatch]
  );

  return { validateMode, setValidateMode };
}