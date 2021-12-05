import React from 'react';

import {
  MainLayout,
  PageTitle,
  PageHeading,
  PageSubtext,
} from 'components/common/common';
import { QuestsCatalog } from './components/components';
import * as S from './home.styled';

const HomePage = () => {
  const [questItems, setQuestItems] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/quests`);
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
