import Navbar from "../components/Navbar";
import HeroSection from "../components/Hero-Section";

export default function HomePage() {
  return (
    <main className="bg-background text-foreground">
      <Navbar />
      <HeroSection />
    </main>
  );
}
