import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';
import useUser from './hooks/useUser';
import Login from './components/Login';
import Coaches from './components/Coaches';
import ReserveSlot from './components/ReserveSlot';
import Appointments from './components/Appointments';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  const { user, switchUser } = useUser();
  console.log('user', user)
  return (
    <ChakraProvider>
      <div>
        <Router>
          {
            user ? <div className="App">
              <Routes>
                {/* <Route path="/" element={<Login switchUser={switchUser}/>} /> */}
                <Route path="/learning/:studentId/reserve/:slotId" element={<ReserveSlot />}/>
                <Route path="/learning/:studentId/appointments" element={<Appointments />}/>
                <Route path="/learning/:studentId" element={<Coaches />} />
              </Routes>
            
            </div> : <Login switchUser={switchUser}/>
          }
          </Router>
      </div>
    </ChakraProvider>
  );
}

export default App;
