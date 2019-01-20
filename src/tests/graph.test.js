import { adjacencyList, getWordList } from '../graph'
import {createNode, insert, search } from '../trie'
import wordDict from '../SOWPODS.json'


describe('adjacencyList tests', () => {
  test('3 x 3 matrix', () => {
    const arr = [1,2,3,4,5,6,7,8,9]
    const mod = 3

    /**
     * [0, 1, 2]
     * [3, 4, 5]
     * [6, 7, 8]
     *
     */

    const res = adjacencyList(arr, mod)

    expect(Object.keys(res)).toHaveLength(9)

    expect(res[4]).toHaveLength(8)
  })

  test('4 x 4 matrix', () => {
    const arr = Array(16).fill(0)
    const mod = 4

    /**
     *
     * [ 0,  1,  2, 3 ]
     * [ 4,  5,  6, 7 ]
     * [ 8,  9, 10, 11]
     * [12, 13, 14, 15]
     */

    const res = adjacencyList(arr, mod)
    expect(Object.keys(res)).toHaveLength(16)

    expect(res[9]).toHaveLength(8)
    expect(res[2]).toHaveLength(5)
    expect(res[15]).toHaveLength(3)
  })
})

describe('getWordList', () => {
  let trie = null
  let searchTrie = null
  beforeAll(() => {
    trie = createNode()
    const insertTrie = insert(trie)
    searchTrie = search(trie)
    wordDict.forEach(w => insertTrie(w))
  })

  test('returns word list for 3x3 matrix', () => {
    /*
      C A T
      Z Z G
      Z Z Z
    */             // 0   1   2   3   4   5   6   7   8
    const letters = ['C','A','T','Z','Z','G','Z','Z','Z']
    const adjList = adjacencyList(letters, 3)
    const res = getWordList(letters, adjList, searchTrie)

    expect(res).toHaveLength(9)
    expect(res[0]).toHaveLength(1)
  })
})