import React, {useState} from 'react'
import {render, act, fireEvent} from '@testing-library/react'
// @ts-ignore
import {reset, step} from '@essentials/raf'
import useFocus from './index'

describe('useFocus()', () => {
  // @ts-ignore
  beforeEach(reset)

  it('should focus when true', () => {
    const Component = ({focus}) => {
      const ref = useFocus(focus)
      const [child, setChild] = useState<string | null>('unfocused')

      return (
        <div ref={ref} data-testid="container">
          <button
            data-testid="btn"
            onFocus={() => setChild('focused')}
            children={child}
          />
        </div>
      )
    }

    const result = render(<Component focus={false} />)
    const containerInstance = result.getByTestId('container')
    const btnInstance = result.getByTestId('btn')
    // @ts-ignore
    Object.defineProperty(btnInstance, 'offsetParent', {
      value: containerInstance,
    })
    // @ts-ignore
    btnInstance.node = {
      type: 'button',
    }
    // @ts-ignore
    containerInstance.querySelectorAll = () => [btnInstance]
    expect(btnInstance.textContent).toBe('unfocused')
    result.rerender(<Component focus={true} />)
    // @ts-ignort
    expect(result.getByTestId('btn').textContent).toBe('unfocused')
    // @ts-ignore
    act(() => step({count: 1}))
    expect(result.getByTestId('btn').textContent).toBe('focused')
  })

  it('should focus when true and transition has ended', () => {
    const Component = ({focus}) => {
      const ref = useFocus(focus)
      const [child, setChild] = useState<string | null>('unfocused')

      return (
        <div ref={ref} data-testid="container">
          <button
            data-testid="btn"
            onFocus={() => setChild('focused')}
            children={child}
          />
        </div>
      )
    }

    const result = render(<Component focus={false} />)
    const containerInstance = result.getByTestId('container')
    const btnInstance = result.getByTestId('btn')
    // @ts-ignore
    Object.defineProperty(btnInstance, 'offsetParent', {
      value: containerInstance,
    })
    // @ts-ignore
    btnInstance.node = {
      type: 'button',
    }
    // @ts-ignore
    containerInstance.querySelectorAll = () => [btnInstance]
    expect(btnInstance.textContent).toBe('unfocused')
    result.rerender(<Component focus={true} />)
    expect(result.getByTestId('btn').textContent).toBe('unfocused')
    fireEvent.transitionEnd(containerInstance)
    expect(result.getByTestId('btn').textContent).toBe('focused')
  })

  it('should not focus when elements are not tabbable', () => {
    const Component = ({focus}) => {
      const ref = useFocus(focus)
      const [child, setChild] = useState<string | null>('unfocused')

      return (
        <div ref={ref} data-testid="container">
          <button
            data-testid="btn"
            onFocus={() => setChild('focused')}
            children={child}
          />
        </div>
      )
    }

    const result = render(<Component focus={false} />)
    const containerInstance = result.getByTestId('container')
    const btnInstance = result.getByTestId('btn')
    // @ts-ignore
    Object.defineProperty(btnInstance, 'offsetParent', {
      value: null,
    })
    // @ts-ignore
    btnInstance.node = {
      type: 'button',
    }
    // @ts-ignore
    containerInstance.querySelectorAll = () => [btnInstance]
    expect(btnInstance.textContent).toBe('unfocused')
    result.rerender(<Component focus={true} />)
    expect(result.getByTestId('btn').textContent).toBe('unfocused')
    fireEvent.transitionEnd(containerInstance)
    expect(result.getByTestId('btn').textContent).toBe('unfocused')
  })
})
