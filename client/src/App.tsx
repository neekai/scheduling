import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react';
import useUser from './hooks/useUser';
import Login from './components/Login';
import Coaches from './components/Coaches';
import ReserveSlot from './components/ReserveSlot';
import Appointments from './components/Appointments';
import Navigation from './components/Navigation';
import UpComingSlots from './components/UpComingSlots';
import CompletedSessions from './components/CompletedSessions';
import CreateSlot from './components/CreateSlot';
import './App.css';

function App() {
  const { user, switchUser } = useUser();
  
  const baseUrl = user?.role === 'student' ? '/learning' : '/coaching'; 

  return (
    <ChakraProvider>
      <div>
        <Router>
          {
            user ? <div className="App">
              <Navigation user={user} />
              <Routes>
                <Route path="/learning/reserve/:slotId" element={<ReserveSlot userId={user.id}/>}/>
                <Route path={`${baseUrl}/:userId/appointments`} element={<Appointments />}/>
                <Route path="/learning" element={<Coaches />} />
                <Route path="/coaching/slots/completed" element={<CompletedSessions userId={user.id}/>}/>
                <Route path="/coaching/slots/create" element={<CreateSlot userId={user.id}/>}/>
                <Route path="/coaching" element={<UpComingSlots user={user}/>} />
                <Route path="/" element={<Login switchUser={switchUser}/>} />
              </Routes>
            
            </div> : <Routes>
              <Route path="*" element={<Login switchUser={switchUser}/>}/>
            </Routes>
          }
          </Router>
      </div>
    </ChakraProvider>
  );
}

export default App;
