import React from 'react';
import { useParams } from 'react-router-dom';

import { MainLayout } from 'components/common/common';
import { ReactComponent as IconClock } from 'assets/img/icon-clock.svg';
import { ReactComponent as IconPerson } from 'assets/img/icon-person.svg';
import { ReactComponent as IconPuzzle } from 'assets/img/icon-puzzle.svg';
import * as S from './detailed-quest.styled';
import { BookingModal } from './components/components';
import {
  formatPeopleCount,
  formatQuestComplexity,
  getQuestType,
} from 'utils/quest';
import Error from 'components/error/error';
import { HttpCode } from 'constans';

const NOT_FOUND_QUEST_MESSAGE = 'Квест не найден';

const DetailedQuest = () => {
  const { questId } = useParams();

  const [questInfo, setQuestInfo] = React.useState(null);
  const [questInfoLoaded, setQuestInfoLoaded] = React.useState(false);
  const [isBookingModalOpened, setIsBookingModalOpened] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      setQuestInfoLoaded(false);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/quests/${questId}`,
        );

        if (response.status === HttpCode.NOT_FOUND) {
          setQuestInfo(null);
          setQuestInfoLoaded(true);
          return;
        }

        const data = await response.json();

        setQuestInfo(data);
        setQuestInfoLoaded(true);
      } catch {
        setQuestInfo(null);
        setQuestInfoLoaded(true);
      }
    })();
  }, [questId]);

  const onBookingBtnClick = () => {
    setIsBookingModalOpened(true);
  };

  const handleBookingCloseBtn = React.useCallback(() => {
    setIsBookingModalOpened(false);
  }, []);

  if (!questInfo && questInfoLoaded) {
    return (
      <Error errorCode={HttpCode.NOT_FOUND} message={NOT_FOUND_QUEST_MESSAGE} />
    );
  }

  return (
    <MainLayout>
      <S.Main>
        {questInfo && (
          <>
            <S.PageImage
              src={`../${questInfo.coverImg}`}
              alt={`Квест ${questInfo.title}`}
              width="1366"
              height="768"
            />
            <S.PageContentWrapper>
              <S.PageHeading>
                <S.PageTitle>{questInfo.title}</S.PageTitle>
                <S.PageSubtitle>{getQuestType(questInfo.type)}</S.PageSubtitle>
              </S.PageHeading>

              <S.PageDescription>
                <S.Features>
                  <S.FeaturesItem>
                    <IconClock width="20" height="20" />
                    <S.FeatureTitle>{questInfo.duration} мин</S.FeatureTitle>
                  </S.FeaturesItem>
                  <S.FeaturesItem>
                    <IconPerson width="19" height="24" />
                    <S.FeatureTitle>
                      {formatPeopleCount(questInfo.peopleCount)} чел
                    </S.FeatureTitle>
                  </S.FeaturesItem>
                  <S.FeaturesItem>
                    <IconPuzzle width="24" height="24" />
                    <S.FeatureTitle>
                      {formatQuestComplexity(questInfo.level)}
                    </S.FeatureTitle>
                  </S.FeaturesItem>
                </S.Features>

                <S.QuestDescription>{questInfo.description}</S.QuestDescription>

                <S.QuestBookingBtn onClick={onBookingBtnClick}>
                  Забронировать
                </S.QuestBookingBtn>
              </S.PageDescription>
            </S.PageContentWrapper>

            {isBookingModalOpened && (
              <BookingModal onCloseBtnClick={handleBookingCloseBtn} />
            )}
          </>
        )}
      </S.Main>
    </MainLayout>
  );
};

export default DetailedQuest;
