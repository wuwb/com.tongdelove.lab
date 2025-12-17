import { Button } from '@tongdelove/ui/components/button'
import { ButtonGroup } from '@tongdelove/ui/components/button-group'

export function ColorSchemeToggle() {

  return (
    <ButtonGroup justify="center" mt="xl">
      <Button onClick={() => { }}>Light</Button>
      <Button onClick={() => { }}>Dark</Button>
      <Button onClick={() => { }}>Auto</Button>
    </ButtonGroup>
  )
}
