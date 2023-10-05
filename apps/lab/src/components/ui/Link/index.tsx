import { default as cn, default as cx } from 'classnames';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';

const NextLinkComposed = React.forwardRef(function NextLinkComposed(props: any, ref) {
  const { to, linkAs, href, replace, scroll, shallow, prefetch, locale, ...other } = props;

  return (
    <NextLink
      href={to}
      prefetch={prefetch}
      as={linkAs}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      passHref
      locale={locale}
      ref={ref}
      {...other}
    >
    </NextLink>
  );
});

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/api-reference/next/link
const Links = React.forwardRef(function Link(props: any, ref) {
  const {
    activeClassName = 'active',
    as: linkAs,
    className: classNameProps,
    href,
    noLinkStyle,
    role, // Link don't have roles.
    ...other
  } = props;

  const router = useRouter();
  const pathname = typeof href === 'string' ? href : href.pathname;
  const className = cn(classNameProps, {
    [activeClassName]: router.pathname === pathname && activeClassName,
  });

  const isExternal =
    typeof href === 'string' && (href.indexOf('http') === 0 || href.indexOf('mailto:') === 0);

  if (isExternal) {
    if (noLinkStyle) {
      return <a className={className} href={href} ref={ref} {...other} />;
    }

    return <NextLink className={className} href={href} ref={ref} {...other} />;
  }

  if (noLinkStyle) {
    return <NextLinkComposed className={className} ref={ref} to={href} {...other} />;
  }

  return (
    <NextLink
      component={NextLinkComposed}
      linkAs={linkAs}
      className={className}
      ref={ref}
      to={href}
      {...other}
    />
  );
});

function Link({ href, children, ...props }: any) {
  const { className, ...rest } = props;

  return (
    <NextLink href={href} className={cx('no-underline', className)} {...rest}>
      {children}
    </NextLink>
  );
}

export {
  Link,
  Links,
  NextLinkComposed
};

