import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const services = [
  "Grief and Loss Counseling",
  "Marriage & Relationship Therapy",
  "Anxiety Support",
  "Depression Therapy",
  "Trauma & Psychological Dreams",
  "Family & Parenting Stress",
  "School-Based Substance Use Prevention",
  "Mental Health Consulting & Training",
];

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30",
];

const Book = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState("");
  const [service, setService] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-16">
          <section className="section-padding bg-background">
            <div className="container-narrow max-w-lg text-center">
              <CalendarDays className="w-16 h-16 text-primary mx-auto mb-6" />
              <h1 className="text-3xl font-heading font-medium text-foreground mb-4">Book a Session</h1>
              <p className="text-muted-foreground mb-8">Please sign in or create an account to book a therapy session.</p>
              <Button asChild size="lg">
                <a href="/auth">Sign In / Sign Up</a>
              </Button>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!date || !time || !service) {
      toast({ title: "Missing Information", description: "Please select a date, time, and service.", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    const bookingDate = date.toISOString().split("T")[0];

    const { error } = await supabase.from("bookings").insert({
      user_id: user.id,
      service,
      booking_date: bookingDate,
      booking_time: time,
      notes: notes || null,
    });

    if (error) {
      toast({ title: "Booking Failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Booking Submitted!", description: "Your session request has been sent. We'll confirm via email shortly." });
      navigate("/dashboard");
    }
    setSubmitting(false);
  };

  // Disable past dates and Sundays
  const disabledDays = (day: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return day < today || day.getDay() === 0;
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <section className="section-padding bg-background">
          <div className="container-narrow max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">Online Booking</p>
              <h1 className="text-3xl md:text-4xl font-heading font-medium text-foreground mb-4">
                Schedule Your Session
              </h1>
              <p className="text-muted-foreground">Choose your preferred date, time, and service below.</p>
            </motion.div>

            <form onSubmit={handleSubmit}>
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Calendar */}
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-card border border-border rounded-xl p-6">
                  <h2 className="font-heading text-lg font-medium text-foreground mb-4">Select a Date</h2>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={disabledDays}
                    className="mx-auto"
                  />
                </motion.div>

                {/* Details */}
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Service</label>
                    <Select value={service} onValueChange={setService}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((s) => (
                          <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Preferred Time</label>
                    <Select value={time} onValueChange={setTime}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((t) => (
                          <SelectItem key={t} value={t}>{t}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Additional Notes (optional)</label>
                    <Textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Any details you'd like us to know..."
                      rows={4}
                      maxLength={500}
                    />
                  </div>

                  {date && time && service && (
                    <div className="bg-accent/50 rounded-lg p-4 text-sm text-foreground">
                      <p className="font-medium mb-1">Booking Summary</p>
                      <p className="text-muted-foreground">{service}</p>
                      <p className="text-muted-foreground">{date.toLocaleDateString("en-KE", { weekday: "long", year: "numeric", month: "long", day: "numeric" })} at {time}</p>
                    </div>
                  )}

                  <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                    {submitting ? "Submitting..." : "Request Booking"}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    Your booking request will be reviewed and confirmed by our therapist.
                  </p>
                </motion.div>
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Book;
