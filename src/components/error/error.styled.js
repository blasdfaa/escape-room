import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Container, PageSubtext, PageTitle } from 'components/common/common';

const Main = styled(Container)`
  display: flex;
  flex-direction: column;
  margin-top: 120px;
  margin-bottom: 120px;
`;

const ErrorTitle = styled(PageTitle)`
  text-transform: uppercase;
  text-align: center;
`;

const ErrorCode = styled(PageSubtext)`
  margin-top: 20px;
  font-size: ${({ theme }) => theme.font.medium};
  text-align: center;
`;

const ErrorLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  text-align: center;
  margin: 40px auto 0;
  padding-top: 22px;
  padding-right: 47px;
  padding-bottom: 23px;
  padding-left: 48px;
  font-family: inherit;
  font-size: ${({ theme }) => theme.font.upperbase};
  line-height: 20px;
  letter-spacing: 0.03em;
  font-weight: 800;
  text-transform: uppercase;
  color: ${({ theme }) => theme.color.white};
  background-color: ${({ theme }) => theme.color.tangerine};
  border: none;
  border-radius: 65px;
  cursor: pointer;

  &:focus,
  &:hover {
    background-color: ${({ theme }) => theme.color.carrotOrange};
  }

  &:active {
    opacity: 0.8;
  }
`;

export { Main, ErrorTitle, ErrorCode, ErrorLink };
