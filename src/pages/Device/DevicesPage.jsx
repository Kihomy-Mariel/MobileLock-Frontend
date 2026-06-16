import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ShieldCheck,
  Smartphone,
  Trash,
  Edit2,
  Plus,
  Loader2,
  Check,
  User,
  ShieldAlert,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import useDevices from "../../hooks/useDevices";
import toast, { Toaster } from "react-hot-toast";

// Componente InputField reutilizable
const InputField = ({ label, value, onChange, required }) => (
  <div className="flex flex-col">
    <label className="text-white/80 mb-1">{label}</label>
    <input
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-5 py-3 rounded-2xl border border-white/20 bg-[#1c1c2a] text-white focus:ring-2 focus:ring-cyan-500 outline-none transition"
    />
  </div>
);

export default function DevicesPage() {
  const navigate = useNavigate();
  const { devices, loading, createDevice, updateDevice, reportDeviceState, deleteDevice } = useDevices();

  const [modalOpen, setModalOpen] = useState(false);
  const [reportingDevice, setReportingDevice] = useState(null);
  const [editingDevice, setEditingDevice] = useState(null);
  const [formData, setFormData] = useState({ marca_modelo: "", hash_imei: "", hash_adn_hardware: "" });
  const [actionLoading, setActionLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const onReportStateSubmit = async (id, statusVal) => {
    try {
      setReportingDevice(null);
      await toast.promise(
        reportDeviceState(id, statusVal),
        {
          loading: "Actualizando estado...",
          success: "Estado de seguridad actualizado ✅",
          error: "Error al actualizar estado"
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const openModal = (device = null) => {
    setEditingDevice(device);
    setFormData(device ? { ...device } : { marca_modelo: "", hash_imei: "", hash_adn_hardware: "" });
    setImageFile(null);
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true);

    const data = new FormData();
    data.append("marca_modelo", formData.marca_modelo);
    data.append("hash_imei", formData.hash_imei);
    data.append("hash_adn_hardware", formData.hash_adn_hardware);
    if (imageFile) {
      data.append("url_imagen_referencia", imageFile);
    }

    try {
      if (editingDevice) {
        await toast.promise(
          updateDevice(editingDevice.id_dispositivo, data),
          { loading: "Actualizando...", success: "Dispositivo actualizado ✅", error: "Error al actualizar" }
        );
      } else {
        await toast.promise(
          createDevice(data),
          { loading: "Registrando...", success: "Dispositivo registrado ✅", error: "Error al registrar" }
        );
      }
      setModalOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (device) => {
    if (!confirm(`¿Eliminar dispositivo "${device.marca_modelo}"?`)) return;
    setActionLoading(true);
    try {
      await toast.promise(
        deleteDevice(device.id_dispositivo),
        { loading: "Eliminando...", success: "Dispositivo eliminado ✅", error: "Error al eliminar" }
      );
    } catch (error) {
      console.error(error);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-24 px-10 pt-10 max-w-5xl mx-auto bg-gradient-to-b from-[#0a0a14] to-[#1a1a2f]">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <button
          onClick={() => navigate(-1)}
          className="w-14 h-14 rounded-2xl bg-[#111122] flex items-center justify-center shadow-lg hover:scale-105 transition"
        >
          <ArrowLeft size={24} className="text-cyan-400" />
        </button>
        <h1 className="text-3xl font-bold text-white tracking-wide">Mis Dispositivos</h1>
        <button
          onClick={() => navigate("/profile")}
          className="w-14 h-14 rounded-2xl bg-[#111122] flex items-center justify-center shadow-lg hover:scale-105 transition"
        >
          <User size={24} className="text-purple-400" />
        </button>
      </div>

      {/* Registrar Device */}
      <button
        onClick={() => openModal()}
        className="flex items-center gap-3 bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 rounded-2xl shadow-xl mb-8 text-lg font-semibold transition transform hover:scale-105"
      >
        <Plus size={24} /> Registrar dispositivo
      </button>

      {/* Devices List */}
      {loading ? (
        <div className="flex flex-col items-center justify-center text-white py-20 gap-4 text-xl">
          <Loader2 className="animate-spin" size={36} />
          Cargando dispositivos...
        </div>
      ) : devices.length === 0 ? (
        <p className="text-white/60 text-center py-20 text-2xl">No hay dispositivos registrados.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {devices.map((device) => (
            <motion.div
              key={device.id_dispositivo}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#111122] rounded-3xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between shadow-xl hover:scale-105 transition"
            >
              <div className="flex items-center gap-5 mb-4 md:mb-0">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-500 flex items-center justify-center text-white shadow-lg">
                  <Smartphone size={28} />
                </div>
                <div>
                  <p className="text-xl font-bold text-white flex items-center gap-2 flex-wrap">
                    {device.marca_modelo}
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${device.estado === "LIBRE" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                        device.estado === "ROBADO" ? "bg-red-500/10 text-red-400 border border-red-500/20" :
                          "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      }`}>
                      {device.estado === "LIBRE" ? "Seguro" : device.estado === "ROBADO" ? "Robado" : "Extraviado"}
                    </span>
                  </p>
                  <p className="text-sm text-white/70">IMEI: {device.hash_imei}</p>
                  <p className="text-sm text-white/70">Hardware: {device.hash_adn_hardware}</p>
                  <div className="mt-2 flex gap-2">
                    <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${device.hash_visual
                        ? "bg-teal-500/10 text-teal-400 border border-teal-500/20"
                        : "bg-orange-500/10 text-orange-400 border border-orange-500/20"
                      }`}>
                      {device.hash_visual ? "Huella registrada ✅" : "Sin huella ⚠️"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => openModal(device)}
                  className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-xl transition text-lg"
                >
                  <Edit2 size={18} /> Editar
                </button>
                <button
                  onClick={() => handleDelete(device)}
                  className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl transition text-lg"
                >
                  <Trash size={18} /> Eliminar
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#1c1c2a] rounded-3xl p-8 w-full max-w-2xl shadow-2xl"
          >
            <h2 className="text-2xl font-bold mb-6 text-white">
              {editingDevice ? "Editar dispositivo" : "Registrar dispositivo"}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <InputField label="Marca y modelo" value={formData.marca_modelo} onChange={e => setFormData({ ...formData, marca_modelo: e.target.value })} required />
              <InputField label="IMEI" value={formData.hash_imei} onChange={e => setFormData({ ...formData, hash_imei: e.target.value })} required />
              <InputField label="Hardware ID" value={formData.hash_adn_hardware} onChange={e => setFormData({ ...formData, hash_adn_hardware: e.target.value })} required />

              <div className="flex flex-col">
                <label className="text-white/80 mb-1">Fotografía del equipo (para Huella IA)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => setImageFile(e.target.files[0])}
                  className="w-full px-5 py-3 rounded-2xl border border-white/20 bg-[#1c1c2a] text-white focus:ring-2 focus:ring-cyan-500 outline-none transition file:mr-4 file:py-1.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-cyan-500/25 file:text-cyan-400 file:hover:bg-cyan-500/35 file:cursor-pointer"
                />
              </div>

              <div className="flex gap-6 mt-4 flex-wrap">
                <button type="submit" className="flex-1 flex items-center justify-center gap-3 bg-cyan-500 hover:bg-cyan-600 text-white py-4 rounded-2xl shadow-lg text-xl font-semibold transition">
                  {actionLoading ? <Loader2 className="animate-spin" size={24} /> : <Check size={24} />}
                  {editingDevice ? "Actualizar" : "Registrar"}
                </button>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-4 rounded-2xl text-xl font-semibold transition"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* State Change Modal */}
      {reportingDevice && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#1c1c2a] rounded-3xl p-8 w-full max-w-md shadow-2xl"
          >
            <h2 className="text-2xl font-bold mb-6 text-white">Estado de Seguridad</h2>
            <p className="text-white/60 mb-6 text-sm">
              Selecciona el estado actual para tu dispositivo <strong>{reportingDevice.marca_modelo}</strong>. Esto afectará las búsquedas globales de inmediato.
            </p>
            <div className="flex flex-col gap-4">
              {[
                { val: "LIBRE", label: "Seguro (LIBRE)", desc: "El equipo está seguro en tu posesión.", color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10" },
                { val: "ROBADO", label: "Reportar como ROBADO", desc: "El equipo fue robado y quieres bloquearlo.", color: "text-red-400 border-red-500/30 bg-red-500/5 hover:bg-red-500/10" },
                { val: "EXTRAVIADO", label: "Reportar como EXTRAVIADO", desc: "Perdiste el equipo y quieres alertar a quien lo encuentre.", color: "text-amber-400 border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/10" }
              ].map(opt => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => onReportStateSubmit(reportingDevice.id_dispositivo, opt.val)}
                  className={`w-full text-left p-4 rounded-2xl border transition ${opt.color} flex flex-col`}
                >
                  <span className="font-semibold text-lg">{opt.label}</span>
                  <span className="text-xs text-white/55 mt-1">{opt.desc}</span>
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setReportingDevice(null)}
              className="w-full mt-6 bg-gray-800 hover:bg-gray-700 text-white py-3.5 rounded-2xl font-semibold transition"
            >
              Cancelar
            </button>
          </motion.div>
        </div>
      )}

    </div>
  );
}