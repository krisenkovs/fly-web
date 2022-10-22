import { store } from './store';
import styles from './styles.module.css';
import { Box } from 'components/Box';
import { Modal } from 'components/Modal';
import { TouchableOpacity } from 'components/TouchableOpacity';
import { Typography } from 'components/Typography';
import { COLORS } from 'constant';
import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useRef } from 'react';
import { AvatarView } from 'web/components/AvatarView';
import { ProfileType } from 'web/types';

type Props = {
  onClose: (data?: ProfileType) => void;
};

export const PhotoModal = observer(({ onClose }: Props) => {
  const ref = useRef<HTMLInputElement>(null);
  const { visible, data, saveFile, saveFilePromise, changeAvatar, changePhoto, clear } = store;

  useEffect(() => {
    if (!visible) {
      clear();
    }
  }, [visible]);

  useEffect(() => {
    if (saveFilePromise?.fulfilled) {
      changePhoto(saveFilePromise?.value);
    }
  }, [saveFilePromise?.fulfilled]);

  function handleAvatarChange(index: number) {
    changeAvatar(index);
  }

  function handleFileLoad(e: ChangeEvent<HTMLInputElement>) {
    e.target?.files?.[0] && saveFile(e.target?.files?.[0]);
  }

  function handleClose() {
    onClose?.(data);
  }

  return (
    <Modal onClose={handleClose} title="Сменить фото" visible={visible}>
      <Box marginTop={24} marginLeft={16} marginRight={16} flexDirection="row" alignItems="center">
        <AvatarView size={100} avatarCode={data?.avatarCode} photoId={data?.photoId} />
        <Box marginLeft={20}>
          <input type="file" ref={ref} hidden onChange={handleFileLoad} />
          <TouchableOpacity onPress={() => ref.current?.click()}>
            <Typography weight={400} size={16} lineHeight={20} color={COLORS.BLUE}>
              Загрузить фото
            </Typography>
          </TouchableOpacity>
        </Box>
      </Box>
      <Box marginTop={20} marginBottom={20} marginLeft={16} marginRight={16}>
        <Typography color={COLORS.BLACK} weight={700} size={14} lineHeight={18}>
          Выбрать аватара
        </Typography>
      </Box>
      <Box marginLeft={16} marginRight={16} flexDirection="row" className={styles.avatarContainer}>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
          <TouchableOpacity onPress={() => handleAvatarChange(index)}>
            <Box
              height={68}
              width={68}
              borderRadius={64}
              alignItems="center"
              justifyContent="center"
              className={index === data?.avatarCode ? styles.avatarSelected : styles.avatar}
              overflow="hidden"
              position="relative"
            >
              <img src={`images/Avatar${index}.png`} alt={`Avatar${index}`} className={styles.image} />
            </Box>
          </TouchableOpacity>
        ))}
      </Box>
    </Modal>
  );
});
