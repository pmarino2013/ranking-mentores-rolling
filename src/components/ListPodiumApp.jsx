import React from "react";
import { formatNumber, formatPercentage } from "../helpers/functions";
import {
  podiumVariants,
  defaultBadgeClasses,
  defaultContainerClasses,
} from "../data/variables";

const ListPodiumApp = ({ bloque }) => {
  return (
    <ul className="flex flex-col gap-4">
      {bloque.comisiones.map((item, index) => {
        const podium = podiumVariants[index];
        const containerClasses = podium?.container ?? defaultContainerClasses;
        const badgeClasses = podium?.badge ?? defaultBadgeClasses;
        return (
          <li
            key={item.id}
            className={`group flex items-center justify-between gap-4 rounded-2xl border px-5 py-4 ${containerClasses}`}
          >
            <div className="flex items-center gap-4">
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-full text-lg font-semibold ${badgeClasses}`}
              >
                #{index + 1}
              </span>
              <div>
                <p className="text-lg font-semibold text-white">
                  {item.comision}
                </p>
                <p className="text-sm text-slate-400">
                  {formatNumber(item.cantidad)} /{formatNumber(item.inscriptos)}{" "}
                  alumnos
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-semibold text-white">
                {formatPercentage(item.porcentaje)}%
              </p>
              <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
                retención
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ListPodiumApp;
