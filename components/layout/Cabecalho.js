import UsuarioService from "@/services/UsuarioService";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import logoHorizontal from "../../public/imagens/logoHorizontal.svg";
import imagemLupa from "../../public/imagens/lupa.svg";
import Navegacao from "./Navegacao";
import Resultadopesquisa from "./ResultadoPesquisa";

const usuarioService = new UsuarioService();

export default function Cabecalho() {
  const [resultadoPesquisa, setResultadoPesquisa] = useState([]);
  const [termoPesquisado, setTermoPesquisado] = useState("");
  const router = useRouter();

  const aoPesquisar = async (e) => {
    setTermoPesquisado(e.target.value);
    setResultadoPesquisa([]);
    if (termoPesquisado.length < 3) {
      return;
    }

    try {
      const { data } = await usuarioService.pesquisar(termoPesquisado);
      setResultadoPesquisa(data);
    } catch (e) {
      console.log("Erro ao pesquisar usuário. " + error?.response?.data?.erro);
    }
  };

  const aoClicarResultadoPesquisa = (id) => {
    setTermoPesquisado("");
    setResultadoPesquisa([]);
    router.push(`/perfil/${id}`);
  };

  const redirecionarParaHome = () => {
    router.push('/');
  }
  return (
    <header className="cabecalhoPrincipal ">
      <div className="conteudoCabecalhoPrincipal">
        <div className="logoCabecalhoPrincipal">
          <Image 
          onClick={redirecionarParaHome}
          src={logoHorizontal} 
          alt="Logo Devagram" 
          layout="fill" 
          />
        </div>
        <div className="barraPesquisa">
          <div className="containerImagemLupa">
            <Image src={imagemLupa} alt="Lupa de pesquisa" layout="fill" />
          </div>
          <input
            type="text"
            placeholder="Pesquisar"
            value={termoPesquisado}
            onChange={aoPesquisar}
          />
        </div>
        <Navegacao className="desktop" />
      </div>

      {resultadoPesquisa.length > 0 && (
        <div className="resultadoPesquisaContainer">
          {resultadoPesquisa.map((r) => (
            <Resultadopesquisa
              avatar={r.avatar}
              nome={r.nome}
              email={r.email}
              key={r._id}
              id={r._id}
              onClick={aoClicarResultadoPesquisa}
            />
          ))}
        </div>
      )}
    </header>
  );
}
