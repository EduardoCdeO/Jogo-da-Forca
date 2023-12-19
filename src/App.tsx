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

const words = ['exemplo', 'teste', 'desenvolvimento']

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
        {isLoser && <h2 className='red'>Você perdeu!</h2>}
        {isLoser && <p>Atualize a página para jogar novamente.</p>}
        {isWinner && <h2 className='green'>Você ganhou!</h2>}
        {isWinner && <p>Atualize a página para jogar novamente.</p>}
        <h1>Jogo da Forca</h1>
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
