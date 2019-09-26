import React from 'react'
import omit from 'lodash/omit'

import StyledComponents from 'styled-components'

function makeHeading (element) {
  return StyledComponents((props) => {
    return React.createElement(element, omit(props, [
      'margin',
      'padding',
      'color',
      'textAlign',
      'textTransform',
      'fontSize',
      'fontWeight'
    ]))
  })`
    ${props => props.margin && `
      margin: ${props.margin} !important;
    `}
    ${props => props.padding && `
      padding: ${props.padding} !important;
    `}
    ${props => props.color && `
      color: ${props.color} !important;
    `}
    ${props => props.textAlign && `
      text-align: ${props.textAlign} !important;
    `}
    ${props => props.textTransform && `
      text-transform: ${props.textTransform} !important;
    `}
    ${props => props.fontSize && `
      font-size: ${props.fontSize} !important;
    `}
    ${props => props.fontWeight && `
      font-weight: ${props.fontWeight} !important;
    `}
  `
}

export const H1 = makeHeading('h1')
export const H2 = makeHeading('h2')
export const H3 = makeHeading('h3')
export const H4 = makeHeading('h4')
export const H5 = makeHeading('h5')
export const H6 = makeHeading('h6')
