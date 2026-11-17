type NavigationIndexProps = {
  index: string
}

export function NavigationIndex({ index }: NavigationIndexProps) {
  return (
    <span className="ml-auto text-[9px] text-muted-foreground" aria-hidden="true">
      {index}
    </span>
  )
}
