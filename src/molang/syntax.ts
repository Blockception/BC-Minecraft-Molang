/**
 *
 */
export interface SyntaxCall {
  operation: string;
  parameters: Syntax[];
}

/**
 *
 */
export namespace SyntaxCall {
  /**
   *
   * @param value
   */
  export function is(value: any): value is SyntaxCall {
    if (typeof value === "object") {
      if (typeof value.operation !== "string") return false;
      if (Array.isArray(value.parameters)) return true;

      return false;
    }

    return false;
  }
}

/**
 *
 */
export type Syntax = string | SyntaxCall;

/**
 *
 */
export namespace Syntax {
  /** */
  export function isString(data: Syntax): data is string {
    return typeof data === "string";
  }

  /** */
  export function isSyntaxCall(data: Syntax): data is SyntaxCall {
    return typeof data === "object";
  }
}

