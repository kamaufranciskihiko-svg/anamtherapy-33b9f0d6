import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { format } from "date-fns";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image_url: string | null;
  published_at: string | null;
  created_at: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("id, title, slug, excerpt, cover_image_url, published_at, created_at")
        .eq("published", true)
        .order("published_at", { ascending: false });
      setPosts(data ?? []);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <section className="section-padding bg-background">
          <div className="container-narrow">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto text-center mb-16"
            >
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">Our Blog</p>
              <h1 className="text-3xl md:text-5xl font-heading font-medium text-foreground mb-6">
                Insights &amp; Resources
              </h1>
              <p className="text-muted-foreground leading-relaxed">
                Helpful articles on mental health, relationships, and emotional well-being.
              </p>
            </motion.div>

            {loading ? (
              <div className="text-center text-muted-foreground py-12">Loading articles...</div>
            ) : posts.length === 0 ? (
              <div className="text-center py-16 bg-card border border-border rounded-xl">
                <p className="text-muted-foreground text-lg mb-2">No articles yet</p>
                <p className="text-sm text-muted-foreground">Check back soon for helpful mental health resources.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={`/blog/${post.slug}`}
                      className="block bg-card border border-border rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                    >
                      {post.cover_image_url && (
                        <img src={post.cover_image_url} alt={post.title} className="w-full h-48 object-cover" />
                      )}
                      <div className="p-6">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                          <Calendar className="w-3 h-3" />
                          {format(new Date(post.published_at || post.created_at), "MMM d, yyyy")}
                        </div>
                        <h2 className="font-heading text-lg font-medium text-foreground mb-2">{post.title}</h2>
                        {post.excerpt && (
                          <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
