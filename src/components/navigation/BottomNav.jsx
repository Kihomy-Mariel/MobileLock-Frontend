import { NavLink } from "react-router-dom"

const navItems = [
	{ to: "/dashboard", label: "Inicio", icon: "home" },
	{ to: "/dashboard", label: "Escanear", icon: "scan" },
	{ to: "/dashboard", label: "Verificar", icon: "shield" },
	{ to: "/dashboard", label: "Mercado", icon: "market" },
	{ to: "/profile", label: "Perfil", icon: "profile" }
]

const Icon = ({ name }) => {
	switch (name) {
		case "home":
			return (
				<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 11.5 12 4l9 7.5V20a1 1 0 0 1-1 1h-5.5v-6h-5v6H4a1 1 0 0 1-1-1z" /></svg>
			)
		case "scan":
			return (
				<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7V5a1 1 0 0 1 1-1h2M4 17v2a1 1 0 0 0 1 1h2m10-19h2a1 1 0 0 1 1 1v2m0 10v2a1 1 0 0 1-1 1h-2M8 12h8" /></svg>
			)
		case "shield":
			return (
				<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 5 6v6c0 4.7 3 8.9 7 10 4-1.1 7-5.3 7-10V6z" /></svg>
			)
		case "market":
			return (
				<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16l-1 5H5zM6 12v7h12v-7M9 12v7m6-7v7" /></svg>
			)
		case "profile":
		default:
			return (
				<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 21a8 8 0 1 0-16 0m12-12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z" /></svg>
			)
	}
}

export default function BottomNav() {
	return (
		<nav className="bottom-nav" aria-label="Navegación principal">
			{navItems.map((item) => (
				<NavLink
					key={item.label}
					to={item.to}
					className={({ isActive }) => `bottom-nav__item ${isActive ? "is-active" : ""}`}
				>
					<Icon name={item.icon} />
					<span>{item.label}</span>
				</NavLink>
			))}
		</nav>
	)
}
