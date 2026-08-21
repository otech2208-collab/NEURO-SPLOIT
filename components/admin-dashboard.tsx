"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

type Stats = { totalUsers: number; newUsersLast7Days: number; totalMessages: number | null; topUsers: Array<{ userId: string; name: string; email: string | null; messageCount: number }> };

export function AdminDashboard() {
  const { getToken, isSignedIn } = useAuth();
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => { if (!isSignedIn) return; (async () => { const token = await getToken(); const response = await fetch("/api/admin/stats", { headers: token ? { Authorization: `Bearer ${token}` } : {} }); const body = await response.json() as Stats & { error?: string }; if (!response.ok) { setError(body.error || "Accès refusé."); return; } setStats(body); })(); }, [getToken, isSignedIn]);
  if (error) return <p className="error-message">{error}</p>;
  if (!stats) return <p className="muted">Chargement des métriques…</p>;
  return <><div className="metrics"><article><span>Comptes</span><strong>{stats.totalUsers}</strong></article><article><span>Nouveaux / 7 j</span><strong>{stats.newUsersLast7Days}</strong></article><article><span>Messages</span><strong>{stats.totalMessages ?? "Indisponible"}</strong></article></div><div className="leaderboard"><h2>Utilisateurs les plus actifs</h2>{stats.topUsers.length ? stats.topUsers.map((user, index) => <div key={user.userId}><b>{index + 1}</b><span>{user.name || user.email || "Utilisateur"}</span><strong>{user.messageCount} messages</strong></div>) : <p className="muted">Les données d’usage apparaîtront après les premières conversations.</p>}</div></>;
}
