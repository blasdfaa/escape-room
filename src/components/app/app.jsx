import { ThemeProvider } from 'styled-components';

import {
  Switch,
  Route,
  BrowserRouter as Router,
} from 'components/common/common';
import DetailedQuest from 'components/detailed-quest/detailed-quest';
import Contacts from 'components/contacts/contacts';
import Home from 'components/home/home';
import Error from 'components/error/error';
import { appTheme } from './common';
import * as S from './app.styled';
import { AppRoute, HttpCode } from 'constans';

const NOT_FOUND_MESSAGE = 'Страница не найдена';

const App = () => (
  <ThemeProvider theme={appTheme}>
    <S.GlobalStyle />
    <Router>
      <Switch>
        <Route path={AppRoute.QUEST_DETAILS} exact>
          <DetailedQuest />
        </Route>
        <Route path={AppRoute.CONTACTS} exact>
          <Contacts />
        </Route>
        <Route path={AppRoute.HOME} exact>
          <Home />
        </Route>
        <Route exact>
          <Error
            errorCode={HttpCode.NOT_FOUND}
            message={NOT_FOUND_MESSAGE}
            exact
          />
        </Route>
      </Switch>
    </Router>
  </ThemeProvider>
);

export default App;
