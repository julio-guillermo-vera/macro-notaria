import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { FileText, Cloud, UserRound, Settings, Play, CheckCircle2, AlertTriangle, Upload, Download, ShieldCheck, Wifi, MonitorDown } from 'lucide-react';
import './style.css';

const defaultNotaries = [
  {
    id: 1,
    type: 'planta',
    name: 'Ricardo Mauricio Salgado Sepúlveda',
    text: 'ante mí RICARDO MAURICIO SALGADO SEPÚLVEDA, cédula nacional de identidad y rol único tributario número nueve millones setecientos treinta y cinco mil ciento ochenta y cuatro guión ocho, abogado, Notario Público y Conservador de Minas, Titular de Concepción.'
  },
  {
    id: 2,
    type: 'suplente',
    name: 'Notario suplente por definir',
    text: 'ante mí [NOMBRE NOTARIO SUPLENTE], Notario Público Suplente de Concepción.'
  }
];

const processSteps = [
  'Detectar documento activo',
  'Procesar desde el cursor',
  'Eliminar saltos de línea',
  'Convertir números, RUT y fechas',
  'Detectar Unidades de Fomento',
  'Consultar UF actualizada',
  'Aplicar texto del notario activo',
  'Revisar campos pendientes'
];

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notaries, setNotaries] = useState(defaultNotaries);
  const [activeNotary, setActiveNotary] = useState(defaultNotaries[0].id);
  const [logs, setLogs] = useState(['Sistema listo. Esperando documento.']);
  const [ufQuestion, setUfQuestion] = useState(false);
  const selectedNotary = useMemo(() => notaries.find(n => n.id === Number(activeNotary)), [notaries, activeNotary]);

  function runProcess() {
    setLogs([
      'Word detectado.',
      'Cursor localizado: se procesará solo desde ese punto hacia adelante.',
      'Saltos de línea eliminados.',
      'Números convertidos a palabras.',
      'RUT, fechas, UF y pesos revisados.',
      'Texto del notario activo preparado.',
      'Proceso finalizado con observaciones pendientes.'
    ]);
    setUfQuestion(true);
  }

  function updateNotaryText(value) {
    setNotaries(list => list.map(n => n.id === Number(activeNotary) ? { ...n, text: value } : n));
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon"><FileText size={22}/></div>
          <div>
            <strong>Protocolo Cloud</strong>
            <span>Escritorio Notarial</span>
          </div>
        </div>
        <nav>
          <button className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}><Cloud size={18}/> Inicio</button>
          <button className={activeTab === 'process' ? 'active' : ''} onClick={() => setActiveTab('process')}><Play size={18}/> Procesamiento</button>
          <button className={activeTab === 'notaries' ? 'active' : ''} onClick={() => setActiveTab('notaries')}><UserRound size={18}/> Notarios</button>
          <button className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}><Settings size={18}/> Configuración</button>
        </nav>
        <div className="status-card">
          <span><Wifi size={15}/> Conectado</span>
          <span><ShieldCheck size={15}/> Sesión segura</span>
          <span><MonitorDown size={15}/> App Windows pendiente</span>
        </div>
      </aside>

      <main>
        <header className="topbar">
          <div>
            <h1>{activeTab === 'dashboard' ? 'Panel principal' : activeTab === 'process' ? 'Procesamiento documental' : activeTab === 'notaries' ? 'Notarios' : 'Configuración'}</h1>
            <p>Diseño corporativo, simple y preparado para Cloudflare Pages.</p>
          </div>
          <button className="primary" onClick={runProcess}><Play size={16}/> Procesar desde cursor</button>
        </header>

        {activeTab === 'dashboard' && (
          <section className="grid">
            <div className="panel large">
              <div className="panel-title"><FileText/> Documento activo</div>
              <div className="dropzone">
                <Upload size={36}/>
                <h2>Arrastra o selecciona una escritura</h2>
                <p>DOC, DOCX o documento generado por banco. El procesamiento real se conectará con Word desde la app instalada.</p>
                <button className="secondary">Seleccionar archivo</button>
              </div>
            </div>
            <div className="panel">
              <div className="panel-title"><CheckCircle2/> Estado del sistema</div>
              <ul className="clean-list">
                <li>Cloudflare Pages listo</li>
                <li>Interfaz React lista</li>
                <li>Funciones API preparadas</li>
                <li>Motor Word pendiente de app Windows</li>
              </ul>
            </div>
            <div className="panel full">
              <div className="panel-title"><AlertTriangle/> Observaciones</div>
              <div className="alerts">
                <span>Debe instalarse una app local para controlar Word y leer la posición exacta del cursor.</span>
                <span>Cloudflare procesará interfaz, usuarios, configuración, UF e historial.</span>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'process' && (
          <section className="grid">
            <div className="panel large">
              <div className="panel-title"><Play/> Flujo de procesamiento</div>
              <div className="steps">
                {processSteps.map((s, i) => <div key={s} className="step"><b>{String(i+1).padStart(2,'0')}</b><span>{s}</span></div>)}
              </div>
              {ufQuestion && <div className="uf-box"><strong>UF detectada.</strong><p>¿Desea calcular equivalencia en pesos chilenos usando UF actualizada?</p><button className="primary">Sí, calcular</button><button className="secondary">No</button></div>}
            </div>
            <div className="panel">
              <div className="panel-title"><CheckCircle2/> Registro</div>
              <div className="logs">{logs.map((l, i) => <p key={i}>✓ {l}</p>)}</div>
            </div>
          </section>
        )}

        {activeTab === 'notaries' && (
          <section className="grid">
            <div className="panel large">
              <div className="panel-title"><UserRound/> Notario activo del día</div>
              <label>Seleccionar notario</label>
              <select value={activeNotary} onChange={e => setActiveNotary(e.target.value)}>
                {notaries.map(n => <option key={n.id} value={n.id}>{n.name} — {n.type}</option>)}
              </select>
              <label>Texto automático asociado</label>
              <textarea value={selectedNotary?.text || ''} onChange={e => updateNotaryText(e.target.value)} />
              <button className="primary">Guardar texto</button>
            </div>
            <div className="panel">
              <div className="panel-title"><Settings/> Lista</div>
              {notaries.map(n => <div className="notary-row" key={n.id}><b>{n.name}</b><span>{n.type === 'planta' ? 'Notario de planta' : 'Notario suplente'}</span></div>)}
              <button className="secondary full-btn">Agregar notario</button>
            </div>
          </section>
        )}

        {activeTab === 'settings' && (
          <section className="grid">
            <div className="panel large">
              <div className="panel-title"><Settings/> Configuración general</div>
              <div className="settings-grid">
                <label><input type="checkbox" defaultChecked/> Procesar solo desde cursor</label>
                <label><input type="checkbox" defaultChecked/> Preguntar antes de calcular UF</label>
                <label><input type="checkbox" defaultChecked/> Convertir RUT a palabras</label>
                <label><input type="checkbox" defaultChecked/> Detectar campos incompletos</label>
                <label><input type="checkbox"/> Agregar texto final automáticamente</label>
                <label><input type="checkbox" defaultChecked/> Guardar historial del proceso</label>
              </div>
            </div>
            <div className="panel">
              <div className="panel-title"><Download/> Publicación</div>
              <p>Para Cloudflare Pages:</p>
              <code>npm install</code>
              <code>npm run build</code>
              <p>Directorio de salida:</p>
              <code>dist</code>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
