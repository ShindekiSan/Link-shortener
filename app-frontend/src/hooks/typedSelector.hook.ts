import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../store/reducers/root';

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useTypedSelector;
