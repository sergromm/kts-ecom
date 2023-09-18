import * as Router from 'react-router-dom';
import queryStore from 'store/queryStore';

export const useQueryParamsStoreInit = () => {
  const { search } = Router.useLocation();
  queryStore.setSearch(search);
};
