const InfoModalidadApp = ({ info }) => {
  return (
    <div className="flex flex-col items-center gap-3 text-center sm:items-start sm:text-left">
      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.45em] text-sky-200/80">
        {info.badge}
      </span>
      <h2 className="text-3xl font-semibold text-white sm:text-4xl">
        {info.titulo}
      </h2>
      {info.descripcion ? (
        <p className="max-w-3xl text-balance text-sm text-slate-300 sm:text-base">
          {info.descripcion}
        </p>
      ) : null}
    </div>
  );
};

export default InfoModalidadApp;
