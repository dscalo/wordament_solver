import { createNode, insert, search } from '../trie'
import wordDict from '../SOWPODS.json'

describe('Trie', () => {
  test('createNode returns a node', () => {
    const node = createNode()
    expect(node.endOfWord).toBeFalsy()
    expect(node.children.length).toEqual(26)
  })

  test('adding words', () => {
    const trie = createNode()
    const insertTrie = insert(trie)
    insertTrie('cat')
    expect(trie.children[2]).toBeDefined()
    expect(trie.children[2].endOfWord).toBeFalsy()
    expect(trie.children[2].children[0]).toBeDefined()
    expect(trie.children[2].children[0].children[19]).toBeDefined()
    expect(trie.children[2].children[0].children[19].endOfWord).toBeTruthy()
  })

  test('searching for words', () => {
    const trie = createNode()
    const insertTrie = insert(trie)
    const searchTrie = search(trie)

    insertTrie('cat')
    insertTrie('rat')
    insertTrie('bookshelf')
    insertTrie('algorithm')
    expect(searchTrie('cat')).toEqual(1)
    expect(searchTrie('rat')).toBeTruthy()
    expect(searchTrie('bookshelf')).toBeTruthy()
    expect(searchTrie('algorithm')).toBeTruthy()

    expect(searchTrie('algorithms')).toBeLessThanOrEqual(0)
    expect(searchTrie('algorims')).toBeLessThanOrEqual(0)
    expect(searchTrie('ca')).toBeLessThanOrEqual(0)
    expect(searchTrie('carat')).toBeLessThanOrEqual(0)
  })

  test('partial words', () => {
    const trie = createNode()
    const insertTrie = insert(trie)
    const searchTrie = search(trie)

    insertTrie('bird')
    insertTrie('bath')

    // complete word
    expect(searchTrie('bird')).toEqual(1)

    // partial word
    expect(searchTrie('bir')).toEqual(0)

    // not a word
    expect(searchTrie('bx')).toEqual(-1)
    expect(searchTrie('birds')).toEqual(-1)
  })

  test('load words', () => {
    const trie = createNode()
    const insertTrie = insert(trie)
    const searchTrie = search(trie)
    wordDict.forEach(w => insertTrie(w))

    expect(searchTrie('word')).toBeTruthy()
  })
})