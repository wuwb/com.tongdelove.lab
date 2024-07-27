import { ReactNode } from 'react'

type IHeroOneButtonProps = {
  title: ReactNode
  description: string
  button: ReactNode
}

export const HeroOneButton = (props: IHeroOneButtonProps) => (
  <header className="text-center">
    <h1 className="leading-hero whitespace-pre-line text-5xl font-bold text-gray-900">
      {props.title}
    </h1>
    <div className="mb-16 mt-4 text-2xl">{props.description}</div>

    {props.button}
  </header>
)
