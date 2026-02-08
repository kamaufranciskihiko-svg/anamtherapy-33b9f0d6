import { Heart } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-primary-foreground py-12 px-6">
      <div className="container-narrow">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-heading text-lg font-medium mb-3">Anam Therapy &amp; Consulting</h3>
            <p className="text-sm opacity-70 leading-relaxed">
              Professional psychological care for healing, growth, and emotional well-being.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-sm font-medium mb-3 uppercase tracking-wider opacity-70">Contact</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <a href="tel:+254721836555" className="hover:opacity-100 transition-opacity">0721 836 555</a>
              </li>
              <li>
                <a href="mailto:infoanamtherapy@gmail.com" className="hover:opacity-100 transition-opacity">infoanamtherapy@gmail.com</a>
              </li>
              <li>Kitengela Capital Centre, 2nd Floor</li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-medium mb-3 uppercase tracking-wider opacity-70">Hours</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>Monday – Saturday</li>
              <li>9:00 AM – 5:00 PM</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs opacity-60">
            &copy; {year} Anam Therapy and Consulting. All rights reserved.
          </p>
          <p className="text-xs opacity-60 flex items-center gap-1">
            Made with <Heart className="w-3 h-3 fill-current" /> in Kenya
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
