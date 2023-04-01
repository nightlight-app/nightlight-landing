import React, { useState } from 'react';

import './EmailInput.css';

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

const EmailInput = () => {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (error) setError('');
    if (success) setSuccess('');
    setEmail(e.target.value);
  };

  const validateEmail = (email: string): RegExpMatchArray | null => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError('invalid email address.');
      return;
    } else setError('');

    try {
      await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
    } catch (error) {
      console.log(error);
    }
    setSuccess('thanks for signing up!');
  };

  return (
    <form id='signup-form' onSubmit={handleSubmit}>
      <div className='email-input-container'>
        <input
          className={`email-input ${
            error ? 'error' : success ? 'success' : ''
          }`}
          type='email'
          placeholder='email'
          onChange={handleEmailChange}
          defaultValue={email}
        />
        {(error || success) && (
          <p className={`message ${error ? 'error' : 'success'}`}>
            {error || success}
          </p>
        )}
      </div>
      <button type='submit'>submit</button>
    </form>
  );
};

export default EmailInput;
