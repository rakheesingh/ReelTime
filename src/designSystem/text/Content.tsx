import React, { ReactNode } from 'react'

interface TextProps{
    children: ReactNode;
    className:string;
}

export default function Content({children, className}: TextProps) {
  return (
    <div className={className}>{children}</div>
  )
}
