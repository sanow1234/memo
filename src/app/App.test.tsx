import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import App from './App'

vi.mock('@uiw/react-codemirror', () => ({
  default: ({ value }: { value: string }) => (
    <textarea aria-label="Python 코드 편집기" readOnly value={value} />
  ),
}))

describe('basic practice screen', () => {
  it('문제와 코드 작업 영역을 함께 표시한다', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: 'Python 연습' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '문제를 선택해 주세요' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Python 코드' })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'Python 코드 편집기' })).toHaveValue(
      '# 여기에 Python 코드를 작성하세요.\n',
    )
    expect(screen.getByRole('heading', { name: '실행 결과' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '채점 결과' })).toBeInTheDocument()
  })

  it('아직 구현하지 않은 실행 동작을 비활성화한다', () => {
    render(<App />)

    expect(screen.getByRole('button', { name: '실행' })).toBeDisabled()
    expect(screen.getByRole('button', { name: '채점' })).toBeDisabled()
    expect(screen.getByRole('button', { name: '초기화' })).toBeDisabled()
    expect(screen.getByRole('button', { name: '한 줄씩 실행' })).toBeDisabled()
    expect(screen.getByRole('textbox', { name: '실행용 입력값' })).toBeDisabled()
  })
})
