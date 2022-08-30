import { Box } from 'components/Box';
import React from 'react';

type Props = {
  data: { id?: number }[];
};

export function Carousel({ data = [] }: Props) {
  return <Box style={{ position: 'relative' }}></Box>;
}
