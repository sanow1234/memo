export function AppHeader() {
  return (
    <header className="h-16 border-b border-slate-300 bg-white">
      <div className="mx-auto flex h-full max-w-[1600px] items-center justify-between px-4 xl:px-6">
        <div className="flex items-center gap-3">
          <div aria-hidden="true" className="flex size-9 items-center justify-center rounded-md bg-blue-700 font-mono text-sm font-bold text-white">
            Py
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-slate-950">Python 연습</h1>
            <p className="text-sm text-slate-500">브라우저 코드 학습 도구</p>
          </div>
        </div>

        <span className="rounded-md border border-slate-300 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-600">
          로컬 학습 모드
        </span>
      </div>
    </header>
  )
}
