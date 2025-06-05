export const INBOX_STORAGE_KEY = "inbox-show-amount";
const DEFAULT_SHOW_AMOUNT = 10;

// Storing the users "show" amount in local storage
export const getInitialShowAmount = () => {
  const stored = localStorage.getItem(INBOX_STORAGE_KEY);
  return stored ? parseInt(stored) : DEFAULT_SHOW_AMOUNT;
};
