import React, { createContext, useContext, useState } from 'react';
import Toast, { ToastType } from '../components/Toast';

// Define the shape of the Toast context
interface ToastContextType {
  showToast: (message: string, type?: ToastType, duration?: number) => void; // Function to display a toast
  hideToast: () => void; // Function to manually hide the toast
}

// Create the Toast context with undefined as initial value
const ToastContext = createContext<ToastContextType | undefined>(undefined);

/**
 * Custom hook to access toast functionality
 * Must be used within a ToastProvider
 * @throws Error if used outside ToastProvider
 */
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

/**
 * ToastProvider Component
 * Provides global toast notification functionality to the entire app
 * Wrap your app with this provider to enable toast notifications anywhere
 */
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State to manage toast visibility and content
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState<ToastType>('success');
  const [duration, setDuration] = useState(3000);

  /**
   * Show a toast notification
   * @param msg - The message to display
   * @param toastType - Type of toast (success, error, warning, info)
   * @param toastDuration - How long to show the toast in milliseconds
   */
  const showToast = (
    msg: string,
    toastType: ToastType = 'success',
    toastDuration: number = 3000,
  ) => {
    setMessage(msg);
    setType(toastType);
    setDuration(toastDuration);
    setVisible(true);
  };

  /**
   * Hide the currently visible toast
   */
  const hideToast = () => {
    setVisible(false);
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      {/* Toast component is rendered here and controlled by the provider */}
      <Toast
        visible={visible}
        message={message}
        type={type}
        duration={duration}
        onHide={hideToast}
      />
    </ToastContext.Provider>
  );
};
