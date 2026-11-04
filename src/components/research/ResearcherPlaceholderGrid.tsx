"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Search,
  SlidersHorizontal,
  X,
  PlusCircle,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
} from "lucide-react";
import { ResearcherSlot } from "@/types/research";
import ResearcherCard from "./ResearcherCard";
import { ScrollTextHeading, ScrollTextFade } from "@/components/ui/ScrollText";

interface Props {
  slots: ResearcherSlot[];
}

export default function ResearcherPlaceholderGrid({ slots }: Props) {
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Extract unique statuses
  const statusOptions = useMemo(() => {
    const statuses = Array.from(new Set(slots.map((s) => s.status)));
    return ["All", ...statuses];
  }, [slots]);

  // Filtered researcher slots based on status filter and search query
  const filteredSlots = useMemo(() => {
    return slots.filter((slot) => {
      const matchesStatus =
        selectedStatus === "All" || slot.status === selectedStatus;

      if (!searchQuery.trim()) return matchesStatus;

      const q = searchQuery.toLowerCase();
      const matchesSearch =
        slot.role.toLowerCase().includes(q) ||
        slot.domain.toLowerCase().includes(q) ||
        slot.department.toLowerCase().includes(q) ||
        slot.description.toLowerCase().includes(q) ||
        slot.expectedQualifications.some((qual) =>
          qual.toLowerCase().includes(q)
        );

      return matchesStatus && matchesSearch;
    });
  }, [slots, selectedStatus, searchQuery]);

  return (
    <section id="fellowship-slots" className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
      {/* SECTION HEADER WITH SCROLL IN-AND-OUT */}
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <ScrollTextFade
            as="div"
            delay={0.05}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-violet"
          >
            <GraduationCap className="h-4 w-4" />
            <span>Research Fellowships & Academic Resident Slots</span>
          </ScrollTextFade>

          <ScrollTextHeading
            as="h2"
            delay={0.1}
            className="mt-2 text-3xl font-black tracking-tight text-plum sm:text-4xl lg:text-5xl"
          >
            Principal Investigators & Fellow Roster
          </ScrollTextHeading>

          <ScrollTextFade
            as="p"
            delay={0.2}
            className="mt-2.5 max-w-2xl text-sm leading-relaxed text-plum/70 sm:text-base"
          >
            Quantimite operates an open-door research collective. The cards below represent
            reserved slots, planned fellowship chairs, and active laboratory openings currently being
            populated with candidates and resident scholars.
          </ScrollTextFade>
        </div>

        {/* Live Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-plum/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search role, domain, or skills..."
            className="w-full rounded-full border border-plum/15 bg-white/90 py-2.5 pl-10 pr-9 text-sm text-plum shadow-xs outline-none transition placeholder:text-plum/40 focus:border-violet focus:ring-2 focus:ring-violet/20"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-plum/40 hover:text-plum"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Status Filter Chips */}
      <div className="mt-8 flex flex-wrap items-center gap-2 pb-2">
        <span className="mr-2 inline-flex items-center gap-1.5 text-xs font-semibold text-plum/50">
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Slot Status:
        </span>
        {statusOptions.map((status) => {
          const isActive = selectedStatus === status;
          return (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`filter-chip ${isActive ? "filter-chip-active" : ""}`}
            >
              {status}
            </button>
          );
        })}
      </div>

      {/* Results Count & Clear Filter */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs font-medium text-plum/60">
        <span>
          Showing <strong className="text-plum">{filteredSlots.length}</strong> reserved{" "}
          {filteredSlots.length === 1 ? "researcher slot" : "researcher slots"}
        </span>
        {(selectedStatus !== "All" || searchQuery) && (
          <button
            onClick={() => {
              setSelectedStatus("All");
              setSearchQuery("");
            }}
            className="text-violet hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* RESEARCHER PLACEHOLDER CARDS GRID */}
      <motion.div
        layout
        className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filteredSlots.map((slot, idx) => (
            <ResearcherCard
              key={slot.id}
              slot={slot}
              index={idx}
            />
          ))}

          {/* Interactive "Propose a New Fellowship" Slot Card */}
          <motion.article
            layout
            initial={{ opacity: 0, y: 32, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: false, amount: 0.15 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, delay: (filteredSlots.length % 3) * 0.08 }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border-2 border-dashed border-violet/30 bg-violet/[0.02] p-6 backdrop-blur-md transition-all duration-300 hover:border-violet hover:bg-violet/[0.05] hover:shadow-xl hover:shadow-violet/10 sm:p-7"
          >
            <div>
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-dashed border-violet/30 bg-gradient-to-br from-violet/5 via-white to-violet/10 flex flex-col items-center justify-center p-6 text-center">
                <div className="grid h-16 w-16 place-items-center rounded-2xl bg-violet/10 text-violet transition-transform group-hover:scale-110">
                  <Award className="h-8 w-8" />
                </div>
                <h4 className="mt-4 font-mono text-xs font-bold uppercase tracking-wider text-violet">
                  Custom Fellowship Slot
                </h4>
                <p className="mt-1 text-[11px] text-plum/50">
                  Postdoctoral, Visiting Scholar, or Independent Lab Grant
                </p>
              </div>

              <div className="pt-5">
                <h3 className="text-xl font-bold text-plum group-hover:text-violet transition-colors">
                  Propose a Special Chair
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-plum/70">
                  Do you lead an unconventional research inquiry in applied mathematics,
                  edge compilers, or decentralized cryptography? Propose an endowed fellowship slot.
                </p>
              </div>
            </div>

            <div className="mt-6 border-t border-violet/15 pt-4">
              <a
                href="#collaborate"
                className="btn-fill flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold shadow-xs"
              >
                <span>Propose Fellowship</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </motion.article>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
