import Link from "next/link";
import { BlogPost } from "@/types/blog";
import { Clock, ArrowRight } from "lucide-react";

interface RelatedPostsProps {
  posts: BlogPost[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="border-t border-plum/10 bg-plum/2 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-violet">
              Continue Reading
            </span>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-plum sm:text-3xl">
              Related Insights & Deep Dives
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-violet hover:text-azure transition-colors"
          >
            View all insights
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col justify-between rounded-3xl border border-plum/10 bg-white/80 p-6 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-violet/30 hover:shadow-lg"
            >
              <div>
                {/* Visual accent bar */}
                <div className={`h-2 w-full rounded-full bg-gradient-to-r ${post.coverGradient} mb-4`} />

                <div className="flex items-center justify-between text-xs">
                  <span className="rounded-full bg-violet/10 px-2.5 py-0.5 font-semibold text-violet">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 font-medium text-plum/60">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="mt-3 text-lg font-bold tracking-tight text-plum transition-colors group-hover:text-violet">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>

                <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-plum/70">
                  {post.excerpt}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-plum/10 pt-4">
                <span className="text-xs font-semibold text-plum/60">
                  By {post.author.name}
                </span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-violet transition-colors hover:text-azure"
                >
                  Read
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
