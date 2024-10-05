const LinearGradientText = ({
  tag = "h1",
  from = "#fff",
  to = "#000",
  text = "not transmitted",
  className,
}) => {
  const Tag = tag
  return (
    <Tag
      className={`inline-block ${className}`}
      style={{
        background: `linear-gradient(to right, ${from}, ${to})`,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
      }}
    >
      {text}
    </Tag>
  )
}

export default LinearGradientText
