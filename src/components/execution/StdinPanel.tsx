export function StdinPanel() {
  return (
    <section aria-labelledby="stdin-heading" className="border-b border-slate-300 p-4">
      <div className="mb-2 flex items-center justify-between">
        <h2 id="stdin-heading" className="text-sm font-semibold text-slate-800">
          실행용 입력값
        </h2>
        <span className="text-sm text-slate-400">stdin</span>
      </div>
      <textarea
        aria-label="실행용 입력값"
        className="h-20 w-full resize-none rounded-md border border-slate-300 bg-slate-100 p-2.5 font-mono text-sm text-slate-500 outline-none"
        disabled
        placeholder="Python 실행 기능이 연결되면 입력값을 사용할 수 있습니다."
      />
    </section>
  )
}
