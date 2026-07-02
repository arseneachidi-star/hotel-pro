import React from "react";
import { LucideIcon } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string;
  sub: string;
  subColor: string;
  icon: LucideIcon;
  trends: number[];
}

export const KpiCard = ({ title, value, sub, subColor, icon: Icon, trends }: KpiCardProps) => {
  return (
    <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-3xs space-y-2 hover:shadow-2xs transition-shadow">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">{title}</span>
        <Icon className="h-4 w-4 text-slate-400" />
      </div>
      
      <div className="flex items-baseline justify-between">
        <div className="space-y-0.5">
          <p className="text-2xl font-black text-slate-900 tracking-tight">{value}</p>
          <p className={`text-[10px] font-bold ${subColor}`}>{sub}</p>
        </div>
        
        <div className="h-8 w-16 flex items-end gap-0.5 opacity-50">
          {trends.map((h, i) => (
            <div 
              key={i} 
              style={{ height: `${h}%` }} 
              className={`w-full rounded-2xs ${subColor.includes("emerald") ? "bg-emerald-500" : "bg-rose-500"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};