export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className="container mx-auto xl:px-20 md:px-10 bg-background">
        {children}
      </body>
    </html>
  );
}
