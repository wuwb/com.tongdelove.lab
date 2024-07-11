import Link from 'next/link';
import styled from '@emotion/styled';

const Logo = ({
  href = '/',
  color = '#000',
  title = '海维包装',
  ...props
}) => {
  return (
    <div id="logo" aria-label="Logo" {...props}>
      <Link href={href} passHref>
        <a className="flex">
          <svg width={28} height={25} viewBox="0 0 75 65"  fill={color}>
            <path d="M37.59.25l36.95 64H.64l36.95-64z" />
          </svg>
          <span className="font-bold text-gray-900 ml-3">{title}</span>
        </a>
      </Link>
    </div>
  )
}

export default Logo;
