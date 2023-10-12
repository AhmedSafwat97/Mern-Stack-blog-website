import React from 'react';
import ReactDOM from 'react-dom/client'; // Fix import path
import './index.css';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient(); // Create a QueryClient instance

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <QueryClientProvider client={queryClient}>
        <App />
    </QueryClientProvider>
);
