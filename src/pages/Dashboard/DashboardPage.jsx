import { useState } from "react"
import { motion } from "framer-motion"
import toast, { Toaster } from "react-hot-toast"
import {
	Bell,
	ShieldCheck,
	ScanLine,
	TriangleAlert,
	BadgeCheck,
	Store,
	Clock3,
	Smartphone,
	ArrowUpRight,
	User,
	LogOut,
	Settings,
	Sun,
	Moon
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { useTheme } from "../../context/ThemeContext"
import BottomNav from "../../components/navigation/BottomNav"
import useDevices from "../../hooks/useDevices"

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const quickActions = [
	{
		title: "Escanear",
		description: "Revisa estado del dispositivo",
		icon: ScanLine,
		to: "/devices",
		color: "from-[#13e8f3] to-[#3b94c8]"
	},
	{
		title: "Reportar robo",
		description: "Bloquea tu dispositivo",
		icon: TriangleAlert,
		to: "/devices",
		color: "from-[#e01aa9] to-[#9138a3]"
	},
	{
		title: "Verificar",
		description: "Confirmar identidad del equipo",
		icon: BadgeCheck,
		to: "/verify",
		color: "from-[#a682e8] to-[#655eaf]"
	},
	{
		title: "Mercado",
		description: "Explorar dispositivos verificados",
		icon: Store,
		to: "/market",
		color: "from-[#13e8f3] to-[#e01aa9]"
	}
]

export default function DashboardPage() {

	const navigate = useNavigate()
	const { logout, user } = useAuth()
	const { theme, toggleTheme } = useTheme()
	const { devices, loading, reportDeviceState } = useDevices()

	const [quickReportOpen, setQuickReportOpen] = useState(false)

	const onQuickReportSubmit = async (id, statusVal) => {
		try {
			setQuickReportOpen(false)
			await toast.promise(
				reportDeviceState(id, statusVal),
				{
					loading: "Actualizando estado...",
					success: "Estado de seguridad actualizado ✅",
					error: "Error al actualizar estado"
				}
			)
		} catch (error) {
			console.error(error)
		}
	}

	const handleActionClick = (action) => {
		if (action.title === "Reportar robo") {
			setQuickReportOpen(true)
		} else {
			navigate(action.to)
		}
	}

	const totalDevices = devices.length
	const mainDevice = devices[0]

	const recentActivity = [
		{
			title: `Total de dispositivos registrados: ${totalDevices}`,
			time: "Actualizado ahora"
		},
		{
			title: mainDevice
				? `Dispositivo principal: ${mainDevice.marca_modelo}`
				: "Aún no tienes dispositivos registrados",
			time: "Sistema"
		},
		{
			title: "Sesión segura iniciada",
			time: "Hace unos minutos"
		}
	]

	return (
		<div className="min-h-screen flex flex-col relative overflow-hidden hero-bg">
			<Toaster position="top-right" />

			<div className="absolute inset-0 pointer-events-none">
				<div className="absolute top-[-20%] left-[-20%] w-[70%] h-[60%] bg-primary/10 blur-3xl rounded-full" />
				<div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-secondary/10 blur-3xl rounded-full" />
			</div>

			<main className="relative z-10 flex-1 px-6 pt-8 pb-24 max-w-7xl mx-auto w-full">

				{/* HEADER */}
				<motion.header
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					className="glass rounded-3xl p-5 mb-6 shadow-card"
				>
					<div className="flex items-center justify-between">

						<div>
							<p className="text-xs text-muted-foreground">
								Bienvenido de nuevo
							</p>

							<h1 className="text-2xl font-bold">
								Mi Panel
							</h1>

							<p className="text-sm text-muted-foreground mt-1">
								Dispositivos registrados: {totalDevices}
							</p>
						</div>
						<div className="flex items-center gap-3">
							<button onClick={toggleTheme} className="w-11 h-11 rounded-xl glass-light flex items-center justify-center relative hover:scale-105 transition">
								{theme === "dark" ? <Sun size={19} className="text-primary" /> : <Moon size={19} className="text-primary" />}
							</button>

							<button className="w-11 h-11 rounded-xl glass-light flex items-center justify-center relative hover:scale-105 transition">
								<Bell size={19} className="text-primary" />
							</button>

							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<button className="w-11 h-11 rounded-full glass-light flex items-center justify-center hover:scale-105 transition outline-none">
										<Avatar className="w-9 h-9">
											<AvatarFallback className="bg-transparent text-foreground">
												{user?.nombres?.charAt(0) || <User size={18} />}
											</AvatarFallback>
										</Avatar>
									</button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end" className="w-56 glass border-border text-foreground">
									<DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
									<DropdownMenuSeparator className="bg-white/10" />
									<DropdownMenuItem className="cursor-pointer hover:bg-white/10 focus:bg-white/10" onClick={() => navigate("/profile")}>
										<User className="mr-2 h-4 w-4" />
										<span>Perfil</span>
									</DropdownMenuItem>
									<DropdownMenuItem className="cursor-pointer hover:bg-white/10 focus:bg-white/10">
										<Settings className="mr-2 h-4 w-4" />
										<span>Configuración</span>
									</DropdownMenuItem>
									<DropdownMenuSeparator className="bg-white/10" />
									<DropdownMenuItem className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive" onClick={async () => {
										await logout();
										navigate("/");
									}}>
										<LogOut className="mr-2 h-4 w-4" />
										<span>Cerrar sesión</span>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>

						</div>

					</div>
				</motion.header>


				{/* DISPOSITIVO PRINCIPAL */}
				<motion.section
					initial={{ opacity: 0, y: 18 }}
					animate={{ opacity: 1, y: 0 }}
					className="glass rounded-3xl p-5 mb-6 shadow-card"
				>

					{loading ? (

						<div className="text-center py-10">
							Cargando dispositivos...
						</div>

					) : mainDevice ? (

						<>
							<div className="flex justify-between mb-4 flex-wrap gap-2">

								<div className="flex gap-3">

									<div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
										<Smartphone size={22} />
									</div>

									<div>
										<p className="text-xs text-muted-foreground">
											Dispositivo principal
										</p>

										<h2 className="text-xl font-bold">
											{mainDevice.marca_modelo}
										</h2>
									</div>

								</div>

								<span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2 ${mainDevice.estado === "LIBRE" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
										mainDevice.estado === "ROBADO" ? "bg-red-500/10 text-red-400 border border-red-500/20" :
											"bg-amber-500/10 text-amber-400 border border-amber-500/20"
									}`}>
									{mainDevice.estado === "LIBRE" ? (
										<>
											<ShieldCheck size={14} className="text-emerald-400" />
											Seguro
										</>
									) : mainDevice.estado === "ROBADO" ? (
										<>
											<TriangleAlert size={14} className="text-red-400" />
											Robado
										</>
									) : (
										<>
											<TriangleAlert size={14} className="text-amber-400" />
											Extraviado
										</>
									)}
								</span>

							</div>

							<div className="grid sm:grid-cols-2 gap-3 text-sm mb-4">

								<div className="glass-light rounded-xl px-4 py-3">
									IMEI: {mainDevice.hash_imei}
								</div>

								<div className="glass-light rounded-xl px-4 py-3">
									Hardware ID: {mainDevice.hash_adn_hardware}
								</div>

								<div className="glass-light rounded-xl px-4 py-3 sm:col-span-2 flex items-center justify-between">
									<span className="text-white/60">Huella Visual IA:</span>
									<span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${mainDevice.hash_visual
											? "bg-teal-500/10 text-teal-400 border border-teal-500/20"
											: "bg-orange-500/10 text-orange-400 border border-orange-500/20"
										}`}>
										{mainDevice.hash_visual ? "Registrada ✅" : "Sin Huella ⚠️"}
									</span>
								</div>

							</div>

							<div className="glass-light rounded-xl px-4 py-4 flex justify-between">

								<div>
									<p className="text-xs text-muted-foreground">
										Certificado Blockchain
									</p>

									<p className="font-semibold">
										Registrado y verificable
									</p>
								</div>

								<button
									onClick={() => navigate("/devices")}
									className="px-4 py-2 rounded-xl gradient-primary text-sm flex gap-2"
								>
									Ver dispositivos
									<ArrowUpRight size={16} />
								</button>

							</div>

						</>

					) : (

						<div className="text-center py-10">

							<p className="mb-3">
								No tienes dispositivos registrados
							</p>

							<button
								onClick={() => navigate("/devices")}
								className="px-5 py-2 rounded-xl gradient-primary"
							>
								Registrar dispositivo
							</button>

						</div>

					)}

				</motion.section>


				{/* LISTA DISPOSITIVOS */}
				<section className="mb-6">

					<h3 className="text-lg font-semibold mb-3">
						Mis dispositivos
					</h3>

					{devices.map(device => (

						<motion.div
							key={device.id}
							initial={{ opacity: 0, x: -10 }}
							animate={{ opacity: 1, x: 0 }}
							whileHover={{ scale: 1.01, backgroundColor: "rgba(var(--card), 0.06)" }}
							transition={{ duration: 0.2 }}
							className="glass-light rounded-xl px-4 py-3 mb-2 cursor-pointer border border-transparent hover:border-primary/30 hover:shadow-glow transition-all"
						>

							<div className="flex justify-between items-center">

								<div>

									<p className="font-semibold">
										{device.marca_modelo}
									</p>

									<div className="text-sm text-muted-foreground flex flex-wrap items-center gap-3 mt-0.5">
										<span>IMEI: {device.hash_imei}</span>
										<span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${device.hash_visual
												? "bg-teal-500/10 text-teal-400 border border-teal-500/20"
												: "bg-orange-500/10 text-orange-400 border border-orange-500/20"
											}`}>
											{device.hash_visual ? "Huella registrada ✅" : "Sin huella ⚠️"}
										</span>
									</div>

								</div>

								<span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${device.estado === "LIBRE" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/25" :
										device.estado === "ROBADO" ? "bg-red-500/10 text-red-400 border border-red-500/25" :
											"bg-amber-500/10 text-amber-400 border border-amber-500/25"
									}`}>
									{device.estado === "LIBRE" ? "Seguro" : device.estado === "ROBADO" ? "Robado" : "Extraviado"}
								</span>

							</div>

						</motion.div>

					))}

				</section>


				{/* ACCIONES RAPIDAS */}
				<section className="mb-6">

					<h3 className="text-lg font-semibold mb-3">
						Acciones rápidas
					</h3>

					<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">

						{quickActions.map((action, index) => {

							const Icon = action.icon

							return (

								<motion.button
									key={action.title}
									onClick={() => handleActionClick(action)}
									initial={{ opacity: 0, y: 18 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: index * 0.1, duration: 0.4 }}
									whileHover={{ scale: 1.03, y: -4 }}
									whileTap={{ scale: 0.97 }}
									className="glass rounded-2xl p-4 text-left transition-all hover:shadow-glow hover:border-primary/50 group cursor-pointer"
								>

									<span className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform bg-gradient-to-br ${action.color} shadow-lg`}>
										<Icon size={18} className="text-white" />
									</span>

									<p className="font-semibold">
										{action.title}
									</p>

									<p className="text-sm text-muted-foreground">
										{action.description}
									</p>

								</motion.button>

							)

						})}

					</div>

				</section>


				{/* ACTIVIDAD RECIENTE */}
				<section>

					<h3 className="text-lg font-semibold mb-3">
						Actividad reciente
					</h3>

					<div className="glass rounded-2xl p-4">

						{recentActivity.map((item, index) => (

							<motion.div
								key={index}
								initial={{ opacity: 0, x: -10 }}
								animate={{ opacity: 1, x: 0 }}
								className="glass-light rounded-xl px-3 py-3 mb-2 flex gap-3"
							>

								<Clock3 size={16} className="text-primary" />

								<div>

									<p className="text-sm font-medium">
										{item.title}
									</p>

									<p className="text-xs text-muted-foreground">
										{item.time}
									</p>

								</div>

							</motion.div>

						))}

					</div>

				</section>

			</main>

			{/* Quick Report Modal */}
			{quickReportOpen && (
				<div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
					<motion.div
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						className="glass rounded-3xl p-6 w-full max-w-lg shadow-2xl relative border border-white/10"
					>
						<h2 className="text-2xl font-bold mb-2 text-center text-foreground">
							Reportar Robo o Extravío
						</h2>
						<p className="text-sm text-muted-foreground text-center mb-6">
							Selecciona la acción para el equipo correspondiente:
						</p>

						{devices.length === 0 ? (
							<p className="text-center text-muted-foreground my-8">
								No tienes dispositivos registrados.
							</p>
						) : (
							<div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
								{devices.map(device => (
									<div
										key={device.id_dispositivo}
										className="glass-light rounded-2xl p-4 flex items-center justify-between border border-white/5"
									>
										<div>
											<p className="font-semibold text-foreground">
												{device.marca_modelo}
											</p>
											<p className={`text-xs font-bold mt-1 ${device.estado === "LIBRE" ? "text-emerald-400" :
													device.estado === "ROBADO" ? "text-red-400" : "text-amber-400"
												}`}>
												{device.estado === "LIBRE" ? "Seguro" : device.estado === "ROBADO" ? "Robado" : "Extraviado"}
											</p>
										</div>

										<div className="flex gap-2">
											{device.estado === "LIBRE" ? (
												<>
													<button
														onClick={() => onQuickReportSubmit(device.id_dispositivo, "ROBADO")}
														className="px-3 py-1.5 rounded-lg text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/25 transition cursor-pointer"
													>
														ROBO
													</button>
													<button
														onClick={() => onQuickReportSubmit(device.id_dispositivo, "EXTRAVIADO")}
														className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/25 transition cursor-pointer"
													>
														PERDIDO
													</button>
												</>
											) : (
												<button
													onClick={() => onQuickReportSubmit(device.id_dispositivo, "LIBRE")}
													className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/25 transition cursor-pointer"
												>
													RECUPERAR
												</button>
											)}
										</div>
									</div>
								))}
							</div>
						)}

						<button
							onClick={() => setQuickReportOpen(false)}
							className="w-full mt-6 bg-white/10 hover:bg-white/15 text-foreground py-3 rounded-2xl font-semibold transition border border-white/5 cursor-pointer"
						>
							Cerrar
						</button>
					</motion.div>
				</div>
			)}

		</div>
	)
}