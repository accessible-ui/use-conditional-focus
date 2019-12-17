import {MutableRefObject, useRef} from 'react'
import raf from 'raf'
import tabbable from '@accessible/tabbable'
import useLayoutEffect from '@react-hook/passive-layout-effect'

const useConditionalFocus = (
  shouldFocus = false,
  includeRoot = false
): MutableRefObject<any> => {
  const ref = useRef<any>(null)

  useLayoutEffect(() => {
    const current = ref.current
    if (current && shouldFocus) {
      // Focuses on the first focusable element
      const doFocus = (): void => {
        const tabbableEls = tabbable(current, includeRoot)
        if (tabbableEls.length > 0) tabbableEls[0].focus()
      }

      raf(doFocus)
      current.addEventListener('transitionend', doFocus)
      return (): void => current.removeEventListener('transitionend', doFocus)
    }
  }, [ref.current, shouldFocus])

  return ref
}

export default useConditionalFocus
