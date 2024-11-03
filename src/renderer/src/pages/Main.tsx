import { NoteContent, NotesList, RootLayout, Sidebar, SideBarAction } from '@renderer/components'

const Main = () => {
  return (
    <RootLayout>
      <Sidebar>
        <SideBarAction />
        <NotesList />
      </Sidebar>
      <NoteContent />
    </RootLayout>
  )
}

export default Main
