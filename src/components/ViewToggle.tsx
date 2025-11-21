import { Grid3X3, List } from 'lucide-react'

interface ViewToggleProps {
  viewMode: 'grid' | 'list'
  onViewModeChange: (mode: 'grid' | 'list') => void
}

export default function ViewToggle({ viewMode, onViewModeChange }: ViewToggleProps) {
  return (
    <div className="flex border border-input rounded-md bg-background w-fit">
      <button
        onClick={() => onViewModeChange('grid')}
        className={`flex items-center gap-2 px-3 py-2 text-sm transition-colors rounded-l-md ${
          viewMode === 'grid' 
            ? 'bg-primary text-primary-foreground' 
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        <Grid3X3 className="w-4 h-4" />
        Grid
      </button>
      <button
        onClick={() => onViewModeChange('list')}
        className={`flex items-center gap-2 px-3 py-2 text-sm transition-colors rounded-r-md ${
          viewMode === 'list' 
            ? 'bg-primary text-primary-foreground' 
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        <List className="w-4 h-4" />
        List
      </button>
    </div>
  )
}

