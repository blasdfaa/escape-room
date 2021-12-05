import React from 'react';

import * as S from './booking-modal.styled';
import { ReactComponent as IconClose } from 'assets/img/icon-close.svg';
import useForm from 'hooks/use-form';

const FetchConfig = {
  METHOD: 'POST',
  CONTENT_TYPE: 'application/json',
};

const FormValidStatus = {
  IDLE: 'idle',
  SUCCESS: 'success',
  FAILURE: 'failure',
};

const BookingFormKey = {
  NAME: 'name',
  PHONE: 'phone',
  PEOPLE_COUNT: 'peopleCount',
  LEGAL: 'isLegal',
};

const FormErrorMessage = {
  EMPTY_FIELD: 'Поле не должно быть пустым',
  PHONE_INVALID: 'Номер должен содержать только цифры',
  PHONE_LENGTH_INVALID: 'Длинна номера должна быть 10 символов',
  PEOPLE_COUNT_INVALID: 'Количество участников должно быть числом',
  LEGAL_INVALID:
    'Для отправки заказа необходимо принять пользовательское соглашение',
  FORM_INVALID: 'Ошибка при отправке формы. Попробуйте еще раз',
};

const PHONE_VALID_REGEX = '^[0-9]+$';

const FORM_VALID_FAIL_MESSAGE = 'Ошибка при отправке заказа. Попробуйте позже';

const BookingModal = ({ onCloseBtnClick }) => {
  const [formStatus, setFormStatus] = React.useState(FormValidStatus.IDLE);

  React.useEffect(() => {
    document.body.classList.add('prevent-scroll');

    return () => {
      document.body.classList.remove('prevent-scroll');
    };
  }, []);

  const handleFormSuccess = async () => {
    const order = {
      name: data[BookingFormKey.NAME],
      peopleCount: +data[BookingFormKey.PEOPLE_COUNT],
      phone: data[BookingFormKey.PHONE],
      isLegal: data[BookingFormKey.LEGAL],
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/orders`, {
        method: FetchConfig.METHOD,
        headers: {
          'Content-Type': FetchConfig.CONTENT_TYPE,
        },
        body: JSON.stringify(order),
      });

      if (!response.ok) {
        setFormStatus(FormValidStatus.FAILURE);
        return;
      }

      setFormStatus(FormValidStatus.SUCCESS);
    } catch {
      setFormStatus(FormValidStatus.FAILURE);
    }
  };

  const { data, errors, handleChangeValue, handleSubmitForm } = useForm({
    rules: {
      name: {
        required: {
          value: true,
          message: FormErrorMessage.EMPTY_FIELD,
        },
      },
      phone: {
        required: {
          value: true,
          message: FormErrorMessage.EMPTY_FIELD,
        },
        pattern: {
          value: PHONE_VALID_REGEX,
          message: FormErrorMessage.PHONE_INVALID,
        },
        custom: {
          isValid: (value) => value.length === 10,
          message: FormErrorMessage.PHONE_LENGTH_INVALID,
        },
      },
      peopleCount: {
        required: {
          value: true,
          message: FormErrorMessage.EMPTY_FIELD,
        },
        custom: {
          isValid: (value) => Number.isInteger(+value),
          message: FormErrorMessage.PEOPLE_COUNT_INVALID,
        },
      },
      isLegal: {
        required: {
          value: true,
          message: FormErrorMessage.LEGAL_INVALID,
        },
      },
    },
    onSubmit: handleFormSuccess,
    resetOnSubmit: true,
  });

  return (
    <S.BlockLayer>
      <S.Modal>
        <S.ModalCloseBtn onClick={onCloseBtnClick}>
          <IconClose width="16" height="16" />
          <S.ModalCloseLabel>Закрыть окно</S.ModalCloseLabel>
        </S.ModalCloseBtn>
        <S.ModalTitle>Оставить заявку</S.ModalTitle>
        <S.BookingForm
          action="https://echo.htmlacademy.ru"
          method="post"
          id="booking-form"
          onSubmit={handleSubmitForm}
        >
          <S.BookingField>
            <S.BookingLabel htmlFor="booking-name">Ваше Имя</S.BookingLabel>
            <S.BookingInput
              type="text"
              id="booking-name"
              name="booking-name"
              placeholder="Имя"
              value={data[BookingFormKey.NAME] || ''}
              onChange={handleChangeValue(BookingFormKey.NAME)}
              $isValid={!errors[BookingFormKey.NAME]}
              required
            />
            {errors[BookingFormKey.NAME] && (
              <S.BookingFieldErrorMessage>
                {errors[BookingFormKey.NAME]}
              </S.BookingFieldErrorMessage>
            )}
          </S.BookingField>
          <S.BookingField>
            <S.BookingLabel htmlFor="booking-phone">
              Контактный телефон
            </S.BookingLabel>
            <S.BookingInput
              type="text"
              id="booking-phone"
              name="booking-phone"
              placeholder="Телефон"
              value={data[BookingFormKey.PHONE] || ''}
              onChange={handleChangeValue(BookingFormKey.PHONE)}
              $isValid={!errors[BookingFormKey.PHONE]}
              required
            />
            {errors[BookingFormKey.PHONE] && (
              <S.BookingFieldErrorMessage>
                {errors[BookingFormKey.PHONE]}
              </S.BookingFieldErrorMessage>
            )}
          </S.BookingField>
          <S.BookingField>
            <S.BookingLabel htmlFor="booking-people">
              Количество участников
            </S.BookingLabel>
            <S.BookingInput
              type="number"
              id="booking-people"
              name="booking-people"
              placeholder="Количество участников"
              value={data[BookingFormKey.PEOPLE_COUNT] || ''}
              onChange={handleChangeValue(BookingFormKey.PEOPLE_COUNT)}
              $isValid={!errors[BookingFormKey.PEOPLE_COUNT]}
              required
            />
            {errors[BookingFormKey.PEOPLE_COUNT] && (
              <S.BookingFieldErrorMessage>
                {errors[BookingFormKey.PEOPLE_COUNT]}
              </S.BookingFieldErrorMessage>
            )}
          </S.BookingField>
          <S.BookingSubmit type="submit">Отправить заявку</S.BookingSubmit>
          <S.BookingCheckboxWrapper>
            <S.BookingCheckboxInput
              type="checkbox"
              id="booking-legal"
              name="booking-legal"
              value={data[BookingFormKey.LEGAL] || false}
              onChange={handleChangeValue(BookingFormKey.LEGAL)}
              required
            />
            <S.BookingCheckboxLabel
              className="checkbox-label"
              htmlFor="booking-legal"
            >
              <S.BookingCheckboxText>
                Я согласен с{' '}
                <S.BookingLegalLink href="#">
                  правилами обработки персональных данных и пользовательским
                  соглашением
                </S.BookingLegalLink>
              </S.BookingCheckboxText>
            </S.BookingCheckboxLabel>
            {errors[BookingFormKey.LEGAL] && (
              <S.BookingFieldErrorMessage>
                {errors[BookingFormKey.LEGAL]}
              </S.BookingFieldErrorMessage>
            )}
          </S.BookingCheckboxWrapper>
          {formStatus === FormValidStatus.FAILURE && (
            <S.BookingFormErrorMessage as="strong">
              {FORM_VALID_FAIL_MESSAGE}
            </S.BookingFormErrorMessage>
          )}
        </S.BookingForm>
      </S.Modal>
    </S.BlockLayer>
  );
};

export default React.memo(BookingModal);
