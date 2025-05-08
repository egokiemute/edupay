import { Hero } from "@/components/landing/Hero";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function Home() {
  return (
    <div className="container">
      <Hero />
      <div className="flex flex-col items-center justify-center py-30 gap-y-4">
        <p>
          Hello World! Am finally working with shadcn/ui and nextjs. To build
          Edupay V1
        </p>
        <div>
          <Button variant="elevated">Payment Response</Button>
        </div>
        <div>
          <Progress value={20} className="w-[200px]" />
        </div>
        {/* <div>
          <Input placeholder="Student ID" className="w-[400px]" />
        </div>
        <div>
          <Checkbox />
        </div> */}
      </div>
    </div>
  );
}
