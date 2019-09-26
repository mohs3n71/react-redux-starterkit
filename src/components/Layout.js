import React from 'react'
import omit from 'lodash/omit'

import StyledComponents from 'styled-components'
import { Layout as BaseLayout } from 'antd'

export const Layout = StyledComponents((props) => {
  return (<BaseLayout {...omit(props, ['fullscreen'])} />)
})`
  ${props => props.fullscreen && `
    width: 100% !important;
    height: 100% !important;
  `}
`

export const LayoutContent = StyledComponents((props) => {
  return (<BaseLayout.Content {...omit(props, ['centered'])} />)
})`
  width: 100%;
  max-width: 1600px;
  margin: auto;
  padding: ${props => props.theme['padding-base']};

  ${props => props.centered && `
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
  `}
`
