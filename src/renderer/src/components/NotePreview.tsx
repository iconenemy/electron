import useStore from '@renderer/store'

type Props = {
  id: string
  title: string
  content: string
}

const NotePreview = ({ id, title, content }: Props) => {
  const { setActiveNote, activeNote } = useStore()

  return (
    <div
      onClick={() => setActiveNote({ id, title, content })}
      className={`${activeNote?.id === id ? 'bg-zinc-500/75' : 'hover:bg-zinc-400/75'} cursor-pointer px-2.5 py-3 rounded-md transition-colors duration-75`}
    >
      <h3 className={`${!title && 'italic'} mb-1 font-bold truncate text-md`}>
        {title ? title : 'Untitled'}
      </h3>
    </div>
  )
}

export default NotePreview
