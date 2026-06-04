import React, { createContext, useCallback, useContext, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

export type AssistantPendingError = {
  technical: string;
  source?: string;
  timestamp: number;
} | null;

interface AssistantContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  pendingError: AssistantPendingError;
  consumePendingError: () => AssistantPendingError;
  reportError: (technical: string, opts?: { source?: string; userMessage?: string; silent?: boolean }) => void;
  askAIAbout: (technical: string, source?: string) => void;
}

const AssistantContext = createContext<AssistantContextValue | undefined>(undefined);

export const AssistantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [pendingError, setPendingError] = useState<AssistantPendingError>(null);

  const consumePendingError = useCallback(() => {
    const err = pendingError;
    setPendingError(null);
    return err;
  }, [pendingError]);

  const askAIAbout = useCallback((technical: string, source?: string) => {
    setPendingError({ technical, source, timestamp: Date.now() });
    setOpen(true);
  }, []);

  const reportError = useCallback(
    (technical: string, opts?: { source?: string; userMessage?: string; silent?: boolean }) => {
      const userMessage = opts?.userMessage ?? 'A apărut o eroare. Asistentul AI vă poate ajuta.';
      // Auto-open assistant with the error context
      askAIAbout(technical, opts?.source);

      if (!opts?.silent) {
        toast.error(userMessage, {
          duration: 8000,
          action: (
            <Button
              size="sm"
              variant="outline"
              className="gap-1"
              onClick={() => askAIAbout(technical, opts?.source)}
            >
              <Sparkles className="h-3.5 w-3.5" />
              Ask AI to fix this
            </Button>
          ) as any,
        });
      }
    },
    [askAIAbout],
  );

  // Global listeners for uncaught errors
  React.useEffect(() => {
    const onError = (e: ErrorEvent) => {
      const msg = e.message || String(e.error);
      if (!msg) return;
      reportError(`Uncaught error: ${msg}\nFile: ${e.filename}:${e.lineno}:${e.colno}`, {
        source: 'window.error',
      });
    };
    const onRejection = (e: PromiseRejectionEvent) => {
      const reason: any = e.reason;
      const msg =
        typeof reason === 'string'
          ? reason
          : reason?.message ?? JSON.stringify(reason);
      reportError(`Unhandled promise rejection: ${msg}`, { source: 'unhandledrejection' });
    };
    window.addEventListener('error', onError);
    window.addEventListener('unhandledrejection', onRejection);
    return () => {
      window.removeEventListener('error', onError);
      window.removeEventListener('unhandledrejection', onRejection);
    };
  }, [reportError]);

  return (
    <AssistantContext.Provider
      value={{ open, setOpen, pendingError, consumePendingError, reportError, askAIAbout }}
    >
      {children}
    </AssistantContext.Provider>
  );
};

export const useAssistant = (): AssistantContextValue => {
  const ctx = useContext(AssistantContext);
  if (!ctx) throw new Error('useAssistant must be used within AssistantProvider');
  return ctx;
};
