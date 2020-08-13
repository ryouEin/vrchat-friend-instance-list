/*
どこか適切な場所に置きたい
 */
export const calcWorldHardCapacity: (capacity: number) => number = capacity => {
  return capacity === 1 ? 1 : capacity * 2
}
