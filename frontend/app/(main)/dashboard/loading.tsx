import { Skeleton } from "@/components/ui/skeleton"
export default function Loading() {
  return (<>
<div className="min-h-screen bg-background">

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <Skeleton className="h-4 w-32 mb-2" />
            <Skeleton className="h-6 w-48" />
          </div>
          <Skeleton className="h-10 w-36 rounded-lg" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-xl border p-5">
              <div className="flex items-center justify-between mb-3">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="w-8 h-8 rounded-md" />
              </div>
              <Skeleton className="h-6 w-16" />
            </div>
          ))}
        </div>

        {/* Recent Trips */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-20" />
          </div>

          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 rounded-xl border"
              >
                <div className="flex items-center gap-4">
                  <Skeleton className="w-10 h-10 rounded-lg" />

                  <div>
                    <Skeleton className="h-4 w-32 mb-2" />
                    <Skeleton className="h-3 w-40" />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Skeleton className="h-5 w-16 rounded" />
                  <Skeleton className="h-4 w-4" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Destinations */}
        <div className="mt-10">
          <Skeleton className="h-5 w-40 mb-5" />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="rounded-xl border p-4 text-center">
                <Skeleton className="h-6 w-6 mx-auto mb-2" />
                <Skeleton className="h-4 w-20 mx-auto mb-1" />
                <Skeleton className="h-3 w-16 mx-auto" />
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  </>)
}