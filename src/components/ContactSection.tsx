import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  { icon: Phone, label: "Phone / WhatsApp", value: "0721 836 555", href: "tel:+254721836555" },
  { icon: Mail, label: "Email", value: "infoanamtherapy@gmail.com", href: "mailto:infoanamtherapy@gmail.com" },
  { icon: MapPin, label: "Location", value: "Kitengela Capital Centre, 2nd Floor", href: undefined },
  { icon: Clock, label: "Business Hours", value: "Mon – Sat, 9:00 AM – 5:00 PM", href: undefined },
];

const ContactSection = () => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      toast({
        title: "Message Sent",
        description: "Thank you for reaching out. We'll get back to you shortly.",
      });
      (e.target as HTMLFormElement).reset();
      setSubmitting(false);
    }, 1000);
  };

  return (
    <section id="contact" className="section-padding bg-card">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">Get in Touch</p>
          <h2 className="text-3xl md:text-4xl font-heading font-medium text-foreground mb-6">
            We're Here for You
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Reaching out is the first step. Contact us to schedule a session or ask any questions you may have.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info + Map */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {contactInfo.map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="text-foreground hover:text-primary transition-colors font-medium text-sm">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-foreground font-medium text-sm">{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* WhatsApp Button */}
            <Button asChild className="w-full bg-primary hover:bg-primary/90 gap-2">
              <a
                href="https://wa.me/254721836555?text=Hello%2C%20I%20would%20like%20to%20book%20a%20session%20with%20Anam%20Therapy."
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp
              </a>
            </Button>

            {/* Google Map */}
            <div className="rounded-xl overflow-hidden border border-border h-56">
              <iframe
                title="Anam Therapy Location - Kitengela Capital Centre"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.5!2d36.96!3d-1.47!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sKitengela+Capital+Centre!5e0!3m2!1sen!2ske!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">
                  Full Name
                </label>
                <Input id="name" name="name" placeholder="Your name" required maxLength={100} />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                  Email Address
                </label>
                <Input id="email" name="email" type="email" placeholder="you@example.com" required maxLength={255} />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1.5">
                  Phone Number
                </label>
                <Input id="phone" name="phone" type="tel" placeholder="07XX XXX XXX" maxLength={20} />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">
                  Your Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us how we can help you..."
                  rows={5}
                  required
                  maxLength={1000}
                />
              </div>
              <Button type="submit" className="w-full" size="lg" disabled={submitting}>
                {submitting ? "Sending..." : "Send Message"}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Your information is confidential and will only be used to respond to your inquiry.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
