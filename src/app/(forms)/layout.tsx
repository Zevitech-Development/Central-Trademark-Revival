import SystemFooter from "@/components/layouts/system-footer";
import SystemHeader from "@/components/layouts/system-header";
import SystemProgressBar from "@/components/layouts/system-progress-bar";

export default function FormLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SystemHeader />
      <SystemProgressBar />
      {children}
      <SystemFooter />
    </>
  );
}
