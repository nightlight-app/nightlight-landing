import './App.css';
import Navbar from './components/Navbar';
import EmailInput from './components/EmailInput';

const App = () => {
  return (
    <div id='App'>
      <Navbar />
      <div id='content'>
        <h1 className='title'>your nightlife companion.</h1>
        <h2 className='subtitle'>sign up for beta access.</h2>
        <EmailInput />
      </div>
    </div>
  );
};

export default App;
