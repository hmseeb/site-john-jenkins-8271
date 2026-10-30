import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/hooks/useScrollAnimation";
import { CreditCard, DollarSign, FileText, Monitor, Shield } from "lucide-react";
import statementReview from "@/assets/statement-review.jpg";
import cardTap from "@/assets/card-tap.jpg";
import handshake from "@/assets/handshake.jpg";
import posSystem from "@/assets/pos-system.jpg";

const services = [
  {
    icon: CreditCard,
    title: "Transparent Pricing That Saves You 15–30%",
    subtitle: "Interchange Plus Pricing",
    body: "We help businesses reduce credit card processing fees using interchange plus pricing — the most transparent model in the industry. You see exactly what Visa and Mastercard charge, plus a small fixed markup. No surprises. No hidden fees. Save 15% to 30% on your current processing costs. Example: We saved a local Ohio barber shop approximately $860 every single month just by making the switch.",
    image: statementReview,
    alt: "Reviewing processing statements and savings",
  },
  {
    icon: DollarSign,
    title: "Eliminate Your Processing Bill for $39.95/Month",
    subtitle: "Cash Discounting Program",
    body: "Only $39.95/month flat fee — that's it. Our cash discounting program lets you pass the processing fee (typically around 4%) to customers who pay by card. You essentially eliminate your processing bill. More and more businesses are making the switch as they tire of rising fees. It's fully compliant, transparent to customers, and could save you thousands per year.",
    image: cardTap,
    alt: "Customer using contactless payment terminal",
  },
  {
    icon: FileText,
    title: "Stuck in a Contract? We'll Buy You Out",
    subtitle: "Contract Buyout",
    body: "If your business processes more than $10,000 per month, we'll buy out your existing processor contract. You pay zero in termination fees. We handle everything so you can switch risk-free. No more feeling trapped with a provider that isn't working for you — this removes the \"I'm stuck in a contract\" problem entirely.",
    image: handshake,
    alt: "Business partnership handshake",
  },
  {
    icon: Monitor,
    title: "Modern POS Equipment — On Us",
    subtitle: "Free POS Systems",
    body: "Depending on your processing volume, you may qualify for free POS equipment. We offer Clover and other modern systems that speed up checkout and simplify your operations. If your current equipment is outdated or slowing you down, this is the perfect hook to upgrade at no cost.",
    image: posSystem,
    alt: "Modern Clover POS system on counter",
  },
];

export default function Services() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-primary py-20 md:py-28">
        <div className="container text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Our Services</p>
          <h1 className="mt-3 text-3xl font-semibold text-primary-foreground md:text-5xl">
            Solutions That Actually Save You Money
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-primary-foreground/60">
            Transparent pricing, contract buyouts, free equipment, and a guarantee to back it all up.
          </p>
        </div>
      </section>

      {/* Service Sections */}
      {services.map((svc, i) => (
        <section key={i} className={`py-20 ${i % 2 === 0 ? "" : "bg-muted"}`}>
          <div className="container">
            <AnimatedSection>
              <div className={`grid items-center gap-12 md:grid-cols-2 ${i % 2 !== 0 ? "md:[direction:rtl]" : ""}`}>
                <div className={i % 2 !== 0 ? "md:[direction:ltr]" : ""}>
                  <svc.icon className="mb-4 h-5 w-5 text-accent" />
                  <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent">{svc.subtitle}</p>
                  <h2 className="mb-4 text-2xl font-semibold md:text-3xl">{svc.title}</h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">{svc.body}</p>
                </div>
                <div className={i % 2 !== 0 ? "md:[direction:ltr]" : ""}>
                  <img
                    src={svc.image}
                    alt={svc.alt}
                    className="h-56 w-full rounded-sm object-cover shadow-lg md:h-72"
                    loading="lazy"
                  />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      ))}

      {/* $100 Guarantee */}
      <section className="bg-primary py-20">
        <div className="container">
          <AnimatedSection>
            <div className="mx-auto max-w-3xl border border-primary-foreground/10 bg-primary-foreground/5 p-10 text-center md:p-14">
              <Shield className="mx-auto mb-4 h-10 w-10 text-accent" />
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-accent">$100 Guarantee</p>
              <h2 className="text-2xl font-semibold text-primary-foreground md:text-3xl">We Put Our Money Where Our Mouth Is</h2>
              <p className="mx-auto mt-4 max-w-xl text-sm text-primary-foreground/60">
                If we review your processing statement and can't find a way to lower your bill, we'll pay you $100.
                That's our promise. There's no risk to you — you either save money or get paid.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container text-center">
          <AnimatedSection>
            <h2 className="text-3xl font-semibold md:text-4xl">Ready to See Your Savings?</h2>
            <Button variant="cta" size="lg" className="mt-10" asChild>
              <Link to="/contact">Get Your Free Savings Analysis</Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
