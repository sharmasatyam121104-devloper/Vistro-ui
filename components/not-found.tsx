import { IconBriefcaseOff } from "@tabler/icons-react"
import {  Home } from "lucide-react"
import Link from "next/link"

const NotFound = () => {
  return (
    <div className="w-full flex items-center justify-center py-20 px-4">
      <div className="w-full max-w-3xl rounded-xl border border-slate-200 bg-white p-8 sm:p-10 text-center shadow-sm">
        
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
          <IconBriefcaseOff className="h-7 w-7 text-slate-600" />
        </div>

        {/* Title */}
        <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
          Profession Not Found
        </h2>

        {/* Description */}
        <p className="mt-2 text-sm sm:text-base text-slate-500">
          The profession you’re looking for doesn’t exist or may have been removed.
          Please try searching with a different keyword.
        </p>

        {/* Button */}
        <div className="mt-6 flex justify-center">
          <Link href="/">
            <button className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400">
              <Home className="h-4 w-4" />
              Go to Home
            </button>
          </Link>
        </div>

      </div>
    </div>
  )
}

export default NotFound