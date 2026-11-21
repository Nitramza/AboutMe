import { PortfolioSite } from "@/components/PortfolioSite";
import { cvData } from "@/data/cvData";

export default function Home() {
  return <PortfolioSite data={cvData} />;
}