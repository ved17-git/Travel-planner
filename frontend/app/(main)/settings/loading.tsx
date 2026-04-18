import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  // Or a custom loading skeleton component
  return (<>
   <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-2xl px-4 sm:px-6 py-12">

        {/* Header */}
        <div className="mb-10">
          <Skeleton className="h-6 w-40 mb-2" />
          <Skeleton className="h-4 w-60" />
        </div>

        <div className="space-y-6">

          {/* Profile Card */}
          <div className="rounded-2xl border border-border/60 bg-card overflow-hidden">

            {/* Card Header */}
            <div className="px-6 py-4 border-b border-border/40">
              <Skeleton className="h-4 w-40 mb-1" />
              <Skeleton className="h-3 w-56" />
            </div>

            <div className="p-6 space-y-5">

              {/* Avatar + Name */}
              <div className="flex items-center gap-4 mb-2">
                <Skeleton className="w-14 h-14 rounded-full" />

                <div>
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-3 w-48" />
                </div>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-2 gap-3">
                {[1, 2].map((i) => (
                  <div key={i} className="space-y-1.5">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-10 w-full rounded-lg" />
                  </div>
                ))}
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <Skeleton className="h-3 w-28" />
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  </>)
}