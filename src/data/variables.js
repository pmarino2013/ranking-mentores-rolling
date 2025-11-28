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

export {
  moduleLabels,
  typeLabels,
  podiumVariants,
  defaultBadgeClasses,
  defaultContainerClasses,
};
