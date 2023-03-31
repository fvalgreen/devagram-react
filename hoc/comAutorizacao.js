import Cabecalho from "@/components/layout/Cabecalho";
import Navegacao from "@/components/layout/Navegacao";
import Rodape from "@/components/layout/Rodape";
import UsuarioService from "@/services/UsuarioService"
import { useRouter } from "next/router";

const usuarioService = new UsuarioService();

export default function comAutorizacao(Component) {
  return (props) => {
    const router = useRouter();
    if(typeof window !== 'undefined'){
      if(!usuarioService.estaAutenticado()){
        router.replace('/');
        return null;
      }

      const usuarioLogado = usuarioService.obterInformacoesUsuarioLogado();

      return(
        <>
        <Cabecalho usuarioLogado={usuarioLogado}/>
        <Component usuarioLogado={usuarioLogado} {...props} />
        <Rodape usuarioLogado={usuarioLogado} />
        </>

      )  
    }
    return null;
  }
}