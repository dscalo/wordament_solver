import React from 'react'
import styled from 'styled-components'

// https://medium.com/@colebemis/building-a-checkbox-component-with-react-and-styled-components-8d3aa1d826dd
const Checkbox = styled.input.attrs({type: 'checkbox'})`
  border: 0;
  clip: rect(0,0,0,0);
  clip-path: inset(50%);
  height: 1px;
  width: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
`
const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`

const StyledCheckbox = styled.div`
  display: inline-block;
  width: 18px;
  height: 18px;
  background: ${props => props.checked ? 'blue': 'white'};
  border-radius: 3px;
  transition: all 150ms;
  margin: 2px 1px 0 6px;
`

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`

export default ({ name, checked, handleChange }) => (
  <CheckboxContainer>
    <Checkbox style={{opacity: 0}} name={name} checked={checked} onChange={handleChange} />
    <StyledCheckbox checked={checked}>
      <Icon viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" />
      </Icon>
    </StyledCheckbox>
</CheckboxContainer>
)