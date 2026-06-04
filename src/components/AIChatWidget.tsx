import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import aiAssistantLogo from '@/assets/ai-assistant-logo.png';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/i18n/LanguageContext';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAssistant } from '@/context/AssistantContext';

type Msg = { role: 'user' | 'assistant' | 'system'; content: string; hidden?: boolean };

const AIChatWidget: React.FC = () => {
  const { language } = useLanguage();
  const { open, setOpen, pendingError, consumePendingError } = useAssistant();
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isRO = language === 'ro';
  const labels = {
    title: 'Asistent DSP ILFOV',
    subtitle: isRO
      ? 'Sunt asistentul tau cu inteligenta artificiala. Sunt aici ca sa te ajut'
      : 'Sunt asistentul tau cu inteligenta artificiala. Sunt aici ca sa te ajut',
    placeholder: isRO ? 'Scrieți un mesaj...' : 'Type a message...',
    welcome: isRO
      ? 'Bună! Sunt asistentul DSP Ilfov. Cu ce te pot ajuta?'
      : 'Hi! I am the DSP Ilfov assistant. How can I help?',
    open: isRO ? 'Deschide asistent' : 'Open assistant',
    send: 'Send',
    thinking: isRO ? 'Se gândește' : 'Thinking',
    analyzingError: isRO ? 'Analizez eroarea pentru tine...' : 'Analyzing the error for you...',
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, open]);

  const callAI = async (history: Msg[]): Promise<string> => {
    const { data, error } = await supabase.functions.invoke('chat-with-ai', {
      body: { messages: history.map(({ role, content }) => ({ role, content })) },
    });
    if (error) throw error;
    return data?.reply ?? '';
  };

  const handleAutoErrorExplain = async (technical: string, source?: string) => {
    const systemErrorMsg: Msg = {
      role: 'system',
      hidden: true,
      content: `The user just experienced a technical error in the DSP Ilfov web app${
        source ? ` (source: ${source})` : ''
      }. Technical log:\n\n${technical}\n\nPlease explain in simple, friendly Romanian what likely went wrong and give 2-3 concrete steps the user can try to fix it. Do not show the raw technical log.`,
    };

    const placeholder: Msg = { role: 'assistant', content: labels.analyzingError };
    setMessages((prev) => [...prev, systemErrorMsg, placeholder]);
    setIsLoading(true);

    try {
      const history = [...messages, systemErrorMsg];
      const reply = await callAI(history);
      setMessages((prev) => {
        const copy = [...prev];
        copy[copy.length - 1] = { role: 'assistant', content: reply || labels.analyzingError };
        return copy;
      });
    } catch (e) {
      console.error(e);
      const fallback = isRO
        ? 'Sistemul este momentan indisponibil. Vă rugăm să încercați din nou.'
        : 'The system is currently unavailable. Please try again.';
      setMessages((prev) => {
        const copy = [...prev];
        copy[copy.length - 1] = { role: 'assistant', content: fallback };
        return copy;
      });
    } finally {
      setIsLoading(false);
    }
  };

  // When the sheet opens with a pending error, auto-send it as a hidden system message
  useEffect(() => {
    if (open && pendingError) {
      const err = consumePendingError();
      if (err) {
        handleAutoErrorExplain(err.technical, err.source);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, pendingError]);

  const send = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg: Msg = { role: 'user', content: text };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput('');
    setIsLoading(true);

    const unavailableMsg = isRO
      ? 'Sistemul este momentan indisponibil. Vă rugăm să încercați din nou mai târziu.'
      : 'The system is currently unavailable. Please try again later.';

    try {
      const reply = await callAI(next);
      if (!reply) {
        toast.error(unavailableMsg);
        setMessages((prev) => [...prev, { role: 'assistant', content: unavailableMsg }]);
        return;
      }
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (e: any) {
      console.error(e);
      const status = e?.context?.status;
      if (status === 429) {
        toast.error(isRO ? 'Prea multe cereri. Încercați mai târziu.' : 'Too many requests.');
      } else if (status === 402) {
        toast.error(isRO ? 'Credit AI insuficient.' : 'AI credit exhausted.');
      } else {
        toast.error(unavailableMsg);
      }
      setMessages((prev) => [...prev, { role: 'assistant', content: unavailableMsg }]);
    } finally {
      setIsLoading(false);
    }
  };

  const visibleMessages = messages.filter((m) => !m.hidden && m.role !== 'system');

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <motion.button
          type="button"
          aria-label={labels.open}
          className={cn(
            'fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg overflow-hidden',
            'bg-white ring-2 ring-gov-gold/40',
            'flex items-center justify-center',
          )}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          whileHover={{ scale: 1.12, boxShadow: '0 12px 30px rgba(0,0,0,0.2)' }}
          whileTap={{ scale: 0.85, transition: { type: 'spring', stiffness: 500, damping: 12 } }}
        >
          <img src={aiAssistantLogo} alt="Asistent DSP Ilfov" width={56} height={56} loading="lazy" className="h-full w-full object-contain p-1" />
        </motion.button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-full sm:max-w-md p-0 flex flex-col bg-background border-l border-border"
      >
        <SheetHeader className="bg-gov-navy text-white px-5 py-4 border-b border-gov-gold/40 space-y-1 text-left">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center shrink-0 overflow-hidden">
              <img src={aiAssistantLogo} alt="" width={40} height={40} loading="lazy" className="h-full w-full object-contain p-0.5" />
            </div>
            <div className="flex-1 min-w-0">
              <SheetTitle className="font-display text-white text-base">
                {labels.title}
              </SheetTitle>
              <SheetDescription className="text-white/60 text-xs">
                {labels.subtitle}
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <ScrollArea className="flex-1 bg-slate-50">
          <div ref={scrollRef} className="p-4 space-y-3">
            {visibleMessages.length === 0 && (
              <div className="text-sm text-muted-foreground bg-white border border-border rounded-lg p-3 shadow-sm">
                {labels.welcome}
              </div>
            )}

            {visibleMessages.map((m, i) => (
              <div
                key={i}
                className={cn('flex', m.role === 'user' ? 'justify-end' : 'justify-start')}
              >
                <div
                  className={cn(
                    'max-w-[85%] rounded-lg px-3 py-2 text-sm whitespace-pre-wrap break-words shadow-sm',
                    m.role === 'user'
                      ? 'bg-gov-navy text-white rounded-br-sm'
                      : 'bg-white text-foreground border border-border rounded-bl-sm',
                  )}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-border rounded-lg rounded-bl-sm px-3 py-2.5 flex items-center gap-2 shadow-sm">
                  <span className="text-xs text-muted-foreground mr-1">{labels.thinking}</span>
                  <span className="flex gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-gov-navy animate-bounce [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-gov-navy animate-bounce [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-gov-navy animate-bounce" />
                  </span>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
          className="border-t border-border p-3 flex gap-2 bg-background"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={labels.placeholder}
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-gov-navy hover:bg-gov-navy-dark text-white gap-1"
          >
            <Send className="h-4 w-4" />
            <span className="hidden sm:inline">{labels.send}</span>
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default AIChatWidget;
