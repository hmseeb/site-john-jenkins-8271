import { useEffect, useRef } from "react";
import { AnimatedSection } from "@/hooks/useScrollAnimation";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "How much does the savings analysis cost?", a: "Nothing. It's completely free with no obligation." },
  { q: "What if I'm locked in a contract?", a: "If you process over $10K/month, we can buy out your contract at no cost to you." },
  { q: "How long does the analysis take?", a: "About 15 minutes. John will walk you through everything." },
  { q: "Will cash discounting upset my customers?", a: "Most customers are used to it now. It's fully transparent and professional." },
  { q: "What if you can't save me money?", a: "Then we hand you $100. Seriously." },
  { q: "Do you service businesses outside Ohio?", a: "John focuses on Ohio businesses. For other locations, visit beaconpayments.com." },
];

export default function Contact() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://link.leadtocustomerssystem.com/js/form_embed.js";
    script.type = "text/javascript";
    document.body.appendChild(script);
    return () => {
      try {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      } catch (e) {
        // Script may have already been removed by the external library
      }
    };
  }, []);

  return (
    <main>
      {/* Hero */}
      <section className="bg-primary py-20 md:py-28">
        <div className="container text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Contact</p>
          <h1 className="mt-3 text-3xl font-semibold text-primary-foreground md:text-5xl">
            Let's Talk Savings
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-primary-foreground/60">
            Book a free 15-minute savings analysis or reach out directly.
          </p>
        </div>
      </section>

      {/* Two Column */}
      <section className="py-24">
        <div className="container">
          <div className="grid gap-14 md:grid-cols-2">
            {/* Calendar Embed */}
            <AnimatedSection>
              <div className="space-y-4">
                <h2 className="font-condensed text-2xl uppercase tracking-wide">Book Your Free Analysis</h2>
                <iframe
                  src="https://link.leadtocustomerssystem.com/widget/booking/lyFi3AkCByrIyl8PePHF"
                  className="w-full rounded-sm border-none"
                  style={{ minHeight: "800px" }}
                  scrolling="no"
                  id="lyFi3AkCByrIyl8PePHF"
                  title="Book a meeting with John Jenkins"
                />
                <p className="text-xs uppercase tracking-widest text-muted-foreground">John is available weekdays after 3:00 PM ET</p>

                {/* Contact Info */}
                <h2 className="font-condensed text-2xl uppercase tracking-wide pt-8">Contact Information</h2>
                <div className="space-y-4">
                  {[
                    { icon: Phone, label: "(614) 419-1601", href: "tel:6144191601" },
                    { icon: Mail, label: "jjenkins@beaconpayments.com", href: "mailto:jjenkins@beaconpayments.com" },
                    { icon: MapPin, label: "Dublin, Ohio", href: undefined },
                    { icon: Clock, label: "Available weekdays after 3:00 PM ET", href: undefined },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4 text-accent" />
                      {item.href ? (
                        <a href={item.href} className="text-sm text-foreground hover:text-accent">{item.label}</a>
                      ) : (
                        <span className="text-sm">{item.label}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Send a Message */}
            <AnimatedSection>
              <div className="space-y-8">
                <h2 className="font-condensed text-2xl uppercase tracking-wide">Send a Message</h2>
                <iframe
                  src="https://link.leadtocustomerssystem.com/widget/form/j7nIKhL0oh36iYrE4gH0"
                  className="w-full border-none rounded-sm bg-white"
                  style={{ minHeight: "700px" }}
                  id="inline-j7nIKhL0oh36iYrE4gH0"
                  data-layout="{'id':'INLINE'}"
                  data-trigger-type="alwaysShow"
                  data-activation-type="alwaysActivated"
                  data-deactivation-type="neverDeactivate"
                  data-form-name="Website Form"
                  data-height="700"
                  data-layout-iframe-id="inline-j7nIKhL0oh36iYrE4gH0"
                  data-form-id="j7nIKhL0oh36iYrE4gH0"
                  title="Website Form"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-muted py-24">
        <div className="container">
          <AnimatedSection>
            <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-accent">FAQ</p>
            <h2 className="mt-3 mb-10 text-center text-3xl font-semibold">Frequently Asked Questions</h2>
            <div className="mx-auto max-w-3xl">
              <Accordion type="single" collapsible>
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`}>
                    <AccordionTrigger className="text-left text-base font-sans font-medium py-5">{faq.q}</AccordionTrigger>
                    <AccordionContent className="text-base text-muted-foreground pb-5">{faq.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
