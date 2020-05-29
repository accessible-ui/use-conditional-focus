import * as React from 'react'
declare const useConditionalFocus: <T extends HTMLElement = any>(
  shouldFocus?: boolean,
  options?: ConditionalFocusOptions
) => React.MutableRefObject<T | null>
export declare type ConditionalFocusOptions =
  | {
      includeRoot?: boolean
      preventScroll?: boolean
    }
  | boolean
export default useConditionalFocus
