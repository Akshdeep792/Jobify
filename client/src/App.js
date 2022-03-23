
// import Landing from "./Pages/Landing";
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import {Error, Dashboard, Landing, Register} from './Pages/index'
function App() {
  return (
    <BrowserRouter>
     
      <Routes>
        <Route path="/" element={<Dashboard />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/landing" element={<Landing />} />
        <Route path="*" element={<Error />}/>

      </Routes>
    </BrowserRouter>

  );
}

export default App;
