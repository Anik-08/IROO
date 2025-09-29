import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { Activity, Map, Gauge, BrainCircuit } from "lucide-react";
import type { Route } from "next";

type NavItem = {
  href: Route;
  label: string;
  icon: React.ElementType;
};

const navItems: NavItem[] = [
  { href: "/operations-map", label: "Operations Map", icon: Map },
  { href: "/performance", label: "Performance", icon: Gauge },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-bg-secondary border-r border-bg-tertiary flex flex-col">
      <div className="px-5 pt-5 pb-4 border-b border-bg-tertiary flex items-center gap-3">
        <div className="size-9 rounded bg-gradient-to-tr from-brand.violet to-brand.blue flex items-center justify-center text-white font-bold text-xs">
          IROO
        </div>
        <div>
          <p className="font-semibold text-sm tracking-wide">IROO Dashboard</p>
          <p className="text-[10px] text-slate-500 uppercase">
            Digital Twin Control
          </p>
        </div>
      </div>
      <nav className="flex-1 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname?.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 px-4 py-2.5 text-sm rounded-md mx-2 transition-colors",
                active
                  ? "bg-brand.violet/20 text-brand.violet border border-brand.violet/40"
                  : "text-slate-400 hover:text-slate-200 hover:bg-bg-tertiary"
              )}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 text-[10px] text-slate-500 border-t border-bg-tertiary space-y-2">
        <div className="flex items-center gap-2">
          <Activity size={14} className="text-brand.emerald" />
          <span>Realtime Sim Active</span>
        </div>
        <div className="flex items-center gap-2">
          <BrainCircuit size={14} className="text-brand.violet" />
          <span>MARL Policy Mock</span>
        </div>
      </div>
    </aside>
  );
}
