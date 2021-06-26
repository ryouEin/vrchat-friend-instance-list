import React from 'react'

type Props = {
  href: string
  className?: string
  children: JSX.Element
}
export const ExternalLinkComponent = ({
  href,
  className = '',
  children,
}: Props) => {
  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  )
}
