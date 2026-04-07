import { useState } from "react"

export default function DeviceFormModal({ device, onClose, onSubmit }) {

    const [form, setForm] = useState({
        marca_modelo: device?.marca_modelo || "",
        hash_imei: device?.hash_imei || "",
        hash_adn_hardware: device?.hash_adn_hardware || ""
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(form)
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <form
                onSubmit={handleSubmit}
                className="glass rounded-2xl p-6 w-full max-w-md"
            >

                <h2 className="text-xl font-bold mb-4">
                    {device ? "Editar dispositivo" : "Registrar dispositivo"}
                </h2>

                <input
                    name="marca_modelo"
                    placeholder="Marca / Modelo"
                    value={form.marca_modelo}
                    onChange={handleChange}
                    className="w-full mb-3 p-2 rounded-lg bg-black/20"
                />

                <input
                    name="hash_imei"
                    placeholder="IMEI"
                    value={form.hash_imei}
                    onChange={handleChange}
                    className="w-full mb-3 p-2 rounded-lg bg-black/20"
                />

                <input
                    name="hash_adn_hardware"
                    placeholder="Hardware Hash"
                    value={form.hash_adn_hardware}
                    onChange={handleChange}
                    className="w-full mb-4 p-2 rounded-lg bg-black/20"
                />

                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg bg-gray-500/20"
                    >
                        Cancelar
                    </button>

                    <button
                        type="submit"
                        className="px-4 py-2 rounded-lg gradient-primary"
                    >
                        Guardar
                    </button>
                </div>

            </form>

        </div>
    )
}