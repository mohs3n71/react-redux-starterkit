import React from 'react'
import PropTypes from 'prop-types'

import {Row, Col} from 'antd'
import {Card, Button} from '../components'
import map from 'lodash/map'

export const defaultEmptyValue = (<i>{`Not specified`}</i>)

export function formatDefault (value, emptyValue = defaultEmptyValue) {
  return value || emptyValue
}

export const defaultSchema = [
  {
    title: `Contact Email`,
    key: 'contactEmail',
    render: formatDefault
  },
  {
    title: `Contact Name`,
    key: 'contactName',
    render: formatDefault
  },
  {
    title: `Contact Number`,
    key: 'contactNumber',
    render: formatDefault
  },
  {
    title: `ID`,
    key: 'id',
    render: formatDefault
  }
]

export function Profile (props) {
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
            type='primary'
            size='small'
            onClick={props.editLink}
          >
            {props.editText}
          </Button>)
        : null
      }
      <Button
        margin={'5px'}
        type='primary'
        size='small'
        onClick={props.clickLink}
      >
        {props.clickText}
      </Button>
      {props.addText
        ? (
          <Button
            margin={'5px'}
            type='primary'
            size='small'
            onClick={props.addLink}
          >
            {props.addText}
          </Button>
        )
        : null
      }
    </Card>
  )
}

Profile.propTypes = {
  schema: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    key: PropTypes.oneOf([
      'contactEmail',
      'contactName',
      'contactNumber',
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
    contactEmail: PropTypes.string,
    contactName: PropTypes.string,
    contactNumber: PropTypes.string,
    id: PropTypes.number
  }),
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  editLink: PropTypes.func,
  editText: PropTypes.string,
  clickLink: PropTypes.func,
  clickText: PropTypes.string,
  addText: PropTypes.string,
  addLink: PropTypes.func
}

Profile.defaultProps = {
  schema: defaultSchema,
  style: 'light'
}
