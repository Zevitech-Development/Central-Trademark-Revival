import SystemHeader from "@/components/layouts/system-header";

export default function BusinessLayout({
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
