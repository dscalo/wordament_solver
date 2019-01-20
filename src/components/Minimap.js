import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 25px;
  height: 25px;
  border: 1px solid black;
  display: flex;
  flex-wrap: wrap;
`

const Tile = styled.div`
  flex: 1 0  21%;
  border: 0.02px black solid;
  background-color: ${props => props.display ? 'red' : '#FFF'};
`

const arr = Array(16).fill(0)

export default ({ index }) => (
  <Container>
   {arr.map((a,i) =>
    <Tile key={`mm-${i}`} display={index === i} />
   )}
  </Container>
)