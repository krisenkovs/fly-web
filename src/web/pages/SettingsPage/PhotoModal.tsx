import { Box } from 'components/Box';
import { Modal } from 'components/Modal';
import { TouchableOpacity } from 'components/TouchableOpacity';
import { Typography } from 'components/Typography';
import { COLORS } from 'constant';
import { Avatar1, Avatar2, Avatar3, Avatar4, Avatar5, Avatar6, Avatar7, Avatar8 } from 'icons';
import { observer } from 'mobx-react';
import React, { ChangeEvent, useEffect, useRef } from 'react';
import { store as mainStore } from 'web/application/store';
import { AvatarView } from 'web/components/AvatarView';

type Props = {
  visible: boolean;
  onClose: () => void;
  avatarCode?: number;
  photoId?: string;
  onChangeAvatar?: (avatarCode?: number) => void;
  onChangePhoto?: (photoId?: string) => void;
};

const avatars = [Avatar1, Avatar2, Avatar3, Avatar4, Avatar5, Avatar6, Avatar7, Avatar8];

export const PhotoModal = observer(
  ({ visible, onClose, avatarCode, photoId, onChangeAvatar, onChangePhoto }: Props) => {
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (mainStore.saveFilePromise?.fulfilled) {
        onChangePhoto?.(mainStore.saveFilePromise?.value);
      }
    }, [mainStore.saveFilePromise?.fulfilled]);

    function handleAvatarChange(index: number) {
      onChangeAvatar?.(index);
    }

    function handleFileLoad(e: ChangeEvent<HTMLInputElement>) {
      e.target?.files?.[0] && mainStore.saveFile(e.target?.files?.[0]);
    }

    return (
      <Modal onClose={onClose} title="Сменить фото" visible={visible}>
        <Box marginTop={24} marginLeft={16} marginRight={16} flexDirection="row" alignItems="center">
          <AvatarView size={100} avatarCode={avatarCode} photoId={photoId} />
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
        <Box marginLeft={16} marginRight={16} flexDirection="row" style={{ gap: '16px', flexWrap: 'wrap' }}>
          {avatars.map((Icon, index) => (
            <TouchableOpacity onPress={() => handleAvatarChange(index)}>
              <Box height={68} width={68} borderRadius={64} alignItems="center" justifyContent="center">
                <Icon color={avatarCode === index ? COLORS.BLUE : COLORS.GREY} />
              </Box>
            </TouchableOpacity>
          ))}
        </Box>
      </Modal>
    );
  },
);