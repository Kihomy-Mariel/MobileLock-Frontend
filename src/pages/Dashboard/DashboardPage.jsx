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
	ArrowUpRight
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import BottomNav from "../../components/navigation/BottomNav"

const quickActions = [
	{
		title: "Escanear",
		description: "Revisa estado y sello del dispositivo",
		icon: ScanLine,
		to: "/profile"
	},
	{
		title: "Reportar robo",
		description: "Bloquea y avisa con un toque",
		icon: TriangleAlert,
		to: "/profile"
	},
	{
		title: "Verificar",
		description: "Confirma identidad y certificado",
		icon: BadgeCheck,
		to: "/profile"
	},
	{
		title: "Mercado",
		description: "Explora equipos verificados",
		icon: Store,
		to: "/profile"
	}
]

const recentActivity = [
	{ title: "Dispositivo verificado correctamente", time: "Hace 12 min" },
	{ title: "Sello blockchain actualizado", time: "Hoy, 08:40" },
	{ title: "Inicio de sesión seguro detectado", time: "Ayer, 21:18" }
]

export default function DashboardPage() {
	const navigate = useNavigate()

	return (
		<div className="min-h-screen flex flex-col relative overflow-hidden hero-bg">
			<div className="absolute inset-0 pointer-events-none">
				<div className="absolute top-[-20%] left-[-20%] w-[70%] h-[60%] bg-cyan-500/10 blur-3xl rounded-full" />
				<div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-500/10 blur-3xl rounded-full" />
			</div>

			<main className="relative z-10 flex-1 px-6 pt-8 pb-24 max-w-5xl mx-auto w-full">
				<motion.header
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.45 }}
					className="glass rounded-3xl p-5 md:p-6 mb-6 shadow-card"
				>
					<div className="flex items-center justify-between gap-4">
						<div>
							<p className="text-xs text-muted-foreground mb-1">Bienvenido de nuevo</p>
							<h1 className="text-2xl md:text-3xl font-bold">Mi Panel</h1>
						</div>

						<button
							type="button"
							aria-label="Notificaciones"
							className="w-11 h-11 rounded-xl glass-light glow-ring flex items-center justify-center relative"
						>
							<Bell size={19} className="text-cyan-300" />
							<span className="absolute top-2 right-2 w-2 h-2 bg-cyan-400 rounded-full shadow-glow" />
						</button>
					</div>
				</motion.header>

				<motion.section
					initial={{ opacity: 0, y: 18 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.08, duration: 0.45 }}
					className="glass rounded-3xl p-5 md:p-6 mb-6 shadow-card"
				>
					<div className="flex flex-wrap items-start justify-between gap-3 mb-4">
						<div className="flex items-center gap-3">
							<div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
								<Smartphone size={22} />
							</div>
							<div>
								<p className="text-xs text-muted-foreground">Dispositivo principal</p>
								<h2 className="text-xl md:text-2xl font-bold">iPhone 15 Pro</h2>
							</div>
						</div>

						<span className="px-3 py-1.5 rounded-full glass-light text-xs font-semibold inline-flex items-center gap-2">
							<ShieldCheck size={15} className="text-cyan-300" />
							Seguro
						</span>
					</div>

					<div className="grid sm:grid-cols-2 gap-3 text-sm mb-4">
						<div className="glass-light rounded-xl px-4 py-3">IMEI: 35 9234 88•• ••12</div>
						<div className="glass-light rounded-xl px-4 py-3">Última sincronización: hace 2 min</div>
					</div>

					<div className="glass-light rounded-2xl px-4 py-4 flex items-center justify-between gap-4">
						<div>
							<p className="text-xs text-muted-foreground mb-1">Certificado Blockchain</p>
							<p className="font-semibold">Verificado y trazable</p>
						</div>

						<button
							type="button"
							onClick={() => navigate("/profile")}
							className="px-4 py-2 rounded-xl gradient-primary font-semibold text-sm inline-flex items-center gap-2 shadow-glow"
						>
							Ver detalles
							<ArrowUpRight size={16} />
						</button>
					</div>
				</motion.section>

				<section className="mb-6">
					<div className="flex items-end justify-between mb-3">
						<h3 className="text-lg md:text-xl font-semibold">Acciones rápidas</h3>
						<span className="text-xs text-muted-foreground">Acceso inmediato</span>
					</div>

					<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
						{quickActions.map((action, index) => {
							const ActionIcon = action.icon

							return (
								<motion.button
									key={action.title}
									type="button"
									onClick={() => navigate(action.to)}
									initial={{ opacity: 0, y: 18 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.16 + index * 0.06, duration: 0.35 }}
									className="glass rounded-2xl p-4 text-left hover:-translate-y-1 transition-transform"
								>
									<span className="w-10 h-10 rounded-xl gradient-glow flex items-center justify-center mb-3">
										<ActionIcon size={18} className="text-cyan-300" />
									</span>
									<p className="font-semibold mb-1">{action.title}</p>
									<p className="text-sm text-muted-foreground">{action.description}</p>
								</motion.button>
							)
						})}
					</div>
				</section>

				<section>
					<div className="flex items-end justify-between mb-3">
						<h3 className="text-lg md:text-xl font-semibold">Actividad reciente</h3>
						<span className="text-xs text-muted-foreground">Ultimos eventos</span>
					</div>

					<div className="glass rounded-2xl p-3 md:p-4 shadow-card">
						{recentActivity.map((item, index) => (
							<motion.article
								key={item.title}
								initial={{ opacity: 0, x: -10 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.18 + index * 0.06, duration: 0.3 }}
								className="glass-light rounded-xl px-3 py-3 flex items-center gap-3 mb-2 last:mb-0"
							>
								<span className="w-9 h-9 rounded-lg gradient-glow flex items-center justify-center">
									<Clock3 size={16} className="text-cyan-300" />
								</span>

								<div>
									<p className="text-sm md:text-base font-medium">{item.title}</p>
									<p className="text-xs text-muted-foreground">{item.time}</p>
								</div>
							</motion.article>
						))}
					</div>
				</section>
			</main>

			<BottomNav />
		</div>
	)
}
