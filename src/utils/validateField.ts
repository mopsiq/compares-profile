export const validateField = (value: string): boolean => {
  return value.length >= 6 && value.length !== 0;
};
