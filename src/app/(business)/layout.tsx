import SystemHeader from "@/components/layouts/system-header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SystemHeader />
      {children}
    </>
  );
}
