import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import PropTypes from 'prop-types'

import {Form, Input, Modal, Select} from 'antd'
import toLower from 'lodash/toLower'

import {login} from '../actions/admin'
import {
  authErrorSelector,
  authLoadingSelector
} from '../selectors/admin'
import {LayoutContent, Box, Button, Card} from '../components'
import {Logo} from '../containers'

export class Login extends PureComponent {
  constructor (props) {
    super(props)

    this._togglePasswordVisibility = this._togglePasswordVisibility.bind(this)
    this._onSubmit = this._onSubmit.bind(this)
    this._setServer = this._setServer.bind(this)

    this.state = {
      showPassword: false,
      submitting: false,
      server: ''
    }
  }

  componentWillReceiveProps (props) {
    if (props.authError && this.state.submitting) {
      Modal.error({
        title: `An error occurred`,
        content: `
          An error occurred while trying to log in.
          Please verify your username and password.
        `
      })
      this.setState({submitting: false})

      this.props.form.setFields({
        username: {
          value: this.props.form.getFieldValue('username'),
          errors: [new Error(`Please verify your username`)]
        },
        password: {
          value: this.props.form.getFieldValue('password'),
          errors: [new Error(`Please verify your password`)]
        }
      })
    }
    if (this.props.authError) {
    }
  }

  _togglePasswordVisibility () {
    this.setState({showPassword: !this.state.showPassword})
  }

  _onSubmit (event) {
    event.preventDefault()

    this.props.form.validateFields((error, values) => {
      if (!error && this.state.server) {
        this.setState({submitting: true})
        this.props.login(
          values.username,
          values.password,
          this.state.server
        )
      }
    })
  }

  _setServer (value, option) {
    switch (value) {
      case 'FT':
        this.setState({server: ''})
        break
      case 'Dev':
        this.setState({server: ''})
        break
      case 'REF':
        this.setState({server: ''})
        break
      case 'Production':
        this.setState({server: ''})
        break
    }
  }

  render () {
    const logo = (
      <Logo
        margin='0px 0px 25px 0px'
        textAlign='center'
        fontSize='42px'
      />
    )

    const emailAddressInput = (
      <Input
        data-id='emailAddressInput'
        type='text'
        disabled={this.props.authLoading}
        placeholder={`Your username`}
      />
    )

    const passwordInput = (
      <Input
        data-id='passwordInput'
        type={this.state.showPassword ? 'text' : 'password'}
        disabled={this.props.authLoading}
        suffix={(
          <Button
            data-id='passwordVisibilityToggler'
            type='plain'
            size='small'
            onClick={this._togglePasswordVisibility}
          >
            {toLower(this.state.showPassword ? `Hide` : `Show`)}
          </Button>
        )}
        placeholder={`Your password`}
      />
    )

    return (
      <LayoutContent centered={true} >
        <Box maxWidth='400px' >
          <Box>
            <Card shadowed={true} >
              {logo}
              <Form onSubmit={this._onSubmit} >
                <Form.Item>
                  {this.props.form.getFieldDecorator('username', {
                    validateTrigger: 'onSubmit',
                    rules: [
                      {
                        required: true,
                        message: `Please enter your username`
                      }
                    ]
                  })(emailAddressInput)}
                </Form.Item>
                <Form.Item>
                  {this.props.form.getFieldDecorator('password', {
                    validateTrigger: 'onSubmit',
                    rules: [
                      {
                        required: true,
                        message: `Please enter your password`
                      },
                      {
                        max: 20,
                        message: `Your password is no more than 20 characters`
                      }
                    ]
                  })(passwordInput)}
                </Form.Item>
                <Form.Item>
                  <Box>
                    <Select defaultValue='FT' onSelect={this._setServer} >
                      <Select.Option value='Dev' >Dev</Select.Option>
                      <Select.Option value='FT' >FT</Select.Option>
                      <Select.Option value='REF' >REF</Select.Option>
                      <Select.Option value='Production' >
                        Production
                      </Select.Option>
                    </Select>
                  </Box>
                </Form.Item>
                <Form.Item>
                  <Button
                    data-id='formSubmitter'
                    type='primary'
                    htmlType='submit'
                    filled={true}
                    loading={this.props.authLoading}
                  >
                    {'Log in'}
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Box>
        </Box>
      </LayoutContent>
    )
  }
}

Login.propTypes = {
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func,
    getFieldValue: PropTypes.func,
    setFields: PropTypes.func,
    validateFields: PropTypes.func
  }),
  authError: PropTypes.shape({
    status: PropTypes.number
  }),

  authLoading: PropTypes.bool,
  login: PropTypes.func
}

export const mapStateToProps = createStructuredSelector({
  authError: authErrorSelector(),
  authLoading: authLoadingSelector()
})

export const mapDispatchToProps = (dispatch) => {
  return {
    login: (...args) => {
      return dispatch(login(...args))
    }
  }
}

export const LoginWithForm = Form.create()(Login)
export default connect(mapStateToProps, mapDispatchToProps)(LoginWithForm)
