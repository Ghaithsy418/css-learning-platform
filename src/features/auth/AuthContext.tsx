/**
 * AuthContext — سياق المصادقة البسيطة
 * Simple JSON-based auth context using localStorage
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

/* ── Types ── */
export interface User {
  id: number;
  username: string;
  name: string;
  role: 'student' | 'admin';
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

const STORAGE_KEY = 'ta3allam_user';

/* ── Provider ── */
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* Restore session from localStorage on mount */
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
    setIsLoading(false);
  }, []);

  /* Login — fetch users.json and match credentials */
  const login = useCallback(
    async (username: string, password: string): Promise<boolean> => {
      setError(null);
      setIsLoading(true);
      try {
        const res = await fetch('/users.json');
        if (!res.ok) throw new Error('فشل تحميل بيانات المستخدمين');

        const users: {
          id: number;
          username: string;
          password: string;
          name: string;
          role: 'student' | 'admin';
        }[] = await res.json();

        const match = users.find(
          (u) => u.username === username && u.password === password,
        );

        if (match) {
          const userData: User = {
            id: match.id,
            username: match.username,
            name: match.name,
            role: match.role ?? 'student',
          };
          setUser(userData);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
          setIsLoading(false);
          return true;
        } else {
          setError('اسم المستخدم أو كلمة المرور غير صحيحة');
          setIsLoading(false);
          return false;
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'حدث خطأ أثناء تسجيل الدخول',
        );
        setIsLoading(false);
        return false;
      }
    },
    [],
  );

  /* Logout */
  const logout = useCallback(() => {
    setUser(null);
    setError(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const value = useMemo(
    () => ({ user, isLoading, error, login, logout }),
    [user, isLoading, error, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/* ── Hook ── */
export const useAuth = (): AuthState => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
