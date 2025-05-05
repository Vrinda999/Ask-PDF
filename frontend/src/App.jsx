import './App.css'
import { ChatSection, Navbar } from './components/Components'

function App() {
  return (
    <div
      className={`pt-35 overflow-x-hidden text-[var(--text-color)] dark:text-[var(--text-neutral)] antialiased selection:bg-[#4f6e82] selection:text-black mb-0 absolute top-0 z-[-2] scrollbar h-screen w-screen [var(--bg-color)] dark:bg-[var(--bg-color)]`}
    >
      <Navbar />
      <ChatSection />

    </div>
  )
}

export default App
