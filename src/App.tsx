import Navbar from './components/layout/Navbar'
import HeroBanner from './components/layout/HeroBanner'
import BookingForm from './components/booking/BookingForm'

export default function App() {
  return (
    <>
      <Navbar />
      <HeroBanner />
      <main className="max-w-2xl mx-auto py-10 px-4">
        <BookingForm />
      </main>
    </>
  )
}
