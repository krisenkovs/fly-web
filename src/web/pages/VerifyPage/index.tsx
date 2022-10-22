import { store } from './store';
import { Loader, TouchableOpacity } from 'components';
import { Box } from 'components/Box';
import { Typography } from 'components/Typography';
import { COLORS } from 'constant';
import { observer } from 'mobx-react-lite';
import React, { FC, useEffect } from 'react';
import { Header } from 'theme/components/Header';
import { store as mainStore } from 'web/application/store';
import { NumberInput } from 'web/pages/VerifyPage/NumberInput';

export const VerifyPage: FC = observer(() => {
  const { sendCode, validateCodePromise, validateCode, value, setValue, clear } = store;

  useEffect(() => {
    document.getElementById(`char0`)?.focus();
    sendCode();
    return clear;
  }, []);

  useEffect(() => {
    if (!value.some((i) => !i)) {
      validateCode(value.join(''));
    }
  }, [value]);

  useEffect(() => {
    if (validateCodePromise?.fulfilled) {
      mainStore.loadProfile();
    }
  }, [validateCodePromise?.fulfilled]);

  function handleKeyDown(index: number, key: string) {
    switch (key) {
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9': {
        setValue(value.map((item, i) => (i === index ? key : item)));
        document.getElementById(`char${index + 1}`)?.focus();
        break;
      }
      case 'Backspace': {
        setValue(value.map((item, i) => (i === index ? '' : item)));
        document.getElementById(`char${index - 1}`)?.focus();
        break;
      }
    }
  }
  function handleSend() {
    setValue(['', '', '', '']);
    document.getElementById(`char0`)?.focus();
    sendCode();
  }

  return (
    <Box flex={1}>
      <Header
        title={
          <>
            <span>Подтвердите</span>
            <br />
            <span>номер телефона</span>
          </>
        }
      />
      <Box flex={1} paddingTop={24} paddingLeft={16} paddingRight={16} paddingBottom={40} alignItems="center">
        {validateCodePromise?.pending ? (
          <Loader />
        ) : (
          <>
            <Typography color={COLORS.BLACK} size={14} lineHeight={24} weight={400}>
              Мы отправили код на номер <b>+{mainStore.profilePromise?.value?.phone}</b> Введите 4-х значный код из СМС
            </Typography>
            <Box flexDirection="row" justifyContent="center">
              <NumberInput onKeyPress={(key) => handleKeyDown(0, key)} value={value[0]} id="char0" />
              <Box marginLeft={8}>
                <NumberInput onKeyPress={(key) => handleKeyDown(1, key)} value={value[1]} id="char1" />
              </Box>
              <Box marginLeft={8}>
                <NumberInput onKeyPress={(key) => handleKeyDown(2, key)} value={value[2]} id="char2" />
              </Box>
              <Box marginLeft={8}>
                <NumberInput onKeyPress={(key) => handleKeyDown(3, key)} value={value[3]} id="char3" />
              </Box>
            </Box>
            <Box flexDirection="row" marginTop={32}>
              <Typography color={COLORS.BLACK} size={14} lineHeight={24} weight={400}>
                Не получили код?
              </Typography>
              <Box marginLeft={8}>
                <TouchableOpacity onPress={handleSend}>
                  <Typography color={COLORS.BLUE} size={14} lineHeight={24} weight={400}>
                    Повторите попытку
                  </Typography>
                </TouchableOpacity>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
});
