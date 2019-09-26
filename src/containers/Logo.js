import React from 'react'
import PropTypes from 'prop-types'
import assign from 'lodash/assign'
import map from 'lodash/map'
import split from 'lodash/split'

import {H1, H2, H3, H4, H5, H6} from '../components'

export function Logo (props) {
  const Heading = props.heading

  return (
    <Heading
      margin={props.margin}
      padding={props.padding}
      color={props.color}
      textAlign={props.textAlign}
      fontSize={props.fontSize}
      fontWeight='normal'
    >
      {map(split(props.title, ''), (char, index) => {
        let color = '#9A9A9A'

        if (index === Math.round((props.title.length - 1) / 2)) {
          color = '#188EFB'
        }

        return (
          <span
            key={index}
            style={assign({}, !props.color && {color})}
          >
            {char}
          </span>
        )
      })}
    </Heading>
  )
}

Logo.propTypes = {
  title: PropTypes.string,
  heading: PropTypes.oneOf([ H1, H2, H3, H4, H5, H6 ]),
  margin: PropTypes.string,
  padding: PropTypes.string,
  color: PropTypes.string,
  textAlign: PropTypes.oneOf([
    'left',
    'right',
    'center',
    'justify',
    'initial',
    'inherit'
  ]),
  fontSize: PropTypes.string
}

Logo.defaultProps = {
  title: 'Login',
  heading: H1
}
