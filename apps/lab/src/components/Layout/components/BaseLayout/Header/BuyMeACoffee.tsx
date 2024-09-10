import Link from 'next/link'
import Image from 'next/image'

export const BuyMeACoffee = () => {
  return (
    <Link href="https://buymeacoffee.com/wuwenbin" target="_blank">
      <img
        width="32"
        height="32"
        src="/images/buymeacoffee.ico"
        alt="buy me a coffee"
      />
    </Link>
  )
}
