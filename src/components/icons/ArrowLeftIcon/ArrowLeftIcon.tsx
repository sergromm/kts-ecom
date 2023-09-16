import * as React from 'react';
import { Icon, IconProps } from '../Icon';

export const ArrowLeftIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <svg fill="none" height="31" viewBox="0 0 31 31" width="31" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M19.043 25.6126L10.9561 17.5258C10.0011 16.5708 10.0011 15.008 10.9561 14.0529L19.043 5.96613"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="3"
        />
      </svg>
    </Icon>
  );
};
