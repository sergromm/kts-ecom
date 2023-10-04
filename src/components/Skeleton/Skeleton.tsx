import * as React from 'react';
import ContentLoader from 'react-content-loader';

export const Skeleton: React.FC = (props) => (
  <ContentLoader
    backgroundColor="#dfebeb"
    foregroundColor="#d1e0df"
    height={500}
    speed={2}
    viewBox="0 0 360 500"
    width={360}
    {...props}
  >
    <rect height="393" rx="0" ry="0" width="393" x="0" y="0" />
    <rect height="300" rx="0" ry="0" width="393" x="0" y="375" />
  </ContentLoader>
);
