"use client";

import { useState, useEffect } from "react";
//  import sun nad moon icon
import { BookOpen, Menu, X, User, LogOut, LayoutDashboard, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { Button } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "@/lib/auth-client";

export function MainNavbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  

  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  const { data: session, isPending } = useSession();

  // sotre in local storeage
  useEffect(() => {
    setMounted(true);
    // check before 
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // change theme function
  const toggleTheme = () => {
    if (theme === "light") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
    }
  };

  const handleLogOut = async () => {
    await signOut();
    router.push("/");
  };

 
  if (!mounted) return null;

  return (
  
    <nav className={`sticky top-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? "bg-white/70 dark:bg-slate-950/70 backdrop-blur-md shadow-sm py-2" 
        : "bg-white dark:bg-slate-900 p-4"
    } border-b border-slate-100 dark:border-slate-800`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div>
                <Image 
                  src="/logo.png"
                  width={150} 
                  height={40}
                  alt="Logo"
                  className="object-contain dark:brightness-110" 
                />
              </div>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex gap-8 items-center">
            <Link href="/" className="font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link>
            <Link href="/tutors" className="font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Tutors</Link>
            <Link href="/add-tutors" className="font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Add Tutors</Link>
            <Link href="/mytutors" className="font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">My tutors</Link>
            <Link href="/mybookingtutors" className="font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">MyBooking Tutors</Link>
          </div>

          {/* Right Side Options (Theme Toggle + Auth) */}
          <div className="hidden md:flex items-center gap-4">
            
            
            <button 
              onClick={toggleTheme} 
              className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-200"
              title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
            >
              {theme === "light" ? <Moon className="w-5 h-5 text-slate-700" /> : <Sun className="w-5 h-5 text-yellow-400" />}
            </button>

            {!isPending && !session ? (
              <>
                <Link href="/login" className="font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors">Login</Link>
                <Link href="/register">
                  <Button color="primary" className="font-bold rounded-full px-8 shadow-lg shadow-blue-600/20">
                    Join Free
                  </Button>
                </Link>
              </>
            ) : (
              <div className="relative group">
                <button className="flex items-center gap-3 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-transparent">
                  <Image
                    width={40}
                    height={40}
                    src={session?.user?.image || "https://placehold.co/600x400"}
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-600/10"
                  />
                  <div className="text-left hidden lg:block">
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">{session?.user?.name}</p>
                  </div>
                </button>
                
                {/* User Dropdown Profile Menu */}
                <div className="absolute right-0 top-12 w-56 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl hidden group-hover:flex flex-col py-2 z-50">
                  <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700">
                    <p className="font-bold text-sm text-slate-900 dark:text-white">Welcome back!</p>
                    <p className="text-xs truncate text-slate-500 dark:text-slate-400">{session?.user?.email}</p>
                  </div>
                  <Link href="/mybookingtutors" className="px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-3 transition-colors">
                    <LayoutDashboard className="w-4 h-4" /> MyBooking Tutors
                  </Link>
                  <button
                    onClick={handleLogOut}
                    className="px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 flex items-center gap-3 transition-colors text-left w-full"
                  >
                    <LogOut className="w-4 h-4" /> Log Out
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Right Controls */}
          <div className="md:hidden flex items-center gap-2">
           
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
            >
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5 text-yellow-400" />}
            </button>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-white transition-colors">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-6 space-y-2 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 animate-in slide-in-from-top duration-300">
          <Link href="/" className="block px-4 py-3 text-base font-medium text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl">Home</Link>
          <Link href="/tutors" className="block px-4 py-3 text-base font-medium text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl">Tutors</Link>
          <Link href="/add-tutors" className="block px-4 py-3 text-base font-medium text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl">Add Tutors</Link>
          <Link href="/mytutors" className="block px-4 py-3 text-base font-medium text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl">My tutors</Link>
          <Link href="/mybookingtutors" className="block px-4 py-3 text-base font-medium text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl">My Booking Tutors</Link>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-4">
            {!isPending && !session ? (
              <div className="grid grid-cols-2 gap-4">
                <Link href="/login">
                  <Button variant="bordered" className="rounded-xl w-full text-slate-800 dark:text-white border-slate-200 dark:border-slate-700">Login</Button>
                </Link>
                <Link href="/register">
                  <Button color="primary" className="rounded-xl w-full">Join Free</Button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">{session?.user?.name}</p>
                <button
                  onClick={handleLogOut}
                  className="block w-full text-left px-4 py-3 text-base font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}