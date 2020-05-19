import {MutableRefObject, useRef} from 'react'
import {raf, caf} from '@essentials/raf'
import tabbable from '@accessible/tabbable'
import useLayoutEffect from '@react-hook/passive-layout-effect'

function useConditionalFocus<T extends HTMLElement = any>(
  shouldFocus = false,
  options = defaultOptions
): MutableRefObject<T | null> {
  const ref = useRef<T | null>(null)

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

  useLayoutEffect(() => {
    const current = ref.current

    if (current && shouldFocus) {
      // Focuses on the first focusable element
      const doFocus = (): void => {
        const tabbableEls = tabbable(current, includeRoot)
        if (tabbableEls.length > 0) tabbableEls[0].focus({preventScroll})
      }

      const ptr = raf(doFocus)
      const handleTransitionEnd = () => {
        doFocus()
        current.removeEventListener('transitionend', handleTransitionEnd)
      }

      current.addEventListener('transitionend', handleTransitionEnd)
      return (): void => {
        current.removeEventListener('transitionend', handleTransitionEnd)
        caf(ptr)
      }
    }
  }, [ref, shouldFocus, includeRoot, preventScroll])

  return ref
}

export type ConditionalFocusOptions =
  | {
      includeRoot?: boolean
      preventScroll?: boolean
    }
  | boolean

const defaultOptions: ConditionalFocusOptions = {
  includeRoot: false,
  preventScroll: false,
}

let DID_WARN = false

export default useConditionalFocus
