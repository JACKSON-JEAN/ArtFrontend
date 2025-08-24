import { createContext, useContext, ReactNode } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ToastContextType {
  success: (message: string) => void;
  error: (message: string) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const success = (message: string) => toast.success(message);
  const error = (message: string) => toast.error(message);

  return (
    <ToastContext.Provider value={{ success, error }}>
      {children}
      <ToastContainer position="top-center" autoClose={3000} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
