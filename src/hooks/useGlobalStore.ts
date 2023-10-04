import * as React from 'react';

export const useGlobalStore = <T>(context: React.Context<T>) => React.useContext(context);
