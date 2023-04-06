import CabecalhoComAcoes from "@/components/cabecalhoComAcoes";
import UploadImagem from "@/components/uploadImagem";
import comAutorizacao from "@/hoc/comAutorizacao"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import imgAvatarPadrao from "../../public/imagens/avatar.svg"
import Image from "next/image";
import imgLimpar from "../../public/imagens/limpar.svg"
import UsuarioService from "@/services/UsuarioService";
import { validarNome } from "@/utils/validadores";

const usuarioService = new UsuarioService();

function EditarPerfil({usuarioLogado}){
  const router = useRouter();
  const [avatar, setAvatar] = useState();
  const [nome, setNome] = useState('')
  const [inputAvatar, setInputAvatar] = useState();

  useEffect(() => {
    if(!usuarioLogado){
      return;
    }
    setNome(usuarioLogado.nome);
    setAvatar({
      preview: usuarioLogado.avatar
    });
  },[])

  const atualizarPerfil = async () => {
    try {
      if(!validarNome(nome)){
        alert('Nome precisa de pelo menos 2 caracteres');
        return;
      }

      const corpoRequisicao = new FormData();
      corpoRequisicao.append('nome', nome);
      console.log(avatar.arquivo);
      if(avatar.arquivo){
        corpoRequisicao.append('file', avatar.arquivo);
        console.log(corpoRequisicao);
      };
      

      await usuarioService.atualizarPerfil(corpoRequisicao);

      localStorage.setItem('nome', nome);
      if(avatar.arquivo){
        localStorage.setItem('avatar', avatar.preview)
      }


      router.push('/perfil/eu')
    } catch (e) {
      alert(e + ' erro ao editar perfil')
    }
  }

  const aoCancelarEdicao = () => {
    router.push('/perfil/eu')
  }

  const abrirSeletorDeArquivos = () => {
    inputAvatar?.click();
  }

  

  return (
    <div className="paginaEditarPerfil largura30pctDesktop">
      <div className="conteudoPaginaEditarPerfil">
        <CabecalhoComAcoes 
          titulo={'Editar Perfil'}
          aoClicarAcaoEsquerda={aoCancelarEdicao}
          textoEsquerda={'Cancelar'}
          elementoDireita={'Concluir'}
          aoClicarElementoDireita={atualizarPerfil}
        />
        
        <hr className="linhaDivisoria"/>
        <div className="edicaoAvatar">
          <UploadImagem 
            setImagem={setAvatar}
            imagemPreview={avatar?.preview || imgAvatarPadrao.src}
            imagemPreviewClassName={'avatar'}
            aoSetarAReferencia={setInputAvatar}
          />

          <span onClick={abrirSeletorDeArquivos}>Alterar foto do perfil</span>

        </div>
        <hr className="linhaDivisoria"/>

        <div className="edicaoNome">
          <label>Nome</label>
          <input
            type="text"
            value={nome}
            onChange={e => setNome(e.target.value)}
          />
          <Image 
            src={imgLimpar}
            alt='icone limpar'
            width={16}
            height={16}
            onClick={() => setNome('')}
          />
        
        </div>
        <hr className="linhaDivisoria"/>
      </div>
    </div>
    )
}

export default comAutorizacao(EditarPerfil);