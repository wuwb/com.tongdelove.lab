import Link from "next/link"

export const CustomLink = ({ link, children }) => {
    const isInternalLink = link.url.startsWith("/")

    // For internal links, use the Next.js Link component
    if (isInternalLink) {
        return (
            <Link href="/[[...slug]]" as={link.url}>
                {children}
            </Link>
        )
    }

    // Plain <a> tags for external links
    if (link.newTab) {
        return (
            <a href={link.url} target="_blank" rel="noopener noreferrer">
                {children}
            </a>
        )
    }

    return (
        <a href={link.url} target="_self">
            {children}
        </a>
    )
}
