import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import UsuarioService from "@/services/UsuarioService";
import Avatar from "../avatar";
import Botao from "../botao";
import CabecalhoComAcoes from "@/components/cabecalhoComAcoes";
import imgSetaEsquerda from "../../public/imagens/setaEsquerda.svg";
import imgLogout from "../../public/imagens/logout.svg";


const usuarioService = new UsuarioService();

export default function CabecalhoPerfil({
  usuario,
  estaNoPerfilPessoal
}){
  const router = useRouter();
  const [estaSeguindoOUsuario, setEstaSeguindoOUsuario] = useState(false);
  const [quantidadeSeguidores, setQuantidadeSeguidores] = useState(0);
  
  useEffect(() => {
    if(!usuario){
      return;
    }
    setEstaSeguindoOUsuario(usuario.segueEsseUsuario);
    setQuantidadeSeguidores(usuario.seguidores)
    
  }, [usuario]);

  const obterTextoBotaoSeguir = () => {
    if (estaNoPerfilPessoal){
      return 'Editar perfil';
    };
    if (estaSeguindoOUsuario) {
      return 'Deixar de seguir';
    }else{
      return 'Seguir';
    };
  };
  const obterCorDoBotaoSeguir = () => {
    if(estaSeguindoOUsuario || estaNoPerfilPessoal){
      return 'invertido';
    }else{
      return 'primaria';
    }
  };
  const manipularCliqueBotaoPrincipal = async () => {
    if(estaNoPerfilPessoal) {
      return router.push('/perfil/editar');
    }

    try {
      await usuarioService.alterenarSeguir(usuario._id);
      setQuantidadeSeguidores(
        estaSeguindoOUsuario 
        ? (quantidadeSeguidores - 1)
        : (quantidadeSeguidores + 1)
      )
      setEstaSeguindoOUsuario(!estaSeguindoOUsuario);
    } catch (e) {
      console.log(e + ' erro ao seguir/deixar de seguir')
    }
    
  }

  const aoClicarSetaEsquerda = () => {
    router.back();
  }

  const logout = () => {
    usuarioService.logout();
    router.replace('/')
  }

  const obterElementoDireitaCabecalho = () => {
    if(estaNoPerfilPessoal){
      return (
        <Image
          src={imgLogout}
          alt="icone logout"
          onClick={logout}
          width={25}
          height={25}
        />
      )
    }
    return null;
}

  return(
    <div className="cabecalhoPerfil largura30pctDesktop">



      <CabecalhoComAcoes
          iconeEsquerda={estaNoPerfilPessoal ? null : imgSetaEsquerda}
          aoClicarAcaoEsquerda={aoClicarSetaEsquerda}
          titulo={usuario.nome}
          elementoDireita={
            obterElementoDireitaCabecalho()
          }

        />
      <hr className="bordaCabecalhoPerfil"/>
      <div className="statusPerfil">
        <Avatar src={usuario.avatar}/>
        <div className="informacoesPerfil">
          <div className="statusContainer">
            <div className="status">
              <strong>{usuario.publicacoes}</strong>
              <span>Publicações</span>
            </div>
            <div className="status">
              <strong>{quantidadeSeguidores}</strong>
              <span>Seguidores</span>
            </div>
            <div className="status">
              <strong>{usuario.seguindo}</strong>
              <span>Seguindo</span>
            </div>
          </div>
          <Botao
            texto={obterTextoBotaoSeguir()}   
            cor={obterCorDoBotaoSeguir()}
            manipularClique={manipularCliqueBotaoPrincipal}         
          />
        </div>
      </div>
    </div>
  )
};