import React from 'react'
import { View, Text } from 'react-native'
// -----------------------------------------------------------------------------
import { Container, MinusButton, PlusButton, Input, NumberIcon } from './styles'

export default function NumberInput({ numberInputValue, setNumberInputValue }) {
  function handleMinus() {
    if (numberInputValue === 0) {
      return
    }
    else {
      let minus = numberInputValue - 1
      setNumberInputValue(minus)
    }

  }

  function handlePlus() {
    if (numberInputValue === 10) {
      return
    }
    else {
      let plus = numberInputValue + 1
      setNumberInputValue(plus)
    }
  }
  // ---------------------------------------------------------------------------
  return (
    <Container>
      <MinusButton onPress={handleMinus}>
        <NumberIcon name="minus"/>
      </MinusButton>
      <Input
        value={numberInputValue}
        onChangeText={setNumberInputValue}

      >{numberInputValue}</Input>
      <PlusButton onPress={handlePlus}>
        <NumberIcon name="plus"/>
      </PlusButton>
    </Container>
  )
}
