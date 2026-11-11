import { Header } from './Header';
import { Sidebar } from './Sidebar';

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <Sidebar />
      <main>{children}</main>
    </div>
  );
}
