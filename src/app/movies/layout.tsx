import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

export default function layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-dvh w-full flex-col items-stretch">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
