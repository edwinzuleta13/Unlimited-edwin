"use client"

import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Alert } from '@/components/ui/alert'
import { X } from 'lucide-react'

type Severity = 'success' | 'info' | 'warning' | 'error' | 'destructive' | 'default'

type AlertItem = {
  id: string
  severity?: Severity
  title?: string
  message?: string
  timeout?: number
}

type AlertContextType = {
  showAlert: (a: Omit<AlertItem, 'id'>) => string
  closeAlert: (id: string) => void
}

const AlertContext = createContext<AlertContextType>({
  showAlert: () => '',
  closeAlert: () => {},
})

export const useAlert = () => useContext(AlertContext)

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [alerts, setAlerts] = useState<AlertItem[]>([])

  const closeAlert = useCallback((id: string) => {
    setAlerts((s) => s.filter((a) => a.id !== id))
  }, [])

  const showAlert = useCallback((a: Omit<AlertItem, 'id'>) => {
    const id = String(Date.now()) + Math.random().toString(36).slice(2, 9)
    const alert: AlertItem = { id, ...a }
    setAlerts((s) => [alert, ...s])
    if (alert.timeout !== 0) {
      const t = alert.timeout ?? 5000
      setTimeout(() => closeAlert(id), t)
    }
    return id
  }, [closeAlert])

  const ctx = useMemo(() => ({ showAlert, closeAlert }), [showAlert, closeAlert])

  return (
    <AlertContext.Provider value={ctx}>
      {children}

      <div className="fixed top-6 right-6 z-[9999] flex flex-col gap-3">
        <AnimatePresence initial={false}>
          {alerts.map((a) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="pointer-events-auto"
            >
              <div className="relative group">
                <Alert severity={a.severity} className="min-w-[260px] max-w-[420px]">
                  <div className="pr-8">
                    {a.title ? <div className="font-semibold mb-1">{a.title}</div> : null}
                    {a.message ? <div className="text-sm">{a.message}</div> : null}
                  </div>
                </Alert>
                <button
                  aria-label="Cerrar alerta"
                  onClick={() => closeAlert(a.id)}
                  className="absolute right-2 top-2 rounded p-1 text-foreground/70 hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </AlertContext.Provider>
  )
}

export default AlertProvider
