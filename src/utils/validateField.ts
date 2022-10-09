export const validateField = (value: string) => {
  if (value.length < 6 || value.length === 0) {
    return true;
  }
  return false;
};
