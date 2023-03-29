import imagemHomeCinza from "../../public/imagens/homeCinza.svg";
import imagemHomeAtiva from "../../public/imagens/homeAtivo.svg";
import imagemPublicacaoCinza from "../../public/imagens/publicacaoCinza.svg";
import imagemPublicacaoAtivo from "../../public/imagens/publicacaoAtivo.svg";
import imagemUsuarioCinza from "../../public/imagens/usuarioCinza.svg";
import imagemUsuarioAtivo from "../../public/imagens/usuarioAtivo.svg";
import Image from "next/image";

export default function Navegacao({ className }) {
  return (
    <nav className= {`barraNavegacao ${className}`}>
      <ul>
        <li>
          <Image
            src={imagemHomeCinza}
            alt="Icone home cinza"
            width={20}
            height={20}
          />
        </li>
        <li><Image
            src={imagemPublicacaoCinza}
            alt="Icone publicacao cinza"
            width={20}
            height={20}
          /></li>
        <li><Image
            src={imagemUsuarioCinza}
            alt="Icone usuário cinza"
            width={20}
            height={20}
          /></li>
      </ul>
    </nav>
  );
}
