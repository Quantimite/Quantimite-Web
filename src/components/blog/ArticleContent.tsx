import ReactMarkdown from "react-markdown";
import { BlogPost } from "@/types/blog";
import { BlueprintChipIcon, ArchitectureIcon } from "./BlogIcons";

interface ArticleContentProps {
  post: BlogPost;
}

export default function ArticleContent({ post }: ArticleContentProps) {
  return (
    <article className="mx-auto max-w-4xl px-6 pb-16">
      {/* Featured visual banner / header accent with Liquid Glassmorphism */}
      <div className="apple-glass-panel relative mb-12 overflow-hidden rounded-3xl p-8">
        <div
          className={`h-2.5 w-full rounded-full bg-gradient-to-r ${post.coverGradient} mb-6`}
        />
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet">
          <BlueprintChipIcon size={16} className="text-violet" />
          <span>Core Takeaway Overview</span>
        </div>
        <p className="mt-3 text-base font-medium text-plum/80 leading-relaxed italic">
          &ldquo;{post.excerpt}&rdquo;
        </p>
      </div>

      {/* Main Rich Content */}
      <div className="prose prose-plum max-w-none text-plum/85 leading-relaxed">
        <ReactMarkdown
          components={{
            h2: ({ node, ...props }) => (
              <h2
                className="mt-12 mb-5 text-2xl sm:text-3xl font-extrabold tracking-tight text-plum border-b border-plum/10 pb-3"
                {...props}
              />
            ),
            h3: ({ node, ...props }) => (
              <h3
                className="mt-8 mb-4 text-xl sm:text-2xl font-bold tracking-tight text-plum"
                {...props}
              />
            ),
            h4: ({ node, ...props }) => (
              <h4
                className="mt-6 mb-3 text-lg font-bold tracking-tight text-plum"
                {...props}
              />
            ),
            p: ({ node, ...props }) => (
              <p className="mb-6 text-base sm:text-lg leading-relaxed text-plum/80" {...props} />
            ),
            ul: ({ node, ...props }) => (
              <ul className="mb-6 list-disc pl-6 space-y-2 text-base sm:text-lg text-plum/80" {...props} />
            ),
            ol: ({ node, ...props }) => (
              <ol className="mb-6 list-decimal pl-6 space-y-2 text-base sm:text-lg text-plum/80" {...props} />
            ),
            li: ({ node, ...props }) => (
              <li className="leading-relaxed" {...props} />
            ),
            blockquote: ({ node, ...props }) => (
              <blockquote
                className="apple-glass-panel my-8 rounded-2xl border-l-4 border-l-violet p-6 text-lg font-medium italic text-plum sm:text-xl shadow-xs"
                {...props}
              />
            ),
            code: ({ className, children, ...props }) => {
              const isInline = !className;
              if (isInline) {
                return (
                  <code
                    className="rounded-md bg-plum/10 px-1.5 py-0.5 font-mono text-sm font-semibold text-plum"
                    {...props}
                  >
                    {children}
                  </code>
                );
              }
              return (
                <div className="my-6 overflow-hidden rounded-2xl border border-plum/15 bg-plum text-white shadow-xl">
                  <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5 text-xs text-white/60">
                    <span className="font-mono flex items-center gap-1.5">
                      <ArchitectureIcon size={14} /> Source Blueprint
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-rose-400" />
                      <span className="h-2 w-2 rounded-full bg-amber-400" />
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    </span>
                  </div>
                  <pre className="overflow-x-auto p-5 font-mono text-sm leading-relaxed text-white/90">
                    <code className={className} {...props}>
                      {children}
                    </code>
                  </pre>
                </div>
              );
            },
            strong: ({ node, ...props }) => (
              <strong className="font-bold text-plum" {...props} />
            ),
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>

      {/* Article Tag Footer */}
      <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-plum/10 pt-6">
        <span className="font-semibold text-xs text-plum/60 mr-1">
          Filed under tags:
        </span>
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="apple-glass-pill rounded-lg px-3 py-1 text-xs font-semibold"
          >
            #{tag}
          </span>
        ))}
      </div>
    </article>
  );
}
