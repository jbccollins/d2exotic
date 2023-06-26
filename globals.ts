// Hacky way to ensure that a list contains all the values in an enum
// Useful for when we care about order and don't want to use Object.values() on the enum
// Won't result in a compile time error but will throw a really obvious
// runtime error.
// TODO: Get rid of this and figure out a better way. Maybe the satisfies
// operator can be useful here? idk.
export function ValidateEnumList<T extends string | symbol | number>(
  expectedList: T[],
  list: T[]
): T[] {
  if (expectedList.length !== list.length) {
    throw new Error(
      `Lists do not have the same length. Expected: ${expectedList}. Got: ${list}`
    );
  }

  const match = expectedList.every((element) => list.includes(element));

  if (!match) {
    throw new Error(
      `Lists have different values. Expected: ${expectedList}. Got: ${list}`
    );
  }

  return list;
}
