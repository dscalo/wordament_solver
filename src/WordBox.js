import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import Tile from './components/Tile'
import { WordAppDispatch } from './WordApp'
import { isValid } from './utils/validation'
import { directionOf } from './utils/functions'
const getDirection = directionOf(4)

const Container = styled.div`
  flex: 1;
  margin: 10px;
  max-width: 600px;
  min-width: 400px;
  display: flex;
  flex-direction: column;
`

const Box = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`

const Button = styled.button`
  font-size: 20px;
  padding: 10px;
  width: 100%;
  margin: 10px;
  border-radius: 25px;
  background-color: #FFF;
  box-shadow: 2px 2px 1px 1px black;
`

const onlyLetters = str => str.replace(/[^a-zA-Z\-/]/g, '')
const maxOf4 = str => str.length > 4 ? str.substr(0,4) : str

export default () => {
  const [letters, setLetters] = useState(['A/T','B','C','D','E','F','G','A','E','S','-ING','N','E','T', 'E', 'D-'])
  //const [words, setWords] = useState(Array(16).fill(''))
  const {state, dispatch} = useContext(WordAppDispatch)

  const handleChange = event => {
    const index = parseInt(event.target.id)
    const newWords = letters.map((w,i) => i === index ? maxOf4(onlyLetters(event.target.value.toUpperCase())) : w)
    setLetters(newWords)
  }

  const solve = () => {
    if (letters.every(isValid)) {
      dispatch({ type: 'letters', letters: letters })
    } else {
      alert('invalid entries!')
    }
  }

  const clear = () => {
    setLetters(Array(16).fill(''))
    dispatch({ type: 'clear' })
  }

  const { highlights } = state
  return (
    <Container>
      <Box>
        {letters.map((l,i) =>
          <Tile key={i}
            id={i}
            value={letters[i]}
            highlight={highlights.includes(i)}
            arrow={highlights.includes(i) ? getDirection(i, highlights[highlights.indexOf(i) + 1]) : -1}
            handleChange={handleChange}
          />)
        }
      </Box>
      <Buttons>
        <Button onClick={solve}>Solve</Button>
        <Button onClick={clear}>Clear</Button>
      </Buttons>
    </Container>
  )
}