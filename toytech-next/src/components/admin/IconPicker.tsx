"use client";

import React from "react";
import {
  AirVent,
  BatteryCharging,
  Bike,
  Box,
  Brush,
  Cog,
  Droplets,
  Gauge,
  ShieldCheck,
  Thermometer,
  Wind,
  Zap,
  Wrench,
  Car,
  Settings,
  Search,
  Cpu,
  Fan,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";

const availableIcons: Record<string, LucideIcon> = {
  cog: Cog,
  wrench: Wrench,
  "battery-charging": BatteryCharging,
  zap: Zap,
  wind: Wind,
  brush: Brush,
  bike: Bike,
  "shield-check": ShieldCheck,
  gauge: Gauge,
  thermometer: Thermometer,
  box: Box,
  droplets: Droplets,
  "air-vent": AirVent,
  car: Car,
  settings: Settings,
  search: Search,
  cpu: Cpu,
  fan: Fan,
  stethoscope: Stethoscope,
};

interface IconPickerProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
}

export function IconPicker({ value, onChange, label }: IconPickerProps) {
  return (
    <div className="space-y-3">
      <span className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
        {label}
      </span>
      <div className="grid grid-cols-5 gap-2 rounded-2xl border border-zinc-800 bg-zinc-950 p-3 sm:grid-cols-7 lg:grid-cols-10">
        {Object.entries(availableIcons).map(([key, Icon]) => (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            title={key}
            className={`flex aspect-square items-center justify-center rounded-xl transition-all ${
              value === key
                ? "bg-red-600 text-white shadow-lg shadow-red-600/20"
                : "bg-zinc-900 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300"
            }`}
          >
            <Icon className="h-5 w-5" />
          </button>
        ))}
      </div>
      {value && !availableIcons[value] && (
        <p className="text-xs text-red-400">
          Current icon "{value}" is not in the picker list.
        </p>
      )}
    </div>
  );
}
