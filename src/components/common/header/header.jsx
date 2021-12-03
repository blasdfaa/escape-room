import logo from 'assets/img/logo.svg';
import { useLocation } from 'react-router-dom';
import * as S from './header.styled';

const HeaderRoutes = [
  { path: '/', title: 'Квесты' },
  { path: '#', title: 'Новичкам' },
  { path: '#', title: 'Отзывы' },
  { path: '#', title: 'Акции' },
  { path: '/contacts', title: 'Контакты' },
];

const Header = () => {
  const { pathname } = useLocation();

  return (
    <S.StyledHeader>
      <S.HeaderWrapper>
        <S.LogoLink>
          <S.Image
            src={logo}
            alt="Логотип Escape Room"
            width="134"
            height="50"
          />
        </S.LogoLink>

        <S.Navigation>
          <S.Links>
            {HeaderRoutes.map((route) => (
              <S.LinkItem key={`${route.title}_key`}>
                <S.Link $isActiveLink={pathname === route.path} to={route.path}>
                  {route.title}
                </S.Link>
              </S.LinkItem>
            ))}
          </S.Links>
        </S.Navigation>
        <S.Phone href="tel:88003335599">8 (800) 333-55-99</S.Phone>
      </S.HeaderWrapper>
    </S.StyledHeader>
  );
};

export default Header;
