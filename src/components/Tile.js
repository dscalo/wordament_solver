import React from 'react'
import styled from 'styled-components'
import Arrow from './Arrow'

const OuterContainer = styled.div`
  margin: 4px;
  flex: 1 0 calc(25% - 10px - 1px);
  box-shadow: 2px 2px 1px 1px black;
  border-radius: 10%;
  background-color: ${props => props.highlight ? `lightgreen`: `#FFF`};
`

const ArrowContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  font-size: 0.7rem;
  background-color: inherit;
  text-align: center;
  border: none;
  padding: 5px;
`

export default ({ id, value, handleChange, highlight = false, arrow = -1 }) => (
  <OuterContainer highlight={highlight} >
   <ArrowContainer>
     <Row>
       <Arrow rotate={315} display={arrow === 315} />
       <Arrow rotate={0} display={arrow === 0} />
       <Arrow rotate={45} display={arrow === 45} />
     </Row>
     <Row>
      <Arrow rotate={270} align="center" display={arrow === 270} />
      <Input id={id} value={value} onChange={handleChange} />
      <Arrow rotate={90} align="center" display={arrow === 90} />
     </Row>
     <Row>
       <Arrow rotate={225} display={arrow === 225} />
       <Arrow rotate={180} display={arrow === 180} />
       <Arrow rotate={135} display={arrow === 135} />
     </Row>
   </ArrowContainer>
  </OuterContainer>
)