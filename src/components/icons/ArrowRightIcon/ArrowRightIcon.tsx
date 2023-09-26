import * as React from 'react';
import { Icon, IconProps } from '../Icon';

export const ArrowRightIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <svg fill="none" height="31" viewBox="0 0 31 31" width="31" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M11.957 25.6126L20.0439 17.5258C20.9989 16.5708 20.9989 15.008 20.0439 14.0529L11.957 5.96613"
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
