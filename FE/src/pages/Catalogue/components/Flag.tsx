import { type FC } from 'react';
import { FLAGS_API_URL } from '../../../api';
import { Image } from '../../../components';

import { COUNTRIES } from '../../../constants';

interface Props {
  code?: string;
  area?: string;
  size?: 16 | 24 | 32 | 48 | 64;
  style?: 'flat' | 'shiny';
  className?: string;
}

export const Flag: FC<Props> = ({ code, area, size = 16, style = 'flat', className }) => {
  const foundCountry = COUNTRIES.find((country) => country.area === area);
  const countryCode = code || foundCountry?.code;
  const src = `${FLAGS_API_URL}/${countryCode}/${style}/${size}.png`;

  return countryCode ? (
    <Image src={src} width={size} height={size} className={className} />
  ) : null;
};
