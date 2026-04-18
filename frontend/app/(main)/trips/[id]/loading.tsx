import { Skeleton } from "@/components/ui/skeleton"


export default function Loading() {
  // Or a custom loading skeleton component
  return (<>
         <div className="min-h-screen bg-background">

      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">

        {/* Back */}
        <Skeleton className="h-4 w-32 mb-8" />

        {/* Hero Card */}
        <div className="rounded-2xl border border-border/60 bg-card p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="w-full">
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-8 w-64 mb-4" />

              <div className="flex gap-3 flex-wrap">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-5 w-24 rounded" />
                <Skeleton className="h-5 w-16 rounded" />
              </div>
            </div>

            <Skeleton className="h-10 w-24 rounded-lg" />
          </div>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left */}
          <div className="lg:col-span-2 space-y-4">

            <Skeleton className="h-5 w-48 mb-2" />

            {/* Itinerary cards */}
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-xl border p-4">
                <div className="flex items-center gap-4">
                  <Skeleton className="w-10 h-10 rounded-lg" />

                  <div className="flex-1">
                    <Skeleton className="h-4 w-40 mb-2" />
                    <Skeleton className="h-3 w-24" />
                  </div>

                  <Skeleton className="h-4 w-4" />
                </div>
              </div>
            ))}

            {/* Map */}
            <div className="mt-6">
              <Skeleton className="h-5 w-32 mb-2" />
              <Skeleton className="h-3 w-60 mb-3" />
              <Skeleton className="h-62.5 w-full rounded-xl" />
            </div>

          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">

            {/* Budget */}
            <div className="rounded-xl border p-5">
              <Skeleton className="h-4 w-40 mb-4" />

              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="mb-3">
                  <div className="flex justify-between mb-1">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                  <Skeleton className="h-2 w-full rounded-full" />
                </div>
              ))}

              <Skeleton className="h-6 w-32 mt-4" />
            </div>

            {/* Hotels */}
            <div className="rounded-xl border p-5">
              <Skeleton className="h-4 w-40 mb-4" />

              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="mb-3">
                  <Skeleton className="h-4 w-40 mb-1" />
                  <Skeleton className="h-3 w-24" />
                </div>
              ))}
            </div>

          </div>

        </div>

      </main>
    </div>
  </>)
}