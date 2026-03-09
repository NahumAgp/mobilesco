export default function ProductModuleMockup() {
  const familias = ["Sillas", "Mesas", "Bancas", "Pizarrones"];
  const modelos = ["Silla Escolar", "Silla ISO", "Silla Stack"];
  const niveles = ["Preescolar", "Primaria", "Secundaria", "Profesional"];
  const materiales = ["Formaica", "Natural", "Polipropileno", "Concha", "Tela", "Vinil"];
  const unidadesCompra = ["Tramo 6 m", "Pieza", "Kg", "Lata", "Caja"];
  const unidadesConsumo = ["m", "pieza", "kg", "ml", "min"];

  const precios = [
    { tipo: "Distribuidor", valor: "$354.34" },
    { tipo: "Mayoreo", valor: "$405.68" },
    { tipo: "Menudeo", valor: "$379.14" },
  ];

  const insumos = [
    {
      codigo: "TUB-001",
      nombre: "Tubo redondo 1 pulgada",
      compra: "1 tramo = 6 m",
      consumo: "3.50 m",
      costoCompra: "$420.00",
      costoUnitario: "$70.00 / m",
      costoConsumido: "$245.00",
    },
    {
      codigo: "FOR-001",
      nombre: "Cubierta formaica escolar",
      compra: "1 pieza",
      consumo: "1 pieza",
      costoCompra: "$82.00",
      costoUnitario: "$82.00 / pieza",
      costoConsumido: "$82.00",
    },
    {
      codigo: "TOR-001",
      nombre: "Tornillería escolar",
      compra: "1 caja",
      consumo: "0.08 caja",
      costoCompra: "$150.00",
      costoUnitario: "$12.00 / set",
      costoConsumido: "$12.00",
    },
    {
      codigo: "PIN-001",
      nombre: "Pintura electrostática",
      compra: "1 kg",
      consumo: "0.18 kg",
      costoCompra: "$95.00",
      costoUnitario: "$95.00 / kg",
      costoConsumido: "$17.10",
    },
  ];

  const costosIndirectos = [
    {
      concepto: "Mano de obra",
      tarifa: "$4.50 / min",
      tiempo: "22 min",
      total: "$99.00",
    },
    {
      concepto: "Energía / proceso",
      tarifa: "$0.95 / min",
      tiempo: "22 min",
      total: "$20.90",
    },
    {
      concepto: "Empaque",
      tarifa: "$8.00 fijo",
      tiempo: "-",
      total: "$8.00",
    },
  ];

  const resumen = {
    materiales: "$356.10",
    indirectos: "$127.90",
    costoTotal: "$484.00",
    sugeridoDistribuidor: "$620.00",
    sugeridoMayoreo: "$670.00",
    sugeridoMenudeo: "$720.00",
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Mockup · Módulo de Productos ERP</p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">Alta y costeo de producto</h1>
              <p className="mt-2 max-w-3xl text-sm text-slate-600">
                Propuesta para capturar catálogo comercial, variantes, insumos, doble unidad de medida y costos indirectos.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm md:w-[360px]">
              <button className="rounded-2xl border border-slate-200 px-4 py-3 font-medium text-slate-700 shadow-sm hover:bg-slate-50">
                Guardar borrador
              </button>
              <button className="rounded-2xl bg-slate-900 px-4 py-3 font-medium text-white shadow-sm hover:opacity-95">
                Guardar producto
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.3fr,0.7fr]">
          <div className="space-y-6">
            <section className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">1. Datos comerciales</h2>
                  <p className="text-sm text-slate-500">Lo que el usuario ve y cotiza</p>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  Variante vendible
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Field label="Familia" value="Sillas" options={familias} />
                <Field label="Modelo base" value="Silla Escolar" options={modelos} />
                <Input label="Código / SKU" value="SF01" />
                <Input label="Nombre comercial" value="SILLA MOD. PREESCOLAR EN FORMAICA" />
                <Field label="Nivel" value="Preescolar" options={niveles} />
                <Field label="Material principal" value="Formaica" options={materiales} />
                <Input label="Descripción corta" value="Silla escolar preescolar con asiento y respaldo en formaica" full />
                <ToggleGroup />
              </div>
            </section>

            <section className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">2. Listas de precio</h2>
                  <p className="text-sm text-slate-500">Precios comerciales por lista</p>
                </div>
                <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
                  Historial recomendado
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {precios.map((item) => (
                  <div key={item.tipo} className="rounded-2xl border border-slate-200 p-4">
                    <p className="text-sm text-slate-500">{item.tipo}</p>
                    <p className="mt-2 text-2xl font-bold text-slate-900">{item.valor}</p>
                    <p className="mt-1 text-xs text-slate-500">Manual o calculado desde costo protegido</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">3. Insumos y consumo</h2>
                  <p className="text-sm text-slate-500">Cada insumo puede tener unidad de compra y unidad de consumo</p>
                </div>
                <button className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  + Agregar insumo
                </button>
              </div>

              <div className="overflow-hidden rounded-2xl border border-slate-200">
                <div className="grid grid-cols-7 gap-0 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <div>Insumo</div>
                  <div>Compra</div>
                  <div>Consumo</div>
                  <div>Costo compra</div>
                  <div>Costo unitario</div>
                  <div>Costo consumido</div>
                  <div></div>
                </div>
                {insumos.map((item) => (
                  <div key={item.codigo} className="grid grid-cols-7 items-center gap-0 border-t border-slate-200 px-4 py-4 text-sm">
                    <div>
                      <p className="font-semibold text-slate-900">{item.codigo}</p>
                      <p className="text-slate-600">{item.nombre}</p>
                    </div>
                    <div className="text-slate-700">{item.compra}</div>
                    <div className="text-slate-700">{item.consumo}</div>
                    <div className="text-slate-700">{item.costoCompra}</div>
                    <div className="text-slate-700">{item.costoUnitario}</div>
                    <div className="font-semibold text-slate-900">{item.costoConsumido}</div>
                    <div className="text-right">
                      <button className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50">
                        Editar
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-2xl bg-amber-50 p-4 text-sm text-amber-900">
                Ejemplo de lógica: compras tubo por <strong>tramo de 6 m</strong>, pero consumes <strong>3.50 m</strong> en esta variante.
                El sistema convierte el costo de compra a costo por metro para calcular el costo real consumido.
              </div>
            </section>

            <section className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">4. Costos indirectos</h2>
                  <p className="text-sm text-slate-500">Costos por tiempo de fabricación y cargos fijos</p>
                </div>
                <button className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  + Agregar costo indirecto
                </button>
              </div>

              <div className="overflow-hidden rounded-2xl border border-slate-200">
                <div className="grid grid-cols-4 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <div>Concepto</div>
                  <div>Tarifa</div>
                  <div>Tiempo / base</div>
                  <div>Total</div>
                </div>
                {costosIndirectos.map((item) => (
                  <div key={item.concepto} className="grid grid-cols-4 border-t border-slate-200 px-4 py-4 text-sm">
                    <div className="font-medium text-slate-900">{item.concepto}</div>
                    <div className="text-slate-700">{item.tarifa}</div>
                    <div className="text-slate-700">{item.tiempo}</div>
                    <div className="font-semibold text-slate-900">{item.total}</div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <section className="rounded-3xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Vista previa del producto</h2>
              <div className="mt-4 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-4">
                <div className="flex h-56 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-sm">
                  Imagen principal
                </div>
                <div className="mt-4 space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">SKU</p>
                  <p className="text-lg font-bold text-slate-900">SF01</p>
                  <p className="text-base text-slate-700">SILLA MOD. PREESCOLAR EN FORMAICA</p>
                  <p className="text-sm text-slate-500">Familia: Sillas · Modelo: Silla Escolar</p>
                </div>
              </div>
            </section>

            <section className="rounded-3xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Resumen de costeo</h2>
              <div className="mt-4 space-y-3">
                <SummaryRow label="Materiales" value={resumen.materiales} />
                <SummaryRow label="Indirectos" value={resumen.indirectos} />
                <SummaryRow label="Costo total" value={resumen.costoTotal} strong />
              </div>
              <div className="my-4 h-px bg-slate-200" />
              <div className="space-y-3">
                <SummaryRow label="Sugerido distribuidor" value={resumen.sugeridoDistribuidor} />
                <SummaryRow label="Sugerido mayoreo" value={resumen.sugeridoMayoreo} />
                <SummaryRow label="Sugerido menudeo" value={resumen.sugeridoMenudeo} />
              </div>
            </section>

            <section className="rounded-3xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Patrones sugeridos del nombre</h2>
              <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
                <p><strong>Plantilla propuesta:</strong> {"{Tipo}"} MOD. {"{Nivel}"} {"{Complemento}"} EN {"{Material}"}</p>
                <p className="mt-2"><strong>Ejemplo normalizado:</strong> SILLA MOD. PREESCOLAR EN FORMAICA</p>
                <p className="mt-2"><strong>Clave sugerida:</strong> familia + modelo + nivel + material + extras</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, options = [] }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <div className="rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <span>{value}</span>
          <span className="text-slate-400">▾</span>
        </div>
      </div>
      {options.length > 0 && (
        <p className="text-xs text-slate-500">Opciones: {options.join(", ")}</p>
      )}
    </div>
  );
}

function Input({ label, value, full = false }) {
  return (
    <div className={full ? "space-y-2 md:col-span-2" : "space-y-2"}>
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <div className="rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 shadow-sm">
        {value}
      </div>
    </div>
  );
}

function ToggleGroup() {
  return (
    <div className="space-y-2 md:col-span-2">
      <label className="text-sm font-medium text-slate-700">Opciones de la variante</label>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          ["Con coderas", false],
          ["Con paleta", false],
          ["Maneja color", true],
          ["Activo", true],
        ].map(([label, enabled]) => (
          <div key={label} className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-sm shadow-sm">
            <span>{label}</span>
            <span className={enabled ? "rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700" : "rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-500"}>
              {enabled ? "Sí" : "No"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SummaryRow({ label, value, strong = false }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className={strong ? "font-semibold text-slate-900" : "text-slate-600"}>{label}</span>
      <span className={strong ? "text-lg font-bold text-slate-900" : "font-semibold text-slate-900"}>{value}</span>
    </div>
  );
}
