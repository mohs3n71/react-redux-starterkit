import React from 'react'
import omit from 'lodash/omit'
import times from 'lodash/times'

import StyledComponents from 'styled-components'
import { Card as BaseCard } from 'antd'

export const Card = StyledComponents((props) => {
  return (<BaseCard {...omit(props, [
    'style',
    'transparent',
    'shadowed',
    'selectable'
  ])}
  />)
})`
  min-width: 100px;
  min-height: 100px;
  margin: ${props => props.theme['margin-base']};
  background: ${props => {
    if (props.transparent) {
      return 'transparent'
    } else if (props.style === 'dark') {
      return props.theme['component-dark-background']
    }

    return props.theme['component-background']
  }} !important;
  ${props => props.shadowed && `
    box-shadow: ${props.theme['box-shadow-base']} !important;
  `}

  &, > * {
    ${props => props.style === 'dark' && `
      color: ${props.theme['text-color-dark']} !important;
    `}
  }

  ${props => {
    let color = props.theme['heading-color']

    if (props.style === 'dark') {
      color = props.theme['heading-color-dark']
    }

    return times(6, (index) => {
      return `
        h${index + 1} {
          color: ${color} !important;
        }
      `
    })
  }}

  &, > * {
    border-color: ${props => {
    if (props.style === 'dark') {
      return props.theme['border-color-split-dark']
    }

    return props.theme['border-color-split']
  }} !important;
  }

  &:hover {
    ${props => props.selectable && `
      cursor: pointer !important;
    `}
    ${props => !props.shadowed && `
      box-shadow: none !important;
    `}
    border-color: ${props => {
    if (props.selectable) {
      return props.theme['primary-color']
    } else if (props.style === 'dark') {
      return props.theme['border-color-split-dark']
    }

    return props.theme['border-color-split']
  }} !important;
  }
`
