import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Admin from './Routes/Admin'
import User from "./Routes/User";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/*" element={<User />} />
      </Routes>
      <Routes>
        <Route exact path='/admin/*' element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App