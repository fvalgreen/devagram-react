import { useEffect, useRef } from "react";

export default function UploadImagem({
  className = "",
  setImagem,
  imagemPreview,
  imagemPreviewClassName,
  aoSetarAReferencia,
}) {
  const referenciaInput = useRef(null);

  useEffect(() => {
    if (!aoSetarAReferencia) {
      return;
    }
    aoSetarAReferencia(referenciaInput?.current);
  }, [referenciaInput?.current]);
  const abrirSeletorArquivo = () => {
    referenciaInput?.current?.click();
  };

  const aoAlterarImagem = () => {
    if (!referenciaInput?.current?.files.length) {
      return;
    }

    const arquivo = referenciaInput?.current?.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(arquivo);
    fileReader.onloadend = () => {
      setImagem({
        preview: fileReader.result,
        arquivo,
      });
    };
  };

  return (
    <>
      <div
        className={`uploadImagemContainer ${className}`}
        onClick={abrirSeletorArquivo}
      >
        {imagemPreview && (
          <div className="imagemPreviewContainer">
            <img
              src={imagemPreview}
              alt="imagem preview"
              className={imagemPreviewClassName}
            />
          </div>
        )}
        <input
          type="file"
          className="oculto"
          accept="image/*"
          ref={referenciaInput}
          onChange={aoAlterarImagem}
        />
      </div>
    </>
  );
}
