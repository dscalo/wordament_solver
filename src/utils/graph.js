const getLeftRight = (arr, mod, pos) => {
  let t = []
  // left + right
  if (pos % mod === 0) {
    t.push(pos + 1)
  } else {
    if ((pos + 1) % mod !== 0 && pos + 1 < arr.length) {
      t.push(pos + 1)
    }
    if (pos - 1 >= 0) {
      t.push(pos - 1)
    }
  }
  return t
}

export const adjacencyList = (arr, mod) => {
  const list = {}

  for (let i = 0; i < arr.length; i++) {
    // left + right
     let t = getLeftRight(arr, mod, i)

    // up, up left, up right
    if (i - mod >= 0) {
      t.push(i - mod)
      t = t.concat(getLeftRight(arr, mod, i - mod))
    }

    // down, down left, down right
    if (i + mod < arr.length) {
      t.push(i + mod)
      t = t.concat(getLeftRight(arr, mod, i + mod))
    }

    list[i] = t
  }
  return list
}

export const makeWord = (letters, indexes) => {
  let words = []

  for (let i = 0; i < indexes.length; i++) {
    let letter = letters[indexes[i]]
    // handle a/b type entries
    if (/\//.test(letter)) {
      const spl = letter.split('/')
      if (typeof words[0] === 'undefined') {
       words = spl
      } else if (typeof words[1] === 'undefined') {
        words[1] = words[0] + spl[1]
        words[0] += spl[0]
      } else {
        words[0] += spl[0]
        words[1] += spl[1]
      }
    } else {
      /**
       * if -suffix then this must be the last letter(s)
       * if prefix- then this must be the first letter(s)
       */
      if (/-/.test(letter)) {
        if (letter[0] === '-' && i !== indexes.length -1) return []
        if (letter[letter.length - 1] === '-' && i !== 0) return []
        letter = letter.replace('-', '')
      }

      if (typeof words[0] === 'undefined') {
        words.push(letter)
      } else {
        if (typeof words[1] !== 'undefined') {
          words[0] += letter
          words[1] += letter
        } else {
          words[0] += letter
        }
      }
    }
  }
  return words
}

export const getWordList = (letters, aList, search) => {
  if (letters.some(s => s === '')) return []

  let wordList = []
  for (let k = 0; k < letters.length; k++) {
    wordList[k] = []
  }

  for (let i = 0; i < letters.length; i++) {
    let start = i
    let queue = [[start]]
    const set = new Set()

    // bfs
    while (queue.length > 0) {
      const cur = queue.shift()
      const adj = aList[cur[cur.length - 1]]

      for (let j = 0; j < adj.length; j++) {
        if (!cur.includes(adj[j])) {
          // new letter
          const newPath = cur.concat(adj[j])
          const words = makeWord(letters, newPath)
          words.forEach(word => {
            const res = search(word)
            if (res === 1 && word.length >= 3) {
              // its a word!
              if (!set.has(word)) {
                set.add(word)
                wordList[start].push({word, path: newPath})
              }
            }
            if (res >= 0) {
              // still has a possibility of producing more words
              queue.push(newPath)
            }
          })
        }
      }
    }
  }

  return wordList
}