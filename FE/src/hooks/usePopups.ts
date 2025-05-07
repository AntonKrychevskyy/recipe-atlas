import { useContext } from 'react';
import { PopupContext } from '../contexts/PopupContext';

export const usePopups = () => useContext(PopupContext);
