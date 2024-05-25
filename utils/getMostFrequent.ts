export const getMostFrequent = (array: string[]) => {
  return array
    .sort(
      (a, b) =>
        array.filter(v => v === a).length - array.filter(v => v === b).length,
    )
    .pop()
}
