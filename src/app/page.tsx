import Container from "@/components/Container";
import HeroSection from "@/components/sections/HeroSection";
import PopularCarsSection from "@/components/sections/PopularCarsSection";
import AiAssistantSection from "@/components/sections/AiAssistantSection";
import styles from "./page.module.scss";

export default function HomePage() {
  return (
    <div className={styles.page}>
      <Container>
        <HeroSection />
        <PopularCarsSection />
        <AiAssistantSection />
      </Container>
    </div>
  );
}
