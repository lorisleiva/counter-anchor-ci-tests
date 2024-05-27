/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/kinobi-so/kinobi
 */

/** InvalidAuthority: The provided authority doesn't match the counter account's authority */
export const COUNTER_ERROR__INVALID_AUTHORITY = 0x1770; // 6000

export type CounterError = typeof COUNTER_ERROR__INVALID_AUTHORITY;

let counterErrorMessages: Record<CounterError, string> | undefined;
if (__DEV__) {
  counterErrorMessages = {
    [COUNTER_ERROR__INVALID_AUTHORITY]: `The provided authority doesn't match the counter account's authority`,
  };
}

export function getCounterErrorMessage(code: CounterError): string {
  if (__DEV__) {
    return (counterErrorMessages as Record<CounterError, string>)[code];
  }

  return 'Error message not available in production bundles. Compile with `__DEV__` set to true to see more information.';
}