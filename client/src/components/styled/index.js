import styled, { createGlobalStyle } from 'styled-components'
import theme from '../../theme/theme'

export const StyledButton = styled.button`
  color: ${theme.color.white} !important;
  text-decoration: none;
  background-color: ${theme.color.blue};
  padding: 20px;
  display: inline-block;
  border: none;
  width: 20%;
  outline: none;
  margin: 0;
  font-size: 16px;
`
export const Background = createGlobalStyle`

  body {
    background-color: ${theme.color.dark};

    @media ${theme.mediaQueries.phone} {
      background-color: ${({ white }) => (white ? theme.color.white : theme.color.dark)}
    }
  }
`
