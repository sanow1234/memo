import { useState } from 'react'
import { CodeEditor } from '../components/editor/CodeEditor'
import { EditorToolbar } from '../components/editor/EditorToolbar'
import { OutputPanel } from '../components/execution/OutputPanel'
import { StdinPanel } from '../components/execution/StdinPanel'
import { GradingPanel } from '../components/grading/GradingPanel'
import { AppHeader } from '../components/layout/AppHeader'
import { ProblemPanel } from '../components/problem/ProblemPanel'

const initialCode = '# 여기에 Python 코드를 작성하세요.\n'

export function PracticePage() {
  const [code, setCode] = useState(initialCode)

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <AppHeader />

      <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-[1600px] flex-col gap-4 p-4 xl:p-6">
        <ProblemPanel />

        <section
          aria-labelledby="workspace-heading"
          className="grid min-h-[620px] flex-1 grid-cols-[minmax(0,1.75fr)_minmax(320px,0.75fr)] overflow-hidden rounded-lg border border-slate-300 bg-white shadow-sm"
        >
          <div className="flex min-w-0 flex-col border-r border-slate-300">
            <div className="flex h-12 items-center justify-between border-b border-slate-700 bg-slate-900 px-4 text-slate-100">
              <div>
                <h2 id="workspace-heading" className="text-base font-semibold">
                  Python 코드
                </h2>
              </div>
              <span className="font-mono text-sm text-slate-400">main.py</span>
            </div>

            <div className="min-h-[440px] flex-1 bg-[#1e1e1e]">
              <CodeEditor value={code} onChange={setCode} />
            </div>

            <EditorToolbar />
          </div>

          <aside aria-label="실행 및 채점 패널" className="grid min-w-0 grid-rows-[auto_minmax(220px,1fr)_auto] bg-slate-50">
            <StdinPanel />
            <OutputPanel />
            <GradingPanel />
          </aside>
        </section>
      </main>
    </div>
  )
}
