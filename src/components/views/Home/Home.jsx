import React, { useState } from 'react';
import LoginForm from '../../common/LoginForm/LoginForm';
import RegistrationForm from '../../common/RegistrationForm/RegistrationForm';
import './Home.css';

const intro = 'Keep track of your plants\' care and growth with this new addition to your gardening tools.';

const Home = () => {
  const [startPrompt, setStartPrompt] = useState('');
  return (
    <article>
      <header className="banner">
        <h1>
          Grow with nature.
        </h1>
        <p>{intro}</p>
        <h2>
          Let&apos;s get started:
        </h2>
        {(startPrompt === '') && (
          <button type="button" onClick={() => setStartPrompt('signin')}>Sign in</button>)}
        {(startPrompt === '') && (
          <button type="button" onClick={() => setStartPrompt('signup')}>Sign up</button>)}
      </header>
      {(startPrompt === 'signup') && (
        <section className="registration-prompt">
          <RegistrationForm />
          <button type="button" onClick={() => setStartPrompt('')}>Cancel</button>
        </section>
      )}
      {(startPrompt === 'signin') && (
      <section className="login-prompt">
        <LoginForm />
        <button type="button" onClick={() => setStartPrompt('')}>Cancel</button>
      </section>
      )}
      <section className="features">
        <article>
          <header>
            <h3>Organize your crops by garden&apos;s areas</h3>
          </header>
          <section>
            <p>Add each area of your garden and the plants they contain.</p>
          </section>
        </article>
        <article>
          <header>
            <h3>Store information about your plants</h3>
          </header>
          <section>
            <p>Keep track of the plants you have in your garden.</p>
          </section>
        </article>
        <article>
          <header>
            <h3>Save notes</h3>
          </header>
          <section>
            <p>Take notes related to your garden, a specific area, or a kind of plant.</p>
          </section>
        </article>
      </section>
    </article>
  );
};

export default Home;
