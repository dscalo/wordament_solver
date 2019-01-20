const formatWord = word => word.replace(/[^a-zA-z]/g, '').toUpperCase()

export const createNode = () => {
  return {
    endOfWord: false,
    children: Array(26).fill(null)
  }
}

export const insert = trie => word => {
  const fword = formatWord(word)

  let curNode = trie
  for (let i = 0; i < fword.length; i++) {
    const index = fword.charCodeAt(i) - 65

    if (curNode.children[index] === null) {
      curNode.children[index] = createNode()
    }
    curNode = curNode.children[index]
  }
  curNode.endOfWord = true
}

/**
 * returns:
 *   1 if its a word
 *   0 if its a partial word
 *  -1 if its not a word
 */
export const search = trie => word => {
  const fword = formatWord(word)
  let curNode = trie

  for (let i = 0; i < fword.length; i++) {
    const index = fword.charCodeAt(i) - 65

    if (curNode.children[index] === null) return -1

    curNode = curNode.children[index]
  }
  if (curNode.endOfWord) return 1

  return curNode.children.some(c => c !== null) ? 0 : -1
}