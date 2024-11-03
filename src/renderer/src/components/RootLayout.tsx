import { ComponentProps } from 'react'

const RootLayout = ({ children }: ComponentProps<'main'>) => {
  return <main className="flex">{children}</main>
}

export default RootLayout
