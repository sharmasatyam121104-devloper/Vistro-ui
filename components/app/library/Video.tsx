'use client'

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileClock } from "lucide-react"

const Videos = () => {
  return (
    <div className="w-full space-y-4">
      {Array(20)
        .fill(0)
        .map((_, index) => (
          <Card
            key={index}
            className="hover:bg-slate-50 transition"
          >
            <CardContent
              className="
                flex flex-col gap-4 p-4
                sm:flex-row sm:items-center sm:justify-between
                "
            >
              {/* LEFT */}
              <div className="flex items-center gap-4">
                {/* Thumbnail */}
                <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-md bg-slate-100">
                  <Image
                    src="/thumb.webp"
                    alt="Video thumbnail"
                    fill
                    sizes="(max-width: 640px) 100vw, 128px"
                    className="object-cover"
                  />
                </div>

                {/* Info */}
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-slate-900">
                    Ch-{index + 1} Introduction to HTML
                  </h3>

                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                    <span>Size: 200 MB</span>
                    <span>Duration: 30 min</span>
                  </div>
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex justify-end sm:justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <FileClock size={14} />
                  Draft
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  )
}

export default Videos