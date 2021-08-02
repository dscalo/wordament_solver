import React from 'react'
import styled from 'styled-components'

const Arrow = styled.div`
  visibility: ${props => props.display ? '' : 'hidden'};
  text-align: center;
  font-size: .5rem;
  color: red;
  align-self: ${props => props.align};
  transform: rotate(${props => props.rotate}deg);
  display: ${props => props.display.toString()}
`

export default ({ rotate = 0, align = 'auto', display = false }) =>
  <Arrow rotate={rotate} align={align} display={display}>
    ▲
  </Arrow>