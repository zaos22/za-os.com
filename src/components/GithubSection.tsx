"use client";

import { portfolioContent } from "@/data/content";
import { FolderGit2, ExternalLink, Code2 } from "lucide-react";

export default function GithubSection() {
  const { github } = portfolioContent;

  return (
    <section className="relative z-10 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 py-10">
      <div className="rounded-3xl bg-surface-container-lowest/80 border border-outline-variant/30 p-6 sm:p-8 lg:p-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-outline-variant/20">
          <div>
            <h3 className="font-syne text-xl sm:text-2xl font-bold text-on-surface">
              {github.heading}
            </h3>
            <p className="font-mono text-xs text-outline mt-1">
              {github.description}
            </p>
          </div>

          <a
            href={github.profileUrl}
            target="_blank"
            rel="noreferrer"
            className="interactive inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-mono text-xs border border-outline-variant/40 transition-colors w-fit shrink-0"
          >
            <Code2 className="w-3.5 h-3.5 text-primary" />
            <span>{github.profileHandle}</span>
          </a>
        </div>

        {/* 3 Real Repositories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {github.repos.map((repo, idx) => (
            <a
              key={idx}
              href={repo.url}
              target="_blank"
              rel="noreferrer"
              className="interactive group p-5 rounded-2xl bg-surface-container/40 border border-outline-variant/30 hover:border-primary/50 hover:bg-surface-container/70 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <FolderGit2 className="w-5 h-5 text-primary transition-transform duration-200 group-hover:scale-110" />
                  <ExternalLink className="w-3.5 h-3.5 text-outline group-hover:text-primary transition-colors" />
                </div>

                <div className="font-syne text-base font-bold text-on-surface truncate group-hover:text-primary transition-colors">
                  {repo.name}
                </div>

                <p className="font-inter text-xs text-on-surface-variant my-2 line-clamp-2">
                  {repo.description || "Repositorio de código público en GitHub."}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-outline-variant/20 flex items-center justify-between text-[11px] font-mono text-outline">
                <span>zaos22/{repo.name}</span>
                <span className="text-primary group-hover:translate-x-0.5 transition-transform">
                  ↗
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
