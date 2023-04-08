import imagemLogo from "../../public/imagens/logo.svg";
import InputPublico from "../../components/inputPublico";
import imagemEnvelope from "../../public/imagens/envelope.svg";
import imagemChave from "../../public/imagens/chave.svg";
import imagemUsuarioAtivo from "../../public/imagens/usuarioAtivo.svg";
import imagemAvatar from "../../public/imagens/avatar.svg";
import Botao from "../../components/botao";
import UploadImagem from "../../components/uploadImagem";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  validarNome,
  validarEmail,
  validarSenha,
  validarConfirmacaoSenha,
} from "@/utils/validadores";
import UsuarioService from '../../services/UsuarioService'
import { useRouter } from "next/router";

const usuarioService = new UsuarioService();

export default function Cadastro() {
  
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmacaoSenha, setConfirmacaoSenha] = useState("");
  const [imagem, setImagem] = useState(null);
  const [estaSubmetendo, setEstaSubmetendo] = useState(false);
  const router = useRouter();

  const validarFormulario = () => {
    return (
      
      validarEmail(email) &&
      validarSenha(senha) &&
      validarNome(nome) &&
      validarConfirmacaoSenha(senha, confirmacaoSenha)
    );
  };
  const aoSubmeter = async (e) => {
    e.preventDefault();
    if(!validarFormulario()){
      return;
    }

    setEstaSubmetendo(true);

    try {
      const corpoRequisicaoCadastro = new FormData();
      corpoRequisicaoCadastro.append('nome', nome);
      corpoRequisicaoCadastro.append('email', email);
      corpoRequisicaoCadastro.append('senha', senha);
      
      if(imagem?.arquivo){
        corpoRequisicaoCadastro.append('file', imagem.arquivo);
      };

      await usuarioService.cadastro(corpoRequisicaoCadastro)
      await usuarioService.login({
        login: email,
        senha
      });

      router.push('/');

    } catch (error) {
      alert("Erro ao cadastrar usuário. " + error?.response?.data?.erro);
    }
    setEstaSubmetendo(false);
  };
  return (
    <>
      <section className={`paginaCadastro paginaPublica`}>
        <div className="logoContainer desktop">
          <Image
            src={imagemLogo}
            alt="logotipo"
            layout="fill"
            className="logo"
          />
        </div>
        <div className="conteudoPaginaPublica">
          <form onSubmit={aoSubmeter
          }>
            <UploadImagem
              imagemPreviewClassName="avatar avatarPreview"
              imagemPreview={imagem?.preview || imagemAvatar.src}
              setImagem={setImagem}
            />
            <InputPublico
              imagem={imagemUsuarioAtivo}
              texto="Nome Completo"
              tipo="text"
              aoAlterarValor={(e) => setNome(e.target.value)}
              valor={nome}
              mensagemValidacao="O nome precisa ter pelo menos 2 caracteres"
              exibirMensagemValidacao={nome && !validarNome(nome)}
            />
            <InputPublico
              imagem={imagemEnvelope}
              texto="E-mail"
              tipo="email"
              aoAlterarValor={(e) => setEmail(e.target.value)}
              valor={email}
              mensagemValidacao="O email informado é inválido"
              exibirMensagemValidacao={email && !validarEmail(email)}
            />
            <InputPublico
              imagem={imagemChave}
              texto="Senha"
              tipo="password"
              aoAlterarValor={(e) => setSenha(e.target.value)}
              valor={senha}
              mensagemValidacao="A senha precisa ter pelo menos 6 caracteres"
              exibirMensagemValidacao={senha && !validarSenha(senha)}
            />
            <InputPublico
              imagem={imagemChave}
              texto="Confirme sua senha"
              tipo="password"
              aoAlterarValor={(e) => setConfirmacaoSenha(e.target.value)}
              valor={confirmacaoSenha}
              mensagemValidacao="As senhas precisam ser iguais"
              exibirMensagemValidacao={
                confirmacaoSenha &&
                !validarConfirmacaoSenha(senha, confirmacaoSenha)
              }
            />
            <Botao
              texto="Cadastrar"
              tipo="submit"
              desabilitado={!validarFormulario() || estaSubmetendo}
            />
          </form>
          <div className="rodapePaginaPublica">
            <p>Já possui uma conta?</p>
            <Link href={"/"}>Faça seu login agora!</Link>
          </div>
        </div>
      </section>
    </>
  );
}
