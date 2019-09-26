import React from 'react'
import omit from 'lodash/omit'

import StyledComponents from 'styled-components'

export const Box = StyledComponents((props) => {
  return (<div {...omit(props, [
    'style',
    'maxWidth',
    'centered'
  ])}
  />)
})`
  width: 100%;
  ${props => props.maxWidth && `
    max-width: ${props.maxWidth} !important;
  `}
  ${props => props.style === 'dark' && `
    background: ${props.theme['component-dark-background']} !important;
  `}

  ${props => props.centered && `
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
  `}
`
