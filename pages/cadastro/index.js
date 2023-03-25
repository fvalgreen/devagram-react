import imagemLogo from "../../public/imagens/logo.svg";
import InputPublico from "../../components/inputPublico";
import imagemEnvelope from "../../public/imagens/envelope.svg";
import imagemChave from "../../public/imagens/chave.svg";
import imagemUsuarioAtivo from "../../public/imagens/usuarioAtivo.svg";
import imagemAvatar from "../../public/imagens/avatar.svg"
import Botao from "../../components/botao";
import UploadImagem from "../../components/uploadImagem";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmacaoSenha, setConfirmacaoSenha] = useState("");
  const [imagem, setImagem] = useState(null);
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
          <form>
            <UploadImagem 
              imagemPreviewClassName={'avatar avatarPreview'}
              imagemPreview={imagem?.preview || imagemAvatar.src}
              setImagem={setImagem}
            
            />
            <InputPublico
              imagem={imagemUsuarioAtivo}
              texto="Nome Completo"
              tipo="text"
              aoAlterarValor={(e) => setNome(e.target.value)}
              valor={nome}
            />
            <InputPublico
              imagem={imagemEnvelope}
              texto="E-mail"
              tipo="email"
              aoAlterarValor={(e) => setEmail(e.target.value)}
              valor={email}
            />
            <InputPublico
              imagem={imagemChave}
              texto="Senha"
              tipo="password"
              aoAlterarValor={(e) => setSenha(e.target.value)}
              valor={senha}
            />
            <InputPublico
              imagem={imagemChave}
              texto="Confirme sua senha"
              tipo="password"
              aoAlterarValor={(e) => setConfirmacaoSenha(e.target.value)}
              valor={confirmacaoSenha}
            />
            <Botao texto="Cadastrar" tipo="submit" desabilitado={false} />
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
