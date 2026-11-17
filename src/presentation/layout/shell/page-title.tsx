type PageTitleProps = {
  title: string
}

export function PageTitle({ title }: PageTitleProps) {
  return <h1 className="text-[26px] font-semibold leading-snug tracking-tight sm:text-[30px]">{title}</h1>
}
