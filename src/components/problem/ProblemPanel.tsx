function DetailBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-1.5 text-sm font-semibold text-slate-700">{label}</h3>
      <div className="min-h-11 rounded-md bg-slate-50 px-3 py-2.5 text-sm leading-6 text-slate-500">{children}</div>
    </div>
  )
}

export function ProblemPanel() {
  return (
    <section aria-labelledby="problem-heading" className="rounded-lg border border-slate-300 bg-white shadow-sm">
      <div className="flex min-h-14 items-center justify-between border-b border-slate-200 px-5 py-3">
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm font-semibold text-slate-500">문제 ---</span>
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-sm font-medium text-slate-500">난이도 미선택</span>
          <span className="rounded-full bg-blue-50 px-2.5 py-1 text-sm font-medium text-blue-700">관련 개념 없음</span>
        </div>
        <span className="text-sm text-slate-500">문제를 선택하면 내용이 표시됩니다.</span>
      </div>

      <div className="grid grid-cols-[minmax(0,1.2fr)_minmax(360px,0.8fr)] gap-6 p-5">
        <div>
          <h2 id="problem-heading" className="text-xl font-bold text-slate-950">
            문제를 선택해 주세요
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
            다음 단계에서 개념과 난이도를 선택하면 연습 문제가 이 영역에 표시됩니다.
          </p>

          <div className="mt-5 grid grid-cols-2 gap-4">
            <DetailBlock label="입력 조건">입력 조건이 여기에 표시됩니다.</DetailBlock>
            <DetailBlock label="출력 조건">출력 조건이 여기에 표시됩니다.</DetailBlock>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <DetailBlock label="예시 입력">
            <pre className="font-mono text-sm text-slate-500">-</pre>
          </DetailBlock>
          <DetailBlock label="예시 출력">
            <pre className="font-mono text-sm text-slate-500">-</pre>
          </DetailBlock>
        </div>
      </div>
    </section>
  )
}
