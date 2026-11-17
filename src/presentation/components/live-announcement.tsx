type LiveAnnouncementProps = {
  message: string
}

export function LiveAnnouncement({ message }: LiveAnnouncementProps) {
  return (
    <p role="status" aria-live="polite" className="sr-only">
      {message}
    </p>
  )
}
