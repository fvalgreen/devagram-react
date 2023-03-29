import Image from "next/image";
import { useState } from "react";
import logoHorizontal from "../../public/imagens/logoHorizontal.svg";
import imagemLupa from "../../public/imagens/lupa.svg";
import Navegacao from "./Navegacao";
import Resultadopesquisa from "./ResultadoPesquisa";

export default function Cabecalho() {
  const [resultadoPesquisa, setResultadoPesquisa] = useState([]);
  const [termoPesquisado, setTermoPesquisado] = useState([]);

  const aoPesquisar = (e) => {
    setTermoPesquisado(e.target.value);
    setResultadoPesquisa([]);
    if (termoPesquisado.length < 3) {      
      return;
    }
    setResultadoPesquisa([
      {
        avatar: '',
        nome: 'Felipe',
        email: 'felipe@gmail.com',
        _id: '1234565',
      },
      {
        avatar: '',
        nome: 'João',
        email: 'joao@gmail.com',
        _id: '1362455',
      },
      {
        avatar: '',
        nome: 'Marcos',
        email: 'marcos@gmail.com',
        _id: '6123455',
      },
    ]);
  };

  const aoClicarResultadoPesquisa = (id) => {
    console.log("Ao CLicar no Resultado da Pesquisa", {id});
  };

  return (
    <header className="cabecalhoPrincipal ">
      <div className="conteudoCabecalhoPrincipal">
        <div className="logoCabecalhoPrincipal">
          <Image src={logoHorizontal} alt="Logo Devagram" layout="fill" />
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
