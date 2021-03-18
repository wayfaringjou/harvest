import React, { useState } from 'react';
import LoginForm from '../../common/LoginForm/LoginForm';
import RegistrationForm from '../../common/RegistrationForm/RegistrationForm';
import './Home.css';
import organize from '../../../images/organize.jpg';
import track from '../../../images/track.jpg';
import work from '../../../images/work.jpg';

const intro = 'Keep track of your plants\' care and growth with this new addition to your gardening tools.';

const Home = () => {
  const [startPrompt, setStartPrompt] = useState('');
  return (
    <article>
      <header className="banner">
        <div className="banner-wrapper">
          <h1>
            Grow with nature.
          </h1>
          <p>{intro}</p>
          <h2>
            Let&apos;s get started:
          </h2>
          {(startPrompt === '') && (
          <button
            type="button"
            onClick={() => setStartPrompt('signin')}
          >
            <span className="btn-label">
              Sign in
            </span>
          </button>
          )}
          {(startPrompt === '') && (
          <button
            type="button"
            onClick={() => setStartPrompt('signup')}
          >
            <span className="btn-label">
              Sign up
            </span>
          </button>
          )}
        </div>
      </header>
      {(startPrompt === 'signup') && (
        <section className="registration-prompt">
          <RegistrationForm onCancel={() => setStartPrompt('')} />
        </section>
      )}
      {(startPrompt === 'signin') && (
      <section className="login-prompt">
        <LoginForm onCancel={() => setStartPrompt('')} />

      </section>
      )}
      <section className="features">
        <article className="feature-card">
          <div className="aspect-ratio-box">
            <img src={organize} alt="Organized assortment of produce" />
          </div>
          <header>
            <h3>Organize your crops by areas</h3>
            <hr />
          </header>
          <section className="card-description">
            <p>Add each area of your garden and the plants they contain.</p>
          </section>
        </article>

        <article className="feature-card">
          <div className="aspect-ratio-box">
            <img src={track} alt="Plants growing in pots" />
          </div>
          <header>
            <h3>Know your plants</h3>
            <hr />
          </header>
          <section className="card-description">
            <p>Store information and keep track of the plants you have in your garden.</p>
          </section>
        </article>

        <article className="feature-card">
          <div className="aspect-ratio-box">
            <img src={work} alt="Watering plants" />
          </div>
          <header>
            <h3>Take notes and remember</h3>
            <hr />
          </header>
          <section className="card-description">
            <p>
              Take notes about your work and useful details about your garden,
              a specific area, or a kind of plant.
            </p>
          </section>
        </article>
      </section>
    </article>
  );
};

export default Home;
