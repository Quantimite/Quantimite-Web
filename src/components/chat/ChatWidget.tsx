"use client";

import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";
import { useChat } from "@/context/ChatContext";
import {
  Send,
  X,
  RotateCcw,
  MessageCircle,
  Layers,
  Rocket,
  Cpu,
  Calendar,
  ArrowUpRight,
} from "lucide-react";
import Logo from "@/components/layout/Logo";

const QUICK_ACTIONS = [
  { label: "Our Services", prompt: "What services do you offer?", icon: Layers },
  { label: "Start a Project", prompt: "How can I start a project with Quantimite?", icon: Rocket },
  { label: "Tech Stack", prompt: "What tech stack do you use?", icon: Cpu },
  { label: "Book a Call", prompt: "How do I book a consultation or get a quote?", icon: Calendar },
];

export default function ChatWidget() {
  const { isOpen, openChat, closeChat, messages, isLoading, sendMessage, clearMessages } = useChat();
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 120);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;
    const text = inputText;
    setInputText("");
    sendMessage(text);
  };

  return (
    <>
      {/* Floating Trigger Pill */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 12 }}
            transition={{ type: "spring", stiffness: 360, damping: 28 }}
            onClick={openChat}
            aria-label="Open Chat"
            className="btn-fill fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold cursor-pointer shadow-lg shadow-violet/20"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Let&apos;s Chat</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Compact Apple-Style Translucent Glass Chat Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 18 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="fixed bottom-5 right-5 z-50 flex flex-col w-[calc(100vw-2.5rem)] max-w-[345px] h-[465px] rounded-[26px] overflow-hidden bg-white/85 backdrop-blur-2xl border border-white/85 shadow-2xl shadow-violet/25 text-plum"
          >
            {/* 1. TOP HEADER BAR */}
            <div className="flex items-center justify-between px-4 py-3 shrink-0 border-b border-plum/10 bg-white/50 backdrop-blur-md">
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-full p-1 bg-plum/5 border border-plum/10">
                  <Logo className="h-4 w-auto" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-extrabold tracking-tight text-plum">
                    Quantimite
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={clearMessages}
                  title="Reset chat"
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-plum/5 text-plum/70 hover:text-plum hover:bg-plum/10 transition-colors cursor-pointer"
                >
                  <RotateCcw className="h-3 w-3" />
                </button>
                <button
                  onClick={closeChat}
                  title="Close"
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-plum/5 text-plum/70 hover:text-plum hover:bg-plum/10 transition-colors cursor-pointer"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* 2. STRUCTURED CONTENT STREAM */}
            <div className="flex-1 overflow-y-auto px-3.5 py-3 space-y-3 text-xs scrollbar-thin">
              {/* Structured Intro Card & 2x2 Action Grid (shown before user sends first message) */}
              {messages.length === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2.5"
                >
                  <div className="rounded-[20px] p-3.5 text-center space-y-1 bg-white/70 border border-white/90 shadow-sm backdrop-blur-md">
                    <p className="text-xs font-extrabold text-plum">
                      We engineer your next move.
                    </p>
                    <p className="text-[11px] text-plum/70 leading-relaxed">
                      Ask anything about our software, design, or growth services.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5">
                    {QUICK_ACTIONS.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.label}
                          onClick={() => sendMessage(item.prompt)}
                          disabled={isLoading}
                          className="flex items-center gap-2 rounded-[14px] px-2.5 py-2 text-left cursor-pointer group bg-white/70 border border-white/90 hover:bg-white hover:border-violet/30 transition-all shadow-xs"
                        >
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-brand text-white shadow-xs">
                            <Icon className="h-3 w-3" />
                          </div>
                          <span className="text-[11px] font-semibold text-plum leading-tight">
                            {item.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Conversation Thread (skip default welcome bubble when intro card is shown) */}
              {messages
                .filter((_, idx) => messages.length > 1 || idx > 0)
                .map((msg) => {
                  const isUser = msg.role === "user";
                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                    >
                      <div
                        className={`rounded-[18px] leading-relaxed ${isUser
                            ? "bg-gradient-to-r from-violet to-azure text-white max-w-[82%] px-3.5 py-2 rounded-br-[6px] shadow-sm"
                            : "w-[94%] p-3 text-ink bg-white/80 border border-white shadow-sm rounded-bl-[6px]"
                          }`}
                      >
                        {isUser ? (
                          <p className="whitespace-pre-wrap font-medium">{msg.content}</p>
                        ) : (
                          <div className="space-y-2">
                            <ReactMarkdown
                              components={{
                                p: ({ children }) => (
                                  <p className="text-[11.5px] leading-relaxed text-ink/95 last:mb-0">
                                    {children}
                                  </p>
                                ),
                                h3: ({ children }) => (
                                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-violet pt-1 pb-0.5 border-b border-plum/10">
                                    {children}
                                  </div>
                                ),
                                h4: ({ children }) => (
                                  <div className="text-[11px] font-bold text-plum pt-1">
                                    {children}
                                  </div>
                                ),
                                ul: ({ children }) => (
                                  <ul className="space-y-1.5 my-1.5">{children}</ul>
                                ),
                                ol: ({ children }) => (
                                  <ol className="space-y-1.5 my-1.5">{children}</ol>
                                ),
                                li: ({ children }) => (
                                  <li className="rounded-xl bg-white/90 border border-plum/10 px-2.5 py-1.5 text-[11px] leading-snug text-ink/90 shadow-xs flex items-start gap-2">
                                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand shrink-0" />
                                    <div className="flex-1">{children}</div>
                                  </li>
                                ),
                                strong: ({ children }) => (
                                  <strong className="font-bold text-plum">{children}</strong>
                                ),
                                a: ({ href, children }) => (
                                  <a
                                    href={href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-0.5 font-semibold text-azure underline underline-offset-2 hover:text-violet"
                                  >
                                    <span>{children}</span>
                                    <ArrowUpRight className="h-2.5 w-2.5" />
                                  </a>
                                ),
                              }}
                            >
                              {msg.content}
                            </ReactMarkdown>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}

              {/* Loading Indicator */}
              {isLoading && (
                <div className="inline-flex items-center gap-1.5 rounded-[16px] rounded-bl-[6px] px-3.5 py-2.5 bg-white/80 border border-white shadow-xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet animate-bounce [animation-delay:-0.3s]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-azure animate-bounce [animation-delay:-0.15s]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-plum/45 animate-bounce" />
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* 3. BOTTOM FLOATING CAPSULE INPUT */}
            <div className="p-3 pt-1.5 shrink-0 bg-white/40 backdrop-blur-md border-t border-plum/10">
              <form
                onSubmit={handleSubmit}
                className="flex items-center gap-1.5 rounded-full pl-3.5 pr-1.5 py-1 bg-white/90 border border-plum/15 shadow-inner"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Ask a question..."
                  disabled={isLoading}
                  className="flex-1 bg-transparent py-1 text-xs text-ink placeholder-plum/45 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim() || isLoading}
                  aria-label="Send"
                  className="btn-fill flex h-7 w-7 shrink-0 items-center justify-center rounded-full disabled:opacity-35 cursor-pointer shadow-xs"
                >
                  <Send className="h-3 w-3" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}