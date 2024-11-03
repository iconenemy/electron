import { ComponentProps } from 'react'

import { FaPen } from 'react-icons/fa'

const Input = ({ ...props }: ComponentProps<'input'>) => {
  return (
    <div className="relative pt-5">
      <div className="absolute top-1/2 -translate-y start-0 flex items-center ps-4 pointer-events-none">
        <FaPen size={'14px'} />
      </div>
      <input
        {...props}
        type="text"
        id="title"
        name="title"
        className="bg-transparent block w-full p-2 ps-10 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:outline-none "
      />
    </div>
  )
}

export default Input
