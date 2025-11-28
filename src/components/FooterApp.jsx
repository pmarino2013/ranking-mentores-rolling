import React from "react";

const FooterApp = () => {
  return (
    <footer className="pb-6 text-center text-xs text-slate-500">
      Datos actualizados automáticamente desde{" "}
      <code className="text-sky-300">ranking.json</code>
      <div>
        <code className="text-sky-300">Hecho con 💜 por Pablo Marino</code>
      </div>
    </footer>
  );
};

export default FooterApp;
