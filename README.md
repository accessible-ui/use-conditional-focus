<hr>
<div align="center">
  <h1 align="center">
    useConditionalFocus()
  </h1>
</div>

<p align="center">
  <a href="https://bundlephobia.com/result?p=@accessible/use-conditional-focus">
    <img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/@accessible/use-conditional-focus?style=for-the-badge&labelColor=24292e">
  </a>
  <!--<a aria-label="Code coverage report" href="https://codecov.io/gh/accessible-ui/use-conditional-focus">
    <img alt="Code coverage" src="https://img.shields.io/codecov/c/gh/accessible-ui/use-conditional-focus?style=for-the-badge&labelColor=24292e">
  </a>-->
  <a aria-label="Build status" href="https://travis-ci.org/accessible-ui/use-conditional-focus">
    <img alt="Build status" src="https://img.shields.io/travis/accessible-ui/use-conditional-focus?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="NPM version" href="https://www.npmjs.com/package/@accessible/use-conditional-focus">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/@accessible/use-conditional-focus?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="License" href="https://jaredlunde.mit-license.org/">
    <img alt="MIT License" src="https://img.shields.io/npm/l/@accessible/use-conditional-focus?style=for-the-badge&labelColor=24292e">
  </a>
</p>

<pre align="center">npm i @accessible/use-conditional-focus</pre>
<hr>

A React hook that will focus elements conditionally. By default this will focus on the first focusable
child of the provided root element, but you can optionally include the root as well.

## Quick Start

```jsx harmony
import useConditionalFocus from '@accessible/use-conditional-focus'

const Component = () => {
  const [visible, setVisible] = useState(false)
  const rootRef = useConditionalFocus(visible)
  return (
    <div>
      <div ref={rootRef}>
        // This button will be focused when `visible` is true
        <button onClick={() => setVisible(false)}>Close me</button>
      </div>
      <button onClick={() => setVisible(true)}>Click me</button>
    </div>
  )
}
```

## API

### `useConditionalFocus(shouldFocus: boolean, options: {includeRoot: boolean, preventScroll: boolean)}`

#### Arguments

| Prop          | Type      | Default | Required? | Description                                                                                                          |
| ------------- | --------- | ------- | --------- | -------------------------------------------------------------------------------------------------------------------- |
| shouldFocus   | `boolean` | `false` | `Yes`     | Provide a `true` value here to focus the first focusable child in the element.                                       |
| options       | `object` \ `boolean` | `{includeRoot: false, preventScroll: false}` | `No`      | See `options`. Optionally pass a `boolean` instead (legacy fallback for `includeRoot`). When `true` this will try to focus on the root element in addition to its children.                                  |

#### Options

| Prop          | Type      | Default | Required? | Description                                                                                                          |
| ------------- | --------- | ------- | --------- | -------------------------------------------------------------------------------------------------------------------- |
| includeRoot   | `boolean` | `false` | `No`      | When `true` this will try to focus on the root element in addition to its children.                                  |
| preventScroll | `boolean` | `false` | `No`      | When `true` this will prevent your browser from scrolling the document to bring the newly-focused element into view. |

#### Returns `MutableRefObject<any>`

## LICENSE

MIT
