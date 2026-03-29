import ProgressBarForm from "@/components/ProgressBarForm";
import GeneratorPassword from "@/components/generatorPassword/Generator";
import Minutero from "@/components/Minutero";
import Formulario from "@/components/Formulario";

export default function Home() {
  return (
    <main className="flex flex-col items-center gap-10 p-10">
      <ProgressBarForm />
      <Formulario />
      <Minutero />
      <GeneratorPassword />
    </main>
  );
}
