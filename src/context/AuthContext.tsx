import { createContext, useContext, useEffect, useState } from "react";
import { decodeToken, AppJwtPayload } from "../utils/decodeToken";
import { jwtDecode } from "jwt-decode";
import { refreshTokens } from "../utils/client";

interface AuthContextType {
  accessToken: string | null;
  role: string | null;
  userId: number | null;
  email: string | null;
  name: string | null;
  loading: boolean;
  setAccessToken: (token: string | null) => void;
}

// Helper
const isTokenExpired = (token: string) => {
  try {
    const { exp } = jwtDecode<{ exp: number }>(token);
    return exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  role: null,
  userId: null,
  email: null,
  name: null,
  loading: false,
  setAccessToken: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem("accessToken"),
  );

  const [role, setRole] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  // Refresh loop function
  const refreshLoop = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    if (isTokenExpired(token)) {
      try {
        await refreshTokens();
        setAccessToken(localStorage.getItem("accessToken"));
      } catch {
        setAccessToken(null);
        setRole(null);
        setUserId(null);
        setEmail(null);
        setName(null);
      }
    } else {
      setAccessToken(token);
    }
  };

  // Run immediately on mount
  const init = async () => {
    setLoading(true);
    await refreshLoop(); // now this works
    setLoading(false);   // only stop loading after first refresh
  };
  init();

  // Then run periodically every 60s
  const interval = setInterval(refreshLoop, 60 * 1000);
  return () => clearInterval(interval);
}, []);

  // 🔁 Re-read token when Apollo refreshes it
  useEffect(() => {
    const syncToken = () => {
      const token = localStorage.getItem("accessToken");
      setAccessToken((prev) => (prev !== token ? token : prev));
    };

    window.addEventListener("auth-token-updated", syncToken);
    return () => window.removeEventListener("auth-token-updated", syncToken);
  }, []);

  // 🔓 Decode token (NO expiry logout here!)
  useEffect(() => {
    if (!accessToken) {
      setRole(null);
      setUserId(null);
      setEmail(null);
      setName(null);
      setLoading(false)
      return;
    }

    const decoded: AppJwtPayload | null = decodeToken(accessToken);
    if (!decoded){
      setLoading(false)
      return
    }

    setRole(decoded.role);
    setUserId(decoded.sub);
    setEmail(decoded.email);
    setName(decoded.name);
    setLoading(false)
  }, [accessToken]);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        role,
        userId,
        email,
        name,
        loading,
        setAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
