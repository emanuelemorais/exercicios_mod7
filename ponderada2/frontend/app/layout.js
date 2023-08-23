import './globals.css'
import { AuthProvider } from "../context/AuthContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
       <AuthProvider>
      <head>
				<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet" />
			</head>
      <body className='font-montserrat'>{children}</body>
      </AuthProvider>
    </html>
  )
}
