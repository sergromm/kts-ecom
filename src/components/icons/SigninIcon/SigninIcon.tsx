import * as React from 'react';
import { Icon, IconProps } from '../Icon';

export const SiginIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <svg fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Icon>
  );
};
