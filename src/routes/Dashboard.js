import React, {PureComponent} from 'react'

import {
  BackTop, Layout
} from 'antd'

import {Logo, SiteHeader} from '../containers'
export class Dashboard extends PureComponent {
  render () {
    const {Content, Footer, Sider} = Layout

    const logo = (
      <Logo
        margin='0px 0px 25px 0px'
        textAlign='center'
        fontSize='42px'
      />
    )

    return (
      <Layout style={{minHeight: '100%'}} >
        <BackTop />
        <Sider
          onCollapse={(collapsed, type) => {
            this.setState({
              collapsed: collapsed,
              type: type
            })
          }}
          breakpoint='sm'
          collapsedWidth='0'
        >
          {logo}
        </Sider>
        <Layout>
          <SiteHeader />
          <Content
            style={!this.state.collapsed && this.state.type === 'clickTrigger'
              ? {display: 'none'} : !this.state.collapsed
                ? {margin: '0 10px'} : {margin: '30px 10px'}}
          >
          Welcome
          </Content>
          <Footer
            style={!this.state.collapsed && this.state.type === 'clickTrigger'
              ? {display: 'none'} : {textAlign: 'center'}}
          >
            Mohsen Pouryazdan React Redux StarterKit
          </Footer>
        </Layout>
      </Layout>
    )
  }
}
