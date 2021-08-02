import React, { useMemo, useContext, useState, useEffect } from 'react'
import { WordAppDispatch } from '../App'

import Minimap from './Minimap'
import Checkbox from './Checkbox'
import styled from 'styled-components'
import { adjacencyList, getWordList } from '../utils/graph'
import { createNode, insert, search } from '../utils/trie'
import words from '../SOWPODS.json'

const Container = styled.div`
  margin: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
`
const Words = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 5px;
`

const Heading = styled.span`
  display:flex;
  justify-content: center;
  padding: 2px 0;
`

const LinkButton = styled.button`
  color: black;
	background: none;
	margin: 1px;
	padding: 0;
	border: none;
	cursor: pointer;
`

const ButtonRow = styled.div`
  display: inline-block;
  margin-left: 10px;
`
const SmallButton = styled.button`
  border-radius: 3px;
`
const CheckboxText = styled.span`
  font-size: .8rem;
`

const WordListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  text-align: left;
`

const CheckboxRow = styled.div`
  display: inline-block;
  margin-bottom: 5px;
`

const displayList = (arr, index, letters, toggleSelected, sizes) => (
  <Words key={index}>
    <Heading><Minimap index={index} /></Heading>
      {arr.map((a,i) =>
         sizes[a.word.length-3] === 1 &&
         <LinkButton onClick={toggleSelected} id={`${index}-${i}`} key={Math.random()}>&nbsp;{a.word}&nbsp;</LinkButton>)
      }
  </Words>
)

export default ({ letters }) => {
  const { dispatch } = useContext(WordAppDispatch)
  const [selected, setSelected] = useState('')
  const [sizes, setSizes] = useState(Array(10).fill(1))
  const [trie, setTrie] = useState(createNode())

  useEffect(() => {
    words.forEach(insert(trie))
    setTrie(trie)
  }, [] )

  const wordList = useMemo(() => {
    return getWordList(letters, adjacencyList(letters, 4), search(trie))
  }, letters)

  const toggleSelected = event => {
    const id = event.target.id

    if (id === selected) {
      setSelected(null)
      dispatch({type: 'highlights', highlights: []})
    } else {
      const [idx, idxW] = id.split('-')
      const highlights = wordList[parseInt(idx,10)][parseInt(idxW)].path
      setSelected(id)
      dispatch({type: 'highlights',highlights})
    }
  }

  const selectSizes = event => {
    const idx = parseInt(event.target.getAttribute('name'),10)
    const newSizes = sizes.slice()
    newSizes[idx] = newSizes[idx] === 1 ? 0 : 1;
    setSizes(newSizes)
  }

  const clearCheckboxes = () => setSizes(Array(10).fill(0))
  const checkAllBoxes = () => setSizes(Array(10).fill(1))

  return (
    <Container>
      <CheckboxRow>
        <h3>Show words of size:</h3>
        {sizes.map((s,i) =>
          <label key={`size-${i}`}>
            <Checkbox name={i} checked={s} handleChange={selectSizes} />
            <CheckboxText>{i+3}</CheckboxText>
          </label>
          )}
          <ButtonRow>
            <SmallButton onClick={clearCheckboxes}>C</SmallButton>
            <SmallButton onClick={checkAllBoxes}>A</SmallButton>
          </ButtonRow>
      </CheckboxRow>
      <WordListContainer>
      {wordList && wordList.map((w,i) => displayList(w, i, letters, toggleSelected, sizes))}
      </WordListContainer>

    </Container>
  )
}