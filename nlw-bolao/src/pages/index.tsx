import Image from 'next/image'
import logo from '../../public/logo.svg'
import { GetServerSideProps } from "next/types"
import avatarUsers from '../../public/users-avatar-example.png'
import appPreviewImg from '../../public/app-nlw-copa-preview.png'
import iconCheck from '../../public/icon-check.svg'
import { api } from '../lib/axios'
import { FormEvent, useState } from 'react'

interface apiProps {
  poolCount: number
  guessCount: number
  userCount: number
}

export default function Home({ poolCount, guessCount, userCount }: apiProps) {
  const [ search, setSearch ] = useState('')

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    try{
      const response = await api.post('/pools', {
        title: search,
      })
      const { code } = response.data

      await navigator.clipboard.writeText(code)

      alert('bolão criado com sucesso e o código foi copiado para a área de trasnferência')
      setSearch('')
    }


    catch(e) {
      alert('falha ao criar o bolão')
      console.error(`deu ruim ${e}`)
    }
  }

  return (
    <div className='max-w-[1024px] h-screen mx-auto grid grid-cols-2 gap-28 items-center'>
      <main>
        <Image src={logo} alt='logo escrito nlw copa' />

        <h1 className='mt-14 text-white text-5xl font-bold leading-tight'>Crie seu própio bolão da copa e compartilhe entre amigos!</h1>

        <div className='mt-10 flex items-center gap-2'>
          <Image src={avatarUsers} alt='fotos de alguns usuários' />
          <h1 className='text-gray-100 text-xl'><span className='text-ignite-500 m-2'>+{userCount}</span>pessoas já estão usando </h1>
        </div>
      

        <form onSubmit={handleSubmit} className='gap-2 mt-10 flex'>
          <input className='flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-white' type='text' value={search} onChange={(e) => setSearch(e.target.value)} required placeholder='Qual o nome do seu bolão?' />
          <button className='bg-yellow-500 px-6 py-4 rounded text-gray-900 font-bold text-sm uppercase hover:bg-yellow-200' type='submit'>Criar meu bolão</button>
        </form>

        <p className='mt-4 text-sm text-gray-300'>após criar seu bolão, você receberá um código único que poderá usar para convidar seus amigos</p>

        <div className='mt-10 pt-10 border-t border-gray-600 flex items-center justify-between text-gray-100'>
          <div className='flex items-center gap-6'>
            <Image src={iconCheck} alt='um circulo verde com um simbolo em formato de V simbolizando um check' />
            <div className='flex flex-col'>
              <span className='font-bold text-2xl'>+{poolCount}</span>
              <span>Bolões criados</span>
            </div>
          </div>

          <div className='w-px h-10 bg-gray-600'></div>

          <div className='flex items-center gap-6'>
            <Image src={iconCheck} alt='um circulo verde com um simbolo em formato de V simbolizando um check' />
            <div className='flex flex-col'>
              <span className='font-bold text-2xl'>+{guessCount}</span>
              <span>Palpites criados</span>
            </div>
          </div>
        </div>
      </main>

      <Image src={appPreviewImg} alt='dois telefones exibindo uma prévia do nlw copa' />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const [ poolCountResponse, guessesCountResponse, userCountRespose ] = await Promise.all([
    api.get('pools/count'),
    api.get('guesses/count'),
    api.get('users/count')
  ])

  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessesCountResponse.data.count,
      userCount: userCountRespose.data.count
    }
  }
}