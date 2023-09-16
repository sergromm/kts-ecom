import * as React from 'react';
import { ILocalStore } from 'store/types';

export const useLocalStore = <T extends ILocalStore>(createor: () => T): T => {
  const container = React.useRef<null | T>(null);

  if (container.current === null) {
    container.current = createor();
  }

  React.useEffect(() => {
    return () => {
      container.current?.destroy();
    };
  }, []);

  return container.current;
};
