import "./globals.css";
import "easymde/dist/easymde.min.css";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
