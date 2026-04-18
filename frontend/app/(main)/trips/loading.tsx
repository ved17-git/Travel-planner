import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  // Or a custom loading skeleton component
  return (<> 

             <div className="min-h-screen bg-background">

      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">

        {/* Header Skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <Skeleton className="h-6 w-40 mb-2" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-10 w-32 rounded-lg" />
        </div>

        {/* Search Skeleton */}
        <Skeleton className="h-10 w-full mb-6 rounded-lg" />

        {/* List Skeleton */}
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-5 rounded-xl border border-border/60"
            >
              <div className="flex items-center gap-4 flex-1">
                <Skeleton className="w-11 h-11 rounded-xl" />

                <div className="flex-1">
                  <Skeleton className="h-4 w-40 mb-2" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Skeleton className="h-5 w-16 rounded" />
                <Skeleton className="h-8 w-8 rounded" />
              </div>
            </div>
          ))}
        </div>

      </main>
    </div>
    
  </>)
}