import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
const logo = "/john-jenkins-wordmark.svg";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <img src={logo} alt="John Jenkins" className="h-14 w-auto brightness-0 invert" />
            <p className="text-sm text-primary-foreground/60">
              Saving Ohio businesses, one statement at a time.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary-foreground/40">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="text-sm text-primary-foreground/60 hover:text-accent">Home</Link>
              <Link to="/services" className="text-sm text-primary-foreground/60 hover:text-accent">Services</Link>
              <Link to="/about" className="text-sm text-primary-foreground/60 hover:text-accent">About</Link>
              <Link to="/contact" className="text-sm text-primary-foreground/60 hover:text-accent">Contact</Link>
            </nav>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary-foreground/40">Contact</h4>
            <div className="flex flex-col gap-2 text-sm text-primary-foreground/60">
              <a href="tel:6144191601" className="hover:text-accent">(614) 419-1601</a>
              <a href="mailto:jjenkins@beaconpayments.com" className="hover:text-accent">jjenkins@beaconpayments.com</a>
              <span>Dublin, Ohio</span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Button variant="cta" asChild>
              <Link to="/contact">Free Savings Analysis</Link>
            </Button>
          </div>
        </div>

        <div className="mt-8 border-t border-primary-foreground/10 pt-6 text-center text-xs text-primary-foreground/30">
          <p>© {new Date().getFullYear()} John Jenkins. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
