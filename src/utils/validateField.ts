export const validateField = (value: string): boolean => {
  if (value.length < 6 || value.length === 0) {
    return false;
  }
  return true;
};
