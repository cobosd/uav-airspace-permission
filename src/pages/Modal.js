import React, { useState } from 'react';

const Modal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button onClick={handleShow}>
        Show Modal
      </Button>

      <div style={{ display: show ? 'block' : 'none' }}>
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={handleClose}>
        </div>
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '1rem' }}>
          <h3>Modal Title</h3>
          <p>Modal Body</p>
          <Button onClick={handleClose}>Close</Button>
        </div>
      </div>
    </>
  );
};

export default Modal;
