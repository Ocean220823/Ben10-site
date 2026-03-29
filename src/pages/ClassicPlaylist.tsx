const aliens = [
  { name: 'Heatblast', type: 'Pyronite', desc: 'Masters of fire and heat control.', img: '/AlienImages/HeatBlast.png' },
  { name: 'Wildmutt', type: 'Vulpimancer', desc: 'Animalistic senses and agility.', img: '/AlienImages/Wildmutt.png' },
  { name: 'Diamondhead', type: 'Petrosapien', desc: 'Indestructible crystal constructs.', img: '/AlienImages/Diamondhead.webp' },
  { name: 'XLR8', type: 'Kineceleran', desc: 'Frictionless speed and reflexes.', img: '/AlienImages/xlr8.webp' },
  { name: 'Grey Matter', type: 'Galvan', desc: 'Unmatched intellect and problem solving.', img: '/AlienImages/Greymatter.jpg' },
  { name: 'Fourarms', type: 'Tetramand', desc: 'Raw brute strength and durability.', img: '/AlienImages/FourArms.png' },
  { name: 'Stinkfly', type: 'Lepidopterran', desc: 'Flight and toxic slime projection.', img: '/AlienImages/StinkFly.png' },
  { name: 'Ripjaws', type: 'Piscciss Volann', desc: 'Aquatic dominance and sharp teeth.', img: '/AlienImages/Ripjaws.png' },
  { name: 'Upgrade', type: 'Galvanic Mechamorph', desc: 'Technological merging and enhancement.', img: '/AlienImages/Upgrade.png' },
  { name: 'Ghostfreak', type: 'Ectonurite', desc: 'Intangibility and possession.', img: '/AlienImages/Ghost freak.png' }
];

const ClassicPlaylist = () => {
  return (
    <div className="min-h-screen p-8 max-w-7xl mx-auto">
      <header className="mb-12 border-b-2 border-primary/20 pb-4 inline-block">
        <h1 className="text-4xl font-display font-bold text-on-surface uppercase tracking-widest">
          Active <span className="text-primary">Playlist</span>
        </h1>
        <p className="text-on-surface-variant font-display text-sm mt-2 tracking-widest uppercase">System Status: Online</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {aliens.map((alien, i) => (
          <div key={i} className="glass-panel p-6 rounded-sm group hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,255,0,0.15)] transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 text-xs font-display text-primary/40">[{String(i + 1).padStart(2, '0')}]</div>
            <div className="w-full aspect-square bg-surface-container-highest rounded-sm mb-4 border border-outline-variant/30 flex items-center justify-center group-hover:border-primary/50 transition-colors overflow-hidden p-2">
              <img src={alien.img} alt={alien.name} className="w-full h-full object-contain filter drop-shadow-[0_0_10px_rgba(0,255,0,0.2)]" />
            </div>
            <h2 className="text-xl font-display font-bold text-on-surface group-hover:text-primary transition-colors">{alien.name}</h2>
            <h3 className="text-xs font-display tracking-wider text-tertiary mb-3 uppercase">{alien.type}</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              {alien.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassicPlaylist;
