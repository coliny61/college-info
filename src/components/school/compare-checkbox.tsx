'use client'

import { useCompare } from './compare-context'

interface CompareCheckboxProps {
  slug: string
}

export function CompareCheckbox({ slug }: CompareCheckboxProps) {
  const { toggle, isSelected, isFull } = useCompare()
  const checked = isSelected(slug)

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggle(slug)
      }}
      disabled={!checked && isFull}
      className={`flex h-8 items-center gap-1.5 rounded-md px-2 text-xs font-medium transition-colors ${
        checked
          ? 'text-emerald'
          : 'text-muted-foreground/50 hover:text-muted-foreground'
      } ${!checked && isFull ? 'opacity-30 cursor-not-allowed' : ''}`}
      title={checked ? 'Remove from comparison' : isFull ? 'Max 3 schools' : 'Add to comparison'}
    >
      <div
        className={`flex h-4 w-4 items-center justify-center rounded border transition-colors ${
          checked
            ? 'border-emerald bg-emerald text-white'
            : 'border-muted-foreground/30'
        }`}
      >
        {checked && (
          <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none">
            <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
    </button>
  )
}
