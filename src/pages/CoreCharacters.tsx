const characters = [
  { name: 'Ben Tennyson', role: 'Wielder', stats: 'Level 10 Threat', img: '/CharacterImages/BenTennyson.avif', customClass: 'ben-image' },
  { name: 'Gwen Tennyson', role: 'Anodite Hybrid', stats: 'Mana Manipulation', img: '/CharacterImages/GwenTennyson.jpg' },
  { name: 'Kevin Levin', role: 'Osmosian', stats: 'Energy / Matter Absorption', img: '/CharacterImages/kevin11.webp' },
  { name: 'Grandpa Max', role: 'Magister', stats: 'Plumber Legend', img: '/CharacterImages/GrandpaMax.jpg' }
];

const CoreCharacters = () => {
  return (
    <div className="min-h-screen p-8 max-w-7xl mx-auto">
      <header className="mb-12">
         <h1 className="text-4xl font-display font-bold text-on-surface uppercase tracking-widest border-l-4 border-primary pl-4">
            Personnel <span className="text-on-surface-variant text-2xl">Files</span>
         </h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {characters.map((char, i) => (
          <div key={i} className="relative group h-64 [perspective:1000px] card">
            <div className="w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] cursor-pointer">
              
              {/* Front side */}
              <div className="absolute inset-0 border-l-2 border-l-primary/50 [backface-visibility:hidden] overflow-hidden rounded-[12px] bg-black">
                 <img src={char.img} alt={char.name} className={`character-image ${char.customClass || ''}`} />
                 <div className="absolute top-4 right-4 text-xs font-display text-primary/40 tracking-widest z-10">CLASSIFIED</div>
                 <div className="card-content z-10 text-left">
                   <h2 className="text-3xl font-display font-bold text-on-surface">{char.name}</h2>
                   <p className="text-tertiary font-display tracking-widest text-sm uppercase mt-1">{char.role}</p>
                 </div>
              </div>

              {/* Back side */}
              <div className="absolute inset-0 glass-panel p-6 border-r-2 border-r-tertiary/50 [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-center items-center text-center">
                 <h3 className="text-xl font-display font-bold text-on-surface mb-2">{char.name}</h3>
                 <div className="w-12 h-1 bg-tertiary mb-4"></div>
                 <p className="text-on-surface-variant font-display tracking-widest uppercase">
                   {char.stats}
                 </p>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoreCharacters;
