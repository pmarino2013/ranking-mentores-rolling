import rankingData from "./data/ranking.json";
import MedalIcon from "./components/MedalIcon";
import logo from "./assets/logo.png";

const moduleLabels = {
  1: "Módulo inicial de tecnologías",
  2: "Módulo intermedio de tecnologías",
  3: "Módulo final de tecnologías",
};

const typeLabels = {
  presencial: {
    badge: "Presencial",
    titulo: "Modalidad presencial",
    descripcion:
      "Seguimiento de alumnos que cursan en aulas físicas. Se agrupan por módulo siempre que haya comisiones suficientes.",
  },
  online: {
    badge: "Online",
    titulo: "Modalidad online",
    descripcion:
      "Clases remotas y sincrónicas. Podés comparar la permanencia módulo a módulo en formato virtual.",
  },
};

const formatNumber = (value) => new Intl.NumberFormat("es-AR").format(value);
const formatPercentage = (value) =>
  new Intl.NumberFormat("es-AR", {
    maximumFractionDigits: value >= 99.5 ? 0 : 1,
    minimumFractionDigits: value >= 99.5 ? 0 : 1,
  }).format(value);

const podiumVariants = {
  0: {
    container:
      "border-amber-300/70 bg-amber-400/10 shadow-lg shadow-amber-500/20",
    badge: "bg-amber-300 text-slate-900 shadow-lg shadow-amber-500/40",
  },
  1: {
    container:
      "border-amber-200/60 bg-amber-200/5 shadow-md shadow-amber-300/20",
    badge: "bg-amber-200 text-amber-900 shadow-md shadow-amber-300/30",
  },
  2: {
    container: "border-amber-100/40 bg-amber-100/5 shadow-sm",
    badge: "bg-amber-100 text-amber-900/80 shadow",
  },
};

const defaultContainerClasses =
  "border-white/5 bg-slate-900/70 transition-all duration-300 hover:border-sky-400/60 hover:bg-slate-900";
const defaultBadgeClasses =
  "bg-slate-800 text-slate-200 transition-all duration-300 group-hover:bg-sky-500 group-hover:text-white";

function App() {
  const rankingByType = Object.values(
    rankingData.reduce((acc, item) => {
      const tipo = item.tipo ?? "online";
      if (!acc[tipo]) {
        acc[tipo] = { tipo, comisiones: [] };
      }
      const porcentaje = item.inscriptos
        ? (item.cantidad / item.inscriptos) * 100
        : 0;
      acc[tipo].comisiones.push({ ...item, porcentaje });
      return acc;
    }, {})
  )
    .map(({ tipo, comisiones }) => {
      const baseInfo = typeLabels[tipo] ?? {
        badge: tipo,
        titulo: `Modalidad ${tipo}`,
      };

      const modules = Object.values(
        comisiones.reduce((moduleAcc, item) => {
          const key = item.modulo;
          if (!moduleAcc[key]) {
            moduleAcc[key] = { modulo: key, comisiones: [] };
          }
          moduleAcc[key].comisiones.push(item);
          return moduleAcc;
        }, {})
      )
        .map(({ modulo, comisiones: lista }) => {
          const sorted = [...lista].sort((a, b) => b.porcentaje - a.porcentaje);
          return {
            modulo,
            moduloLabel: `Módulo ${modulo}`,
            titulo: moduleLabels[modulo] ?? `Módulo ${modulo}`,
            orden:
              typeof modulo === "number" ? modulo : Number.POSITIVE_INFINITY,
            comisiones: sorted,
          };
        })
        .sort((a, b) => a.orden - b.orden);

      const shouldGroupAllPresencial =
        tipo === "presencial" && modules.length < 2;

      const info = shouldGroupAllPresencial
        ? {
            ...baseInfo,
            descripcion:
              "Agrupamos todas las comisiones presenciales en un único ranking general porque aún no hay suficientes cohortes por módulo.",
          }
        : baseInfo;

      const finalModules = shouldGroupAllPresencial
        ? [
            {
              modulo: "general-presencial",
              moduloLabel: "General presencial",
              titulo: "Ranking general de comisiones presenciales",
              orden: 0,
              comisiones: [...comisiones].sort(
                (a, b) => b.porcentaje - a.porcentaje
              ),
            },
          ]
        : modules;

      return {
        tipo,
        info,
        modules: finalModules,
        modo: shouldGroupAllPresencial ? "general" : "modules",
      };
    })
    .sort((a, b) => {
      if (a.tipo === b.tipo) return 0;
      if (a.tipo === "presencial") return -1;
      if (b.tipo === "presencial") return 1;
      return a.tipo.localeCompare(b.tipo);
    });

  return (
    <div className="relative min-h-screen bg-slate-950">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.22),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(14,165,233,0.18),_transparent_60%)]" />
      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col gap-12 px-6 pb-16 pt-20 sm:px-10">
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

        <main className="flex flex-col gap-14">
          {rankingByType.map(({ tipo, info, modules, modo }) => (
            <section key={tipo} className="space-y-8">
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

              <div className="grid gap-10">
                {modules.map((bloque) => {
                  const top = bloque.comisiones[0];
                  return (
                    <article
                      key={`${tipo}-${bloque.modulo}`}
                      className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 shadow-[0_40px_120px_-60px_rgba(59,130,246,0.55)] backdrop-blur"
                    >
                      <div className="relative h-1.5 w-full bg-gradient-to-r from-amber-300 via-sky-400 to-indigo-500" />
                      <div className="flex flex-col gap-8 px-8 pb-10 pt-9 sm:px-10">
                        <div className="flex flex-wrap items-center justify-between gap-6">
                          <div>
                            <p className="text-sm uppercase tracking-[0.35em] text-sky-200/70">
                              {bloque.moduloLabel}
                            </p>
                            <h3 className="mt-1 text-3xl font-semibold text-white sm:text-4xl">
                              {bloque.titulo}
                            </h3>
                            {modo === "general" ? (
                              <p className="mt-2 text-xs text-slate-400">
                                Módulos combinados: mostramos la comparativa
                                general.
                              </p>
                            ) : null}
                          </div>
                          <div className="flex items-center gap-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 px-4 py-3 text-slate-900 shadow-lg shadow-amber-500/30">
                            <MedalIcon className="h-14 w-14 drop-shadow-lg" />
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-800/80">
                                1er puesto
                              </p>
                              <p className="text-lg font-semibold">
                                {top.comision}
                              </p>
                              <p className="text-sm font-semibold text-slate-800/80">
                                {formatPercentage(top.porcentaje)}% de
                                permanencia
                              </p>
                              <p className="text-xs font-medium text-slate-700">
                                {formatNumber(top.cantidad)} activos de{" "}
                                {formatNumber(top.inscriptos)} inscriptos
                              </p>
                              {modo === "general" ? (
                                <p className="text-xs font-medium text-slate-600">
                                  Módulo {top.modulo}
                                </p>
                              ) : null}
                            </div>
                          </div>
                        </div>

                        <ul className="flex flex-col gap-4">
                          {bloque.comisiones.map((item, index) => {
                            const podium = podiumVariants[index];
                            const containerClasses =
                              podium?.container ?? defaultContainerClasses;
                            const badgeClasses =
                              podium?.badge ?? defaultBadgeClasses;
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
                                      {formatNumber(item.cantidad)} /
                                      {formatNumber(item.inscriptos)} alumnos
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
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </main>

        <footer className="pb-6 text-center text-xs text-slate-500">
          Datos actualizados automáticamente desde{" "}
          <code className="text-sky-300">ranking.json</code>
        </footer>
      </div>
    </div>
  );
}

export default App;
