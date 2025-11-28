import React from "react";
import logo from "../assets/logo.png";
const HeaderApp = () => {
  return (
    <header className="text-center">
      <div className="flex justify-center my-3">
        <img src={logo} alt="logo" className="w-40 h-10" />
      </div>
      <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/60 px-5 py-2 text-xs font-semibold uppercase tracking-[0.6em] text-sky-300">
        Ranking Mentores
      </p>
      <h1 className="mt-6 text-4xl font-semibold text-white sm:text-5xl">
        Comisiones con más estudiantes activos
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-balance text-base text-slate-300 sm:text-lg">
        Visualizá la permanencia de cada comisión por módulo. Las medallas
        doradas destacan a las mejores tasas de retención sobre el total de
        inscriptos.
      </p>
    </header>
  );
};

export default HeaderApp;
