import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/hooks/useScrollAnimation";
import { Shield, DollarSign, CreditCard, Monitor, Clock, FileText, ArrowRight, Star, CheckCircle } from "lucide-react";
import johnHeadshot from "@/assets/john-headshot.jpg";

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary py-24 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(38_55%_51%_/_0.08),_transparent_60%)]" />
        <div className="container relative">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="space-y-8">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Payment Processing Consultant</p>
              <h1 className="text-4xl font-semibold leading-tight tracking-tight text-primary-foreground md:text-5xl lg:text-6xl">
                Stop Overpaying for Credit Card Processing
              </h1>
              <p className="text-lg text-primary-foreground/60">
                Ohio businesses save 15–30% on processing fees — or we pay you $100. Guaranteed.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button variant="cta" size="lg" asChild>
                  <Link to="/contact">Get Your Free Analysis</Link>
                </Button>
              </div>
              <p className="text-xs uppercase tracking-widest text-primary-foreground/40">No contracts · No risk · Just savings</p>
            </div>
            <div className="flex items-center justify-center">
              <img
                src={johnHeadshot}
                alt="John Jenkins — Credit Card Processing Consultant"
                className="h-72 w-72 rounded-sm object-cover shadow-2xl md:h-80 md:w-80"
              />
            </div>
          </div>
          {/* Trust bar */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 border-t border-primary-foreground/10 pt-8 text-xs uppercase tracking-widest text-primary-foreground/40 md:gap-16">
            <span className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5" /> Trusted by Ohio businesses</span>
            <span className="flex items-center gap-2"><Shield className="h-3.5 w-3.5" /> $100 Guarantee</span>
            <span className="flex items-center gap-2"><FileText className="h-3.5 w-3.5" /> No Contracts</span>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24">
        <div className="container">
          <AnimatedSection>
            <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-accent">The Problem</p>
            <h2 className="mt-3 text-center text-3xl font-semibold md:text-4xl">
              Processing Fees Eating Your Profits?
            </h2>
          </AnimatedSection>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              { icon: DollarSign, title: "Hidden fees buried in your statement that you don't even know about" },
              { icon: FileText, title: "Locked into expensive contracts with processors who don't care" },
              { icon: Monitor, title: "Outdated POS equipment slowing down your checkout" },
            ].map((item, i) => (
              <AnimatedSection key={i}>
                <div className="rounded-sm border border-border bg-card p-8 text-center" style={{ transitionDelay: `${i * 100}ms` }}>
                  <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center">
                    <item.icon className="h-6 w-6 text-accent" />
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.title}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection>
            <p className="mt-10 text-center text-sm text-muted-foreground">
              There's a better way — and it starts with a free 15-minute analysis.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Overview */}
      <section className="bg-muted py-24">
        <div className="container">
          <AnimatedSection>
            <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-accent">Our Services</p>
            <h2 className="mt-3 text-center text-3xl font-semibold md:text-4xl">How We Save You Money</h2>
          </AnimatedSection>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: CreditCard, title: "Interchange Plus Pricing", desc: "Save 15–30% with transparent pricing. We saved one barber shop $860/month." },
              { icon: DollarSign, title: "Cash Discounting", desc: "Just $39.95/month flat. Pass processing fees to customers and eliminate your bill." },
              { icon: FileText, title: "Contract Buyout", desc: "Processing $10K+/month? We'll buy out your current contract. Zero termination fees." },
              { icon: Monitor, title: "Free POS Systems", desc: "Qualify for free Clover and other modern POS equipment based on your volume." },
            ].map((item, i) => (
              <AnimatedSection key={i}>
                <div className="h-full rounded-sm border border-border bg-card p-7 transition-shadow hover:shadow-md" style={{ transitionDelay: `${i * 100}ms` }}>
                  <item.icon className="mb-5 h-5 w-5 text-accent" />
                  <h3 className="mb-2 font-condensed text-lg uppercase tracking-wide">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection>
            <div className="mt-10 text-center">
              <Button variant="link" asChild className="text-accent text-xs uppercase tracking-widest">
                <Link to="/services">View All Services <ArrowRight className="ml-1 h-3.5 w-3.5" /></Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24">
        <div className="container">
          <AnimatedSection>
            <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-accent">The Process</p>
            <h2 className="mt-3 text-center text-3xl font-semibold md:text-4xl">Three Steps to Start Saving</h2>
          </AnimatedSection>
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {[
              { step: "01", icon: Clock, title: "Book Your Free Analysis", desc: "Schedule a quick 15-minute call with John. No obligation." },
              { step: "02", icon: FileText, title: "We Review Your Statement", desc: "John personally reviews your current processing costs and finds the savings." },
              { step: "03", icon: DollarSign, title: "Start Saving Immediately", desc: "Switch and keep more of what you earn. It's that simple." },
            ].map((item, i) => (
              <AnimatedSection key={i}>
                <div className="text-center" style={{ transitionDelay: `${i * 150}ms` }}>
                  <span className="font-condensed text-5xl tracking-wide text-accent/30">{item.step}</span>
                  <h3 className="mt-4 mb-2 font-condensed text-xl uppercase tracking-wide">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection>
            <div className="mt-12 text-center">
              <Button variant="cta" size="lg" asChild>
                <Link to="/contact">Book Your Free Analysis</Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-muted py-24">
        <div className="container">
          <AnimatedSection>
            <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-accent">Testimonials</p>
            <h2 className="mt-3 text-center text-3xl font-semibold md:text-4xl">What Ohio Business Owners Say</h2>
          </AnimatedSection>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              { quote: "John saved us $860 a month just by switching our pricing model. I had no idea we were overpaying that much.", name: "Mike R.", biz: "Barber Shop Owner" },
              { quote: "Cash discounting was a game changer. Our processing bill went from $1,200/month to $39.95. Unreal.", name: "Sarah T.", biz: "Restaurant Owner" },
              { quote: "The free POS system alone made the switch worth it. John handled everything — seamless transition.", name: "David L.", biz: "Retail Shop Owner" },
            ].map((t, i) => (
              <AnimatedSection key={i}>
                <div className="h-full rounded-sm border border-border bg-card p-8" style={{ transitionDelay: `${i * 100}ms` }}>
                  <div className="mb-5 flex gap-1">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-3.5 w-3.5 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="mb-6 text-sm italic leading-relaxed text-muted-foreground">"{t.quote}"</p>
                  <div>
                    <p className="font-condensed text-sm uppercase tracking-wide">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.biz}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* $100 Guarantee Banner */}
      <section className="bg-primary py-20">
        <div className="container text-center">
          <AnimatedSection>
            <Shield className="mx-auto mb-5 h-10 w-10 text-accent" />
            <h2 className="text-3xl font-semibold text-primary-foreground md:text-4xl">Our $100 Guarantee</h2>
            <p className="mx-auto mt-5 max-w-2xl text-primary-foreground/60">
              If we can't lower your processing bill, we'll hand you $100. No questions asked. That's how confident we are.
            </p>
            <Button variant="cta" size="lg" className="mt-10" asChild>
              <Link to="/contact">Claim Your Free Analysis</Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24">
        <div className="container text-center">
          <AnimatedSection>
            <h2 className="text-3xl font-semibold md:text-4xl">Ready to Stop Overpaying?</h2>
            <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
              Join Ohio business owners who are saving thousands every year on processing fees.
            </p>
            <Button variant="cta" size="lg" className="mt-10" asChild>
              <Link to="/contact">Get Your Free Savings Analysis</Link>
            </Button>
            <p className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">Free · No obligation · 15 minutes</p>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
