import { createGlobalStyle } from 'styled-components'
import theme from './theme'

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
    padding: 0;
    margin: 0;
    background-color: ${theme.color.dark}
  }

  * {
    box-sizing: border-box;
  }

  input[type='text'] {
    font-size: 16px;
  }

  input:focus,
  textarea:focus,
  select:focus {
    outline: none;
  }
`

export default GlobalStyle
