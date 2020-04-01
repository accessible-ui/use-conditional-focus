import {MutableRefObject, useRef} from 'react'
import raf from 'raf'
import tabbable from '@accessible/tabbable'
import useLayoutEffect from '@react-hook/passive-layout-effect'

export type ConditionalFocusOptions = {
  includeRoot?: boolean
  preventScroll?: boolean
} | boolean

const defaultOptions: ConditionalFocusOptions = {
  includeRoot: false,
  preventScroll: false
}

const useConditionalFocus = (
  shouldFocus = false,
  options = defaultOptions as ConditionalFocusOptions): MutableRefObject<any> => {
  const ref = useRef<any>(null)

  if (typeof options === 'boolean') {
    options = {
      ...defaultOptions,
      includeRoot: options
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

      raf(doFocus)
      const handleTransitionEnd = () => {
        doFocus()
        current.removeEventListener('transitionend', handleTransitionEnd)
      }

      current.addEventListener('transitionend', handleTransitionEnd)
      return (): void =>
        current.removeEventListener('transitionend', handleTransitionEnd)
    }
  }, [ref.current, shouldFocus])

  return ref
}

export default useConditionalFocus
