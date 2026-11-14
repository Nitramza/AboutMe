import { SlideDeck } from "@/components/SlideDeck";
import { cvData } from "@/data/cvData";

export default function Home() {
  return <SlideDeck data={cvData} />;
}