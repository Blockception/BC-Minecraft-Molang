export function isNumberOrLetter(code: number): boolean {
  return (
    (code >= "a".charCodeAt(0) && code <= "z".charCodeAt(0)) ||
    (code >= "A".charCodeAt(0) && code <= "Z".charCodeAt(0)) ||
    (code >= "0".charCodeAt(0) && code <= "9".charCodeAt(0))
  );
}

export function isNumber(code: number): boolean {
  return (
    (code >= "0".charCodeAt(0) && code <= "9".charCodeAt(0))
  );
}
export function isLetter(code: number): boolean {
  return (
    (code >= "a".charCodeAt(0) && code <= "z".charCodeAt(0)) ||
    (code >= "A".charCodeAt(0) && code <= "Z".charCodeAt(0))
  );
}