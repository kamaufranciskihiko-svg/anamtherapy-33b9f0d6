import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CalendarDays, FileText, BookOpen, CreditCard, Plus, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { format } from "date-fns";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  approved: "bg-green-100 text-green-800",
  declined: "bg-red-100 text-red-800",
  cancelled: "bg-gray-100 text-gray-800",
};

const Dashboard = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [bookings, setBookings] = useState<any[]>([]);
  const [sessionNotes, setSessionNotes] = useState<any[]>([]);
  const [journals, setJournals] = useState<any[]>([]);
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  // Journal form
  const [journalTitle, setJournalTitle] = useState("");
  const [journalContent, setJournalContent] = useState("");
  const [savingJournal, setSavingJournal] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      const [b, s, j, sub] = await Promise.all([
        supabase.from("bookings").select("*").eq("user_id", user.id).order("booking_date", { ascending: false }),
        supabase.from("session_notes").select("*").eq("user_id", user.id).order("session_date", { ascending: false }),
        supabase.from("journal_entries").select("*").eq("user_id", user.id).order("entry_date", { ascending: false }),
        supabase.from("subscriptions").select("*").eq("user_id", user.id).order("start_date", { ascending: false }),
      ]);
      setBookings(b.data ?? []);
      setSessionNotes(s.data ?? []);
      setJournals(j.data ?? []);
      setSubscriptions(sub.data ?? []);
      setLoadingData(false);
    };
    fetchData();
  }, [user]);

  const handleSaveJournal = async () => {
    if (!journalContent.trim() || !user) return;
    setSavingJournal(true);
    const { error } = await supabase.from("journal_entries").insert({
      user_id: user.id,
      title: journalTitle || null,
      content: journalContent,
    });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Journal Saved" });
      setJournalTitle("");
      setJournalContent("");
      // Refresh
      const { data } = await supabase.from("journal_entries").select("*").eq("user_id", user.id).order("entry_date", { ascending: false });
      setJournals(data ?? []);
    }
    setSavingJournal(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (authLoading || !user) return null;

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <section className="section-padding bg-background">
          <div className="container-narrow">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl md:text-3xl font-heading font-medium text-foreground">My Dashboard</h1>
                <p className="text-muted-foreground text-sm">{user.email}</p>
              </div>
              <div className="flex gap-3">
                <Button asChild variant="outline" size="sm">
                  <Link to="/book"><Plus className="w-4 h-4 mr-1" /> Book Session</Link>
                </Button>
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  <LogOut className="w-4 h-4 mr-1" /> Sign Out
                </Button>
              </div>
            </motion.div>

            <Tabs defaultValue="bookings">
              <TabsList className="mb-6">
                <TabsTrigger value="bookings" className="gap-2"><CalendarDays className="w-4 h-4" /> Bookings</TabsTrigger>
                <TabsTrigger value="notes" className="gap-2"><FileText className="w-4 h-4" /> Session Notes</TabsTrigger>
                <TabsTrigger value="journal" className="gap-2"><BookOpen className="w-4 h-4" /> Journal</TabsTrigger>
                <TabsTrigger value="subscriptions" className="gap-2"><CreditCard className="w-4 h-4" /> Subscriptions</TabsTrigger>
              </TabsList>

              {/* Bookings Tab */}
              <TabsContent value="bookings">
                {loadingData ? (
                  <p className="text-muted-foreground">Loading...</p>
                ) : bookings.length === 0 ? (
                  <div className="text-center py-12 bg-card border border-border rounded-xl">
                    <CalendarDays className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">No bookings yet</p>
                    <Button asChild><Link to="/book">Book Your First Session</Link></Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {bookings.map((b) => (
                      <div key={b.id} className="bg-card border border-border rounded-lg p-4 flex items-center justify-between">
                        <div>
                          <p className="font-medium text-foreground text-sm">{b.service}</p>
                          <p className="text-xs text-muted-foreground">
                            {format(new Date(b.booking_date), "MMM d, yyyy")} at {b.booking_time}
                          </p>
                          {b.admin_notes && <p className="text-xs text-muted-foreground mt-1 italic">Note: {b.admin_notes}</p>}
                        </div>
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[b.status] || ""}`}>
                          {b.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Session Notes Tab */}
              <TabsContent value="notes">
                {sessionNotes.length === 0 ? (
                  <div className="text-center py-12 bg-card border border-border rounded-xl">
                    <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No session notes yet. Your therapist will share notes after sessions.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {sessionNotes.map((n) => (
                      <div key={n.id} className="bg-card border border-border rounded-lg p-4">
                        <p className="text-xs text-muted-foreground mb-2">{format(new Date(n.session_date), "MMM d, yyyy")}</p>
                        {n.summary && <p className="font-medium text-foreground text-sm mb-1">{n.summary}</p>}
                        <p className="text-sm text-muted-foreground">{n.notes}</p>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Journal Tab */}
              <TabsContent value="journal">
                <div className="bg-card border border-border rounded-xl p-6 mb-6">
                  <h3 className="font-heading text-lg font-medium text-foreground mb-4">New Journal Entry</h3>
                  <Input
                    value={journalTitle}
                    onChange={(e) => setJournalTitle(e.target.value)}
                    placeholder="Entry title (optional)"
                    className="mb-3"
                    maxLength={200}
                  />
                  <Textarea
                    value={journalContent}
                    onChange={(e) => setJournalContent(e.target.value)}
                    placeholder="Write your thoughts..."
                    rows={5}
                    maxLength={5000}
                  />
                  <Button onClick={handleSaveJournal} className="mt-3" disabled={!journalContent.trim() || savingJournal}>
                    {savingJournal ? "Saving..." : "Save Entry"}
                  </Button>
                </div>

                {journals.length === 0 ? (
                  <p className="text-center text-muted-foreground py-6">Your journal entries will appear here.</p>
                ) : (
                  <div className="space-y-3">
                    {journals.map((j) => (
                      <div key={j.id} className="bg-card border border-border rounded-lg p-4">
                        <p className="text-xs text-muted-foreground mb-1">{format(new Date(j.entry_date), "MMM d, yyyy")}</p>
                        {j.title && <p className="font-medium text-foreground text-sm mb-1">{j.title}</p>}
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">{j.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Subscriptions Tab */}
              <TabsContent value="subscriptions">
                {subscriptions.length === 0 ? (
                  <div className="text-center py-12 bg-card border border-border rounded-xl">
                    <CreditCard className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No active subscriptions.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {subscriptions.map((s) => (
                      <div key={s.id} className="bg-card border border-border rounded-lg p-4 flex items-center justify-between">
                        <div>
                          <p className="font-medium text-foreground text-sm">{s.plan_name}</p>
                          <p className="text-xs text-muted-foreground">
                            Started: {format(new Date(s.start_date), "MMM d, yyyy")}
                            {s.end_date && ` · Ends: ${format(new Date(s.end_date), "MMM d, yyyy")}`}
                          </p>
                        </div>
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${s.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                          {s.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
