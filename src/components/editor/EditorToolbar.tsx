const futureActionClass =
  'h-9 cursor-not-allowed rounded-md border border-slate-300 bg-slate-100 px-4 text-sm font-semibold text-slate-400'

export function EditorToolbar() {
  return (
    <div aria-label="코드 실행 도구" className="flex min-h-14 items-center gap-2 border-t border-slate-700 bg-slate-900 px-4">
      <button className={futureActionClass} disabled title="5단계에서 사용할 수 있습니다." type="button">
        실행
      </button>
      <button className={futureActionClass} disabled title="6단계에서 사용할 수 있습니다." type="button">
        채점
      </button>
      <button className={futureActionClass} disabled title="5단계에서 사용할 수 있습니다." type="button">
        초기화
      </button>
      <div className="mx-1 h-6 w-px bg-slate-700" />
      <button className={futureActionClass} disabled title="8단계에서 사용할 수 있습니다." type="button">
        한 줄씩 실행
      </button>
    </div>
  )
}
