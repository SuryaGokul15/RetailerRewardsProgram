import './App.css';
import UserForm from './components/userForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RewardPage from './components/rewardPage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserForm />} />
        <Route path="/rewardDetails/:id" element={<RewardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
