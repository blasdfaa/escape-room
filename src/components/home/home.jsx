import React from 'react';

import {
  MainLayout,
  PageTitle,
  PageHeading,
  PageSubtext,
} from 'components/common/common';
import { QuestsCatalog } from './components/components';
import * as S from './home.styled';
import { API_ENDPOINT } from 'constans';

const HomePage = () => {
  const [questItems, setQuestItems] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const response = await fetch(`${API_ENDPOINT}/quests`);
      const data = await response.json();

      setQuestItems(data);
    })();
  }, []);

  return (
    <MainLayout>
      <S.Main forwardedAs="main">
        <PageHeading>
          <PageTitle>Выберите тематику</PageTitle>
          <PageSubtext>квесты в Санкт-Петербурге</PageSubtext>
        </PageHeading>
        <QuestsCatalog quests={questItems} />
      </S.Main>
    </MainLayout>
  );
};

export default HomePage;
