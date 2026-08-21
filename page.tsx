import { AdminDashboard } from "@/components/admin-dashboard";
import { Topbar } from "@/components/topbar";

export default function AdminPage() {
  return <main><Topbar /><section className="admin-shell"><p className="eyebrow">ADMINISTRATION</p><h1>Activité produit</h1><AdminDashboard /></section></main>;
}
