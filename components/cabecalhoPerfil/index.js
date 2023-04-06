import imgSetaEsquerda from "../../public/imagens/setaEsquerda.svg";
import CabecalhoComAcoes from "@/components/cabecalhoComAcoes";
import Avatar from "../avatar";
import Botao from "../botao";

export default function CabecalhoPerfil({
  usuario
}){
  return(
    <div className="cabecalhoPerfil largura30pctDesktop">
      <CabecalhoComAcoes
          iconeEsquerda={imgSetaEsquerda}
          titulo={usuario.nome}
        />
      <hr className="bordaCabecalhoPerfil"/>
      <div className="statusPerfil">
        <Avatar src={usuario.avatar}/>
        <div className="informacoesPerfil">
          <div className="statusContainer">
            <div className="status">
              <strong>15</strong>
              <span>Publicações</span>
            </div>
            <div className="status">
              <strong>105</strong>
              <span>Seguidores</span>
            </div>
            <div className="status">
              <strong>58</strong>
              <span>Seguindo</span>
            </div>
          </div>
          <Botao
            texto={'Seguir'}            
          />
        </div>
      </div>
    </div>
  )
};