import LoanCalculator from "@/components/loan-calculator";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="">
      <div
        className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] overflow-auto
      
       dark:bg-neutral-950 dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]
      
      
      "
      >
        <div className="max-w-5xl mx-auto p-4 md:px-20 lg:px-4">
          <LoanCalculator />
        </div>
      </div>
    </main>
  );
}
