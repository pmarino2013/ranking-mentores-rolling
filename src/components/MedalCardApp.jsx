import React from "react";
import MedalIcon from "./MedalIcon";
import { formatPercentage, formatNumber } from "../helpers/functions";

const MedalCardApp = ({ top, modo }) => {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 px-4 py-3 text-slate-900 shadow-lg shadow-amber-500/30">
      <MedalIcon className="h-14 w-14 drop-shadow-lg" />
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-800/80">
          1er puesto
        </p>
        <p className="text-lg font-semibold">{top.comision}</p>
        <p className="text-sm font-semibold text-slate-800/80">
          {formatPercentage(top.porcentaje)}% de permanencia
        </p>
        <p className="text-xs font-medium text-slate-700">
          {formatNumber(top.cantidad)} activos de {formatNumber(top.inscriptos)}{" "}
          inscriptos
        </p>
        {modo === "general" ? (
          <p className="text-xs font-medium text-slate-600">
            Módulo {top.modulo}
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default MedalCardApp;
