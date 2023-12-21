function ContentBlock({ className, children }) {
  return <section className={`${className || ""}`}>{children}</section>;
}

export default ContentBlock;
