import Link from 'next/link'

export const Logo = ({ href = '/', color = '#000', title = '海维包装', ...props }) => {
  return (
    <div id="logo" aria-label="Logo" {...props}>
      <Link href={href} passHref>
        <a className="flex">
          <svg width={28} height={25} viewBox="0 0 75 65" fill={color}>
            <path d="M37.59.25l36.95 64H.64l36.95-64z" />
          </svg>
          <span className="ml-3 font-bold text-gray-900">{title}</span>
        </a>
      </Link>
    </div>
  )
}
