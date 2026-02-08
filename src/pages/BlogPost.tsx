import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { format } from "date-fns";

interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  cover_image_url: string | null;
  published_at: string | null;
  created_at: string;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();
      setPost(data);
      setLoading(false);
    };
    if (slug) fetchPost();
  }, [slug]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <section className="section-padding bg-background">
          <div className="container-narrow max-w-3xl">
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>

            {loading ? (
              <div className="text-center text-muted-foreground py-12">Loading...</div>
            ) : !post ? (
              <div className="text-center py-16">
                <h1 className="text-2xl font-heading text-foreground mb-2">Article not found</h1>
                <p className="text-muted-foreground">This article may have been removed.</p>
              </div>
            ) : (
              <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                {post.cover_image_url && (
                  <img src={post.cover_image_url} alt={post.title} className="w-full h-64 md:h-96 object-cover rounded-xl mb-8" />
                )}
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                  <Calendar className="w-3 h-3" />
                  {format(new Date(post.published_at || post.created_at), "MMMM d, yyyy")}
                </div>
                <h1 className="text-3xl md:text-4xl font-heading font-medium text-foreground mb-8">{post.title}</h1>
                <div className="prose prose-neutral max-w-none text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {post.content}
                </div>
              </motion.article>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
