import { motion } from "framer-motion";
import { Award, BookOpen, Users, Heart, GraduationCap, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const credentials = [
  { icon: GraduationCap, label: "Licensed Professional Counselor" },
  { icon: Award, label: "Certified Clinical Therapist" },
  { icon: BookOpen, label: "Evidence-Based Practice Specialist" },
  { icon: Users, label: "Family & Couples Therapy Trained" },
  { icon: Heart, label: "Trauma-Informed Care Certified" },
  { icon: Shield, label: "Ethical Practice Committed" },
];

const Therapist = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <section className="section-padding bg-card">
          <div className="container-narrow">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto"
            >
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4 text-center">
                Meet Your Therapist
              </p>
              <h1 className="text-3xl md:text-5xl font-heading font-medium text-foreground mb-8 text-center">
                Sharon Omune
              </h1>

              <div className="bg-background border border-border rounded-xl p-8 md:p-12 mb-12">
                <h2 className="font-heading text-xl font-medium text-foreground mb-4">
                  Professional Summary
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Sharon Omune is the founder and lead therapist at Anam Therapy and Consulting, a licensed therapy practice based in Kitengela, Kenya. With a deep commitment to mental health and emotional well-being, Sharon brings a wealth of clinical experience to her work with individuals, couples, families, and organizations.
                  </p>
                  <p>
                    Sharon's therapeutic approach is rooted in evidence-based practices, combining cognitive-behavioral techniques, person-centered therapy, and trauma-informed care. She creates a safe, non-judgmental environment where clients can explore their challenges, process difficult emotions, and develop practical coping strategies.
                  </p>
                  <p>
                    Beyond individual and couples therapy, Sharon is passionate about community mental health. She works with schools on substance use prevention programs and provides mental health consulting and training for organizations seeking to support the well-being of their staff and communities.
                  </p>
                  <p>
                    Sharon's practice is built on the values of compassion, confidentiality, and professional excellence. She believes that every person deserves access to quality psychological care and is dedicated to making therapy accessible and approachable for all.
                  </p>
                </div>
              </div>

              <h2 className="font-heading text-xl font-medium text-foreground mb-6 text-center">
                Credentials &amp; Specializations
              </h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {credentials.map((cred, index) => (
                  <motion.div
                    key={cred.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center gap-3 p-4 bg-background border border-border rounded-lg"
                  >
                    <cred.icon className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm font-medium text-foreground">{cred.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Therapist;
