import Link from "next/link";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export async function Topbar() {
  const { userId } = await auth();
  const isAdmin = Boolean(process.env.ADMIN_USER_ID && userId === process.env.ADMIN_USER_ID);
  return <header className="topbar"><Link href="/" className="brand" aria-label="NEURO-SPLOIT, accueil"><span className="brand-mark"><i /><b /></span><span><strong>NEURO-SPLOIT</strong><small>INTELLIGENCE TECHNIQUE</small></span></Link><nav aria-label="Navigation principale"><Link href="/">Chat</Link><Show when="signed-out"><SignInButton><button className="ghost-button">Se connecter</button></SignInButton><SignUpButton><button className="primary-button">Créer un compte</button></SignUpButton></Show><Show when="signed-in">{isAdmin ? <Link href="/admin">Administration</Link> : null}<UserButton /></Show></nav></header>;
}
