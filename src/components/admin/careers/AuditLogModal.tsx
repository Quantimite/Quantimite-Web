"use client";

import React from "react";
import { X, ShieldAlert, Clock, User, CheckCircle2 } from "lucide-react";
import { AuditLogEntry } from "@/types/careers";

interface Props {
  logs: AuditLogEntry[];
  isOpen: boolean;
  onClose: () => void;
}

export default function AuditLogModal({ logs, isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal max-w-2xl max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between border-b border-plum/10 pb-4">
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-violet" />
            <div>
              <h3 className="text-base font-bold text-plum">Security & Compliance Audit Trail</h3>
              <p className="text-xs text-plum/50">Immutable log of recruitment actions and status transitions.</p>
            </div>
          </div>

          <button onClick={onClose} className="text-plum/50 hover:text-plum cursor-pointer">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 py-4 space-y-2.5 pr-1">
          {logs.map((log) => (
            <div
              key={log.id}
              className="rounded-xl border border-plum/10 bg-mist/30 p-3 text-xs flex items-start justify-between gap-4"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] font-bold text-violet bg-violet/10 px-1.5 py-0.5 rounded">
                    {log.action}
                  </span>
                  <span className="font-bold text-plum">{log.actor}</span>
                </div>
                <p className="text-plum/80 text-[11px] pt-1">{log.details}</p>
              </div>

              <div className="text-right shrink-0 font-mono text-[10px] text-plum/50">
                <span>{new Date(log.timestamp).toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-plum/10 pt-3 flex justify-end">
          <button onClick={onClose} className="btn-outline rounded-full px-5 py-1.5 text-xs">
            Close Audit Log
          </button>
        </div>
      </div>
    </div>
  );
}
