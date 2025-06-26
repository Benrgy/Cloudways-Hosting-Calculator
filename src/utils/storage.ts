interface SavedCalculation {
  id: string;
  timestamp: number;
  inputs: any;
  results: any;
  name?: string;
}

const STORAGE_KEY = 'cloudways_calculations';
const MAX_SAVED_CALCULATIONS = 10;

export const saveCalculation = (inputs: any, results: any, name?: string): string => {
  const calculations = getSavedCalculations();
  const id = `calc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  const newCalculation: SavedCalculation = {
    id,
    timestamp: Date.now(),
    inputs,
    results,
    name: name || `Calculation ${new Date().toLocaleDateString()}`
  };
  
  calculations.unshift(newCalculation);
  
  // Keep only the most recent calculations
  const trimmedCalculations = calculations.slice(0, MAX_SAVED_CALCULATIONS);
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmedCalculations));
  } catch (error) {
    console.warn('Failed to save calculation to localStorage:', error);
  }
  
  return id;
};

export const getSavedCalculations = (): SavedCalculation[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.warn('Failed to load saved calculations:', error);
    return [];
  }
};

export const loadCalculation = (id: string): SavedCalculation | null => {
  const calculations = getSavedCalculations();
  return calculations.find(calc => calc.id === id) || null;
};

export const deleteCalculation = (id: string): void => {
  const calculations = getSavedCalculations();
  const filtered = calculations.filter(calc => calc.id !== id);
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.warn('Failed to delete calculation:', error);
  }
};
