"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/services/supabaseClient';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Home, Menu, X } from 'lucide-react';
import { FaRectangleXmark } from 'react-icons/fa6';
import { GrStatusGood } from 'react-icons/gr';
import Image from 'next/image';

const menuItems = [
    { name: 'Tecnologías', href: '#tecnologias' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Sobre Nosotros', href: '#sobre-nosotros' },
    { name: 'Contacto', href: '#contacto' },
    { name: 'Aliados', href: '#aliados' },
];

export default function AuthNav() {
    const [user, setUser] = useState<any>(null);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [menuState, setMenuState] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const router = useRouter();

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => setUser(data.user));

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user || null);
        });

        return () => {
            try {
                listener.subscription.unsubscribe();
            } catch (e) { }
        };
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        window.location.href = window.location.origin;
    };

    const handleGoToStatus = () => router.push("/user-status");
    const handleGoHome = () => router.push("/");

    const getInitials = (email: string) => {
        const namePart = email.split('@')[0];
        const parts = namePart.split(/[._\-]/);
        const initials = parts.map((p) => p[0]?.toUpperCase()).join('');
        return initials.slice(0, 2);
    };

    // Función de scroll suave 
    const handleScrollClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        e.stopPropagation();

        const targetId = href.replace('#', '');
        setMenuState(false); // Cerrar menú móvil primero

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                const elem = document.getElementById(targetId);
                // Si el elemento no existe en esta página, navegamos a Home con el ancla
                if (!elem) {
                    router.push("/" + href);
                    return;
                }

                const headerHeight = 90;
                const top = elem.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({ top, behavior: 'smooth' });
                window.history.pushState(null, '', href);
            });
        });
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        }
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className="fixed z-[99999] w-full px-2 AlongSanss2-Thin left-0 top-0 isolate">
            <nav aria-label="Navegación principal">
                <div className={cn(
                    'rounded-2xl mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12',
                    isScrolled && 'glass-effect-2 max-w-5xl lg:px-5'
                )}>
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-3">
                        <div className="flex w-full justify-between items-center lg:w-auto">
                            <Link href="/" aria-label="Inicio" className="flex items-center">
                                <Image
                                    src="/IMG_8370.PNG"
                                    alt="Untitled Tech"
                                    width={isScrolled ? 90 : 120}
                                    height={isScrolled ? 90 : 120}
                                    className="object-contain transition-all duration-300"
                                    priority
                                />
                            </Link>

                            <div className="flex items-center gap-3 lg:hidden">
                                {/* Botón hamburguesa con ícono animado */}
                                <button
                                    onClick={() => setMenuState(!menuState)}
                                    className="relative z-50 block cursor-pointer p-2 transition-colors text-white hover:text-purple-400"
                                >
                                    <AnimatePresence mode="wait" initial={false}>
                                        <motion.span
                                            key={menuState ? 'close' : 'open'}
                                            initial={{ opacity: 0, rotate: -90 }}
                                            animate={{ opacity: 1, rotate: 0 }}
                                            exit={{ opacity: 0, rotate: 90 }}
                                            transition={{ duration: 0.18 }}
                                            style={{ display: 'block' }}
                                        >
                                            {menuState ? <X /> : <Menu />}
                                        </motion.span>
                                    </AnimatePresence>
                                </button>
                            </div>
                        </div>

                        {/* Menú Escritorio — dinámico con scroll */}
                        <div className="absolute inset-0 m-auto hidden size-fit lg:flex items-center">
                            <ul className="flex gap-8 text-sm">
                                {menuItems.map((item, index) => (
                                    <li key={index}>
                                        <a
                                            href={item.href}
                                            onClick={(e) => handleScrollClick(e, item.href)}
                                            className="cursor-pointer block duration-150 text-gray-200 hover:text-purple-400 AlongSanss2-Thin text-[1.1rem] transition-transform hover:scale-105"
                                        >
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Menú Móvil — animado con Framer Motion */}
                        <AnimatePresence>
                            {menuState && (
                                <motion.div
                                    key="mobile-menu"
                                    initial={{ opacity: 0, y: -12, scale: 0.97 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -12, scale: 0.97 }}
                                    transition={{ duration: 0.22, ease: 'easeInOut' }}
                                    className="absolute top-[80px] left-0 bg-black/95 w-full flex flex-col items-start space-y-6 rounded-3xl border border-purple-500/50 p-6 shadow-2xl lg:hidden backdrop-blur-md"
                                >
                                    <ul className="space-y-6 text-base w-full">
                                        {menuItems.map((item, index) => (
                                            <motion.li
                                                key={index}
                                                initial={{ opacity: 0, x: -8 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.05, duration: 0.18 }}
                                            >
                                                <a
                                                    href={item.href}
                                                    onClick={(e) => handleScrollClick(e, item.href)}
                                                    className="text-gray-200 hover:text-purple-400 block duration-150 text-xl AlongSanss2-Thin"
                                                >
                                                    {item.name}
                                                </a>
                                            </motion.li>
                                        ))}
                                    </ul>
                                    {/* Opciones de usuario móvil */}
                                    {user && (
                                        <div className="pt-4 border-t border-purple-500/30 w-full mt-4">
                                            <div className="flex flex-col gap-5 text-purple-200 AlongSanss2-Thin">
                                                <button onClick={handleGoToStatus} className="flex items-center gap-3 hover:text-white text-left text-lg">
                                                    <GrStatusGood className="w-6 h-6" /> Estado de Usuario
                                                </button>
                                                <button onClick={handleLogout} className="flex items-center gap-3 hover:text-red-400 text-left text-lg">
                                                    <FaRectangleXmark className="w-6 h-6 text-red-400" /> Cerrar sesión
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Right: User / Auth button in Desktop */}
                        <div className="hidden lg:flex items-center gap-4">
                            {!user ? (
                                <>
                                    {/* Ocultos temporalmente a petición */}
                                </>
                            ) : (
                                <div className="relative">
                                    <button
                                        onClick={() => setUserMenuOpen((prev) => !prev)}
                                        className="w-10 h-10 rounded-full bg-purple-700 text-white flex items-center justify-center font-bold uppercase shadow-md focus:outline-none transition-transform hover:scale-105 ALONGSANSS-REGULAR"
                                    >
                                        {getInitials(user.email)}
                                    </button>

                                    <AnimatePresence>
                                        {userMenuOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute right-0 top-full mt-2 min-w-[200px] bg-black/90 border border-purple-600 rounded-lg shadow-lg z-[9999] overflow-hidden flex flex-col gap-0 backdrop-blur-md"
                                            >
                                                {[
                                                    { onClick: handleGoToStatus, label: "Estado de Usuario", icon: <GrStatusGood className="inline-block mr-3 w-5 h-5 align-text-bottom" /> },
                                                    { onClick: handleLogout, label: "Cerrar sesión", icon: <FaRectangleXmark className="inline-block mr-3 w-5 h-5 align-text-bottom text-red-400" /> },
                                                ].map((btn, idx) => (
                                                    <motion.button
                                                        key={btn.label}
                                                        onClick={() => { btn.onClick(); setUserMenuOpen(false); }}
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: 20 }}
                                                        transition={{ delay: 0.08 * idx, duration: 0.25 }}
                                                        className="text-left px-5 py-4 text-purple-200 hover:bg-purple-700 hover:text-white transition whitespace-nowrap tracking-tight text-md flex items-center AlongSanss2-Thin"
                                                    >
                                                        {btn.icon}
                                                        {btn.label}
                                                    </motion.button>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}
