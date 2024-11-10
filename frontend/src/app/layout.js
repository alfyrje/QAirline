import Footer from "../components/common/footer"
import Header from "../components/common/header"
import Home from "./page"
export const metadate = {
  title: "qAirline",
  description: "qAirline booking"
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <Header />
        <Home />
        {/* <Footer /> */}
    </html>
  )
}