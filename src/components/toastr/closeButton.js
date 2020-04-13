import React from 'react';
import { css } from 'glamor';

function CloseButton({ closeToast, type, ariaLabel, color }) {
  const styles = css({
    color: color,
    fontWeight: 'bold',
    fontSize: '14px',
    background: 'transparent',
    outline: 'none',
    border: 'none',
    marginTop: 0,
    marginRight: 0,
    padding: 0,
    cursor: 'pointer',
    opacity: '0.7',
    transition: '.3s ease',
    alignSelf: 'flex-start',
    ':hover, :focus': {
      opacity: 1
    }
  });
  return (
    <button
      {...styles}
      type="button"
      onClick={closeToast}
      aria-label={ariaLabel}
    >
      ✖
    </button>
  );
}

export default CloseButton;