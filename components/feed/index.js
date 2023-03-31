import { useEffect, useState } from "react";
import Postagem from "./Postagem";

export function Feed({ usuarioLogado }) {
  const [listaDePostagens, setListaDePostagens] = useState([]);
  useEffect(() => {
    console.log("Carregar o feed");
    setListaDePostagens([
      {
        id: "1",
        usuario: {
          id: "2",
          nome: "Felipe Valverde",
          avatar: null,
        },
        fotoDoPost: "https://s2.glbimg.com/_fi6Z5P7AGZya-fdftAhZnCdbnw=/0x0:1024x1024/430x432/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2023/e/8/AoMju0TPWBvwkfwj2BXA/1.jpg",
        descricao: "At vero eos et accusamus emus qui blanditiis praesentium voluptatum deleniti atque ",
        curtidas: [],
        comentarios: [
          {
            nome: "Fulano",
            mensagem: "Legal",
          },
          {
            nome: 'Fulano de tal',
            mensagem: 'Que massa'
          },
          {
            nome: 'João da esquina',
            mensagem: 'Top'
          }
        ],
      },
      {
        id: "2",
        usuario: {
          id: "1",
          nome: "João Ramos",
          avatar: null,
        },
        fotoDoPost: "https://s2.glbimg.com/1o2J-rf2G9qtlQlm82gaq-mFBec=/0x129:1024x952/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2023/7/i/ME2AxRRoygUyFPCDe0jQ/3.png",
        descricao: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur',
        curtidas: [],
        comentarios: [
          {
            nome: "Ciclano",
            mensagem: "Legal legal",
          },
        ],
      }
    ]);
  }, [usuarioLogado]);

  return (
    <div className="feedContainer largura30pctDesktop">
      {listaDePostagens.map((dadosPostagem) => (
        <Postagem 
          key={dadosPostagem.id} 
          {...dadosPostagem} 
          usuarioLogado={usuarioLogado}
        />
      ))}
    </div>
  );
}
