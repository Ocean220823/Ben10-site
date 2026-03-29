import { Suspense } from 'react';
import OmnitrixVariantCanvas from '../components/3d/OmnitrixVariantCanvas';

const variants = [
  { id: 'OMN-01', name: 'Prototype Omnitrix', desc: 'The original device discovered by Ben, built by Azmuth.Stores DNA of multiple alien species for transformation.', modelPath: '/Omnitrix models/ClassicOmnitrix.glb' },
  { id: 'OMN-02', name: 'Recalibrated Omnitrix', desc: 'An upgraded version with improved interface and stability.Provides faster access and better control over transformations.', modelPath: '/Omnitrix models/RecalibratedOmnitrix.glb' },
  { id: 'OMN-03', name: 'Ultimatrix', desc: 'A modified Omnitrix capable of evolving aliens into ultimate forms.Trades safety for power, making transformations more aggressive.', modelPath: '/Omnitrix models/Ultimatrix.glb' },
  { id: 'OMN-04', name: 'Complete Omnitrix', desc: 'The final perfected version created by Azmuth.Offers maximum accuracy, stability, and full control over alien DNA.', modelPath: '/Omnitrix models/OmniverseOmnitrix.glb' }
];

const OmnitrixVariants = () => {
  return (
    <div className="min-h-screen p-8 max-w-7xl mx-auto">
      <header className="mb-12 flex justify-between items-end border-b border-outline-variant/30 pb-4">
        <div>
          <h1 className="text-4xl font-display font-bold text-on-surface uppercase tracking-widest">
            Hardware <span className="text-primary">Archive</span>
          </h1>
          <p className="text-on-surface-variant font-display text-sm mt-2 tracking-widest uppercase">Classified Azmuth Tech Data</p>
        </div>
        <div className="text-right hidden sm:block">
          <span className="font-display text-xs text-primary bg-primary/10 px-3 py-1 border border-primary/30 rounded-sm">SECURE CONNECTION</span>
        </div>
      </header>

      <div className="space-y-8">
        {variants.map((v) => (
          <div key={v.id} className="glass-panel p-1 rounded-sm flex flex-col md:flex-row group hover:border-primary/50 transition-colors duration-500">
            <div className="w-full md:w-1/3 aspect-video md:aspect-auto bg-surface-container-highest border-r border-outline-variant/20 flex items-center justify-center relative overflow-hidden min-h-[250px]">
               {/* Decorative scanline per image box */}
               <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,255,0,0.05)_51%)] bg-[length:100%_4px] pointer-events-none z-10"></div>
               <Suspense fallback={<span className="font-display text-on-surface-variant text-sm tracking-widest relative z-10">LOADING 3D DATA...</span>}>
                 <OmnitrixVariantCanvas modelPath={v.modelPath} />
               </Suspense>
            </div>
            
            <div className="p-8 flex flex-col justify-center flex-1 space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-xs font-display text-surface-background bg-primary px-2 py-0.5 rounded-sm font-bold">{v.id}</span>
                <h2 className="text-2xl font-display font-bold text-on-surface group-hover:text-primary transition-colors">{v.name}</h2>
              </div>
              <p className="text-on-surface-variant max-w-2xl leading-relaxed text-sm lg:text-base">
                {v.desc}
              </p>
              
              <div className="pt-4 flex gap-4">
                <button className="px-4 py-2 border border-primary/30 text-primary font-display text-xs uppercase tracking-widest hover:bg-primary/10 transition-colors rounded-sm">
                  View Schematics
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OmnitrixVariants;
