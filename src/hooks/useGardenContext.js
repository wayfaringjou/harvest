import { useContext } from 'react';
import { GardenContext } from '../context/GardenProvider';

const useGardenContext = () => useContext(GardenContext);

export default useGardenContext;
