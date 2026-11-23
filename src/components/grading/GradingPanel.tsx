export function GradingPanel() {
  return (
    <section aria-labelledby="grading-heading" className="p-4">
      <div className="flex items-center justify-between">
        <h2 id="grading-heading" className="text-sm font-semibold text-slate-800">
          채점 결과
        </h2>
        <span className="rounded-full bg-slate-200 px-2.5 py-1 text-sm font-medium text-slate-600">채점 전</span>
      </div>
      <p className="mt-2 text-sm leading-6 text-slate-500">테스트 케이스별 통과 여부가 이곳에 표시됩니다.</p>
    </section>
  )
}
