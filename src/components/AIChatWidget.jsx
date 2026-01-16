'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSeason } from './SeasonContext';
import ReactMarkdown from 'react-markdown';

const quickPrompts = [
    "Tech stack?",
    "Experience?",
    "AI projects?",
];

export const AIChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isThinking, setIsThinking] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const buttonRef = useRef(null);
    const panelRef = useRef(null);
    const { season } = useSeason();



    const isLightMode = ['spring', 'summer'].includes(season);
    const isDarkMode = ['autumn', 'winter'].includes(season);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Focus input when opened
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen]);

    // Click outside to close
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen &&
                panelRef.current && !panelRef.current.contains(event.target) &&
                buttonRef.current && !buttonRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const query = inputValue.trim();
        if (!query || isThinking) return;

        // Add user message
        setMessages(prev => [...prev, { role: 'user', content: query }]);
        setInputValue('');
        setIsThinking(true);

        try {
            // Direct API call
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query }),
            });

            const data = await response.json();

            setMessages(prev => [...prev, {
                role: 'assistant',
                content: data.response || 'Sorry, I could not process that request.',
            }]);
        } catch (error) {
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: 'Sorry, something went wrong. Please try again.',
            }]);
        } finally {
            setIsThinking(false);
        }
    };

    const handleQuickPrompt = async (prompt) => {
        setInputValue('');
        setMessages(prev => [...prev, { role: 'user', content: prompt }]);
        setIsThinking(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: prompt }),
            });

            const data = await response.json();

            setMessages(prev => [...prev, {
                role: 'assistant',
                content: data.response || 'Sorry, I could not process that request.',
            }]);
        } catch (error) {
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: 'Sorry, something went wrong. Please try again.',
            }]);
        } finally {
            setIsThinking(false);
        }
    };

    // Get button style based on theme (matching AudioPlayer gradient)
    const getButtonStyle = () => {
        if (isOpen) {
            if (isDarkMode) {
                return 'bg-gradient-to-r from-[var(--accent-dark)]/30 to-black border-white/10 shadow-[0_0_25px_rgba(0,0,0,0.5)] pr-3';
            }
            return 'bg-gradient-to-r from-[var(--accent-dark)]/90 to-black/90 border-[var(--accent-dark)]/30 shadow-[0_0_20px_var(--accent-soft)] pr-3 text-white';
        }
        return 'bg-black/40 border-white/10 text-white hover:bg-black/60';
    };

    return (
        <>
            {/* Small AI Button */}
            <motion.button
                ref={buttonRef}
                layout
                onClick={() => setIsOpen(!isOpen)}
                initial={{ width: '2.5rem' }}
                animate={{ width: isOpen ? 'auto' : '2.5rem' }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className={`fixed bottom-6 right-6 z-50 h-10 rounded-full backdrop-blur-2xl border overflow-hidden flex items-center group ${getButtonStyle()}`}
                aria-label={isOpen ? 'Close AI chat' : 'Open AI chat'}
            >
                {isOpen && (
                    <motion.div
                        className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                        initial={{ x: '-150%' }}
                        animate={{ x: '150%' }}
                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 1 }}
                    />
                )}

                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 relative z-10">
                    {isOpen ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={isLightMode ? 'text-[var(--accent)]' : 'text-white'}>
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    ) : (
                        <div className="relative w-8 h-8 flex items-center justify-center">
                            <div className="absolute inset-0 bg-[var(--accent)]/20 rounded-full blur-[2px] animate-pulse" />
                            <motion.svg
                                width="20" height="20" viewBox="0 0 24 24" fill="currentColor"
                                className="relative z-10 text-[var(--foreground)]"
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <motion.path
                                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
                                    animate={{ rotate: [0, 5, -5, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                />
                                <motion.path
                                    d="M18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"
                                    animate={{ opacity: [0.5, 1, 0.5], scale: [0.8, 1, 0.8] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                />
                                <motion.path
                                    d="M16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                                    animate={{ opacity: [1, 0.5, 1], scale: [1, 1.2, 1] }}
                                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                                />
                            </motion.svg>
                        </div>
                    )}
                </div>

                <AnimatePresence>
                    {isOpen && (
                        <motion.span
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: 'auto' }}
                            exit={{ opacity: 0, width: 0 }}
                            className="pr-3 text-[11px] font-serif italic font-extrabold bg-gradient-to-r from-white to-[var(--accent)] bg-clip-text text-transparent tracking-tight whitespace-nowrap"
                        >
                            Ask AI
                        </motion.span>
                    )}
                </AnimatePresence>

                {!isOpen && (
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse" />
                )}
            </motion.button>

            {/* Compact Chat Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        ref={panelRef}
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed bottom-[4.5rem] right-6 z-50 w-[320px] max-w-[calc(100vw-3rem)] rounded-2xl overflow-hidden shadow-2xl border border-[var(--border)] backdrop-blur-2xl"
                        style={{ background: isLightMode ? 'radial-gradient(circle at top left, var(--accent) -20%, white 80%)' : 'var(--card)' }}
                    >
                        {/* Header */}
                        <div className={`px-4 py-3 border-b border-[var(--border)] ${isDarkMode ? 'bg-gradient-to-r from-[var(--accent-dark)]/30 to-black' : 'bg-gradient-to-r from-[var(--accent-dark)]/90 to-black/90'}`}>
                            <div className="flex items-center gap-2">
                                <motion.svg
                                    width="14" height="14" viewBox="0 0 24 24" fill="currentColor"
                                    className="text-[var(--accent)]"
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                                </motion.svg>
                                <div className="flex flex-col leading-none">
                                    <span className="text-[11px] font-serif italic font-extrabold bg-gradient-to-r from-white to-[var(--accent)] bg-clip-text text-transparent tracking-tight">
                                        Neural Interface
                                    </span>
                                    <span className="text-[8px] font-bold bg-gradient-to-r from-[var(--accent)] to-white bg-clip-text text-transparent uppercase tracking-wide mt-[1px]">
                                        AI Assistant
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Messages */}
                        <div
                            className="h-[280px] overflow-y-auto p-3 space-y-3 scrollbar-thin scrollbar-thumb-[var(--accent)]/20 scrollbar-track-transparent overscroll-contain"
                            onWheel={(e) => e.stopPropagation()}
                        >
                            {messages.length === 0 && (
                                <div className="flex flex-col items-center justify-center py-6 h-full">
                                    <div className="relative mb-8">
                                        <div className="w-20 h-20 rounded-full border-[1.5px] border-[var(--accent)]/20 flex items-center justify-center bg-[var(--accent)]/5">
                                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-[var(--accent)] opacity-80">
                                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                                <polyline points="14 2 14 8 20 8" />
                                                <line x1="16" y1="13" x2="8" y2="13" />
                                                <line x1="16" y1="17" x2="8" y2="17" />
                                                <line x1="10" y1="9" x2="8" y2="9" />
                                            </svg>
                                        </div>
                                    </div>

                                    <div className="w-full">
                                        <p className="text-[10px] uppercase tracking-widest text-[var(--muted)] mb-3 opacity-60 font-medium text-center">
                                            Suggested Searches
                                        </p>
                                        <div className="flex flex-wrap justify-center gap-2">
                                            {quickPrompts.map((prompt) => (
                                                <button
                                                    key={prompt}
                                                    onClick={() => handleQuickPrompt(prompt)}
                                                    className="px-3 py-1.5 rounded-full border border-[var(--border)] text-[11px] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--foreground)] hover:bg-[var(--accent)]/5 transition-all bg-[var(--card)]/50"
                                                >
                                                    {prompt}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`flex ${message.role === 'user' ? 'justify-end' :
                                        message.role === 'system' ? 'justify-center' : 'justify-start'
                                        }`}
                                >
                                    <div
                                        className={`max-w-[85%] px-3 py-2 rounded-xl text-xs ${message.role === 'user'
                                            ? `bg-[var(--accent)] text-black rounded-br-sm`
                                            : message.role === 'system'
                                                ? 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border border-yellow-500/30'
                                                : `${isLightMode ? 'bg-black/5 text-black' : 'bg-white/5 text-[var(--foreground)]'} rounded-bl-sm`
                                            }`}
                                    >
                                        {message.role === 'user' ? (
                                            <span className="whitespace-pre-wrap leading-relaxed">{message.content}</span>
                                        ) : (
                                            <ReactMarkdown
                                                components={{
                                                    p: ({ node, ...props }) => <p className={`my-2 leading-relaxed ${isLightMode ? 'text-black' : ''}`} {...props} />,
                                                    strong: ({ node, ...props }) => <strong className={`font-bold ${isLightMode ? 'text-[var(--accent)]' : 'text-[var(--accent)]'}`} {...props} />,
                                                    ul: ({ node, ...props }) => <ul className={`list-disc list-inside my-2 space-y-1 ${isLightMode ? 'text-black' : ''}`} {...props} />,
                                                    ol: ({ node, ...props }) => <ol className={`list-decimal list-inside my-2 space-y-1 ${isLightMode ? 'text-black' : ''}`} {...props} />,
                                                    li: ({ node, ...props }) => <li className={`my-0.5 ${isLightMode ? 'text-black' : ''}`} {...props} />,
                                                    code: ({ node, inline, ...props }) =>
                                                        inline
                                                            ? <code className="bg-[var(--accent)]/20 px-1.5 py-0.5 rounded text-xs font-mono" {...props} />
                                                            : <code className="block bg-[var(--accent)]/10 p-2 rounded my-2 text-xs font-mono" {...props} />,
                                                    h1: ({ node, ...props }) => <h1 className="text-base font-bold my-2 text-[var(--accent)]" {...props} />,
                                                    h2: ({ node, ...props }) => <h2 className="text-sm font-bold my-1.5 text-[var(--accent)]" {...props} />,
                                                    h3: ({ node, ...props }) => <h3 className="text-xs font-bold my-1 text-[var(--accent)]" {...props} />,
                                                }}
                                            >
                                                {message.content}
                                            </ReactMarkdown>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {isThinking && (
                                <div className="flex justify-start">
                                    <div className={`px-3 py-2 rounded-xl ${isLightMode ? 'bg-black/5' : 'bg-white/5'}`}>
                                        <div className="flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full animate-bounce" />
                                            <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                                            <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <form
                            onSubmit={handleSubmit}
                            className={`p-3 border-t border-[var(--border)] ${isDarkMode ? 'bg-gradient-to-r from-[var(--accent-dark)]/30 to-black' : 'bg-gradient-to-r from-[var(--accent-dark)]/90 to-black/90'}`}
                        >
                            <div className="flex items-center gap-2">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Ask about my skills..."
                                    disabled={isThinking}
                                    className={`flex-1 px-3 py-2 rounded-full bg-transparent border border-[var(--border)] text-xs ${isLightMode ? 'text-[var(--accent)]' : 'text-white'} placeholder:font-bold placeholder:text-transparent placeholder:bg-clip-text placeholder:bg-gradient-to-r placeholder:from-white placeholder:to-[var(--accent)] focus:outline-none focus:border-[var(--accent)] transition-colors`}
                                />


                                <button
                                    type="submit"
                                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all border border-[var(--border)] ${inputValue.trim() && !isThinking
                                        ? `${isDarkMode ? 'bg-gradient-to-r from-[var(--accent-dark)]/30 to-black' : 'bg-gradient-to-r from-[var(--accent-dark)]/90 to-black/90'} text-white hover:scale-105 shadow-[0_0_15px_var(--accent-soft)]`
                                        : 'bg-transparent text-[var(--muted)] cursor-not-allowed opacity-50'
                                        }`}
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="#f5f5f5" />
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence >
        </>
    );
};
