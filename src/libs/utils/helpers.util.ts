/** INFO: This foo helps to compare two arrays. If TRUE - arrays are the same */
export const compareStringArrays = (arrayOne: unknown[], arrayTwo: unknown[]): boolean => {
    return JSON.stringify(arrayOne) === JSON.stringify(arrayTwo);
  };
  
  /** INFO: This foo helps to compare two arrays. If TRUE - arrays are the same */
  export const compareArrays = (arrayOne: unknown[], arrayTwo: unknown[]): boolean => {
    if (arrayOne?.length !== arrayTwo?.length) return false;
  
    // spread operator is faster than any array methods
    const firstArray: unknown[] = [...arrayOne].sort();
    const secondArray: unknown[] = [...arrayTwo].sort();
  
    // stringify is so much faster than loop
    return JSON.stringify(firstArray) === JSON.stringify(secondArray);
  };
  
  export const capitalize = (str: string): string => {
    return str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : str;
  };
  
  /** sortBy can sort by some prop in object, with lowerCasing and reversing of sorting */
  export const sortBy = (prop: string, lowerCased = true, reversed = false): ((a: any, b: any) => number) => {
    const prepare = (v: string): string => (lowerCased && v && typeof v === 'string' ? v.toLowerCase() : v);
  
    return function (a: any, b: any): number {
      if (prepare(a[prop]) < prepare(b[prop])) {
        return reversed ? 1 : -1;
      }
      if (prepare(a[prop]) > prepare(b[prop])) {
        return reversed ? -1 : 1;
      }
      return 0;
    };
  };
  
  export const secondsToMmss = (seconds: number): string => {
    const minutes: number = Math.floor(seconds / 60);
    const remainingSeconds: number = Math.floor(seconds % 60);
    const formattedMinutes: string = minutes < 10 ? '0' + minutes : minutes.toString();
    const formattedSeconds: string = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds.toString();
    return formattedMinutes + ':' + formattedSeconds;
  };