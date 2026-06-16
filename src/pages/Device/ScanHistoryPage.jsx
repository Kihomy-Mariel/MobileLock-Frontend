import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Smartphone,
  ShieldCheck,
  ShieldAlert,
  HelpCircle,
  Loader2,
  RefreshCw,
  Hash,
  QrCode,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { deviceRepository } from "../../repositories/deviceRepository";
import toast, { Toaster } from "react-hot-toast";

export default function ScanHistoryPage() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const data = await deviceRepository.getScanHistory();
      setHistory(data);
    } catch (error) {
      console.error(error);
      toast.error("Error al cargar el historial de escaneos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };

  return (
    <div className="min-h-screen pb-24 px-6 pt-10 max-w-4xl mx-auto bg-gradient-to-b from-[#0a0a14] to-[#14142b] text-white">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <button
          onClick={() => navigate(-1)}
          className="w-12 h-12 rounded-2xl bg-[#1c1c2e] border border-white/10 flex items-center justify-center shadow-lg hover:scale-105 transition duration-200"
        >
          <ArrowLeft size={20} className="text-cyan-400" />
        </button>
        <h1 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 tracking-wide">
          Historial de Trazabilidad
        </h1>
        <button
          onClick={fetchHistory}
          disabled={loading}
          className="w-12 h-12 rounded-2xl bg-[#1c1c2e] border border-white/10 flex items-center justify-center shadow-lg hover:scale-105 transition"
        >
          {loading ? (
            <Loader2 className="animate-spin text-cyan-400" size={20} />
          ) : (
            <RefreshCw size={20} className="text-cyan-400" />
          )}
        </button>
      </div>

      <p className="text-sm text-white/50 mb-8">
        Registro completo de las verificaciones locales de IMEI y códigos QR que has realizado.
      </p>

      {/* Main List Area */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-lg text-white/70">
          <Loader2 className="animate-spin text-cyan-400" size={40} />
          Cargando historial de escaneos...
        </div>
      ) : history.length === 0 ? (
        <div className="bg-[#111122]/50 border border-white/5 rounded-3xl p-16 flex flex-col items-center justify-center text-center">
          <Calendar size={64} className="text-white/10 mb-4" />
          <h3 className="text-xl font-bold text-white/80 mb-2">Sin registros</h3>
          <p className="text-sm text-white/40 max-w-sm">
            Aún no has realizado ninguna consulta o escaneo en MobileLock AI. Tus búsquedas se registrarán automáticamente aquí.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((scan, index) => (
            <motion.div
              key={scan.id_historial}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-[#111122]/75 border border-white/10 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between shadow-lg hover:border-cyan-500/30 transition duration-200"
            >
              {/* Info lateral izquierda */}
              <div className="flex items-center gap-4 mb-4 md:mb-0">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 flex items-center justify-center text-cyan-400 border border-cyan-500/20 shadow-inner">
                  {scan.tipo_filtro === "IMEI" ? <Hash size={20} /> : <QrCode size={20} />}
                </div>
                <div>
                  <h4 className="font-semibold text-white/90">
                    {scan.marca_modelo_detectado || "Dispositivo Desconocido"}
                  </h4>
                  <div className="flex items-center gap-2 mt-1 text-xs text-white/50">
                    <span>{scan.tipo_filtro}: {scan.valor_consultado_ofuscado}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {formatDate(scan.fecha_consulta)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Badge lateral derecho */}
              <div className="flex items-center gap-3">
                {scan.resultado_estado === "LIBRE" && (
                  <span className="flex items-center gap-1.5 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold rounded-xl uppercase">
                    <ShieldCheck size={14} />
                    Libre
                  </span>
                )}
                {scan.resultado_estado === "ROBADO" && (
                  <span className="flex items-center gap-1.5 px-4 py-2 bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-bold rounded-xl uppercase shadow-inner">
                    <ShieldAlert size={14} />
                    Robado
                  </span>
                )}
                {scan.resultado_estado === "EXTRAVIADO" && (
                  <span className="flex items-center gap-1.5 px-4 py-2 bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs font-bold rounded-xl uppercase shadow-inner">
                    <ShieldAlert size={14} />
                    Extraviado
                  </span>
                )}
                {scan.resultado_estado === "NO_REGISTRADO" && (
                  <span className="flex items-center gap-1.5 px-4 py-2 bg-gray-500/10 border border-gray-500/30 text-gray-400 text-xs font-bold rounded-xl uppercase">
                    <HelpCircle size={14} />
                    No Reg.
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
