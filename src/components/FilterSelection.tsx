import React from "react";

export type ArtFilterState = {
  category: string;
  availability: string;
  material: string;
  price: string;
};

type Counts = {
  category: Record<string, number>;
  availability: Record<string, number>;
  material: Record<string, number>;
  price: Record<string, number>;
};

type FilterOption = {
  label: string;
  value: string;
  count: number;
};

type FilterSectionProps = {
  title: string;
  options: FilterOption[];
  selected: string;
  onChange: (value: string) => void;
};

type ArtFiltersProps = {
  filters: ArtFilterState;
  onChange: (filters: ArtFilterState) => void;
  onReset: () => void;
  canReset: boolean;
  counts: Counts;
};

const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  options,
  selected,
  onChange,
}) => (
  <section className="mb-4">
    <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-800">
      {title}
    </p>

    <div className="space-y-1">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`flex w-full items-center justify-between rounded-sm px-2 py-1 text-sm transition
            ${
              selected === option.value
                ? "bg-slate-100 text-blue-500 font-medium"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
        >
          <span className="capitalize">{option.label}</span>
          <span className="text-xs text-slate-400">{option.count}</span>
        </button>
      ))}
    </div>
  </section>
);

const ArtFilters: React.FC<ArtFiltersProps> = ({
  filters,
  onChange,
  onReset,
  canReset,
  counts,
}) => (
  <aside className=" sticky top-0 h-screen overflow-y-auto p-3">
    <button
      onClick={onReset}
      disabled={!canReset}
      className={`mb-4 w-full rounded-sm px-2 py-1 text-sm
        ${
          canReset
            ? "bg-blue-500 text-white hover:bg-blue-600"
            : "cursor-not-allowed text-slate-300 border"
        }`}
    >
      Reset filters
    </button>

    <FilterSection
      title="Category"
      selected={filters.category}
      onChange={(v) => onChange({ ...filters, category: v })}
      options={[
        { label: "All", value: "all", count: counts.category.all },
        { label: "Paintings", value: "painting", count: counts.category.painting },
        { label: "Drawings", value: "drawing", count: counts.category.drawing },
        { label: "Sculptures", value: "sculpture", count: counts.category.sculpture },
        { label: "Textile", value: "textile", count: counts.category.textile },
        { label: "Jewelry", value: "jewelry", count: counts.category.jewelry },
      ]}
    />

    <FilterSection
      title="Availability"
      selected={filters.availability}
      onChange={(v) => onChange({ ...filters, availability: v })}
      options={[
        { label: "All", value: "all", count: counts.availability.all },
        { label: "Available", value: "available", count: counts.availability.available },
        { label: "Sold", value: "sold", count: counts.availability.sold },
      ]}
    />

    <FilterSection
      title="Material"
      selected={filters.material}
      onChange={(v) => onChange({ ...filters, material: v })}
      options={[
        { label: "All", value: "all", count: counts.material.all },
        {
          label: "Acrylic on canvas",
          value: "acrylic on canvas",
          count: counts.material["acrylic on canvas"],
        },
        {
          label: "Oil on canvas",
          value: "oil on canvas",
          count: counts.material["oil on canvas"],
        },
      ]}
    />

    <FilterSection
      title="Price Range"
      selected={filters.price}
      onChange={(v) => onChange({ ...filters, price: v })}
      options={[
        { label: "All", value: "all", count: counts.price.all },
        { label: "Under $299", value: "under-300", count: counts.price["under-300"] },
        { label: "$300 – $499", value: "300-500", count: counts.price["300-500"] },
        { label: "$500 – $799", value: "500-800", count: counts.price["500-800"] },
        { label: "$800 – $999", value: "800-1000", count: counts.price["800-1000"] },
        { label: "$1000+", value: "1000-plus", count: counts.price["1000-plus"] },
      ]}
    />
  </aside>
);

export default ArtFilters;
