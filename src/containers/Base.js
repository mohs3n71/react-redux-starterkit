import React from 'react'
import PropTypes from 'prop-types'

import { Layout as BaseLayout, Spin } from 'antd'
import { Layout, LayoutContent } from '../components'

import { Logo } from './'

export function Base (props) {
  return (
    <Layout fullscreen={true}>
      {props.showHeader ? (
        <BaseLayout.Header>
          <Logo title={props.title} color='#F3F3F3' />
        </BaseLayout.Header>
      ) : null}
      {props.showLoading ? (
        <LayoutContent centered={true}>
          <Spin />
        </LayoutContent>
      ) : React.Children.toArray(props.children)}
    </Layout>
  )
}

Base.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  showHeader: PropTypes.bool,
  showLoading: PropTypes.bool
}
