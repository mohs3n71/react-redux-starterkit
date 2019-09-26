import React from 'react'
import PropTypes from 'prop-types'
import {Layout, Row, Col, Icon} from 'antd'

export function SiteHeader (props) {
  const server = props.server
  let environment
  if (server === '') {
    environment = 'Dev'
  } else if (server === '') {
    environment = 'Dev 2'
  } else if (server === '') {
    environment = 'FT'
  } else if (server === '') {
    environment = 'REF'
  } else if (server === '') {
    environment = 'Production'
  }

  const {Header} = Layout

  return (
    <Header
      style={{
        background: '#404040',
        padding: 0,
        color: '#fff',
        fontSize: '10px'
      }}
    >
      <Row>
        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
          <strong
            style={{paddingLeft: '10px', color: '#ffffff', fontSize: '20px'}}
          >
            {environment}
          </strong>
        </Col>
        <Col xs={0} sm={0} md={12} lg={12} xl={12}>
          {''}
        </Col>
        <Col xs={0} sm={0} md={6} lg={6} xl={6}>
          <Icon
            type='user'
            style={{color: '#fff', margin: '5px', fontSize: '20px'}}
          />
          <strong style={{
            color: '#ffffff',
            fontSize: '20px',
            marginRight: '5px'
          }}
          >
            {props.userId}
          </strong>
          ({props.adminType})
        </Col>
      </Row>
    </Header>
  )
}

SiteHeader.propTypes = {
  server: PropTypes.string,
  userId: PropTypes.string,
  adminType: PropTypes.string
}

SiteHeader.defaultProps = {
  adminType: 'WRITE'
}
