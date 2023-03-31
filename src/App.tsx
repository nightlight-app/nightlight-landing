import './App.css';
import Navbar from './components/Navbar';
import EmailInput from './components/EmailInput';

const App = () => {
  return (
    <div id='App'>
      <Navbar />
      <div id='content'>
        <h2 id='subtitle'>your nightlife companion.</h2>
        <h3>Sign up for beta access.</h3>
        <EmailInput />
      </div>
    </div>
  );
};

export default App;
