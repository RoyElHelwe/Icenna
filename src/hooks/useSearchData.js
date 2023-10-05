import { useContext } from 'react';
import { SearchDataContext } from '../context/SerachDataContext';

export const useSearchData = () => useContext(SearchDataContext);
