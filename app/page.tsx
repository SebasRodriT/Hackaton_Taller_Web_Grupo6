import Image from "next/image";

export default function Home() {
  return (
    // qUIERO QUE EL NAVBAR ESTE EN TODAS LAS PAGINAS, ASI QUE LO PONGO EN EL LAYOUT, Y EL CHILDREN ES LO QUE SE VA A RENDERIZAR EN CADA PAGINA
      <div className="flex flex-col items-center justify-between p-24">
        <h1 className="text-4xl font-bold">Home</h1>
      </div>
      
    
  );
}
