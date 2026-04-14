"use client";

import { useState, useRef, useEffect, useCallback } from "react";

// ─── Palette ────────────────────────────────────────
const C = {
    gold: "#C9A84C",
    goldLight: "#E8C97A",
    goldAlpha10: "rgba(201,168,76,0.10)",
    goldAlpha08: "rgba(201,168,76,0.08)",
    goldAlpha12: "rgba(201,168,76,0.12)",
    goldAlpha18: "rgba(201,168,76,0.18)",
    goldAlpha20: "rgba(201,168,76,0.20)",
    goldAlpha30: "rgba(201,168,76,0.30)",
    goldAlpha40: "rgba(201,168,76,0.40)",
    goldAlpha45: "rgba(201,168,76,0.45)",
    goldAlpha55: "rgba(201,168,76,0.55)",
    goldAlpha60: "rgba(201,168,76,0.60)",
    goldAlpha65: "rgba(201,168,76,0.65)",
    goldAlpha80: "rgba(201,168,76,0.80)",
    goldAlpha07: "rgba(201,168,76,0.07)",
    goldAlpha09: "rgba(201,168,76,0.09)",
    ink: "#0A0A0F",
    chapter: "#0F0F17",
    parchment: "#F5ECD7",
    parchment92: "rgba(245,236,215,0.92)",
    parchment85: "rgba(245,236,215,0.85)",
    fog: "#8B8B9A",
    white04: "rgba(255,255,255,0.04)",
    white015: "rgba(255,255,255,0.015)",
    white012: "rgba(255,255,255,0.012)",
    black75: "rgba(0,0,0,0.75)",
    black50: "rgba(0,0,0,0.5)",
    green: "#4ade80",
};

// ─── Keyframes injected once ────────────────────────
const KEYFRAMES = `
  @keyframes chatDotBounce {
    0%,80%,100% { transform:scale(0.6); opacity:0.3; }
    40%         { transform:scale(1.3); opacity:1;   }
  }
  @keyframes chatCursorBlink {
    0%,100% { opacity:1; }
    50%     { opacity:0; }
  }
  @keyframes chatMsgSlide {
    from { opacity:0; transform:translateY(12px); }
    to   { opacity:1; transform:translateY(0);    }
  }
  @keyframes chatWindowOpen {
    from { opacity:0; transform:translateY(20px) scale(0.95); }
    to   { opacity:1; transform:translateY(0)    scale(1);    }
  }
  @keyframes chatFabGlow {
    0%,100% { box-shadow:0 0 14px rgba(201,168,76,0.30),0 0 36px rgba(201,168,76,0.10); }
    50%     { box-shadow:0 0 28px rgba(201,168,76,0.65),0 0 60px rgba(201,168,76,0.22); }
  }
  @keyframes chatFabFloat {
    0%,100% { transform:translateY(0px);  }
    50%     { transform:translateY(-5px); }
  }
  @keyframes chatPulseRing {
    0%   { transform:scale(1);   opacity:0.7; }
    100% { transform:scale(2.1); opacity:0;   }
  }
  @keyframes chatTooltipIn {
    from { opacity:0; transform:translateY(6px); }
    to   { opacity:1; transform:translateY(0);   }
  }
  @keyframes chatIconGlow {
    0%,100% { box-shadow:0 0 10px rgba(201,168,76,0.25); }
    50%     { box-shadow:0 0 26px rgba(201,168,76,0.55); }
  }
  @keyframes chatSpin {
    to { transform:rotate(360deg); }
  }
`;

// ─── Types ───────────────────────────────────────────
interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    streaming?: boolean;
}

// ─── Sparkle / AI icon ──────────────────────────────
function SparkleIcon({ size = 16 }: { size?: number }) {
    return (
        <svg
            width={size} height={size}
            viewBox="0 0 24 24" fill="none"
            stroke={C.gold} strokeWidth={1.8}
            strokeLinecap="round" strokeLinejoin="round"
        >
            <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            <path d="M18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
        </svg>
    );
}

// ─── Blinking stream cursor ──────────────────────────
function StreamCursor() {
    return (
        <span style={{
            display: "inline-block",
            width: "2px", height: "14px",
            background: C.gold,
            verticalAlign: "middle",
            marginLeft: "3px",
            animation: "chatCursorBlink 0.8s step-end infinite",
        }} />
    );
}

// ─── Three-dot typing indicator ─────────────────────
function TypingDots() {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: "5px", padding: "2px 2px" }}>
            {[0, 1, 2].map((i) => (
                <span key={i} style={{
                    width: "7px", height: "7px",
                    borderRadius: "50%",
                    background: C.goldAlpha65,
                    display: "inline-block",
                    animation: "chatDotBounce 1.3s ease-in-out infinite",
                    animationDelay: `${i * 0.18}s`,
                }} />
            ))}
        </div>
    );
}

// ─── AI avatar circle ────────────────────────────────
function Avatar({ size = 28 }: { size?: number }) {
    return (
        <div style={{
            flexShrink: 0,
            width: `${size}px`, height: `${size}px`,
            borderRadius: "50%",
            border: `1px solid ${C.goldAlpha40}`,
            background: C.goldAlpha08,
            display: "flex", alignItems: "center", justifyContent: "center",
        }}>
            <SparkleIcon size={Math.round(size * 0.5)} />
        </div>
    );
}

// ─── Message bubble ──────────────────────────────────
function MessageBubble({ msg }: { msg: Message }) {
    const isUser = msg.role === "user";
    return (
        <div style={{
            display: "flex", width: "100%",
            justifyContent: isUser ? "flex-end" : "flex-start",
            animation: "chatMsgSlide 0.3s cubic-bezier(0.23,1,0.32,1) forwards",
        }}>
            {!isUser && (
                <div style={{ marginRight: "8px", marginTop: "2px" }}>
                    <Avatar size={28} />
                </div>
            )}
            <div style={{
                maxWidth: "78%",
                padding: "10px 14px",
                fontSize: "13.5px",
                lineHeight: "1.6",
                fontFamily: "'DM Sans', sans-serif",
                wordBreak: "break-word",
                ...(isUser ? {
                    background: C.gold,
                    color: C.ink,
                    fontWeight: 500,
                } : {
                    background: C.white04,
                    border: `1px solid ${C.goldAlpha12}`,
                    color: C.parchment92,
                }),
            }}>
                {msg.content}
                {msg.streaming && <StreamCursor />}
            </div>
        </div>
    );
}

// ─── Suggested chip ──────────────────────────────────
function Chip({ label, onClick }: { label: string; onClick: () => void }) {
    const [hov, setHov] = useState(false);
    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            style={{
                textAlign: "left",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "10px",
                letterSpacing: "0.04em",
                color: hov ? C.gold : C.goldAlpha65,
                border: `1px solid ${hov ? C.goldAlpha55 : C.goldAlpha18}`,
                background: hov ? C.goldAlpha07 : "transparent",
                padding: "6px 10px",
                cursor: "pointer",
                lineHeight: 1.4,
                transition: "all 0.2s ease",
            }}
        >
            {label}
        </button>
    );
}

// ─── Suggested prompts ───────────────────────────────
const SUGGESTED = [
    "What is Rishabh's tech stack?",
    "Tell me about his research",
    "Is he open to internships?",
    "What projects has he built?",
];

// ─── Main component ──────────────────────────────────
export default function ChatSection() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [pulsed, setPulsed] = useState(false);
    const [fabHov, setFabHov] = useState(false);
    const [closeHov, setCloseHov] = useState(false);

    const bottomRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const abortRef = useRef<AbortController | null>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    useEffect(() => {
        if (open) {
            setTimeout(() => inputRef.current?.focus(), 280);
            setPulsed(true);
        }
    }, [open]);

    const sendMessage = async (text: string) => {
        const trimmed = text.trim();
        if (!trimmed || loading) return;
        setInput("");

        const userMsg: Message = { id: `u${Date.now()}`, role: "user", content: trimmed };
        setMessages((prev) => [...prev, userMsg]);
        setLoading(true);

        const aId = `a${Date.now()}`;
        setMessages((prev) => [...prev, { id: aId, role: "assistant", content: "", streaming: true }]);

        abortRef.current = new AbortController();

        try {
            // ════════════════════════════════════════════════════
            // ════════════════════════════════════════════════════
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                signal: abortRef.current.signal,
                body: JSON.stringify({
                    question: trimmed,
                }),
            });

            const data = await res.json();
            const fullText = data?.answer ?? "Sorry, I couldn't get a response right now.";

            // Character-by-character stream animation
            let i = 0;
            const tick = setInterval(() => {
                if (i < fullText.length) {
                    i++;
                    setMessages((prev) =>
                        prev.map((m) => m.id === aId ? { ...m, content: fullText.slice(0, i), streaming: true } : m)
                    );
                } else {
                    clearInterval(tick);
                    setMessages((prev) =>
                        prev.map((m) => m.id === aId ? { ...m, streaming: false } : m)
                    );
                }
            }, 11);

        } catch (err: unknown) {
            if (err instanceof Error && err.name === "AbortError") return;
            setMessages((prev) =>
                prev.map((m) => m.id === aId
                    ? { ...m, content: "Something went wrong — please try again.", streaming: false }
                    : m
                )
            );
        } finally {
            setLoading(false);
        }
    };

    const handleKey = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); }
    };

    const isEmpty = messages.length === 0;

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />

            {/* Fixed wrapper */}
            <div style={{
                position: "fixed", bottom: "24px", right: "24px",
                zIndex: 999,
                display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "12px",
                pointerEvents: "none",
            }}>

                {/* ══ CHAT WINDOW ══════════════════════════════════ */}
                {open && (
                    <div style={{
                        pointerEvents: "auto",
                        width: "340px", maxWidth: "calc(100vw - 32px)",
                        height: "460px",
                        display: "flex", flexDirection: "column",
                        background: C.chapter,
                        border: `1px solid ${C.goldAlpha20}`,
                        boxShadow: `0 24px 64px ${C.black75}, 0 0 0 1px rgba(201,168,76,0.06)`,
                        overflow: "hidden",
                        animation: "chatWindowOpen 0.32s cubic-bezier(0.23,1,0.32,1) forwards",
                    }}>

                        {/* Header */}
                        <div style={{
                            display: "flex", alignItems: "center", gap: "12px",
                            padding: "12px 16px",
                            borderBottom: `1px solid ${C.goldAlpha12}`,
                            background: C.white015,
                            flexShrink: 0,
                        }}>
                            {/* Avatar + online dot */}
                            <div style={{ position: "relative", flexShrink: 0 }}>
                                <div style={{
                                    width: "32px", height: "32px",
                                    borderRadius: "50%",
                                    border: `1px solid ${C.goldAlpha45}`,
                                    background: C.goldAlpha09,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                }}>
                                    <SparkleIcon size={16} />
                                </div>
                                <span style={{
                                    position: "absolute", bottom: "-1px", right: "-1px",
                                    width: "10px", height: "10px",
                                    borderRadius: "50%",
                                    background: C.green,
                                    border: `2px solid ${C.chapter}`,
                                }} />
                            </div>

                            {/* Title block */}
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <p style={{
                                    fontFamily: "'Playfair Display', serif",
                                    fontSize: "14px", color: C.parchment,
                                    fontWeight: 600, lineHeight: 1, margin: 0,
                                }}>
                                    Ask Rishabh&apos;s AI
                                </p>
                                <p style={{
                                    fontFamily: "'JetBrains Mono', monospace",
                                    fontSize: "10px", color: C.goldAlpha60,
                                    letterSpacing: "0.05em", margin: "4px 0 0",
                                }}>
                                    Always online
                                </p>
                            </div>

                            {/* Close button */}
                            <button
                                onClick={() => setOpen(false)}
                                onMouseEnter={() => setCloseHov(true)}
                                onMouseLeave={() => setCloseHov(false)}
                                style={{
                                    background: "none", border: "none", cursor: "pointer",
                                    color: closeHov ? C.parchment : "rgba(139,139,154,0.45)",
                                    padding: "4px",
                                    display: "flex", alignItems: "center",
                                    flexShrink: 0,
                                    transition: "color 0.2s",
                                }}
                            >
                                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Messages scroll area */}
                        <div style={{
                            flex: 1,
                            overflowY: "auto",
                            padding: "12px",
                            display: "flex", flexDirection: "column", gap: "12px",
                            scrollbarWidth: "thin",
                            scrollbarColor: `${C.goldAlpha18} transparent`,
                        }}>

                            {/* Welcome / empty state */}
                            {isEmpty && (
                                <div style={{
                                    display: "flex", flexDirection: "column",
                                    alignItems: "center", justifyContent: "center",
                                    height: "100%", gap: "16px", paddingBottom: "8px",
                                }}>
                                    {/* Pulsing icon */}
                                    <div style={{
                                        width: "52px", height: "52px",
                                        borderRadius: "50%",
                                        border: `1px solid ${C.goldAlpha30}`,
                                        background: C.goldAlpha07,
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        animation: "chatIconGlow 2.5s ease-in-out infinite",
                                    }}>
                                        <SparkleIcon size={24} />
                                    </div>

                                    <div style={{ textAlign: "center" }}>
                                        <p style={{
                                            fontFamily: "'Playfair Display', serif",
                                            fontSize: "14px", color: C.parchment85,
                                            fontWeight: 600, margin: "0 0 6px",
                                        }}>
                                            Hi there 👋
                                        </p>
                                        <p style={{
                                            fontFamily: "'DM Sans', sans-serif",
                                            fontSize: "12px", color: C.fog,
                                            lineHeight: 1.5, maxWidth: "210px", margin: 0,
                                        }}>
                                            Ask me anything about Rishabh — his skills, projects, or experience.
                                        </p>
                                    </div>

                                    {/* Suggested chips 2×2 grid */}
                                    <div style={{
                                        display: "grid",
                                        gridTemplateColumns: "1fr 1fr",
                                        gap: "6px",
                                        width: "100%", padding: "0 4px",
                                    }}>
                                        {SUGGESTED.map((s) => (
                                            <Chip key={s} label={s} onClick={() => sendMessage(s)} />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Rendered messages */}
                            {messages.map((msg) => (
                                <MessageBubble key={msg.id} msg={msg} />
                            ))}

                            {/* Typing dots — shown briefly before first assistant character */}
                            {loading && messages[messages.length - 1]?.role === "user" && (
                                <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-start" }}>
                                    <div style={{ marginRight: "8px", marginTop: "2px" }}>
                                        <Avatar size={28} />
                                    </div>
                                    <div style={{
                                        background: C.white04,
                                        border: `1px solid ${C.goldAlpha12}`,
                                        padding: "10px 14px",
                                    }}>
                                        <TypingDots />
                                    </div>
                                </div>
                            )}

                            <div ref={bottomRef} />
                        </div>

                        {/* Quick chip row after first message */}
                        {!isEmpty && !loading && (
                            <div style={{
                                display: "flex", gap: "6px",
                                padding: "0 12px 6px",
                                flexWrap: "wrap", flexShrink: 0,
                            }}>
                                {SUGGESTED.slice(0, 2).map((s) => (
                                    <Chip key={s} label={s} onClick={() => sendMessage(s)} />
                                ))}
                            </div>
                        )}

                        {/* Input bar */}
                        <div style={{
                            display: "flex", alignItems: "center", gap: "8px",
                            padding: "10px 12px",
                            borderTop: `1px solid ${C.goldAlpha12}`,
                            background: C.white012,
                            flexShrink: 0,
                        }}>
                            <input
                                ref={inputRef}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKey}
                                placeholder="Ask something..."
                                disabled={loading}
                                style={{
                                    flex: 1,
                                    background: "transparent", border: "none", outline: "none",
                                    fontFamily: "'DM Sans', sans-serif",
                                    fontSize: "13.5px",
                                    color: C.parchment,
                                    opacity: loading ? 0.5 : 1,
                                }}
                            />

                            {/* Send / spinner button */}
                            <button
                                onClick={() => sendMessage(input)}
                                disabled={!input.trim() || loading}
                                style={{
                                    flexShrink: 0,
                                    width: "32px", height: "32px",
                                    borderRadius: "50%",
                                    border: "none",
                                    cursor: input.trim() && !loading ? "pointer" : "not-allowed",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    background: input.trim() && !loading ? C.gold : C.goldAlpha10,
                                    color: input.trim() && !loading ? C.ink : C.gold,
                                    opacity: !input.trim() || loading ? 0.45 : 1,
                                    transition: "all 0.2s ease",
                                }}
                            >
                                {loading ? (
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                        style={{ animation: "chatSpin 0.8s linear infinite" }}
                                    >
                                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
                                        <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                                    </svg>
                                ) : (
                                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor" strokeWidth={2.5}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                )}

                {/* ══ FAB BUTTON ═══════════════════════════════════ */}
                <div style={{
                    pointerEvents: "auto",
                    position: "relative",
                    display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px",
                }}>

                    {/* Tooltip — only when closed */}
                    {!open && (
                        <div style={{
                            display: "flex", alignItems: "center", gap: "8px",
                            background: C.chapter,
                            border: `1px solid ${C.goldAlpha20}`,
                            padding: "6px 12px",
                            boxShadow: `0 8px 24px ${C.black50}`,
                            animation: "chatTooltipIn 0.35s ease forwards",
                        }}>
                            <span style={{
                                width: "6px", height: "6px", borderRadius: "50%",
                                background: C.green, flexShrink: 0,
                                animation: "chatDotBounce 1.8s ease-in-out infinite",
                            }} />
                            <span style={{
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: "11px", color: C.goldAlpha80,
                                letterSpacing: "0.06em", whiteSpace: "nowrap",
                            }}>
                                Ask me anything
                            </span>
                        </div>
                    )}

                    {/* Attention pulse rings — disappear after first open */}
                    {!pulsed && (
                        <>
                            <span style={{
                                position: "absolute", inset: 0,
                                borderRadius: "50%",
                                border: `1px solid ${C.goldAlpha55}`,
                                pointerEvents: "none",
                                animation: "chatPulseRing 2s ease-out infinite",
                            }} />
                            <span style={{
                                position: "absolute", inset: 0,
                                borderRadius: "50%",
                                border: `1px solid ${C.goldAlpha30}`,
                                pointerEvents: "none",
                                animation: "chatPulseRing 2s ease-out infinite 0.65s",
                            }} />
                        </>
                    )}

                    {/* The FAB */}
                    <button
                        onClick={() => setOpen((o) => !o)}
                        onMouseEnter={() => setFabHov(true)}
                        onMouseLeave={() => setFabHov(false)}
                        aria-label={open ? "Close chat" : "Open AI chat"}
                        style={{
                            width: "56px", height: "56px",
                            borderRadius: "50%",
                            border: `1px solid ${open ? C.gold : C.goldAlpha55}`,
                            background: open ? C.gold : fabHov ? "rgba(201,168,76,0.12)" : C.ink,
                            color: open ? C.ink : C.gold,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            cursor: "pointer",
                            transform: open ? "rotate(45deg)" : "rotate(0deg)",
                            transition: "background 0.25s, border-color 0.25s, color 0.25s, transform 0.3s cubic-bezier(0.23,1,0.32,1)",
                            animation: !open
                                ? "chatFabGlow 2.5s ease-in-out infinite, chatFabFloat 2.8s ease-in-out infinite"
                                : "chatFabGlow 2.5s ease-in-out infinite",
                            userSelect: "none",
                        }}
                    >
                        {open ? (
                            <svg width="20" height="20" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor" strokeWidth={2.5}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth={1.7}
                                strokeLinecap="round" strokeLinejoin="round"
                            >
                                <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                                <path d="M18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
        </>
    );
}
