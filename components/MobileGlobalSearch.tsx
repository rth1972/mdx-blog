"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Search as SearchIcon, FileText, MessageSquare, X, CornerDownLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface MobileGlobalSearchProps {
  onCloseMobile?: () => void;
}

export default function MobileGlobalSearch({ onCloseMobile }: MobileGlobalSearchProps) {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Search Logic
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

  const handleClose = () => {
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  const handleSelect = (item: any) => {
    handleClose();
    router.push(`/posts/${item.id}`);
  };

  // Add ESC key handler and arrow navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
      
      if (results.length > 0) {
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
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [results, activeIndex]);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-[15vh] p-4">
      {/* Glass Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/80 backdrop-blur-md animate-in fade-in duration-200 h-screen"
        onClick={handleClose} 
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
            onChange={(e) => {
              setTerm(e.target.value);
              setActiveIndex(0);
            }}
          />
          {loading ? (
            <div className="w-5 h-5 border-2 border-gray-200 border-t-titans-red rounded-full animate-spin" />
          ) : (
            <button onClick={handleClose} className="p-1 hover:bg-gray-100 rounded-md">
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
    document.body
  );
}

