import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './Context/AuthContext.jsx';
import {SocketProvider} from './Context/SocketContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <AuthProvider>
        <SocketProvider>
          <App />
        </SocketProvider>
      </AuthProvider>
  </StrictMode>,
);