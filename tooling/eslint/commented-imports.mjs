export function hasCommentedImportLayout(entries, ordered, source, separateGroups) {
  if (entries.some((entry, index) => entry.index !== ordered[index].index)) return false

  return entries.slice(1).every((entry, index) => {
    const previous = entries[index]
    const start = previous.node.range[1]
    const end = entry.node.range[0]
    let gap = source.text.slice(start, end)
    const comments = source.getAllComments().filter((comment) => comment.range[0] >= start && comment.range[1] <= end)

    for (const comment of comments.reverse()) {
      const offset = comment.range[0] - start
      let after = comment.range[1] - start

      if (comment.loc.start.line !== previous.node.loc.end.line) {
        after += gap.slice(after).match(/^[\t ]*\r?\n/)?.[0].length ?? 0
      }

      gap = gap.slice(0, offset) + gap.slice(after)
    }

    const hasBlank = /\n[\t ]*\r?\n/.test(gap)
    const needsBlank = separateGroups && entry.group !== previous.group

    return hasBlank === needsBlank
  })
}
