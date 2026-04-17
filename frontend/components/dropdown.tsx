"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface SearchSelectProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  name?: string;
  showSearch?: boolean;
}

export default function SearchSelect({
  options,
  value,
  onChange,
  placeholder = "Select...",
  searchPlaceholder = "Search...",
  name,
  showSearch = true,
}: SearchSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const selectedRef = useRef<HTMLLIElement>(null);

  const filtered = showSearch
    ? options.filter((o) => o.toLowerCase().includes(search.toLowerCase()))
    : options;

  const handleOpen = useCallback(() => {
    setMounted(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setOpen(true));
    });
    setSearch("");
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setTimeout(() => setMounted(false), 150);
    setSearch("");
  }, []);

  const toggle = () => (mounted ? handleClose() : handleOpen());

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        handleClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [handleClose]);

  useEffect(() => {
    if (open && showSearch) {
      setTimeout(() => searchRef.current?.focus(), 60);
    }
  }, [open, showSearch]);

  useEffect(() => {
    if (open && selectedRef.current) {
      setTimeout(() =>
        selectedRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" }),
        80
      );
    }
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mounted) handleClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [mounted, handleClose]);

  return (
    <>
      <style>{`
        @keyframes ss-in {
          from { opacity: 0; transform: translateY(-6px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0px)  scale(1);    }
        }
        @keyframes ss-out {
          from { opacity: 1; transform: translateY(0px)  scale(1);    }
          to   { opacity: 0; transform: translateY(-6px) scale(0.97); }
        }
        .ss-enter { animation: ss-in  0.15s cubic-bezier(0.16, 1, 0.3, 1) forwards; transform-origin: top center; }
        .ss-exit  { animation: ss-out 0.12s cubic-bezier(0.4, 0, 1, 1)    forwards; transform-origin: top center; }
        .ss-scroll::-webkit-scrollbar { width: 4px; }
        .ss-scroll::-webkit-scrollbar-track { background: transparent; }
        .ss-scroll::-webkit-scrollbar-thumb { background: hsl(var(--border)); border-radius: 9999px; }
        .ss-scroll { scrollbar-width: thin; scrollbar-color: hsl(var(--border)) transparent; }
        /* hard-clamp ALL svgs inside the search bar row */
        .ss-search-row svg { width: 14px !important; height: 14px !important; max-width: 14px !important; max-height: 14px !important; flex-shrink: 0; }
        .ss-chevron svg  { width: 16px !important; height: 16px !important; max-width: 16px !important; max-height: 16px !important; }
        .ss-check svg    { width: 14px !important; height: 14px !important; max-width: 14px !important; max-height: 14px !important; }
      `}</style>

      <div ref={containerRef} className="relative w-full">
        {name && <input type="hidden" name={name} value={value} />}

        {/* Trigger */}
        <button
          type="button"
          onClick={toggle}
          className={`
            w-full h-12 px-4 rounded-xl border bg-background text-base
            flex items-center justify-between text-left
            outline-none transition-[border-color,box-shadow] duration-150
            ${mounted
              ? " ring-ring ring-offset-0"
              : "border-border hover:border-border/80"
            }
          `}
        >
          <span className={value ? "text-foreground" : "text-muted-foreground"}>
            {value || placeholder}
          </span>
          {/* Chevron — explicit size attrs */}
          <span className="ss-chevron flex items-center justify-center" style={{ width: 16, height: 16, flexShrink: 0 }}>
            <svg
              width="16" height="16"
              style={{
                transform: open ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s cubic-bezier(0.16,1,0.3,1)",
                color: "hsl(var(--muted-foreground))",
              }}
              viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </button>

        {/* Dropdown */}
        {mounted && (
          <div
            className={`
              absolute z-50 mt-1.5 w-full
              rounded-xl border border-border bg-background
              shadow-[0_8px_30px_rgba(0,0,0,0.25)]
              overflow-hidden will-change-transform
              ${open ? "ss-enter" : "ss-exit"}
            `}
          >
            {/* Search bar */}
            {showSearch && (
              <div className="ss-search-row flex items-center gap-2 px-3 py-2.5">
                {/* Explicit width/height on svg AND its container */}
                <span style={{ width: 14, height: 14, flexShrink: 0, display: "flex", alignItems: "center", color: "hsl(var(--muted-foreground))" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </span>
                <input
                  ref={searchRef}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="flex-1 min-w-0 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    style={{ width: 14, height: 14, flexShrink: 0, display: "flex", alignItems: "center", color: "hsl(var(--muted-foreground))" }}
                    className="hover:text-foreground transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                )}
              </div>
            )}

            {/* Options */}
            <ul className="ss-scroll overflow-y-auto py-1" style={{ maxHeight: 200 }}>
              {filtered.length === 0 ? (
                <li className="px-4 py-3 text-sm text-muted-foreground text-center">
                  No results found.
                </li>
              ) : (
                filtered.map((option) => {
                  const selected = value === option;
                  return (
                    <li
                      key={option}
                      ref={selected ? selectedRef : undefined}
                      onClick={() => { onChange(option); handleClose(); }}
                      className={`
                        flex items-center justify-between
                        px-4 py-2.5 text-sm cursor-pointer select-none
                        transition-colors duration-75
                        ${selected
                          ? "text-primary font-medium bg-primary/[0.08]"
                          : "text-foreground hover:bg-accent hover:text-accent-foreground"
                        }
                      `}
                    >
                      <span>{option}</span>
                      {selected && (
                        <span className="ss-check" style={{ width: 14, height: 14, flexShrink: 0, display: "flex", alignItems: "center", color: "hsl(var(--primary))" }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                      )}
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}