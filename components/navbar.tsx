"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import { 
  LogOut, Menu, X, Plus, HelpCircle, Layout, ChevronDown, 
  CircleUser, BarChart3, CircleUserRound, ShieldUser, Search, Home, 
  MessageCircle, Award, Tag, ImageIcon, CalendarDays, MessageSquareText, Mail, House
} from "lucide-react";
import MobileGlobalSearch from "@/components/MobileGlobalSearch";
import GlobalSearch from '@/components/GlobalSearch'

export default function Navbar(){
       const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
       const [showMobileSearch, setShowMobileSearch] = useState(false);

  return (
        <header className="border-b border-slate-800 bg-slate-900 text-slate-200">
          <div className="max-w-5xl mx-auto px-4 py-4">
            <nav className="flex items-center justify-between">
          <div className="flex flex-col w-full">
              <div className="relative capitalize font-bold text-sm icon mb-1 pl-3">Welcome to my personal blog</div>
            <div className="relative justify-between flex w-full">
              <Link href="/"
                  className="flex text-4xl items-center md:text-6xl font-black tracking-tighter italic uppercase drop-shadow-md"
                >
                <i className="inline-block icon-coffee_cup_r2 mr-1 text-3xl text-white"></i>
                <div className="text-3xl md:text-4xl logo w-full">
            Robin<span className="text-titans-red">&nbsp;&nbsp;te Hofstee</span>
            </div>
              </Link>
              
              <div className="hidden xl:flex items-center gap-6">
                <Link href="/" className="text-slate-300 hover:text-titans-red transition-colors">
                  Home
                </Link>
                <Link href="/blog" className="text-slate-300 hover:text-titans-red transition-colors">
                  Blog
                </Link>
                <Link href="/tags" className="text-slate-300 hover:text-titans-red transition-colors">
                  Tags
                </Link>
                <Link href="/about" className="text-slate-300 hover:text-titans-red transition-colors hidden">
                  About
                </Link>
                
               <div className="block w-48 xl:w-64">
                <GlobalSearch />
              </div> 

                <a 
                  href="https://robintehofstee.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-titans-red transition-colors"
                >
                  Portfolio
                </a>
                <a 
                  href="https://x.com/Robin_teHofstee" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-titans-red transition-colors"
                >
                  𝕏
                </a>
              </div>
                 <button
              onClick={() => {
                setIsMobileMenuOpen(!isMobileMenuOpen);
                setShowMobileSearch(false); // Close mobile search if menu is opened
              }}
              className="xl:hidden p-2 text-slate-300 white transition"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>            </div>
            </div>
            </nav>
          </div>

      {showMobileSearch && (
        <div className="fixed inset-0 z-[55] lg:hidden">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={() => setShowMobileSearch(false)} />
          <div className="absolute top-0 left-0 w-full p-4 animate-in slide-in-from-top-2 duration-300">
            <MobileGlobalSearch onCloseMobile={() => setShowMobileSearch(false)} />
          </div>
        </div>
      )}


       {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] xl:hidden">
          <div className="absolute inset-0 bg-slate-400/80 backdrop-blur-md" onClick={() => setIsMobileMenuOpen(false)} />
          <nav 
            className="absolute right-0 top-0 h-full w-80 shadow-2xl bg-gray-50 p-8 flex flex-col animate-in slide-in-from-right duration-300"
             >
            <div className="flex justify-between items-center mb-10">
              <span className="italic uppercase tracking-tighter text-slate-800 text-xl">Menu</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-800"><X /></button>
            </div>
            <div className="flex flex-col gap-2 text-slate-700">
              <Link href="/" className="text-xl uppercase py-3 border-b border-gray-900/5 flex justify-between items-center" onClick={() => setIsMobileMenuOpen(false)}>
                  Home
                  <House className="w-5 h-5 text-titans-red" />
                  </Link>
                  <button 
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setShowMobileSearch(true);
                    }} 
                    className="text-xl uppercase py-3 border-b border-gray-900/5 flex justify-between items-center"
                  >
                    Search
                    <Search className="w-5 h-5 text-titans-red" />
                  </button>
                  <Link href="/blog" className="text-xl uppercase py-3 border-b border-gray-900/5 flex justify-between items-center" onClick={()=> setIsMobileMenuOpen(false)}>
                  Blog
                  <MessageSquareText className="w-5 h-5 text-titans-red" />
                  </Link>
                  <Link href="/tags" className="text-xl uppercase py-3 border-b border-gray-900/5 flex justify-between items-center" onClick={() => setIsMobileMenuOpen(false)}>
                  Tags
                  <Tag className="w-5 h-5 text-titans-red" />
                  </Link>
              <Link href="/about" className="text-xl uppercase py-3 border-b border-gray-900/5 flex justify-between items-center hidden" onClick={() => setIsMobileMenuOpen(false)}>
                  About
                  <CircleUser className="w-5 h-5 text-titans-red" />
                  </Link>
                  <a 
                  href="https://robintehofstee.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xl uppercase py-3 border-b border-gray-900/5 flex justify-between items-center" onClick={() => setIsMobileMenuOpen(false)}>
                Portfolio
                </a>
                <a 
                  href="https://x.com/Robin_teHofstee" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xl uppercase py-3 border-b border-gray-900/5 flex justify-between items-center" onClick={() => setIsMobileMenuOpen(false)}>
                𝕏
                </a>

</div>
</nav>
</div>
)}
        </header>
  )
}
