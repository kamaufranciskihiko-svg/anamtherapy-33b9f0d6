import { motion } from "framer-motion";
import { Flower2, HeartHandshake, Brain, CloudRain, Moon, Home, GraduationCap, Lightbulb } from "lucide-react";

const services = [
  {
    icon: Flower2,
    title: "Grief and Loss Counseling",
    description: "Support through bereavement and significant life losses. We help you navigate the complex emotions of grief at your own pace.",
    who: "Individuals experiencing loss of a loved one, relationship, job, or life transition.",
  },
  {
    icon: HeartHandshake,
    title: "Marriage & Relationship Therapy",
    description: "Strengthen communication, rebuild trust, and deepen connection with your partner through guided therapeutic sessions.",
    who: "Couples seeking to improve their relationship or navigate challenges together.",
  },
  {
    icon: Brain,
    title: "Anxiety Support",
    description: "Evidence-based strategies to manage worry, panic, and overwhelming stress so you can regain a sense of calm.",
    who: "Adults and young people experiencing persistent worry, social anxiety, or panic.",
  },
  {
    icon: CloudRain,
    title: "Depression Therapy",
    description: "Compassionate support to help you understand and manage depressive symptoms, rediscovering hope and motivation.",
    who: "Individuals feeling persistent sadness, hopelessness, or loss of interest in life.",
  },
  {
    icon: Moon,
    title: "Trauma & Psychological Dreams",
    description: "Process traumatic experiences and recurring distressing dreams in a safe environment using trauma-informed approaches.",
    who: "Survivors of trauma, PTSD, and those experiencing disturbing psychological dreams.",
  },
  {
    icon: Home,
    title: "Family & Parenting Stress",
    description: "Navigate family dynamics, parenting challenges, and household stress with professional guidance and practical tools.",
    who: "Parents, caregivers, and families facing conflict, behavioral issues, or life adjustments.",
  },
  {
    icon: GraduationCap,
    title: "School-Based Substance Use Prevention",
    description: "Structured prevention and intervention programs for educational institutions addressing substance use among young people.",
    who: "Schools, educators, and student communities seeking professional prevention support.",
  },
  {
    icon: Lightbulb,
    title: "Mental Health Consulting & Training",
    description: "Professional consulting and capacity-building workshops for organizations, schools, and community groups.",
    who: "Organizations, NGOs, and institutions seeking mental health expertise and staff training.",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="section-padding bg-background">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">Our Services</p>
          <h2 className="text-3xl md:text-4xl font-heading font-medium text-foreground mb-6">
            How We Can Help
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We offer a range of professional services tailored to meet you where you are. Each service is grounded in evidence-based practice and delivered with compassion.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="p-6 md:p-8 rounded-xl bg-card border border-border hover:shadow-md transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-accent mb-4">
                <service.icon className="w-5 h-5 text-accent-foreground" />
              </div>
              <h3 className="font-heading text-lg font-medium text-foreground mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">{service.description}</p>
              <p className="text-xs text-muted-foreground italic">
                <span className="font-medium not-italic text-foreground">Who it helps:</span> {service.who}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
