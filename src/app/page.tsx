import { CompactPortfolio } from "@/components/CompactPortfolio";
import { cvData } from "@/data/cvData";

export default function Home() {
  return <CompactPortfolio data={cvData} />;
}