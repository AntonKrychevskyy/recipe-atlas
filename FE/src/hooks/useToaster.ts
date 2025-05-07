import { useContext } from 'react';
import { ToasterContext } from '../contexts/ToasterContext';

export const useToaster = () => useContext(ToasterContext);
