'use client';
import { Toaster } from 'react-hot-toast';

function ClientProvider() {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          className: 'text-xs',
          style: { borderRadius: '10px' }
        }}
      />
    </>
  );
}

export default ClientProvider;
