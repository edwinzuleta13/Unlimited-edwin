                    {/* Botón de control derecho - Aumentar velocidad */}
                    <motion.button
                      onPointerDown={() => setTargetSpeed(220)}
                      onPointerUp={() => setTargetSpeed(90)}
                      onPointerLeave={() => setTargetSpeed(90)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-30 
                        bg-purple-600/80 hover:bg-purple-500/90 
                        text-white p-3 rounded-full 
                        shadow-lg hover:shadow-purple-500/50 
                        transition-all duration-300 
                        border-2 border-purple-400/40 hover:border-purple-300/60
                        backdrop-blur-sm
                        active:bg-purple-400/90 active:scale-95"
                      whileHover={{ scale: 1.1 }}
                      title="Mantener presionado para aumentar velocidad"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </motion.button>