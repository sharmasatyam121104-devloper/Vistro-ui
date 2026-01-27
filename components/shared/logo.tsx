import Image from "next/image"
import Link from "next/link"

interface LogoProps {
  width?: number
  height?: number
  href?: string
  priority?: boolean
  showText?: boolean
}

export default function Logo({
  width = 40,
  height = 40,
  href = "/",
  priority = false,
  showText = true,
}: LogoProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 select-none"
    >
      {/* Logo image */}
      <Image
        src="/vlogo.png"
        alt="Vistro Logo"
        width={width}
        height={height}
        priority={priority}
        className="object-contain h-auto w-auto"
      />

      {/* Brand name */}
      {showText && (
        <span
          className="
            text-xl
            font-bold
            tracking-tight
            bg-linear-to-r from-indigo-600 via-sky-500 to-cyan-500
            bg-clip-text text-transparent 
          "
        >
          VISTRO
        </span>
      )}
    </Link>
  )
}