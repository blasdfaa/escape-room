import React from 'react';

import { ReactComponent as IconAllQuests } from 'assets/img/icon-all-quests.svg';
import { ReactComponent as IconAdventures } from 'assets/img/icon-adventures.svg';
import { ReactComponent as IconHorrors } from 'assets/img/icon-horrors.svg';
import { ReactComponent as IconMystic } from 'assets/img/icon-mystic.svg';
import { ReactComponent as IconDetective } from 'assets/img/icon-detective.svg';
import { ReactComponent as IconScifi } from 'assets/img/icon-scifi.svg';
import { ReactComponent as IconPerson } from 'assets/img/icon-person.svg';
import { ReactComponent as IconPuzzle } from 'assets/img/icon-puzzle.svg';
import * as S from './quests-catalog.styled';
import {
  formatPeopleCount,
  formatQuestComplexity,
  filterQuestsByType,
} from 'utils/quest';

const QuestTypes = [
  { id: 1, title: 'Все квесты', icon: <IconAllQuests />, type: 'all' },
  { id: 2, title: 'Приключения', icon: <IconAdventures />, type: 'adventures' },
  { id: 3, title: 'Ужасы', icon: <IconHorrors />, type: 'horror' },
  { id: 4, title: 'Мистика', icon: <IconMystic />, type: 'mystic' },
  { id: 5, title: 'Детектив', icon: <IconDetective />, type: 'detective' },
  { id: 6, title: 'Sci-fi', icon: <IconScifi />, type: 'sci-fi' },
];

const INITIAL_QUEST_ITEMS_COUTN = 6;
const DEFAULT_SELECTED_TYPE = 'all';

const QuestsCatalog = ({ quests = [] }) => {
  const [selectedType, setSelectedType] = React.useState(DEFAULT_SELECTED_TYPE);

  const allQuests = [...quests];
  const filteredQuests = filterQuestsByType(allQuests, selectedType);
  const emptyQuestItems = [...Array(INITIAL_QUEST_ITEMS_COUTN).keys()];

  return (
    <>
      <S.Tabs>
        {QuestTypes.map((item) => (
          <S.TabItem key={item.id}>
            <S.TabBtn
              isActive={selectedType === item.type}
              onClick={() => setSelectedType(item.type)}
            >
              {item.icon}
              <S.TabTitle>{item.title}</S.TabTitle>
            </S.TabBtn>
          </S.TabItem>
        ))}
      </S.Tabs>

      <S.QuestsList>
        {!filteredQuests.length &&
          emptyQuestItems.map((item) => <S.QuestItemSkelet key={item} />)}
        {filteredQuests &&
          filteredQuests.map((quest) => (
            <S.QuestItem key={quest.id}>
              <S.QuestItemLink to={`/quest/${quest.id}`}>
                <S.Quest>
                  <S.QuestImage
                    src={quest.previewImg}
                    width="344"
                    height="232"
                    alt={`квест ${quest.title}`}
                  />

                  <S.QuestContent>
                    <S.QuestTitle>{quest.title}</S.QuestTitle>

                    <S.QuestFeatures>
                      <S.QuestFeatureItem>
                        <IconPerson />
                        {formatPeopleCount(quest.peopleCount)} чел
                      </S.QuestFeatureItem>
                      <S.QuestFeatureItem>
                        <IconPuzzle />
                        {formatQuestComplexity(quest.level)}
                      </S.QuestFeatureItem>
                    </S.QuestFeatures>
                  </S.QuestContent>
                </S.Quest>
              </S.QuestItemLink>
            </S.QuestItem>
          ))}
      </S.QuestsList>
    </>
  );
};

export default QuestsCatalog;
