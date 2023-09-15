import * as React from 'react';

export const useMeasure = <T extends HTMLElement>() => {
  const ref = React.useRef<T>(null);
  const [measures, setMesures] = React.useState<DOMRect>();
  React.useEffect(() => {
    if (!ref.current) {
      return;
    }
    const element = ref.current as HTMLElement;
    setMesures(element.getBoundingClientRect());
  }, []);

  return { ref, measures };
};
