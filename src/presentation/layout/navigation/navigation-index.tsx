type NavigationIndexProps = {
  index: string
}

export function NavigationIndex({ index }: NavigationIndexProps) {
  return (
    <span className="ml-auto text-[9px] opacity-40" aria-hidden="true">
      {index}
    </span>
  )
}
