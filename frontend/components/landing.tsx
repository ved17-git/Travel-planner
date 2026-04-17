import Link from "next/link";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 flex h-16 items-center justify-between">
          <span className="text-xl font-bold">Trao<span className="text-primary">.</span></span>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground px-3 py-1.5">Sign In</Link>
            <Link href="/register" className="text-sm font-semibold bg-primary text-primary-foreground px-4 py-2 rounded-lg">Get Started</Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-32 px-4 text-center">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-150 h-75 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative mx-auto max-w-4xl">
          <span className="inline-flex items-center gap-1.5 bg-muted text-muted-foreground text-xs font-medium px-3 py-1 rounded-full mb-6">
            ✦ AI-Powered Travel Planning
          </span>
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
            Your next trip,<br />
            <span className="text-primary">planned in seconds.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Tell us your destination, interests, and budget. Trao generates a complete, personalized itinerary with hotel suggestions and cost estimates — instantly.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/register" className="h-12 px-8 font-semibold bg-primary text-primary-foreground rounded-xl flex items-center gap-2 hover:opacity-90 transition-opacity">
              Start Planning Free →
            </Link>
            <Link href="/login" className="h-12 px-8 font-medium border border-border rounded-xl flex items-center hover:bg-muted transition-colors">
              Sign In
            </Link>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">No credit card required</p>
        </div>
      </section>

      {/* Destination cards */}
      <section className="py-16 px-4 border-y border-border/40 bg-card/30">
        <div className="mx-auto max-w-5xl">
          <p className="text-center text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-8">Recent itineraries generated</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { name: "Tokyo", days: "7 days", budget: "Medium" },
              { name: "Paris", days: "5 days", budget: "High" },
              { name: "Bali", days: "10 days", budget: "Low" },
              { name: "New York", days: "4 days", budget: "High" },
            ].map((d) => (
              <div key={d.name} className="rounded-xl border border-border/60 bg-card p-4">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-primary text-sm">📍</span>
                  <span className="text-xs border border-border px-1.5 py-0.5 rounded">{d.budget}</span>
                </div>
                <p className="font-semibold text-sm">{d.name}</p>
                <p className="text-xs text-muted-foreground">{d.days}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Everything you need to plan the perfect trip</h2>
            <p className="text-muted-foreground text-lg">From first idea to packed bags — Trao handles the heavy lifting.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: "✦", title: "AI-Generated Itineraries", desc: "Describe where you want to go and your interests. Our AI crafts a day-by-day plan tailored just for you." },
              { icon: "$", title: "Smart Budget Planning", desc: "Get realistic cost breakdowns for flights, accommodation, food, and activities before you book anything." },
              { icon: "⌂", title: "Hotel Suggestions", desc: "Receive curated hotel recommendations matched to your budget and travel style." },
              { icon: "↺", title: "Flexible Itineraries", desc: "Not happy with the plan? Regenerate it instantly or modify activities to match your preferences." },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="rounded-2xl border border-border/60 bg-card p-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary font-bold">{icon}</div>
                <h3 className="font-semibold text-base mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-4 bg-card/30 border-y border-border/40">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">How it works</h2>
            <p className="text-muted-foreground text-lg">Three steps to your perfect itinerary.</p>
          </div>
          <div className="space-y-8">
            {[
              { step: "01", title: "Tell us where", desc: "Enter your destination, travel duration, interests, and budget level." },
              { step: "02", title: "AI does the work", desc: "Our AI agent generates a complete day-by-day itinerary in seconds." },
              { step: "03", title: "Refine and go", desc: "Review your plan, regenerate anything you don't love, and start packing." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex gap-6 items-start">
                <div className="shrink-0 w-12 h-12 rounded-full border-2 border-primary/30 flex items-center justify-center">
                  <span className="text-xs font-bold text-primary">{step}</span>
                </div>
                <div className="pt-3">
                  <h3 className="font-semibold text-base mb-1">{title}</h3>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-24 px-4 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="flex justify-center gap-1 mb-6 text-primary text-xl">★★★★★</div>
          <blockquote className="text-xl sm:text-2xl font-medium leading-relaxed mb-6">
            I planned a 10-day trip to Japan in under 5 minutes. The itinerary was incredibly detailed and the budget breakdown saved me hours of research.
          </blockquote>
          <p className="text-sm text-muted-foreground">— Early Access User</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 border-t border-border/40 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Ready to plan your next adventure?</h2>
          <p className="text-muted-foreground text-lg mb-8">Join thousands of travelers who plan smarter with Trao.</p>
          <Link href="/register" className="inline-flex h-12 px-10 font-semibold bg-primary text-primary-foreground rounded-xl items-center gap-2 hover:opacity-90 transition-opacity">
            Start for Free →
          </Link>
        </div>
      </section>

      <footer className="border-t border-border/40 py-8 px-4">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm font-semibold">Trao<span className="text-primary">.</span></span>
          <p className="text-xs text-muted-foreground">AI-powered travel planning. Plan smarter, travel better.</p>
        </div>
      </footer>
    </div>
  );
}