import { describe, expect, it } from 'vitest'
import conceptsJson from '../../data/concepts.json'
import problemsJson from '../../data/problems.json'
import {
  ProblemDataValidationError,
  parseConceptData,
  parseProblemData,
} from './problemData'

const validProblem = {
  id: '001',
  title: '두 수의 합',
  difficulty: 'easy',
  concepts: ['variables-types', 'input-output', 'arithmetic'],
  description: '두 정수의 합을 출력하세요.',
  inputDescription: '두 정수 A와 B가 주어집니다.',
  outputDescription: 'A와 B의 합을 출력합니다.',
  examples: [{ input: '3 5', output: '8' }],
  starterCode: '',
  timeLimitMs: 2_000,
  testCases: [{ id: '001-01', input: '3 5', expectedOutput: '8' }],
}

describe('problem data validation', () => {
  it('현재 개념 JSON을 읽고 순서대로 반환한다', () => {
    const concepts = parseConceptData(conceptsJson)

    expect(concepts).toHaveLength(12)
    expect(concepts[0]).toEqual({ id: 'variables-types', label: '변수와 자료형', order: 1 })
    expect(concepts[11]).toEqual({ id: 'functions', label: '함수', order: 12 })
  })

  it('아직 비어 있는 문제 JSON을 유효한 초기 데이터로 처리한다', () => {
    expect(parseProblemData(problemsJson)).toEqual([])
  })

  it('여러 개념과 테스트 케이스를 가진 문제를 검증한다', () => {
    expect(parseProblemData([validProblem])).toEqual([validProblem])
  })

  it('잘못된 개념 ID를 거부한다', () => {
    const invalidProblem = {
      ...validProblem,
      concepts: ['unknown-concept'],
    }

    expect(() => parseProblemData([invalidProblem])).toThrow(ProblemDataValidationError)
    expect(() => parseProblemData([invalidProblem])).toThrow('등록되지 않은 개념 ID')
  })

  it('중복된 문제 ID를 거부한다', () => {
    expect(() => parseProblemData([validProblem, validProblem])).toThrow('중복된 문제 ID')
  })

  it('중복된 개념 표시 순서를 거부한다', () => {
    const duplicatedOrder = conceptsJson.map((concept) => ({ ...concept }))
    duplicatedOrder[1].order = duplicatedOrder[0].order

    expect(() => parseConceptData(duplicatedOrder)).toThrow('중복된 표시 순서')
  })
})
