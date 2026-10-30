import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/hooks/useScrollAnimation";
import { MapPin, FileText, Shield, CreditCard } from "lucide-react";
import johnHeadshot from "@/assets/john-headshot.jpg";

export default function About() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-primary py-20 md:py-28">
        <div className="container text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">About</p>
          <h1 className="mt-3 text-3xl font-semibold text-primary-foreground md:text-5xl">
            Meet John Jenkins
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-primary-foreground/60">
            Your local payments expert. Real person. Real savings. Right here in Ohio.
          </p>
        </div>
      </section>

      {/* About John */}
      <section className="py-24">
        <div className="container">
          <AnimatedSection>
            <div className="grid items-center gap-14 md:grid-cols-2">
              <div className="flex items-center justify-center">
                <img
                  src={johnHeadshot}
                  alt="John Jenkins — Payments Consultant"
                  className="h-80 w-72 rounded-sm object-cover shadow-xl"
                />
              </div>
              <div className="space-y-5">
                <p className="leading-relaxed text-muted-foreground">
                  John Jenkins is a credit card processing consultant based in Dublin, Ohio. He works with local business owners across the state to reduce their processing costs and modernize their payment systems.
                </p>
                <p className="leading-relaxed text-muted-foreground">
                  Unlike big processors with call centers and runaround, John works with you personally — reviewing your statements, finding the savings, and making sure the switch is seamless.
                </p>
                <p className="leading-relaxed text-muted-foreground">
                  When you call John Jenkins in Ohio, you get John. Not a bot (well, maybe his AI assistant first), not a sales rep reading a script — a real person who understands Ohio businesses.
                </p>
                <blockquote className="border-l-2 border-accent pl-5 text-sm italic text-foreground/80">
                  "Every business owner deserves to know exactly where their money is going. That's why every savings analysis is free, transparent, and comes with a $100 guarantee."
                </blockquote>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Why section */}
      <section className="bg-muted py-24">
        <div className="container">
          <AnimatedSection>
            <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-accent">Why Choose Us</p>
            <h2 className="mt-3 text-center text-3xl font-semibold md:text-4xl">Why Work With John?</h2>
          </AnimatedSection>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: MapPin, title: "Local & Personal", desc: "John is based right here in Ohio. You'll always have a direct line." },
              { icon: FileText, title: "No Contracts Required", desc: "We earn your business every month. No lock-ins." },
              { icon: Shield, title: "$100 Guarantee", desc: "If we can't save you money, we pay you." },
              { icon: CreditCard, title: "Transparent Pricing", desc: "No hidden fees. No markup games. Ever." },
            ].map((item, i) => (
              <AnimatedSection key={i}>
                <div className="h-full rounded-sm border border-border bg-card p-7 text-center" style={{ transitionDelay: `${i * 100}ms` }}>
                  <item.icon className="mx-auto mb-4 h-5 w-5 text-accent" />
                  <h3 className="mb-2 font-sans text-sm font-semibold uppercase tracking-wide">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container text-center">
          <AnimatedSection>
            <h2 className="text-3xl font-semibold md:text-4xl">Want to talk?</h2>
            <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">
              Book a free savings analysis with John.
            </p>
            <Button variant="cta" size="lg" className="mt-10" asChild>
              <Link to="/contact">Book Your Free Analysis</Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
