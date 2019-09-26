import React from 'react'
import omit from 'lodash/omit'

import StyledComponents from 'styled-components'
import { Alert as BaseAlert } from 'antd'

export const Alert = StyledComponents((props) => {
  return (<BaseAlert {...omit(props, ['fullscreen'])} />)
})`
  ${props => props.fullscreen && `
    width: 100% !important;
    height: 100% !important;
    margin: 0px !important;
  `}
`
