import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { commonActions } from '../store/common';

/**
 * 인풋에 대한 검증 여부를 관리하는 Hook
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
