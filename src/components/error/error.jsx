import { MainLayout } from 'components/common/common';
import { AppRoute } from 'constans';
import * as S from './error.styled';

const Error = ({ errorCode, message }) => {
  return (
    <MainLayout>
      <S.Main forwardedAs="main">
        <S.ErrorTitle>{message}</S.ErrorTitle>
        <S.ErrorCode>Ошибка {errorCode}</S.ErrorCode>

        <S.ErrorLink to={AppRoute.HOME}>Вернуться к списку квестов</S.ErrorLink>
      </S.Main>
    </MainLayout>
  );
};

export default Error;
