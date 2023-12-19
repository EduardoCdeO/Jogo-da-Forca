import styled from "styled-components"

const Base = styled.div`
  height: 10px;
  width: 250px;
  background: white;
  margin-left: 80px;
`

const VerticalLine = styled.div`
  height: 250px;
  width: 10px;
  background: white;
  margin-left: 150px;
`

const HorizontalLine = styled.div`
  height: 10px;
  width: 130px;
  background: white;
  position: absolute;
  right: 85px;
  top: 0;
`

const VerticalLineSmall = styled.div`
  height: 40px;
  width: 10px;
  background: white;
  margin-left: 150px;
  position: absolute;
  top: 0;
  right: 75px;
`

const Head = styled.div`
  height: 30px;
  width: 30px;
  border: 8px solid white;
  border-radius: 50%;
  position: absolute;
  top: 38px;
  right: 57px;
`

const Body = styled.div`
  height: 80px;
  width: 10px;
  background: white;
  position: absolute;
  top: 76px;
  right: 75px;
`

const RightArm = styled.div`
  height: 10px;
  width: 50px;
  background: white;
  position: absolute;
  top: 100px;
  right: 35px;
  rotate: 30deg;
`

const LeftArm = styled.div`
  height: 10px;
  width: 50px;
  background: white;
  position: absolute;
  top: 100px;
  right: 75px;
  rotate: -30deg;
`

const RightLeg = styled.div`
  height: 10px;
  width: 50px;
  background: white;
  position: absolute;
  top: 160px;
  right: 40px;
  rotate: 50deg;
`

const LeftLeg = styled.div`
  height: 10px;
  width: 50px;
  background: white;
  position: absolute;
  top: 160px;
  right: 70px;
  rotate: -50deg;
`

const bodyParts = [Head, Body, LeftArm, RightArm, LeftLeg, RightLeg]

interface HangmanDrawingProps {
  numberOfGuesses: number
}

export default function HangmanDrawing({ numberOfGuesses }: HangmanDrawingProps) {
  return (
    <div style={{ position: 'relative' }}>
      {bodyParts.slice(0, numberOfGuesses).map((BodyPart, index) => {
        return <BodyPart key={index} />
      })}
      <VerticalLineSmall />
      <HorizontalLine />
      <VerticalLine />
      <Base />
    </div>
  )
}
