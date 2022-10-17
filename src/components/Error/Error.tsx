import React, { Dispatch, SetStateAction } from 'react';
import './Error.scss';

interface Props {
  errorText: string
  setError: Dispatch<SetStateAction<string>>
}

export const Error: React.FC<Props> = ({ errorText, setError }) => {
  if (errorText) {
    return (
      <div
        className="error__info"
      >
         <p>
          {errorText}
        </p>
        <button
          type="button"
          className="error__close-button"
        >
          <img
            src='https://avatanplus.com/files/resources/original/5968a2c8f2ed115d40bbe123.png'
            alt="Close"
            className='error__close-logo'
            onClick={() => setError('')}
          />
        </button>
      </div>
    );
  }

  return <div></div>;
};
