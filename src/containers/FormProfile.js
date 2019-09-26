import React from 'react'
import PropTypes from 'prop-types'

import {Row, Col, Popconfirm} from 'antd'
import {Card, Button} from '../components'
import map from 'lodash/map'

export const defaultEmptyValue = (<i>{`Not specified`}</i>)

export function formatDefault (value, emptyValue = defaultEmptyValue) {
  return value || emptyValue
}

export const defaultSchema = [
  {
    title: `Name`,
    key: 'name',
    render: formatDefault
  },
  {
    title: `Date`,
    key: 'date',
    render: formatDefault
  },
  {
    title: `ID`,
    key: 'id',
    render: formatDefault
  }
]

export function FormProfile (props) {
  return (
    <Card
      style={props.style}
      transparent={props.transparent}
      bordered={props.bordered}
      selectable={props.selectable}
      title={props.title}
      loading={props.loading || !props.data}
      onClick={props.onClick}
    >
      {props.data && map(props.schema, (entry, index) => {
        if (props.data.hasOwnProperty(entry.key)) {
          return (
            <Row key={`${entry.key}-${index}`}>
              <Col xs={24}><strong>{entry.title}</strong></Col>
              <Col xs={24}>{entry.render(props.data[ entry.key ])}</Col>
            </Row>
          )
        }
      })}

      {props.editText
        ? (
          <Button
            margin={'5px'}
            type='primary' size='small'
            onClick={props.editLink}
          >
            {props.editText}
          </Button>) : null}

      {props.deleteText ? (<Popconfirm
        title='Are you sure you want to delete this form?'
        onConfirm={props.onConfirm}
        onCancel={props.onCancel}
        okText='Yes'
        cancelText='No'
      >
        <Button
          margin={'5px'}
          type='primary'
          size='small'
          onClick={props.deleteLink}
        >
          {props.deleteText}
        </Button>
      </Popconfirm>) : null}
    </Card>
  )
}

FormProfile.propTypes = {
  schema: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string,
    key: PropTypes.oneOf([
      'date',
      'name',
      'questions',
      'id'
    ]),
    render: PropTypes.func
  })).isRequired,
  style: PropTypes.oneOf([ 'light', 'dark' ]),
  transparent: PropTypes.bool,
  bordered: PropTypes.bool,
  selectable: PropTypes.bool,
  title: PropTypes.string,
  data: PropTypes.shape({
    name: PropTypes.string,
    date: PropTypes.string,
    id: PropTypes.string
  }),
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  editLink: PropTypes.func,
  editText: PropTypes.string,
  deleteLink: PropTypes.func,
  deleteText: PropTypes.string,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func
}

FormProfile.defaultProps = {
  schema: defaultSchema,
  style: 'light'
}
