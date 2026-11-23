export function OutputPanel() {
  return (
    <section aria-labelledby="output-heading" className="flex min-h-0 flex-col border-b border-slate-300 p-4">
      <div className="mb-2 flex items-center justify-between">
        <h2 id="output-heading" className="text-sm font-semibold text-slate-800">
          실행 결과
        </h2>
        <span className="text-sm text-slate-400">stdout / stderr</span>
      </div>
      <div className="min-h-40 flex-1 overflow-auto rounded-md bg-slate-950 p-3 font-mono text-sm leading-6 text-slate-400">
        실행 결과가 여기에 표시됩니다.
      </div>
    </section>
  )
}
