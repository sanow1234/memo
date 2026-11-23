export const CONCEPT_IDS = [
  'variables-types',
  'input-output',
  'arithmetic',
  'comparison-logic',
  'conditionals',
  'loops',
  'nested-loops',
  'strings',
  'lists',
  'tuples',
  'dictionaries',
  'functions',
] as const

export const DIFFICULTIES = ['easy', 'medium', 'hard'] as const

export type ConceptId = (typeof CONCEPT_IDS)[number]
export type Difficulty = (typeof DIFFICULTIES)[number]

export interface ConceptDefinition {
  id: ConceptId
  label: string
  order: number
}

export interface ExampleCase {
  input: string
  output: string
}

export interface GradingTestCase {
  id: string
  input: string
  expectedOutput: string
}

export interface Problem {
  id: string
  title: string
  difficulty: Difficulty
  concepts: ConceptId[]
  description: string
  inputDescription: string
  outputDescription: string
  examples: ExampleCase[]
  starterCode: string
  timeLimitMs: number
  testCases: GradingTestCase[]
}
