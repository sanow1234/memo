import {
  CONCEPT_IDS,
  DIFFICULTIES,
  type ConceptDefinition,
  type ConceptId,
  type Difficulty,
  type ExampleCase,
  type GradingTestCase,
  type Problem,
} from './problemTypes'

type UnknownRecord = Record<string, unknown>

const conceptIds = new Set<string>(CONCEPT_IDS)
const difficulties = new Set<string>(DIFFICULTIES)

export class ProblemDataValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ProblemDataValidationError'
  }
}

function fail(path: string, message: string): never {
  throw new ProblemDataValidationError(`${path}: ${message}`)
}

function recordAt(value: unknown, path: string): UnknownRecord {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    fail(path, '객체여야 합니다.')
  }

  return value as UnknownRecord
}

function stringAt(value: unknown, path: string, allowEmpty = false): string {
  if (typeof value !== 'string' || (!allowEmpty && value.trim().length === 0)) {
    fail(path, allowEmpty ? '문자열이어야 합니다.' : '비어 있지 않은 문자열이어야 합니다.')
  }

  return value
}

function parseExample(value: unknown, path: string): ExampleCase {
  const record = recordAt(value, path)

  return {
    input: stringAt(record.input, `${path}.input`, true),
    output: stringAt(record.output, `${path}.output`, true),
  }
}

function parseTestCase(value: unknown, path: string): GradingTestCase {
  const record = recordAt(value, path)

  return {
    id: stringAt(record.id, `${path}.id`),
    input: stringAt(record.input, `${path}.input`, true),
    expectedOutput: stringAt(record.expectedOutput, `${path}.expectedOutput`, true),
  }
}

function parseProblem(value: unknown, index: number): Problem {
  const path = `problems[${index}]`
  const record = recordAt(value, path)
  const id = stringAt(record.id, `${path}.id`)

  if (!/^\d{3,}$/.test(id)) {
    fail(`${path}.id`, '세 자리 이상의 숫자 문자열이어야 합니다.')
  }

  if (typeof record.difficulty !== 'string' || !difficulties.has(record.difficulty)) {
    fail(`${path}.difficulty`, 'easy, medium, hard 중 하나여야 합니다.')
  }

  if (!Array.isArray(record.concepts) || record.concepts.length === 0) {
    fail(`${path}.concepts`, '개념 ID가 하나 이상 필요합니다.')
  }

  const concepts = record.concepts.map((concept, conceptIndex) => {
    if (typeof concept !== 'string' || !conceptIds.has(concept)) {
      fail(`${path}.concepts[${conceptIndex}]`, '등록되지 않은 개념 ID입니다.')
    }

    return concept as ConceptId
  })

  if (new Set(concepts).size !== concepts.length) {
    fail(`${path}.concepts`, '중복된 개념 ID가 있습니다.')
  }

  if (!Array.isArray(record.examples) || record.examples.length === 0) {
    fail(`${path}.examples`, '예시가 하나 이상 필요합니다.')
  }

  if (!Array.isArray(record.testCases) || record.testCases.length === 0) {
    fail(`${path}.testCases`, '채점 테스트가 하나 이상 필요합니다.')
  }

  const testCases = record.testCases.map((testCase, testCaseIndex) =>
    parseTestCase(testCase, `${path}.testCases[${testCaseIndex}]`),
  )

  if (new Set(testCases.map((testCase) => testCase.id)).size !== testCases.length) {
    fail(`${path}.testCases`, '중복된 테스트 ID가 있습니다.')
  }

  if (
    typeof record.timeLimitMs !== 'number' ||
    !Number.isInteger(record.timeLimitMs) ||
    record.timeLimitMs < 100 ||
    record.timeLimitMs > 10_000
  ) {
    fail(`${path}.timeLimitMs`, '100~10000 사이의 정수여야 합니다.')
  }

  return {
    id,
    title: stringAt(record.title, `${path}.title`),
    difficulty: record.difficulty as Difficulty,
    concepts,
    description: stringAt(record.description, `${path}.description`),
    inputDescription: stringAt(record.inputDescription, `${path}.inputDescription`),
    outputDescription: stringAt(record.outputDescription, `${path}.outputDescription`),
    examples: record.examples.map((example, exampleIndex) =>
      parseExample(example, `${path}.examples[${exampleIndex}]`),
    ),
    starterCode: stringAt(record.starterCode, `${path}.starterCode`, true),
    timeLimitMs: record.timeLimitMs,
    testCases,
  }
}

export function parseProblemData(value: unknown): Problem[] {
  if (!Array.isArray(value)) {
    fail('problems', '배열이어야 합니다.')
  }

  const problems = value.map(parseProblem)
  const problemIds = problems.map((problem) => problem.id)

  if (new Set(problemIds).size !== problemIds.length) {
    fail('problems', '중복된 문제 ID가 있습니다.')
  }

  return problems
}

export function parseConceptData(value: unknown): ConceptDefinition[] {
  if (!Array.isArray(value)) {
    fail('concepts', '배열이어야 합니다.')
  }

  const concepts = value.map((item, index) => {
    const path = `concepts[${index}]`
    const record = recordAt(item, path)
    const id = stringAt(record.id, `${path}.id`)

    if (!conceptIds.has(id)) {
      fail(`${path}.id`, '등록되지 않은 개념 ID입니다.')
    }

    if (typeof record.order !== 'number' || !Number.isInteger(record.order) || record.order < 1) {
      fail(`${path}.order`, '1 이상의 정수여야 합니다.')
    }

    return {
      id: id as ConceptId,
      label: stringAt(record.label, `${path}.label`),
      order: record.order,
    }
  })

  if (new Set(concepts.map((concept) => concept.id)).size !== concepts.length) {
    fail('concepts', '중복된 개념 ID가 있습니다.')
  }

  if (new Set(concepts.map((concept) => concept.order)).size !== concepts.length) {
    fail('concepts', '중복된 표시 순서가 있습니다.')
  }

  const missingConceptIds = CONCEPT_IDS.filter(
    (conceptId) => !concepts.some((concept) => concept.id === conceptId),
  )

  if (missingConceptIds.length > 0) {
    fail('concepts', `누락된 개념 ID: ${missingConceptIds.join(', ')}`)
  }

  return concepts.sort((left, right) => left.order - right.order)
}
