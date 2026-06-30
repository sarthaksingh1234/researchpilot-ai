function EmptyState({ title, description }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900 p-8 text-center">
      <p className="text-slate-300">{title}</p>

      {description && (
        <p className="mt-2 text-sm text-slate-500">{description}</p>
      )}
    </div>
  );
}

export default EmptyState;