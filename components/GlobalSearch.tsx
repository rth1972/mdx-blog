"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom"; // Added for Portal support
import { Search as SearchIcon, FileText, MessageSquare, CornerDownLeft, X, Command } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface GlobalSearchProps {
  onCloseMobile?: () => void;
}

export default function GlobalSearch({ onCloseMobile }: GlobalSearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false); // Needed to handle hydration
  const router = useRouter();

useEffect(() => {
    setMounted(true);
  }, []);

  // 1. Toggle Search with Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") setIsOpen(false);
      
      if (isOpen && results.length > 0) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setActiveIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
        }
        if (e.key === "ArrowUp") {
          e.preventDefault();
          setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
        }
        if (e.key === "Enter") {
          e.preventDefault();
          handleSelect(results[activeIndex]);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, activeIndex]);

  // 2. Fetch Results (Debounced)
  useEffect(() => {
    if (term.length < 2) {
      setResults([]);
      return;
    }
    setLoading(true);
    const delay = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(term)}`);
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(delay);
  }, [term]);

  const handleSelect = (item: any) => {
    setIsOpen(false);
    setTerm("");
    router.push(`/posts/${item.id}`);
  };

  const handleTriggerClick = () => {
    setIsOpen(true);
    // Use a tiny timeout to ensure the state updates before the parent unmounts us
    setTimeout(() => {
        if (onCloseMobile) onCloseMobile();
    }, 10);
  };
  
  return (
    <>
      {/* TRIGGER BUTTON (Sits in your Navbar exactly as before) */}
      <button 
        onClick={handleTriggerClick}
        className="flex items-center gap-3 px-4 py-2 text-gray-400 bg-gray-50 border border-gray-200 rounded-xl hover:border-gray-300 transition-all w-full max-w-sm group"
      >
        <SearchIcon className="w-4 h-4 group-hover:text-gray-600" />
        <span className="text-sm flex-1 text-left">Search...</span>
        <div className="flex items-center gap-1 text-[10px] font-sans font-bold text-gray-400 bg-white border border-gray-200 px-1.5 py-0.5 rounded-md shadow-sm">
          <Command className="w-2.5 h-2.5" /> K
        </div>
      </button>
      {isOpen && mounted && createPortal(
        <div className="fixed z-search-overlay inset-0 z-[9999] flex items-start justify-center pt-[15vh] p-4">
          {/* Glass Backdrop */}
          <div 
            className="absolute inset-0 bg-gray-900/80 backdrop-blur-md animate-in fade-in duration-200 h-screen"
            onClick={() => setIsOpen(false)} 
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden ring-1 ring-black/5 animate-in slide-in-from-top-4 duration-300">
            
            {/* Input Header */}
            <div className="flex items-center px-4 border-b border-gray-100 bg-white">
              <SearchIcon className="w-5 h-5 text-gray-400" />
              <input
                autoFocus
                className="w-full p-5 text-lg bg-transparent border-none outline-none focus:ring-0 text-gray-900 placeholder:text-gray-400"
                placeholder="Type to search posts and comments..."
                value={term}
                onChange={(e) => { setTerm(e.target.value); setActiveIndex(0); }}
              />
              {loading ? (
                <div className="w-5 h-5 border-2 border-gray-200 border-t-titans-red rounded-full animate-spin" />
              ) : (
                <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-gray-100 rounded-md">
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              )}
            </div>

            {/* Results List */}
            <div className="max-h-[60vh] overflow-y-auto p-2 scrollbar-hide">
              {term.length > 0 && results.length === 0 && !loading && (
                <div className="p-12 text-center">
                  <p className="text-sm text-gray-500 font-medium">No results found for "{term}"</p>
                  <p className="text-xs text-gray-400 mt-1">Try searching for mountain gear, routes, or base camp tips.</p>
                </div>
              )}

              {term.length < 2 && (
                 <div className="p-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                    Recent Searches
                 </div>
              )}

              {results.map((item: any, idx) => (
                <div
                  key={idx}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onClick={() => handleSelect(item)}
                  className={`flex items-center justify-between gap-3 p-3 rounded-xl cursor-pointer transition-all duration-150 ${
                    activeIndex === idx ? "bg-gray-100 scale-[0.99]" : "bg-transparent"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2.5 rounded-xl ${
                      item.type === 'post' ? 'bg-blue-50 text-blue-500' : 'bg-purple-50 text-purple-500'
                    }`}>
                      {item.type === 'post' ? <FileText className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold text-gray-900 truncate">
                        {item.heading}
                      </div>
                      <div className="text-xs text-gray-500 line-clamp-1 mt-0.5 italic">
                        {item.snippet}
                      </div>
                    </div>
                  </div>
                  
                  {activeIndex === idx && (
                    <div className="flex items-center gap-1.5 text-gray-400 pr-2 animate-in fade-in slide-in-from-right-2">
                      <span className="text-[10px] font-bold uppercase tracking-tighter">Open</span>
                      <CornerDownLeft className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-[11px] font-bold text-gray-400">
              <div className="flex gap-4">
                <span className="flex items-center gap-1.5">
                  <kbd className="bg-white border border-gray-200 px-1.5 py-0.5 rounded shadow-sm text-[9px]">↑↓</kbd> 
                  NAVIGATE
                </span>
                <span className="flex items-center gap-1.5">
                  <kbd className="bg-white border border-gray-200 px-1.5 py-0.5 rounded shadow-sm text-[9px]">ENTER</kbd> 
                  SELECT
                </span>
              </div>
              <span className="flex items-center gap-1.5">
                <kbd className="bg-white border border-gray-200 px-1.5 py-0.5 rounded shadow-sm text-[9px]">ESC</kbd> 
                CLOSE
              </span>
            </div>
          </div>
        </div>,
        document.body // Portal Target
      )}
    </>
  );
}

