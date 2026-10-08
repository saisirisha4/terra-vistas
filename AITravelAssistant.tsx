import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Bot, User, X, MessageSquare, ChevronRight, HelpCircle } from 'lucide-react';
import { formatINR } from '../utils/pricing';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  suggestions?: string[];
}

interface AITravelAssistantProps {
  currentDestination?: string;
  onSelectDestination?: (destName: string) => void;
  isOpenDefault?: boolean;
}

export const AITravelAssistant: React.FC<AITravelAssistantProps> = ({
  currentDestination = 'Araku Valley',
  onSelectDestination,
  isOpenDefault = false,
}) => {
  const [isOpen, setIsOpen] = useState(isOpenDefault);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-welcome',
      sender: 'ai',
      text: `Hello! I am your TERRA VISTAS AI Travel Assistant. How can I help you plan your shared group journey? Ask me about group savings, Araku Valley itineraries, or finding matching travelers!`,
      timestamp: 'Just now',
      suggestions: [
        'I want a low-budget 2-day trip to Araku.',
        'Why does a group save money on hotels and travel?',
        'What attractions in Araku have group ticket discounts?',
        'How does TERRA VISTAS group cost calculation work?',
      ],
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Provide intelligent contextual response
    setTimeout(() => {
      let reply = '';
      let suggestions: string[] | undefined;

      const lower = textToSend.toLowerCase();

      if (lower.includes('low-budget') || lower.includes('low budget') || lower.includes('budget') && lower.includes('araku')) {
        reply = `Based on your budget, consider joining our existing Araku Valley community groups! 
        
A group of 18–30+ travelers can bring the estimated cost down from the solo baseline of ₹3,800 to approximately ₹2,350 – ₹2,600 per person.

Recommended 2-day itinerary:
• Day 1: Board the scenic Vistadome morning train, check into partner Haritha Cottages (saving ~30% in bulk), visit the Tribal Museum and Coffee Plantation.
• Day 2: Shared 4x4 safari jeep to Katiki Waterfalls, illuminated Borra Caves fast-track group pass, and return via shared coach.

Would you like to view our October 20 or October 22 Araku groups?`;
        suggestions = ['Show Araku October 20 Group', 'Compare Solo vs Group cost'];
      } else if (lower.includes('why') && (lower.includes('save') || lower.includes('cheaper') || lower.includes('discount'))) {
        reply = `Here is why TERRA VISTAS unlocks major potential savings:

1. Shared Chartered Transport: Renting a 20-passenger Force Traveler or AC bus costs far less per seat than hiring solo taxis or private cars.
2. Group Accommodation Deals: Hotels like Haritha Valley Resort give 25%–35% bulk booking rebates for 10+ beds.
3. Group Dining Packages: Restaurants offer pre-fixed tribal thalis and buffets at ₹650 vs ₹800 standard solo dining.
4. Fast-Track Attraction Passes: Tourist boards give group rates for places like Borra Caves and boat cruises.

Important: Normal train tickets do not become cheaper simply because more people join; savings come from shared logistics and partner vendor volume!`;
        suggestions = ['Calculate savings for 20 travelers', 'Plan My Trip now'];
      } else if (lower.includes('araku') && lower.includes('attraction')) {
        reply = `Top attractions in Araku Valley with partner group discounts on TERRA VISTAS:
• Borra Caves: Million-year-old limestone cavern (Group pass ₹200 vs Solo ₹300).
• Katiki Waterfalls: Splendid cascading fall reached via shared 4x4 tempo (Save ₹130/person).
• Coffee Museum: Bean roasting and tasting workshop (Save 33%).
• Padmapuram Botanical Gardens & Tribal Museum: Group combo passes available.`;
        suggestions = ['Plan a trip to Araku', 'View Araku details page'];
      } else if (lower.includes('calculation') || lower.includes('algorithm') || lower.includes('work')) {
        reply = `Our dynamic group pricing uses a progressive diminishing-discount curve:
• 1 traveler (Solo): ₹3,800 baseline
• 5 travelers: ~₹3,400/person (Save ₹400)
• 10 travelers: ~₹3,000/person (Save ₹800)
• 18–20 travelers: ~₹2,600/person (Save ₹1,200)
• 30–32 travelers: ~₹2,350/person (Save ₹1,450)
• 50 travelers: ~₹2,100/person (Save ₹1,700)

As soon as a new member clicks 'Join Group', our platform instantly recalculates the estimated group cost and potential savings!`;
        suggestions = ['Try interactive calculator slider', 'Find matching groups'];
      } else {
        reply = `Great travel query! On TERRA VISTAS, grouping with travelers heading to ${currentDestination} helps everyone pay less on transport, hotels, and activities. 

Tell me your travel date, target budget, or destination preference, and I will recommend the highest-savings group opportunity!`;
        suggestions = ['Find groups for October 2026', 'Suggest top destinations'];
      }

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white p-3.5 rounded-full shadow-2xl flex items-center gap-2 border-2 border-white/40 transition-transform duration-200 hover:scale-105 group"
          title="Ask AI Travel Assistant"
        >
          <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
          <span className="text-xs font-bold tracking-wide pr-1 hidden sm:inline">
            AI Travel Assistant
          </span>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-300 animate-ping" />
        </button>
      )}

      {/* Chat Window Modal */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[94vw] sm:w-[420px] max-h-[600px] h-[550px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm text-white">TERRA VISTAS AI Assistant</h3>
                  <span className="text-[10px] bg-emerald-500/30 text-emerald-300 px-1.5 py-0.2 rounded font-semibold">
                    Live
                  </span>
                </div>
                <p className="text-[11px] text-slate-300">Group Savings & Itinerary Guide</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 shadow-xs whitespace-pre-line leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-emerald-600 text-white rounded-br-xs'
                      : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs'
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 px-1">{m.timestamp}</span>

                {/* Quick suggestions */}
                {m.suggestions && (
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {m.suggestions.map((sug, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleSend(sug)}
                        className="text-[11px] bg-white hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 border border-slate-200 text-slate-700 px-2.5 py-1 rounded-full transition-colors flex items-center gap-1"
                      >
                        <ChevronRight className="w-3 h-3 text-emerald-500" />
                        {sug}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400 p-2 bg-white rounded-xl border border-slate-200/60 w-fit">
                <Bot className="w-4 h-4 text-emerald-600 animate-spin" />
                <span className="text-xs">Analyzing group rates...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about group discounts, Araku, Ooty..."
                className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 placeholder:text-slate-400"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="p-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white rounded-xl transition-colors shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
