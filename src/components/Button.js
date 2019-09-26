import React from 'react'
import omit from 'lodash/omit'

import StyledComponents from 'styled-components'
import { Button as BaseButton } from 'antd'

export const Button = StyledComponents((props) => {
  return (<BaseButton {...omit(props, [
    'margin',
    'padding',
    'filled'
  ])}
  />)
})`
  ${props => props.margin && `
    margin: ${props.margin} !important;
  `}
  ${props => props.padding && `
    padding: ${props.padding} !important;
  `}
  ${props => props.filled && `
    width: 100% !important;
  `}

  ${props => props.type === 'plain' && `
    height: auto !important;
    background: transparent !important;
    border-width: 0px !important;
  `}
`
