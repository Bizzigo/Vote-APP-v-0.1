
import React, { createContext } from 'react';
import { AuthContextType } from '@/lib/types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;
