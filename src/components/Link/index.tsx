import React, { CSSProperties, FC, PropsWithChildren, useMemo } from 'react';

type Props = PropsWithChildren<{
  weight?: 400 | 500 | 600 | 700 | 800 | 900;
  size?: number;
  height?: number;
  color?: 'black' | 'blue';
  href?: string;
}>;

export const Link: FC<Props> = ({ weight, size, height, color = 'blue', children, href }) => {
  const styles = useMemo(() => {
    const values: CSSProperties = {};

    if (weight) {
      values['fontWeight'] = weight;
    }

    if (size) {
      values['fontSize'] = `${size}px`;
    }

    if (height) {
      values['height'] = `${height}px`;
    }

    values['color'] = `var(--color-${color})`;
    values['textDecoration'] = 'none';

    return values;
  }, [color, weight, size, height]);

  return (
    <a style={styles} href={href}>
      {children}
    </a>
  );
};
