import styled from "styled-components"

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  font-size: 3.5rem;
  font-weight: bold;
  text-transform: uppercase;
  font-family: sans-serif;
`

interface HangmanWordProps {
  reveal: boolean
  word: string
  guessedLetters: string[]
}

export default function HangmanWord({ 
  reveal,
  word, 
  guessedLetters }
  : HangmanWordProps) {
  return (
      <Wrapper>{word.split("").map((letter, index) => (
        <span 
          style={{ borderBottom: '0.1em solid white', minWidth: '50px' }} 
          key={index}>
            <span 
              style={{ 
                visibility: guessedLetters.includes(letter) || reveal ? 'visible' : 'hidden',
                color: !guessedLetters.includes(letter) && reveal ? 'red' : 'white'}}>
                {letter}
            </span>
        </span>
      ))}</Wrapper>
  )
}
