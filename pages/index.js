import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Botao from "@/components/botao";
import Avatar from "@/components/avatar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <h1>Olá, mundo</h1>
      <div style={{ width: 350 }}>
        <Avatar />
        <Botao
          texto={"Login"}
          manipularClique={() => console.log("Botão clicado")}
        />

      </div>
    </>
  );
}
