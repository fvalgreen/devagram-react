import CabecalhoComAcoes from "@/components/cabecalhoComAcoes";
import UploadImagem from "@/components/uploadImagem";
import comAutorizacao from "@/hoc/comAutorizacao";
import { useState } from "react";
import imgPaisagem from "../../public/imagens/paisagem.svg";
import Botao from "@/components/botao";
import imgSetaEsquerda from "../../public/imagens/setaEsquerda.svg";
import FeedService from "@/services/FeedService";
import { useRouter } from "next/router";

const limiteDaDescricao = 255;
const descricaoMinima = 3;
const feedService = new FeedService();

function Publicacao() {
  const [imagem, setImagem] = useState();
  const [descricao, setDescricao] = useState("");
  const [inputImagem, setInputImagem] = useState();
  const [etapaAtual, setEtapaAtual] = useState(1);
  const router = useRouter();

  const estaNaEtapaUm = () => etapaAtual === 1;

  const obterTextoEsquerdaCabecalho = () => {
    if (estaNaEtapaUm() && imagem) {
      return "Cancelar";
    }
    return "";
  };

  const obterTextoDireitaCabecalho = () => {
    if (!imagem) {
      return "";
    }

    if (estaNaEtapaUm()) {
      return "Avançar";
    }

    return "Compartilhar";
  };

  const aoClicarAcaoEsquerdaCabecalho = () => {
    if (estaNaEtapaUm()) {
      inputImagem.value = null;
      setImagem(null);
      return;
    }
    setEtapaAtual(1);
  };

  const aoClicarAcaoDireitaCabecalho = () => {
    if(estaNaEtapaUm()){
      setEtapaAtual(2);
      return;
    }

    publicar();
  };
  const escreverDescricao = (e) => {
    const valorAtual = e.target.value;
    if (valorAtual.length >= limiteDaDescricao) {
      return;
    }

    setDescricao(valorAtual);
  };
  const obterClassNameCabecalho = () => {
    if (estaNaEtapaUm()) {
      return "primeiraEtapa";
    }
    return "segundaEtapa";
  };

  const publicar = async () => {
    try {
      if(!validarFormulario()){
        console.log('A descricao precisa de pelo menos 3 caracteres e a imagem é obrigatória')
        return;
      }

      const corpoPublicacao = new FormData();

      corpoPublicacao.append('descricao', descricao);
      corpoPublicacao.append('file', imagem.arquivo);

      await feedService.fazerPublicacao(corpoPublicacao);

      router.push('/')
    } catch (e) {
      console.log(e + " Erro ao salvar publicação");
    }
  };

  const validarFormulario = () => {
    return(
      descricao.length >= descricaoMinima
      && imagem?.arquivo
    )
  };

  return (
    <div className="paginaPublicacao largura30pctDesktop">
      <CabecalhoComAcoes
        className={obterClassNameCabecalho()}
        titulo={"Nova publicação"}
        iconeEsquerda={estaNaEtapaUm() ? null : imgSetaEsquerda}
        aoClicarAcaoEsquerda={aoClicarAcaoEsquerdaCabecalho}
        textoEsquerda={obterTextoEsquerdaCabecalho()}
        elementoDireita={obterTextoDireitaCabecalho()}
        aoClicarElementoDireita={aoClicarAcaoDireitaCabecalho}
      />

      <hr className="linhaDivisoria" />

      <div className="conteudoPaginaPublicacao">
        {estaNaEtapaUm() ? (
          <div className="primeiraEtapa">
            <UploadImagem
              setImagem={setImagem}
              aoSetarAReferencia={setInputImagem}
              imagemPreviewClassName={
                !imagem ? "previewImagemPublicacao" : "previewImagemSelecionada"
              }
              imagemPreview={imagem?.preview || imgPaisagem.src}
            />
            <span className="desktop textoDragAndDrop">
              Arraste sua foto aqui!
            </span>

            <Botao
              texto={"Selecionar uma imagem"}
              manipularClique={() => inputImagem?.click()}
            />
          </div>
        ) : (
          <>
            <div className="segundaEtapa">
              <UploadImagem
                setImagem={setImagem}
                imagemPreview={imagem.preview}
              />

              <textarea
                rows={3}
                value={descricao}
                placeholder="Escreva uma legenda..."
                onChange={escreverDescricao}
              ></textarea>
            </div>
            <hr className="linhaDivisoria" />
          </>
        )}
      </div>
    </div>
  );
}

export default comAutorizacao(Publicacao);
