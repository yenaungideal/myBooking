export const MIN_MAX_REGEX = /^(?=.*).{8,15}$/;
export const ONE_NUM_REGEX = /.[0-9]./;
export const LOW_UPPER_REGEX = /(?=.[a-z])(?=.[A-Z]).*$/;
export const SPECIAL_CHAR_REGEX = /[(!@#$%^&*)]/;

const ALL_REGEXEN = [
  MIN_MAX_REGEX,
  SPECIAL_CHAR_REGEX,
  LOW_UPPER_REGEX,
  ONE_NUM_REGEX,
];

export const checkAll = (value: string): boolean => {
  return ALL_REGEXEN.map((v: RegExp) => v.test(value)).every((v) => v);
};
