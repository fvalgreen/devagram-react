import Image from 'next/image';
import logoHorizontal from '../../public/imagens/logoHorizontal.svg';
import imagemLupa from '../../public/imagens/lupa.svg';
import Navegacao from './Navegacao';

export default function Cabecalho(){
  return (
    <header className='cabecalhoPrincipal '>
      <div className='conteudoCabecalhoPrincipal'>
        <div className='logoCabecalhoPrincipal'>
          <Image 
            src={logoHorizontal}
            alt='Logo Devagram'
            layout='fill'
          />
        </div>
        <div className='barraPesquisa'>
          <div className='containerImagemLupa'>
            <Image 
              src={imagemLupa}
              alt='Lupa de pesquisa'
              layout='fill'
            />
          </div>
          <input 
            type='text'
            placeholder='Pesquisar'
            value={''}
            onChange={() => console.log('Pesquisando')}  
          />
        </div>
        <Navegacao className='desktop' />
      </div>
    </header>
  );
};