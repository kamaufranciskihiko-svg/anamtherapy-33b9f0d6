import { motion } from "framer-motion";
import { Heart, Shield, Users } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Compassionate Care",
    description: "We approach every client with empathy, warmth, and genuine understanding of their unique journey.",
  },
  {
    icon: Shield,
    title: "Confidentiality",
    description: "Your privacy is sacred. All sessions and information shared are held in the strictest confidence.",
  },
  {
    icon: Users,
    title: "Professional Excellence",
    description: "Our licensed therapist brings evidence-based approaches and years of clinical experience.",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-card">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">About Us</p>
          <h2 className="text-3xl md:text-4xl font-heading font-medium text-foreground mb-6">
            A Space for Healing and Growth
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Anam Therapy and Consulting is a licensed therapy practice dedicated to supporting individuals, couples, and families through life's challenges. We provide a safe, non-judgmental environment where you can explore your thoughts, process your emotions, and build resilience. Our therapist is committed to walking alongside you on your path to emotional well-being.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="text-center p-8 rounded-xl bg-background border border-border"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent mb-5">
                <value.icon className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="font-heading text-lg font-medium text-foreground mb-3">{value.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
