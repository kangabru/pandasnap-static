export default function Embed({
  text,
  href,
  date,
  author,
}: {
  text: string
  href: string
  date: string
  author?: string
}) {
  const _author = author ?? "Scotty (@kanga_bru)"
  const sentences = Array.isArray(text) ? text : [text]
  return (
    <blockquote className="twitter-tweet" data-dnt="true" data-theme="dark">
      {sentences.map((s) => (
        <p key={s} lang="en" dir="ltr">
          {s}
        </p>
      ))}
      &mdash; {_author} <a href={href}>{date}</a>
    </blockquote>
  )
}
