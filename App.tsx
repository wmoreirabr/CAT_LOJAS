
import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';

const USER_IMAGES = [
  'https://images.tcdn.com.br/img/img_prod/1014355/vestido_longo_casual_fresh_day_901219_1_13fd9bf909ea8f92955acc062a400a90.jpg',
  'https://cdn.awsli.com.br/2500x2500/289/289750/produto/194349964/1672057928576-(2)-6cf0a90f56.jpg',
  'https://fernandaramosstore.com.br/wp-content/uploads/2024/12/fernandaramosstore_com_br-vestido-feminino-longo-rita-com-bojo-e-detalhe-plissado-off-white-1.jpeg',
  'https://donnadelux.com.br/cdn/shop/files/Design_sem_nome_1_9a1fb11e-f0a4-4569-985e-38b7741e4cb3.png?v=1741140441',
  'https://cdn.awsli.com.br/800x800/1329/1329656/produto/318134813/vestido-longo-de-alcinha-feminino-estampado-kvmcomgy2r.jpg',
  'https://dot.cdn.magazord.com.br/img/2024/12/produto/5802/foto-17-10-2024-12-31-59.jpg',
  'https://fernandaramosstore.com.br/wp-content/uploads/2024/11/fernandaramosstore_com_br-vestido-feminino-longo-any-manga-princesa-com-bojo-azul.jpeg',
  'https://fashionsmulher.com.br/cdn/shop/files/17029026162233f74c333e5a66f5a3e0ce0d599efe.jpg?v=1712789224',
  'https://ladydress.com.br/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/l/a/ladydress-vestido-festa-madrinha--laranja---longo_1__5.jpg'
];

const REPOSITORY_IMAGES = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  url: USER_IMAGES[i % USER_IMAGES.length],
}));

const App: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % REPOSITORY_IMAGES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + REPOSITORY_IMAGES.length) % REPOSITORY_IMAGES.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 8000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const handleWhatsAppClick = () => {
    const number = '5524999424348';
    const message = encodeURIComponent('Oi! Sou lojista e vim do catálogo. Quero saber mais?');
    window.open(`https://wa.me/${number}?text=${message}`, '_blank');
  };

  return (
    <div className={`min-h-screen flex flex-col bg-white text-black transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* Top Logo Header */}
      <header className="w-full border-b border-black/10 bg-white/95 z-50">
        <div className="max-w-7xl mx-auto py-8 px-8 flex justify-between items-center">
          <div className="flex flex-col group cursor-pointer">
            <h1 className="serif text-3xl font-normal tracking-tighter leading-none">
              Joanna <span className="italic">Fashion</span>
            </h1>
            <span className="text-[8px] uppercase tracking-[0.8em] mt-2 text-black font-bold">Exclusive Boutique</span>
          </div>
          <nav className="hidden md:flex space-x-12 text-[9px] font-bold uppercase tracking-[0.4em] text-black">
            <a href="#" className="hover:opacity-50 transition-opacity">Novidades</a>
            <a href="#" className="hover:opacity-50 transition-opacity">Catálogo</a>
            <a href="#" className="hover:opacity-50 transition-opacity">O Ateliê</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-start py-8 px-4 overflow-hidden relative">
        
        {/* Título da Seção (COLEÇÃO) */}
        <div className="mb-8 md:mb-12 text-center">
          <h2 className="serif text-4xl md:text-6xl font-normal text-black italic tracking-widest uppercase">
            Coleção
          </h2>
          <div className="w-12 h-[1px] bg-black mx-auto mt-4"></div>
        </div>

        <div className="w-full relative flex flex-col items-center">
          {/* Slider Perspective Area */}
          <div className="slider-perspective w-full h-[60vh] md:h-[75vh] flex items-center justify-center relative">
            {REPOSITORY_IMAGES.map((slide, index) => {
              const isActive = index === currentIndex;
              const isPrev = index < currentIndex;
              
              return (
                <div
                  key={slide.id}
                  className={`slide-card-3d absolute w-[280px] md:w-[450px] aspect-[2/3] bg-white overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isActive ? 'z-20 opacity-100 scale-100 shadow-[0_40px_80px_rgba(0,0,0,0.15)]' : 'z-10 opacity-0 scale-90 translate-y-10'
                  }`}
                  style={{
                    transform: isActive 
                      ? 'translate3d(0, 0, 0) rotateY(0deg)'
                      : isPrev 
                        ? 'translate3d(-100%, 0, -500px) rotateY(45deg)'
                        : 'translate3d(100%, 0, -500px) rotateY(-45deg)',
                    filter: isActive ? 'none' : 'blur(5px)',
                    pointerEvents: isActive ? 'auto' : 'none',
                    border: '1px solid rgba(0,0,0,0.05)'
                  }}
                >
                  <img src={slide.url} className="w-full h-full object-contain bg-white" alt="Peça da Coleção" loading="lazy" />
                </div>
              );
            })}

            {/* Side Arrows */}
            <button onClick={prevSlide} className="absolute left-2 md:left-20 top-1/2 -translate-y-1/2 z-50 text-black hover:opacity-50 transition-all transform active:scale-90" aria-label="Anterior">
              <ChevronLeft size={70} strokeWidth={0.5} />
            </button>
            <button onClick={nextSlide} className="absolute right-2 md:right-20 top-1/2 -translate-y-1/2 z-50 text-black hover:opacity-50 transition-all transform active:scale-90" aria-label="Próximo">
              <ChevronRight size={70} strokeWidth={0.5} />
            </button>
          </div>

          {/* Indicators and Counter */}
          <div className="flex flex-col items-center mt-12 space-y-6">
            <span className="text-[10px] font-bold text-black tracking-[0.6em] uppercase">
              {String(currentIndex + 1).padStart(2, '0')} — {String(REPOSITORY_IMAGES.length).padStart(2, '0')}
            </span>
            <div className="flex space-x-3">
              {REPOSITORY_IMAGES.map((_, index) => (
                <button 
                  key={index} 
                  onClick={() => setCurrentIndex(index)} 
                  className={`h-[1px] transition-all duration-700 ${index === currentIndex ? 'w-16 bg-black' : 'w-4 bg-black/20 hover:bg-black/50'}`} 
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer Minimalista */}
      <footer className="w-full py-12 mt-auto border-t border-black/5 bg-white">
        <div className="flex flex-col justify-center items-center space-y-2 px-4 text-center">
          <p className="text-[10px] uppercase tracking-[0.6em] text-black font-bold">Informações no WhatsApp</p>
          <div className="w-8 h-[1px] bg-black/10 my-2"></div>
          <p className="text-[8px] uppercase tracking-[0.3em] text-black/40">© Joanna Fashion Boutique</p>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-8 right-8 md:bottom-12 md:right-12 z-[100]">
        <button 
          onClick={handleWhatsAppClick}
          className="relative p-6 md:p-8 bg-black text-white rounded-full shadow-2xl transition-all transform hover:scale-110 active:scale-95 group"
          aria-label="WhatsApp"
        >
          <div className="wp-glow-effect"></div>
          <MessageSquare size={24} strokeWidth={2} />
          <span className="absolute right-full mr-10 bg-black text-white px-8 py-4 text-[9px] font-bold opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap hidden lg:block tracking-[0.4em] uppercase border border-white/10 shadow-2xl translate-x-4 group-hover:translate-x-0 pointer-events-none">
            Fale Conosco
          </span>
        </button>
      </div>
    </div>
  );
};

export default App;
