type PageDescriptionProps = {
  description: string
}

export function PageDescription({ description }: PageDescriptionProps) {
  return <p className="mt-2 text-xs leading-6 text-muted-foreground">{description}</p>
}
