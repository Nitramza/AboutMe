import { CV } from "@/components/CV";
import { cvData } from "@/data/cvData";

export default function Home() {
  return <CV data={cvData} />;
}