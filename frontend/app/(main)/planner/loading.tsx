import { Skeleton } from "@/components/ui/skeleton"
export default function Loading() {
  // Or a custom loading skeleton component
  return (<>
 <div className="min-h-screen bg-background">

      <main className="mx-auto max-w-2xl px-4 sm:px-6 py-12">

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <Skeleton className="w-8 h-8 rounded-lg" />
            <Skeleton className="h-3 w-28" />
          </div>

          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-full max-w-md" />
        </div>

        <div className="space-y-8">

          {/* Destination */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-3 w-32" />
          </div>

          {/* Budget */}
          <div className="space-y-3">
            <Skeleton className="h-4 w-40" />

            <div className="grid grid-cols-3 gap-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="p-4 rounded-xl border">
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-3 w-full" />
                </div>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div className="space-y-3">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-3 w-32" />

            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="h-8 w-20 rounded-full"
                />
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <Skeleton className="h-12 w-full rounded-xl" />
            <Skeleton className="h-3 w-64 mx-auto mt-3" />
          </div>

        </div>
      </main>
    </div>
  </>)
}