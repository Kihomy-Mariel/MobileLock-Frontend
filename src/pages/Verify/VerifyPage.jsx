import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Search,
  Scan,
  ShieldCheck,
  ShieldAlert,
  HelpCircle,
  Loader2,
  Camera,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { deviceRepository } from "../../repositories/deviceRepository";
import { Html5Qrcode } from "html5-qrcode";
import toast, { Toaster } from "react-hot-toast";

export default function VerifyPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("imei"); // "imei" o "qr"
  const [imei, setImei] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [qrScanning, setQrScanning] = useState(false);

  // Lector QR
  useEffect(() => {
    let html5QrCode;
    if (qrScanning && activeTab === "qr") {
      html5QrCode = new Html5Qrcode("qr-reader");
      html5QrCode
        .start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 260, height: 260 },
          },
          (decodedText) => {
            // Éxito decodificando QR
            handleVerify({ qr_code: decodedText });
            setQrScanning(false);
          },
          () => {
            // Callback continuo de no-detección (ignorar silenciosamente)
          }
        )
        .catch((err) => {
          console.error("Error al iniciar lector QR", err);
          toast.error("No se pudo acceder a la cámara. Revisa los permisos.");
          setQrScanning(false);
        });
    }

    return () => {
      if (html5QrCode) {
        if (html5QrCode.isScanning) {
          html5QrCode
            .stop()
            .then(() => {
              html5QrCode.clear();
            })
            .catch((err) => console.error("Error al detener QR", err));
        }
      }
    };
  }, [qrScanning, activeTab]);

  const handleVerify = async (params) => {
    setLoading(true);
    setResult(null);
    try {
      const data = await deviceRepository.verifyDevice(params);
      setResult(data);
      if (data.estado === "ROBADO") {
        toast.error("⚠️ DISPOSITIVO CON REPORTADO DE ROBO!");
      } else if (data.estado === "LIBRE") {
        toast.success("🛡️ Dispositivo verificado y libre de reportes.");
      } else {
        toast.warn("El dispositivo no se encuentra registrado.");
      }
    } catch (error) {
      console.error(error);
      const detail = error.response?.data?.detail || "Error en la consulta. Intente más tarde.";
      toast.error(detail);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitImei = (e) => {
    e.preventDefault();
    if (imei.length < 14) {
      toast.error("El IMEI debe tener al menos 14-15 dígitos numéricos.");
      return;
    }
    handleVerify({ imei });
  };

  return (
    <div className="min-h-screen pb-24 px-6 pt-10 max-w-4xl mx-auto bg-gradient-to-b from-[#0a0a14] to-[#14142b] text-white">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <button
          onClick={() => navigate("/dashboard")}
          className="w-12 h-12 rounded-2xl bg-[#1c1c2e] border border-white/10 flex items-center justify-center shadow-lg hover:scale-105 transition duration-200"
        >
          <ArrowLeft size={20} className="text-cyan-400" />
        </button>
        <h1 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 tracking-wide">
          Verificación de Celular
        </h1>
        <button
          onClick={() => navigate("/history")}
          className="px-4 py-2 rounded-2xl bg-[#1c1c2e]/60 border border-white/5 text-sm text-cyan-300 hover:bg-cyan-500/20 transition"
        >
          Ver Historial
        </button>
      </div>

      {/* Tabs */}
      <div className="flex justify-center p-1 bg-[#151526] rounded-2xl mb-8 max-w-md mx-auto border border-white/5 shadow-inner">
        <button
          onClick={() => {
            setActiveTab("imei");
            setQrScanning(false);
            setResult(null);
          }}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition duration-200 ${
            activeTab === "imei"
              ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20"
              : "text-white/60 hover:text-white"
          }`}
        >
          <Search size={18} />
          Búsqueda por IMEI
        </button>
        <button
          onClick={() => {
            setActiveTab("qr");
            setResult(null);
          }}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition duration-200 ${
            activeTab === "qr"
              ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20"
              : "text-white/60 hover:text-white"
          }`}
        >
          <Scan size={18} />
          Escaneo Rápido (QR)
        </button>
      </div>

      {/* Input Panels */}
      <div className="bg-[#111122]/90 border border-white/10 rounded-3xl p-8 mb-8 shadow-2xl relative overflow-hidden backdrop-blur-md">
        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-cyan-500 to-purple-500" />

        {activeTab === "imei" && (
          <form onSubmit={handleSubmitImei} className="space-y-6 max-w-xl mx-auto">
            <h3 className="text-xl font-semibold text-white/90">Consulta Legal por IMEI</h3>
            <p className="text-sm text-white/50">
              Ingresa los 15 dígitos del IMEI de tu dispositivo para consultar de inmediato su titularidad y estado en Blockchain Polygon.
            </p>
            <div className="relative flex items-center">
              <input
                type="number"
                placeholder="Ej. 358293049182748"
                value={imei}
                onChange={(e) => setImei(e.target.value)}
                className="w-full pl-6 pr-14 py-4 rounded-2xl border border-white/20 bg-[#0d0d1b] text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-lg tracking-widest placeholder:tracking-normal transition"
              />
              <button
                type="submit"
                disabled={loading}
                className="absolute right-3 w-12 h-12 bg-cyan-500 hover:bg-cyan-600 rounded-xl flex items-center justify-center transition"
              >
                {loading ? <Loader2 className="animate-spin text-white" /> : <Search size={20} />}
              </button>
            </div>
          </form>
        )}

        {activeTab === "qr" && (
          <div className="flex flex-col items-center justify-center space-y-6">
            <h3 className="text-xl font-semibold text-white/90">Lector de ADN / QR</h3>
            <p className="text-sm text-white/50 text-center max-w-lg">
              Permite escanear el código QR de MobileLock en la parte posterior del equipo o en el certificado para comprobar su autenticidad física de forma instantánea.
            </p>

            {!qrScanning ? (
              <button
                onClick={() => setQrScanning(true)}
                className="flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-cyan-500/25 hover:scale-105 transition"
              >
                <Camera size={22} />
                Iniciar Cámara Web
              </button>
            ) : (
              <div className="w-full max-w-md overflow-hidden rounded-2xl border-2 border-cyan-400 bg-black relative">
                <div id="qr-reader" className="w-full h-80" />
                <button
                  onClick={() => setQrScanning(false)}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium shadow-md transition"
                >
                  Detener Cámara
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Result Presentation */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="rounded-3xl shadow-xl overflow-hidden"
          >
            {result.estado === "LIBRE" && (
              <div className="bg-emerald-500/10 border-2 border-emerald-500/30 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400">
                  <ShieldCheck size={42} />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="inline-block px-3 py-1 bg-emerald-500 text-black text-xs font-extrabold rounded-full mb-2 uppercase tracking-widest">
                    Seguro
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-2">
                    Dispositivo Libre de Reportes
                  </h4>
                  <p className="text-white/70 text-sm">
                    El celular consultado está registrado oficialmente y no cuenta con ningún reporte activo de pérdida o robo. Es seguro de adquirir y transferir.
                  </p>
                  {result.dispositivo && (
                    <div className="mt-4 p-4 rounded-2xl bg-black/30 border border-white/5 text-xs text-white/80 space-y-1">
                      <p><strong>Marca y modelo:</strong> {result.dispositivo.marca_modelo}</p>
                      <p><strong>Hash de Hardware:</strong> {result.dispositivo.hash_adn_hardware}</p>
                      <p><strong>IMEI Cifrado:</strong> {result.dispositivo.hash_imei}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {result.estado === "ROBADO" && (
              <div className="bg-red-500/10 border-2 border-red-500/30 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center text-red-500 shadow-lg shadow-red-500/10">
                  <ShieldAlert size={42} />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="inline-block px-3 py-1 bg-red-500 text-white text-xs font-extrabold rounded-full mb-2 uppercase tracking-widest">
                    PELIGRO: REPORTADO
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-2">
                    Dispositivo Reportado como Robado
                  </h4>
                  <p className="text-red-400 text-sm font-semibold mb-2">
                    ¡Atención! Este dispositivo móvil fue reportado como robado o extraviado por su propietario original.
                  </p>
                  <p className="text-white/70 text-xs">
                    Comprar, vender o poseer celulares marcados en MobileLock AI constituye una infracción a las políticas de seguridad. El equipo está inutilizado digitalmente en el ecosistema.
                  </p>
                  {result.dispositivo && (
                    <div className="mt-4 p-4 rounded-2xl bg-black/30 border border-white/5 text-xs text-white/80 space-y-1">
                      <p><strong>Marca y modelo:</strong> {result.dispositivo.marca_modelo}</p>
                      <p><strong>Código de Dispositivo:</strong> #{result.dispositivo.id_dispositivo}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {result.estado === "NO_REGISTRADO" && (
              <div className="bg-gray-500/10 border-2 border-gray-500/30 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-gray-500/20 border-2 border-gray-500/40 flex items-center justify-center text-gray-400">
                  <HelpCircle size={42} />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="inline-block px-3 py-1 bg-gray-500 text-white text-xs font-extrabold rounded-full mb-2 uppercase tracking-widest">
                    No Registrado
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-2">
                    Dispositivo No Encontrado
                  </h4>
                  <p className="text-white/70 text-sm">
                    Este dispositivo no se encuentra en el registro central de MobileLock AI. Esto significa que la propiedad aún no ha sido blindada con nuestro ADN digital en la Blockchain.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
