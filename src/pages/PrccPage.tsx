import { useState, memo } from 'react';
import { useForenseStore, type PRCC } from '../store/forenseStore';
import { ClipboardList, FileText, Fingerprint } from 'lucide-react';

const initialPRCC: PRCC = {
  expediente: '', prcc: '', despachoInstruye: '', organismoInstruye: '', despachoInicia: '', organismoInicia: '',
  direccion: '', fechaHora: '', formaObtencion: '',
  fijacion: { nombre: '', ci: '' }, coleccion: { nombre: '', ci: '' }, 
  descripcion: '', motivoTransferencia: '',
  entrega: { nombre: '', organismo: '', despacho: '', ci: '' }, recibe: { nombre: '', organismo: '', despacho: '', ci: '' }, observaciones: ''
};

const FormCard = memo(({ title, icon, children }: any) => (
  <div className="forensic-card mb-6">
    <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-5">
      <h2 className="text-sm font-bold text-[#0a1122] flex items-center gap-2 uppercase tracking-wide">
        <span className="text-amber-500">{icon}</span> {title}
      </h2>
    </div>
    {children}
  </div>
));

const InputField = memo(({ label, value, onChange, placeholder, className = '' }: any) => (
  <div className={className}>
    <label className="block text-[11px] font-bold tracking-wider uppercase text-slate-500 mb-1.5">{label}</label>
    <input 
      className="forensic-input"
      value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)}
    />
  </div>
));

const TextareaField = memo(({ label, value, onChange, placeholder, className = '' }: any) => (
  <div className={className}>
    <label className="block text-[11px] font-bold tracking-wider uppercase text-slate-500 mb-1.5">{label}</label>
    <textarea 
      className="w-full text-sm bg-slate-50 border border-slate-200 rounded-md py-2.5 px-3 focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 hover:border-slate-300 outline-none h-24 resize-none transition-all text-slate-800"
      value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)}
    />
  </div>
));

export default function PrccPage() {
  const { prccActual: storePrcc, setPRCC } = useForenseStore();
  
  const [prcc, setPrcCLocal] = useState<PRCC>(storePrcc || initialPRCC);

  const handleGuardarImprimir = () => {
    setPRCC(prcc);
    setTimeout(() => window.print(), 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between print:hidden mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0a1122]">Planilla de Registro de Cadena de Custodia (PRCC)</h1>
          <p className="text-slate-500 mt-1">
            Complete los campos a continuación para generar el documento oficial bajo el marco procesal penal.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <FormCard title="I. Datos Generales" icon={<ClipboardList size={16} />}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <InputField label="N° de Expediente / Causa" placeholder="Ej: MP-2024-12345" value={prcc.expediente} onChange={(v: string) => setPrcCLocal({...prcc, expediente: v})} />
              <InputField label="N° PRCC" placeholder="Ej: PRCC-001" value={prcc.prcc} onChange={(v: string) => setPrcCLocal({...prcc, prcc: v})} />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <InputField label="Despacho Instruye" placeholder="Ej: Fiscalía 1ra" value={prcc.despachoInstruye} onChange={(v: string) => setPrcCLocal({...prcc, despachoInstruye: v})} />
              <InputField label="Organismo Instruye" placeholder="Ej: Ministerio Público" value={prcc.organismoInstruye} onChange={(v: string) => setPrcCLocal({...prcc, organismoInstruye: v})} />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <InputField label="Despacho Inicia Custodia" placeholder="Ej: Lab. Informática" value={prcc.despachoInicia} onChange={(v: string) => setPrcCLocal({...prcc, despachoInicia: v})} />
              <InputField label="Organismo Inicia Custodia" placeholder="Ej: CICPC" value={prcc.organismoInicia} onChange={(v: string) => setPrcCLocal({...prcc, organismoInicia: v})} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <InputField label="Dirección Obtención" placeholder="Ej: Laboratorio Central" value={prcc.direccion} onChange={(v: string) => setPrcCLocal({...prcc, direccion: v})} />
              <InputField label="Fecha y Hora" placeholder="DD/MM/AAAA HH:MM" value={prcc.fechaHora} onChange={(v: string) => setPrcCLocal({...prcc, fechaHora: v})} />
            </div>
          </FormCard>

          <FormCard title="II-IV. Forma y Operario (ISO/IEC 27037:2012)" icon={<FileText size={16} />}>
            <InputField label="Forma de Obtención" placeholder="Ej: Obtención por Consignación" value={prcc.formaObtencion} onChange={(v: string) => setPrcCLocal({...prcc, formaObtencion: v})} className="mb-4" />
            <div className="grid grid-cols-2 gap-4 mb-4">
              <InputField label="Fijación: Nombre" placeholder="Ej: Funcionario Receptor" value={prcc.fijacion.nombre} onChange={(v: string) => setPrcCLocal({...prcc, fijacion: {...prcc.fijacion, nombre: v}})} />
              <InputField label="Fijación: CI/Cred" placeholder="Ej: V-12345678" value={prcc.fijacion.ci} onChange={(v: string) => setPrcCLocal({...prcc, fijacion: {...prcc.fijacion, ci: v}})} />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <InputField label="Colección: Nombre" placeholder="Ej: Funcionario Receptor" value={prcc.coleccion.nombre} onChange={(v: string) => setPrcCLocal({...prcc, coleccion: {...prcc.coleccion, nombre: v}})} />
              <InputField label="Colección: CI/Cred" placeholder="Ej: V-12345678" value={prcc.coleccion.ci} onChange={(v: string) => setPrcCLocal({...prcc, coleccion: {...prcc.coleccion, ci: v}})} />
            </div>
            <TextareaField label="Descripción de la Evidencia (Empaque/Rotulado)" placeholder="Ej: Dispositivo móvil Android, color negro..." value={prcc.descripcion} onChange={(v: string) => setPrcCLocal({...prcc, descripcion: v})} />
          </FormCard>
        </div>

        <div className="space-y-6">
          <FormCard title="V. Actividad de Transferencia" icon={<Fingerprint size={16} />}>
            <InputField label="Motivo (Resguardo/Peritaje/Traslado)" placeholder="Ej: 1. Traslado para Peritaje" value={prcc.motivoTransferencia} onChange={(v: string) => setPrcCLocal({...prcc, motivoTransferencia: v})} className="mb-4" />
            
            <h3 className="text-xs font-bold text-slate-500 uppercase mb-2">Entrega</h3>
            <div className="grid grid-cols-2 gap-4 mb-2">
              <InputField label="Nombre y Apellido" placeholder="Ej: Funcionario Receptor" value={prcc.entrega.nombre} onChange={(v: string) => setPrcCLocal({...prcc, entrega: {...prcc.entrega, nombre: v}})} />
              <InputField label="C.I / Cred" placeholder="Ej: V-12345678" value={prcc.entrega.ci} onChange={(v: string) => setPrcCLocal({...prcc, entrega: {...prcc.entrega, ci: v}})} />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <InputField label="Organismo" placeholder="Ej: CICPC" value={prcc.entrega.organismo} onChange={(v: string) => setPrcCLocal({...prcc, entrega: {...prcc.entrega, organismo: v}})} />
              <InputField label="Despacho" placeholder="Ej: Sala de Evidencias" value={prcc.entrega.despacho} onChange={(v: string) => setPrcCLocal({...prcc, entrega: {...prcc.entrega, despacho: v}})} />
            </div>
            
            <h3 className="text-xs font-bold text-slate-500 uppercase mb-2 border-t border-slate-200 pt-4">Recibe</h3>
            <div className="grid grid-cols-2 gap-4 mb-2">
              <InputField label="Nombre y Apellido" placeholder="Ej: Ing. Perito Forense" value={prcc.recibe.nombre} onChange={(v: string) => setPrcCLocal({...prcc, recibe: {...prcc.recibe, nombre: v}})} />
              <InputField label="C.I / Cred" placeholder="Ej: V-87654321" value={prcc.recibe.ci} onChange={(v: string) => setPrcCLocal({...prcc, recibe: {...prcc.recibe, ci: v}})} />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <InputField label="Organismo" placeholder="Ej: CICPC" value={prcc.recibe.organismo} onChange={(v: string) => setPrcCLocal({...prcc, recibe: {...prcc.recibe, organismo: v}})} />
              <InputField label="Despacho" placeholder="Ej: Lab. Informática" value={prcc.recibe.despacho} onChange={(v: string) => setPrcCLocal({...prcc, recibe: {...prcc.recibe, despacho: v}})} />
            </div>

            <TextareaField label="Observaciones (Ej. Integridad de los precintos)" placeholder="Ej: Evidencia ingresa correctamente embalada..." value={prcc.observaciones} onChange={(v: string) => setPrcCLocal({...prcc, observaciones: v})} />
          </FormCard>

          <div className="mt-6 flex justify-end print:hidden">
            <button
              onClick={handleGuardarImprimir}
              className="forensic-btn forensic-btn-primary flex items-center"
              disabled={!prcc.expediente || !prcc.prcc}
            >
              <FileText className="w-4 h-4 mr-2" />
              Generar e Imprimir Planilla PRCC
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
