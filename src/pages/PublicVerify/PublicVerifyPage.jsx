import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Loader2, ShieldCheck, ShieldAlert, AlertTriangle, Link as LinkIcon, Lock } from "lucide-react";
import { deviceRepository } from "../../repositories/deviceRepository";
import { Link } from "react-router-dom";

export default function PublicVerifyPage() {
  const [imei, setImei] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (imei.length < 5) return;
    
    setLoading(true);
    setResult(null);
    setError(null);
    
    try {
      // Llamada directa al API público (que simula la consulta a Blockchain)
      const data = await deviceRepository.verifyPublicDevice(imei);
      setResult(data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setResult({
          estado: "NO_REGISTRADO",
          mensaje: "El dispositivo no está registrado en el Smart Contract."
        });
      } else {
        setError("Ocurrió un error al conectar con Blockchain. Por favor, intenta de nuevo.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen hero-bg flex flex-col font-sans text-foreground">
      {/* Navbar Premium */}
      <nav className="w-full px-8 py-6 flex items-center justify-between z-10 glass border-b border-border/20 sticky top-0">
        <Link to="/" className="flex items-center gap-3 hover:scale-105 transition-transform">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-500 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
            <Lock size={20} />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            MobileLock<span className="text-cyan-400">AI</span>
          </span>
        </Link>
        <Link to="/login" className="px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors backdrop-blur-md">
          Portal Privado
        </Link>
      </nav>

      {/* Contenido Principal */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
        
        {/* Elementos decorativos de fondo */}
        <div className="absolute top-[20%] left-[10%] w-72 h-72 bg-cyan-500/20 rounded-full blur-[100px] -z-10 pointer-events-none animate-pulse duration-1000"></div>
        <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto z-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light border border-cyan-500/30 text-cyan-400 text-sm font-semibold tracking-wide mb-6 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
            <LinkIcon size={16} /> Verificación Blockchain
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            Verifica el estado de <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              cualquier dispositivo
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 mb-10 max-w-xl mx-auto">
            Consulta directamente nuestro Smart Contract en Polygon para asegurar que el equipo que estás por adquirir es legítimo y no tiene reportes de robo.
          </p>

          <form onSubmit={handleVerify} className="relative w-full max-w-lg mx-auto flex group">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <Search className="text-white/40 group-focus-within:text-cyan-400 transition-colors" size={24} />
            </div>
            <input
              type="text"
              value={imei}
              onChange={(e) => setImei(e.target.value.replace(/\D/g, ''))}
              placeholder="Ingresa el IMEI de 15 dígitos"
              maxLength={15}
              className="w-full pl-16 pr-32 py-5 rounded-2xl glass-panel border border-white/10 text-white placeholder:text-white/40 focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/20 outline-none transition-all text-lg font-medium shadow-2xl"
            />
            <button 
              type="submit"
              disabled={loading || imei.length < 5}
              className="absolute right-2 top-2 bottom-2 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center justify-center min-w-[120px]"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : "Consultar"}
            </button>
          </form>

          {/* Área de Resultados */}
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="mt-8 p-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center gap-4 text-left glass backdrop-blur-xl"
              >
                <ShieldAlert size={28} className="shrink-0" />
                <p>{error}</p>
              </motion.div>
            )}

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`mt-10 p-8 rounded-3xl border shadow-2xl flex flex-col md:flex-row items-center gap-6 text-left relative overflow-hidden ${
                  result.estado === "LIBRE" ? "bg-emerald-500/10 border-emerald-500/30" : 
                  result.estado === "ROBADO" ? "bg-red-500/10 border-red-500/30" :
                  result.estado === "EXTRAVIADO" ? "bg-amber-500/10 border-amber-500/30" :
                  "bg-white/5 border-white/10"
                }`}
              >
                {/* Glow de fondo de resultado */}
                <div className={`absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-40 rounded-full ${
                  result.estado === "LIBRE" ? "bg-emerald-500" : 
                  result.estado === "ROBADO" ? "bg-red-500" :
                  result.estado === "EXTRAVIADO" ? "bg-amber-500" :
                  "bg-white"
                }`}></div>

                <div className={`w-20 h-20 shrink-0 rounded-full flex items-center justify-center shadow-lg relative z-10 ${
                  result.estado === "LIBRE" ? "bg-emerald-500/20 text-emerald-400" : 
                  result.estado === "ROBADO" ? "bg-red-500/20 text-red-400" :
                  result.estado === "EXTRAVIADO" ? "bg-amber-500/20 text-amber-400" :
                  "bg-white/10 text-white/60"
                }`}>
                  {result.estado === "LIBRE" ? <ShieldCheck size={40} /> : 
                   result.estado === "ROBADO" ? <ShieldAlert size={40} /> :
                   result.estado === "EXTRAVIADO" ? <AlertTriangle size={40} /> :
                   <Search size={40} />}
                </div>

                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {result.estado === "LIBRE" ? "Dispositivo Seguro" : 
                     result.estado === "ROBADO" ? "Reporte de Robo Activo" :
                     result.estado === "EXTRAVIADO" ? "Reporte de Extravío" :
                     "No Registrado"}
                  </h3>
                  <p className="text-white/70 text-lg mb-1">{result.mensaje}</p>
                  {result.marca_modelo && (
                    <p className="text-white/50 text-sm font-medium mt-2">Modelo detectado: <span className="text-white/90">{result.marca_modelo}</span></p>
                  )}
                  <p className="text-white/30 text-xs mt-3 flex items-center gap-1.5">
                    <LinkIcon size={12} /> Verificado vía Polygon Blockchain
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>
      
      <footer className="py-6 text-center text-white/30 text-sm border-t border-white/5 bg-black/20">
        © 2026 MobileLockAI. Verificación Descentralizada.
      </footer>
    </div>
  );
}
