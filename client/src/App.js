
// import Landing from "./Pages/Landing";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Error, Landing, Register, ProtectedRoutes } from './Pages/index'
import { AddJob, AllJob, Profile, Stats, SharedLayout } from './Pages/Dashboard/index'
function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/"
          element=
          {<ProtectedRoutes>
            <SharedLayout />
          </ ProtectedRoutes>
          }>
          <Route index path="stats" element={<Stats />} />
          <Route path="all-jobs" element={<AllJob />} />
          <Route path="add-job" element={<AddJob />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="*" element={<Error />} />

      </Routes>
    </BrowserRouter>

  );
}

export default App;
