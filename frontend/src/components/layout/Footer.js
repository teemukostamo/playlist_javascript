import React from 'react';

const Footer = () => {
  return (
    <div
      style={{ marginTop: '5rem', marginBottom: '2rem', textAlign: 'center' }}
    >
      <br />
      <em>
        {' '}
        &copy; {new Date().getFullYear()}{' '}
        <a
          href='https://www.radiohelsinki.fi'
          target='_blank'
          rel='noopener noreferrer'
        >
          {' '}
          Radio Helsinki{' '}
        </a>{' '}
      </em>
    </div>
  );
};

export default Footer;
