import Feed from "@/components/feed";
import comAutorizacao from "@/hoc/comAutorizacao";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CabecalhoPerfil from "@/components/cabecalhoPerfil";
import UsuarioService from "@/services/UsuarioService";

const usuarioService = new UsuarioService();

function Perfil({ usuarioLogado }) {
  const [usuario, setUsuario] = useState({});
  const router = useRouter();

  const obterPerfil = async (idUsuario) => {
    try {
      const { data } = await usuarioService.obterPerfil(
        estaNoPerfilPessoal()
          ? usuarioLogado.id
          : idUsuario
      );
      return data;
    } catch (e) {
      alert("Erro ao obter perfil");
      console.log(e);
    }
  };

  const estaNoPerfilPessoal = () => {
    return router.query.id === 'eu';
  }

  useEffect(() => {
    if (!router.query.id) {
      return;
    }
    const pegarDadosPerfil = async () => {      
      const dadosPerfil = await obterPerfil(router.query.id);
     
      setUsuario(dadosPerfil);      
    };
    pegarDadosPerfil();
  }, [usuarioLogado ,router.query.id]);

  return (
    <div className="paginaPerfil">
      <CabecalhoPerfil 
      usuarioLogado={usuarioLogado} 
      usuario={usuario}
      estaNoPerfilPessoal={estaNoPerfilPessoal()} />
      <Feed 
      usuarioLogado={usuarioLogado}
      idUsuario={usuario?._id}
     />
    </div>
  );
}

export default comAutorizacao(Perfil);
