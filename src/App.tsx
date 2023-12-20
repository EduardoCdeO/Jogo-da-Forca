import './App.css'
import { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import HangmanDrawing from './components/hangman-drawing'
import HangmanWord from './components/hangman-word'
import Keyboard from './components/keyboard'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
`

const HangmanPart = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 375px;
`

const words = ['amor', 'abstrato', 'alegria', 'autonomia', 'amizade', 'analisar', 'atemporal', 'analogia',
 'buscar', 'beleza', 'brincadeira', 'burocracia', 'bastante', 'biodiversidade', 'bola', 'brasil',
 'casual', 'conhecer', 'complexo', 'compartilhar', 'convencional', 'conhecimento', 'cumprimento', 'credibilidade',
 'desenvolvimento', 'desafio', 'dignidade', 'definir', 'demanda', 'democracia', 'desejo', 'disciplina',
 'empatia', 'essencial', 'expectativa', 'excepcional', 'excelente', 'estagnado', 'estabelecer', 'emergente',
 'finalidade', 'fidelidade', 'feliz', 'fluxo', 'fundamental', 'facultativo', 'fortaleza', 'frio',
 'generalizar', 'grandeza', 'girassol', 'guardar', 'geografia', 'garantir', 'generosidade', 'gratuito',
 'hegemonia', 'humildade', 'honestidade', 'humor', 'habilidade', 'honra', 'habitual', 'hostil',
 'incidente', 'independente', 'inconveniente', 'inusitado', 'importante', 'impactar', 'intenso', 'interesse',
 'julgamento', 'justificar', 'jovem', 'jornal', 'jardim', 'jantar', 'jogar', 'janela',
 'kiwi', 'ketchup', 'kilo',
 'legado', 'liberdade', 'limite', 'lugar', 'litoral', 'levar', 'literalmente', 'linda',
 'maturidade', 'maestria', 'modesto', 'melhor', 'maravilhoso', 'magnitude', 'malhar', 'mudar',
 'normal', 'nenhuma', 'narrativa', 'nobreza', 'natureza', 'nacionalidade', 'noite', 'nomenclatura',
 'orgulho', 'objetivo', 'oportunidade', 'otimizar', 'obrigado', 'oferecer', 'original', 'origem',
 'perspectiva', 'paradigma', 'parcial', 'problema', 'processo', 'piedade', 'paralelo', 'palavra',
 'qualidade', 'quesito', 'quantidade', 'questionamento', 'quantificar', 'queijo', 'quadro', 'quebrado',
 'respeito', 'relativo', 'reivindicar', 'rotina', 'relacionamento', 'restringir', 'responsabilidade', 'radical',
 'significado', 'subestimar', 'solidariedade', 'superficial', 'sensatez', 'sentido', 'saudade', 'substantivo',
 'termo', 'transformar', 'tecnologia', 'trazer', 'tempestade', 'tristeza', 'talento', 'tempo',
 'utopia', 'utilizar', 'uniforme', 'urbano', 'ultimato', 'unidade', 'unir', 'urgente',
 'visualizar', 'vaidade', 'vergonha', 'valorizar', 'virtual', 'verificar', 'voltar', 'verbo',
 'xingar', 'xadrez', 'xerox', 'xeretar', 'xarope', 'xaveco',
 'zebra', 'zona', 'zangado', 'zombar', 'zelador', 'zoeira', 'zero', 'zumbi',]

function App() {
  const [wordToGuess, setWordToGuess] = useState(() => {
    return words[Math.floor(Math.random() * words.length)]
  })

  const [guessedLetters, setGuessedLetters] = useState<string[]>([])

  const incorrectGuesses = guessedLetters.filter((letter) => !wordToGuess.includes(letter))

  const correctGuesses = guessedLetters.filter(letter => wordToGuess.includes(letter))

  const isLoser = incorrectGuesses.length >= 6
  const isWinner= wordToGuess.split('').every((letter) => guessedLetters.includes(letter))

  const addGuessedLetters = useCallback((letter: string) => {
    if(guessedLetters.includes(letter) || isLoser || isWinner) return

    setGuessedLetters((guessedLetters) => [...guessedLetters, letter])
  }, [guessedLetters, isLoser, isWinner])

  useEffect(() => {
    const handler = ((e: KeyboardEvent) => {
      const key = e.key
      if(!key.match(/^[a-z]$/)) return

      e.preventDefault()
      addGuessedLetters(key)
    }) as unknown as EventListener

    document.addEventListener('keypress', handler)

    return(() => {
      document.removeEventListener('keypress', handler)
    })
  }, [guessedLetters])


  return (
    <Wrapper>
      <HangmanPart>
        <h1>Jogo da Forca</h1>
        {isLoser && <h2 className='red'>Você perdeu!</h2>}
        {isLoser && <p>Atualize a página para jogar novamente.</p>}
        {isWinner && <h2 className='green'>Parabéns, você ganhou!</h2>}
        {isWinner && <p>Atualize a página para jogar novamente.</p>}
        <HangmanDrawing numberOfGuesses={incorrectGuesses.length} />
        <HangmanWord reveal={isLoser} guessedLetters={guessedLetters} word={wordToGuess} />
      </HangmanPart>
        <Keyboard 
          disabled={isLoser || isWinner}
          activeLetters={correctGuesses} 
          inactiveLetters={incorrectGuesses}
          addGuessedLetters={addGuessedLetters} 
        />
    </Wrapper>
  )
}

export default App
