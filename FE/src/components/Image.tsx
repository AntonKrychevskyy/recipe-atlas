import { type FC } from 'react';

interface Props {
  src: string;
  width?: number;
  height?: number;
  className?: string;
}

export const Image: FC<Props> = (props) => <img {...props} />;
