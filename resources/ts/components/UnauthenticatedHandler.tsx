import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setUnauthenticatedHandler } from '../lib/axios';
import { useAuth } from '../contexts/AuthContext';

export default function UnauthenticatedHandler() {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setUnauthenticatedHandler(() => {
      setUser(null);
      navigate('/login', { replace: true });
    });
  }, [setUser, navigate]);

  return null;
}
