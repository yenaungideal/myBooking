// INFO: export only for internal lib purposes and unit tests.
export const trxFindMatch = (fullKey: string, partialKey: string): boolean => {
  if (partialKey === '') return false;
  const fullKeysList = fullKey.split('.');
  const partials = partialKey.split('.');

  const match = partials.every((part) => fullKeysList.some((v) => v === part));

  return match;
};
