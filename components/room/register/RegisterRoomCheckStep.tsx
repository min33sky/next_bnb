import Button from 'components/Common/Button';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import palette from 'styles/palette';
import CheckMarkIcon from '../../../public/static/svg/common/checkbox/checkbox_mark.svg';

const Container = styled.li`
  display: inline-block;
  padding: 16px 0;

  a {
    display: flex;
    align-items: center;

    svg {
      margin-right: 12px;
    }

    span {
      font-size: 16px;
      font-weight: 600;
      text-decoration: underline;
    }
  }

  .register-room-check-step-in-progress {
    margin-left: 28px;
  }

  .register-room-check-step-continue-button {
    margin: 8px 0 0 28px;
  }

  .disabled-step {
    margin-left: 28px;
    font-size: 16px;
    color: ${palette.gray_76};
  }
`;

interface IProps {
  disabled: boolean;
  inProgress: boolean;
  step: string;
  href: string;
}

/**
 * 체크 리스트에서 진행중인 단계를 나타내는 컴포넌트
 * @param diabled
 * @param inProgress
 * @param step
 * @param href
 */
export default function RegisterRoomCheckStep({ disabled, inProgress, step, href }: IProps) {
  if (inProgress) {
    return (
      <Container>
        <Link href={href}>
          <a className="register-room-check-step-in-progress">
            <span>{step}</span>
          </a>
        </Link>

        <Link href={href}>
          <a href="" className="register-room-check-step-continue-button">
            <Button color="dark_cyan" size="small">
              계속
            </Button>
          </a>
        </Link>
      </Container>
    );
  }

  if (disabled) {
    return (
      <Container>
        <p className="disabled-step">{step}</p>
      </Container>
    );
  }

  return (
    <Container>
      <Link href={href}>
        <a>
          <CheckMarkIcon />
          <span>{step}</span>
        </a>
      </Link>
    </Container>
  );
}
