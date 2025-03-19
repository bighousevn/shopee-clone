import { ToastContainer } from 'react-toastify'
import useRouteElements from './useRouteElements'

function App() {
  const routeElement = useRouteElements()
  return (
    <div>
      {routeElement}
      <ToastContainer />
    </div>
  )
}

export default App
