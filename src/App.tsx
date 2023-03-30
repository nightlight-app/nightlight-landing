import { useState } from 'react';
import './App.css'

const App = () => {
  const [email, setEmail] = useState<string>('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('TODO: sign up: ', email);
  };

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
      <form id='signup-form' onSubmit={handleSubmit}>
        <input type='email' placeholder='Email' value={email} onChange={handleEmailChange} />
        <button type='submit'>Sign up</button>
      </form>
    </div>
  )
}

export default App
