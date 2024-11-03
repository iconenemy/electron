import { ComponentProps } from 'react'

const FadeButton = ({ children, ...props }: ComponentProps<'button'>) => {
  return (
    <button
      {...props}
      className="px-2 py-1 rounded-md border border-zinc-400/50 hover:bg-zinc-600/50 transition-colors duration-100"
    >
      {children}
    </button>
  )
}

export default FadeButton
