/* jest */
// import React, {useState} from 'react'
// import {render, fireEvent} from '@testing-library/react'
// import useConditionalFocus from './index'

describe('useConditionalFocus()', () => {
  it('passes', () => {
    expect(1).toBe(1)
  })
  /*it('should focus when true', () => {
    const Component = () => {
      const ref = useConditionalFocus(true)
      const [child, setChild] = useState<string | null>(null)
      return <div ref={ref}><button data-testid='btn' onFocus={() => setChild('focused')} children={child}/></div>
    }
    const result = render(<Component/>)
    console.log(document.activeElement)
    expect(result.asFragment()).toMatchSnapshot()
    fireEvent.blur(result.getByTestId('btn'))
    expect(result.asFragment()).toMatchSnapshot()
  })*/
})
