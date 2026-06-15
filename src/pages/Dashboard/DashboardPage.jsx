import { motion } from "framer-motion"
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
	const { devices, loading } = useDevices()

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
							<div className="flex justify-between mb-4">

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

								<span className="px-3 py-1 rounded-full glass-light text-xs flex items-center gap-2">
									<ShieldCheck size={14} className="text-primary" />
									Seguro
								</span>

							</div>

							<div className="grid sm:grid-cols-2 gap-3 text-sm mb-4">

								<div className="glass-light rounded-xl px-4 py-3">
									IMEI: {mainDevice.hash_imei}
								</div>

								<div className="glass-light rounded-xl px-4 py-3">
									Hardware ID: {mainDevice.hash_adn_hardware}
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

							<div className="flex justify-between">

								<div>

									<p className="font-semibold">
										{device.marca_modelo}
									</p>

									<p className="text-sm text-muted-foreground">
										IMEI: {device.hash_imei}
									</p>

								</div>

								<ShieldCheck
									size={18}
									className="text-primary"
								/>

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
									onClick={() => navigate(action.to)}
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

		</div>
	)
}