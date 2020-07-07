import * as React from 'react'
import tabbable from '@accessible/tabbable'
import useEvent from '@react-hook/event'
import useLatest from '@react-hook/latest'

function useConditionalFocus<T extends Window>(
  target: T | null,
  shouldFocus?: boolean,
  options?: UseConditionalFocusOptions
): void
function useConditionalFocus<T extends Document>(
  target: T | null,
  shouldFocus?: boolean,
  options?: UseConditionalFocusOptions
): void
function useConditionalFocus<T extends HTMLElement>(
  target: React.RefObject<T> | T | null,
  shouldFocus?: boolean,
  options?: UseConditionalFocusOptions
): void
function useConditionalFocus(
  target: any,
  shouldFocus = false,
  {includeRoot, preventScroll} = defaultOptions
) {
  const doFocus_ = () => {
    const element = target && 'current' in target ? target.current : target
    if (!element || !shouldFocus) return
    const tabbableEls = tabbable(element, includeRoot)
    if (tabbableEls.length > 0) tabbableEls[0].focus({preventScroll})
  }
  const doFocus = useLatest(doFocus_)

  React.useEffect(() => {
    doFocus.current()
  }, [doFocus, shouldFocus])

  useEvent(target, 'transitionend', doFocus_)
}

const defaultOptions: UseConditionalFocusOptions = {
  includeRoot: false,
  preventScroll: false,
}

export type UseConditionalFocusOptions = {
  includeRoot?: boolean
  preventScroll?: boolean
}

export default useConditionalFocus
