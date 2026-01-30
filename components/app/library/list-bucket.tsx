import { Button } from "@/components/ui/button"
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"
import Link from "next/link"

const ListBucket = () => {
  return (
    <div>
      <Card className="bg-linear-to-tr from-green-200 via-blue-200 to-purple-400  border-0">
        <CardHeader>
          <CardTitle className="text-lg text-black">sataym-services</CardTitle>
          <CardDescription className="text-slate-700">Jan 31,2026</CardDescription>
          <CardAction>
            <Link href={`/app/library/sataym-services`}>
              <Button variant={"outline"}>
                Explore
                <ExternalLink/>
              </Button>
            </Link>
          </CardAction>
        </CardHeader>
      </Card>
    </div>
  )
}

export default ListBucket