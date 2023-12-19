import { ReduxProvider } from "@/redux/features/provider"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>randomuser</title>
      </head>
      <body>
        <ReduxProvider>{children}</ReduxProvider>
        </body>
    </html>
  )
}