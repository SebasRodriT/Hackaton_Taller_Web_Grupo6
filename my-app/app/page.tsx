import ProgressBarForm from "@/components/ProgressBarForm";
import GeneratorPassword from "@/components/generatorPassword/Generator";

export default function Home() {
  return (
    <main className="flex flex-col items-center gap-10 p-10">
      <ProgressBarForm />
      <GeneratorPassword/>
    </main>
  );
}
