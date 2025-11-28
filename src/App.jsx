import rankingData from "./data/ranking.json";

import { moduleLabels, typeLabels } from "./data/variables";
import HeaderApp from "./components/HeaderApp";
import FooterApp from "./components/FooterApp";
import ListPodiumApp from "./components/ListPodiumApp";
import MedalCardApp from "./components/MedalCardApp";
import InfoModalidadApp from "./components/InfoModalidadApp";
// import logo from "./assets/logo.png";

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
        <HeaderApp />

        <main className="flex flex-col gap-14">
          {rankingByType.map(({ tipo, info, modules, modo }) => (
            <section key={tipo} className="space-y-8">
              <InfoModalidadApp info={info} />

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
                          <MedalCardApp top={top} modo={modo} />
                        </div>

                        <ListPodiumApp bloque={bloque} />
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </main>

        <FooterApp />
      </div>
    </div>
  );
}

export default App;
