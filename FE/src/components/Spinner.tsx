import { type FC } from 'react';
import './Spinner.css';

interface Props {
  className?: string;
  size?: 150 | 100 | 50 | 33;
}

export const Spinner: FC<Props> = ({ className, size = 50 }) => (
  <div className={`spinner__container ${className}`}>
    <div className={`spinner__box spinner__box--${size}`}>
      <svg className="spinner" viewBox="0 0 50 50">
        <circle
          className="spinner__path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke-width="5"
          stroke="white"
        ></circle>
      </svg>
    </div>
  </div>
);
