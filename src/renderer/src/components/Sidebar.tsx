import { ComponentProps } from 'react'

const Sidebar = ({ children }: ComponentProps<'aside'>) => {
  return (
    <aside className="w-56 pt-10 h-screen border-r border-gray-300 bg-neutral-800">
      {children}
    </aside>
  )
}

export default Sidebar
