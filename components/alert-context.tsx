"use client";
import React, { createContext, useContext, useState, useCallback } from 'react';
import { Alert } from './ui/alert';
import { AnimatePresence, motion } from 'framer-motion';

export type AlertSeverity = 'success' | 'info' | 'warning' | 'error';
export interface GlobalAlert {
  id: string;
  severity: AlertSeverity;
  message: string;
}

interface AlertContextType {
  alerts: GlobalAlert[];
  showAlert: (severity: AlertSeverity, message: string) => void;
  closeAlert: (id: string) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function useAlert() {
  const ctx = useContext(AlertContext);
  if (!ctx) throw new Error('useAlert must be used within AlertProvider');
  return ctx;
}

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [alerts, setAlerts] = useState<GlobalAlert[]>([]);

  const showAlert = useCallback((severity: AlertSeverity, message: string) => {
    // Debug: log calls so we can verify showAlert is invoked
    console.debug('[Alert] showAlert called:', { severity, message });

    setAlerts((prev) => [
      ...prev,
      { id: Math.random().toString(36).slice(2), severity, message },
    ]);
  }, []);

  const closeAlert = useCallback((id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  }, []);

  return (
    <AlertContext.Provider value={{ alerts, showAlert, closeAlert }}>
      {children}
    </AlertContext.Provider>
  );
}

export function GlobalAlerts() {
  const { alerts, closeAlert } = useAlert();
  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex flex-col items-center px-4 pointer-events-none">
      <AnimatePresence>
        {alerts.map((alert) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-3xl pointer-events-auto mb-4"
          >
            <Alert severity={alert.severity} className="relative pr-10">
              <div className="text-center w-full">{alert.message}</div>
              <button
                onClick={() => closeAlert(alert.id)}
                className="absolute right-2 top-2 text-xs text-gray-400 hover:text-white bg-transparent"
                aria-label="Cerrar alerta"
                tabIndex={0}
              >
                ×
              </button>
            </Alert>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
