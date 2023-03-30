import './App.css'
import EmailInput from './EmailInput';

const App = () => {
  return (
    <div className='App'>
      <div id='roads-container'>
        <div id='roads'>
          <div id='road-1' className='road' />
          <div id='road-2' className='road' />
          <div id='road-3' className='road' />
          <div id='road-4' className='road' />
          <div id='road-5' className='road' />
        </div>
      </div>
      <div id='logo'>
        <h1>nightlight</h1>
        <div id='blue-dot-container'>
          <div id='blue-dot' />
        </div>
      </div>
      <h2 id='subtitle'>your nightlife companion.</h2>
      <h3>Sign up for beta access.</h3>
      <EmailInput />
    </div>
  )
}

export default App;
