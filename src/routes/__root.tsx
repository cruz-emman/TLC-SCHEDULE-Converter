import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
	component: () => (
		<>
			<div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-50">
				<header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
					<div className="container max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
						<div className="flex items-center gap-2">
							<span className="font-bold text-xl tracking-tight bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
								LWSIS Converter
							</span>
						</div>
						<nav className="flex items-center gap-4">
							<Link
								to="/"
								className="text-sm font-medium text-zinc-400 hover:text-zinc-50 [&.active]:text-zinc-50 transition-colors"
							>
								Home
							</Link>
						</nav>
					</div>
				</header>

				<main className="flex-1">
					<Outlet />
				</main>

				<footer className="border-t border-zinc-900 bg-zinc-950 py-6">
					<div className="container max-w-6xl mx-auto px-4 text-center text-sm text-zinc-500">
						&copy; {new Date().getFullYear()} LWSIS Converter. All rights
						reserved.
					</div>
				</footer>
			</div>
			<TanStackRouterDevtools />
		</>
	),
});
