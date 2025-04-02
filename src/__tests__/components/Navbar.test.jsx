// src/__tests__/components/Navbar.test.jsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';

// Mock the Redux store
const createMockStore = (preloadedState) => {
  return configureStore({
    reducer: {
      products: (state = { products: [] }, action) => state,
      loadUser: (state = { isAuthenticated: false, user: null }, action) => state
    },
    preloadedState
  });
};

// Mock window.open
const mockWindowOpen = vi.fn();
window.open = mockWindowOpen;

describe('Navbar Component', () => {
  it('renders without crashing', () => {
    const store = createMockStore();
    
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Navbar isServerDown={false} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByPlaceholderText(/search for products/i)).toBeInTheDocument();
  });

  it('shows login link when not authenticated', () => {
    const store = createMockStore({
      loadUser: { isAuthenticated: false, user: null }
    });
    
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Navbar isServerDown={false} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Login\/Signup/i)).toBeInTheDocument();
  });

  it('shows profile when authenticated', () => {
    const store = createMockStore({
      loadUser: { 
        isAuthenticated: true, 
        user: { 
          name: "Test User",
          email: "test@example.com",
          role: "ROLE_USER",
          image: "/path/to/image.jpg"
        } 
      }
    });
    
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Navbar isServerDown={false} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByAltText('Profile')).toBeInTheDocument();
    expect(screen.queryByText(/Login\/Signup/i)).not.toBeInTheDocument();
  });
});