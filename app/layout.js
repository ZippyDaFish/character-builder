import "./globals.css";
import NavigationHeader from "./components/navigationHeader";

export const metadata = {
  title: "Character",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavigationHeader/>
        {children}
      </body>
    </html>
  );
}