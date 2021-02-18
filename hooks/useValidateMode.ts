import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { commonActions } from '../store/common';

/**
 * 입력값에 대한 검증 모드를 설정하는 Hook
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
