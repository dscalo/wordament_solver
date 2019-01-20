import React, { useReducer } from 'react'
import styled from 'styled-components'

import WordBox from './WordBox'
import WordList from './WordList'

export const WordAppDispatch = React.createContext(null)

const initState = {letters: Array(16).fill(''), highlights: [] }
const reducer = (state, action) => {
  switch(action.type) {
    case 'letters':
      return { ...state, letters: action.letters }
    case 'clear':
      return initState
    case 'highlights':
      return { ...state, highlights: action.highlights }
    default:
      return state
  }
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`
const WordBoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const H1 = styled.h1`
  margin-left: 10px;
`
const TEMP = styled.div`
  margin: 100px 0 0 300px;
`

const WordApp = () => {
  const [state, dispatch] = useReducer(reducer, initState)
  return (
    <WordAppDispatch.Provider value={{state, dispatch}}>
      <H1>Wordament Solver</H1>
      <Container>
        <WordBoxContainer>
          <WordBox />
          <WordList letters={state.letters} />
        </WordBoxContainer>
      </Container>
    </WordAppDispatch.Provider>
  )
}

export default WordApp