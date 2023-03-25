import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Botao from "@/components/botao";
import Avatar from "@/components/avatar";
import UploadImagem from "@/components/uploadImagem";
import { useRef, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [imagem, setImagem] = useState(null);
  const referenciaInput = useRef(null);

  return (
    <>
      <h1>Olá, mundo</h1>
      <button onClick={() => referenciaInput?.current.click()}>
        abrir seletor de arquivos
      </button>
      <UploadImagem
        setImagem={setImagem}
        imagemPreview={imagem?.preview}
        aoSetarAReferencia={(ref) => (referenciaInput.current = ref)}
      />
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
