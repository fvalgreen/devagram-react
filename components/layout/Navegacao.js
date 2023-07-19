import imagemHomeCinza from "../../public/imagens/homeCinza.svg";
import imagemHomeAtiva from "../../public/imagens/homeAtivo.svg";
import imagemPublicacaoCinza from "../../public/imagens/publicacaoCinza.svg";
import imagemPublicacaoAtivo from "../../public/imagens/publicacaoAtivo.svg";
import imagemUsuarioCinza from "../../public/imagens/usuarioCinza.svg";
import imagemUsuarioAtivo from "../../public/imagens/usuarioAtivo.svg";
import notificacaoCinza from '../../public/imagens/notifications.svg';
import notificacaoAtivo from '../../public/imagens/notifications-active.svg';
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import UsuarioService from "@/services/UsuarioService";


const mapaDeRotas = {
  home: {
    imagemAtivo: imagemHomeAtiva,
    rotasAtivacao: ['/'],
    imagemPadrao: imagemHomeCinza
  },
  publicacao: {
    imagemAtivo: imagemPublicacaoAtivo,
    rotasAtivacao: ['/publicacao'],
    imagemPadrao: imagemPublicacaoCinza
  },
  perfil: {
    imagemAtivo: imagemUsuarioAtivo,
    rotasAtivacao: ['/perfil/eu', '/perfil/editar'],
    imagemPadrao: imagemUsuarioCinza
  },
  notificacao: {
    imagemAtivo: notificacaoAtivo,
    rotasAtivacao: ['/notificacoes'],
    imagemPadrao: notificacaoCinza
  }
}

const usuarioService = new UsuarioService();

export default function Navegacao({ className }) {
  const [rotaAtiva, setRotaAtiva] = useState('home');
  const [notificacao, setNotificacao] = useState();
  const [iconeNotificacao, setIconeNotificacao] = useState(notificacaoCinza)
  const router = useRouter();

  useEffect(() => {
    definirRotaAtiva();
  }, [router.asPath])

  const obterNotificacoes = async () => {
    const notificacoes = await usuarioService.obterNotificacoes()
    setNotificacao(notificacoes.data);
    if(notificacoes.data.novas.length > 0){
      setIconeNotificacao(notificacaoAtivo);
    }else{
      setIconeNotificacao(notificacaoCinza);
    }    
  };

  const definirRotaAtiva = () => {
    const chavesDoMapaDeRotas = Object.keys(mapaDeRotas);
    const indiceAtivo = chavesDoMapaDeRotas.findIndex(chave => {
      return mapaDeRotas[chave].rotasAtivacao.includes(
        window.location.pathname
        );
    })    
    if(indiceAtivo === -1){
      setRotaAtiva('home');
    }else{
      setRotaAtiva(chavesDoMapaDeRotas[indiceAtivo]);
    }
  };

  
  const obterImagem = (nomeRota) => {
    const rotaAtivada = mapaDeRotas[nomeRota];

    if(rotaAtiva === nomeRota){
      return rotaAtivada.imagemAtivo;
    }

    return rotaAtivada.imagemPadrao;
  };

  const aoClicarNoIcone = (nomeRota) => {
    setRotaAtiva(nomeRota);
    router.push(mapaDeRotas[nomeRota].rotasAtivacao[0])
  }

  return (
    <nav className= {`barraNavegacao ${className}`}>
      <ul>
        <li onClick={() => {aoClicarNoIcone('home')}}>
          <Image
            src={obterImagem('home')}
            alt="Icone home cinza"
            width={20}
            height={20}
          />
        </li>
        <li onClick={() => {aoClicarNoIcone('publicacao')}}><Image
            src={obterImagem('publicacao')}
            alt="Icone publicacao cinza"
            width={20}
            height={20}
          /></li>
        <li onClick={() => {aoClicarNoIcone('perfil')}}><Image
            src={obterImagem('perfil')}
            alt="Icone usuário cinza"
            width={20}
            height={20}
          /></li>
        <li onClick={() => {aoClicarNoIcone('notificacao')}}><Image
            src={iconeNotificacao}
            alt="Icone notificação cinza"
            width={20}
            height={20}
          /></li>
      </ul>
    </nav>
  );
}
