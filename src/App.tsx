import Navbar from './components/layout/Navbar'
import HeroBanner from './components/layout/HeroBanner'
import BookingForm from './components/booking/BookingForm'

export default function App() {
  return (
    <>
      <Navbar />
      <HeroBanner />
      <main className="max-w-2xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Casey Jones Railway Co.</h1>
        <BookingForm />
      </main>
    </>
  )
}
