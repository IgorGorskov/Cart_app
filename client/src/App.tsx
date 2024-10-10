import './App.css'
import { MainContent } from './components/Main/Main'
import { MainProvider } from './Context'

function App() {

  return (
    <>
      <MainProvider>
        <MainContent/>
      </MainProvider>
      
    </>
  )
}

export default App
