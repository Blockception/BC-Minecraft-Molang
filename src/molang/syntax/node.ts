export type Syntax = OperationNode


export interface BaseNode {
  /** The location of where the text starts  */
  offset: number;
}


export interface OperationNode extends BaseNode {

}