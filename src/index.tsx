import * as React from 'react'
import tabbable from '@accessible/tabbable'
import useEvent from '@react-hook/event'

const useConditionalFocus = <T extends HTMLElement = any>(
  shouldFocus = false,
  options = defaultOptions
): React.MutableRefObject<T | null> => {
  const ref = React.useRef<T | null>(null)

  // istanbul ignore next
  if (typeof options === 'boolean') {
    if (
      typeof process !== 'undefined' &&
      process.env.NODE_ENV !== 'production'
    ) {
      if (DID_WARN === false) {
        console.warn(
          '[@accessible-ui/use-conditional-focus] Using a `boolean` for the second argument has been deprecated. Use `{includeRoot: false}` instead.'
        )
        DID_WARN = true
      }
    }

    options = {
      preventScroll: false,
      includeRoot: options,
    }
  }

  const {includeRoot, preventScroll} = options
  const _doFocus = (): void => {
    if (!ref.current || !shouldFocus) return
    const tabbableEls = tabbable(ref.current, includeRoot)
    if (tabbableEls.length > 0) tabbableEls[0].focus({preventScroll})
  }
  const doFocus = React.useRef(_doFocus)
  doFocus.current = _doFocus

  React.useEffect(() => {
    doFocus.current()
  }, [shouldFocus])

  useEvent(ref, 'transitionend', _doFocus)
  return ref
}

const defaultOptions: ConditionalFocusOptions = {
  includeRoot: false,
  preventScroll: false,
}

let DID_WARN = false

export type ConditionalFocusOptions =
  | {
      includeRoot?: boolean
      preventScroll?: boolean
    }
  | boolean

export default useConditionalFocus
