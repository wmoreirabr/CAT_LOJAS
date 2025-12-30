
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
    const message = encodeURIComponent('Olá! Gostaria de mais informações sobre a coleção Joanna Fashion.');
    window.open(`https://wa.me/${number}?text=${message}`, '_blank');
  };

  return (
    <div className={`min-h-screen flex flex-col bg-white text-black transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* Header com Logo */}
      <header className="w-full border-b border-black/5 bg-white/95 sticky top-0 z-[100]">
        <div className="max-w-7xl mx-auto py-6 px-6 flex justify-between items-center">
          <div className="flex flex-col group cursor-pointer">
            <h1 className="serif text-3xl font-normal tracking-tighter leading-none">
              Joanna <span className="italic">Fashion</span>
            </h1>
            <span className="text-[8px] uppercase tracking-[0.8em] mt-2 text-black font-bold">Exclusive Boutique</span>
          </div>
          <nav className="hidden md:flex space-x-8 text-[9px] font-bold uppercase tracking-[0.3em] text-black">
            <a href="#" className="hover:opacity-40 transition-opacity">Coleção</a>
            <a href="#" className="hover:opacity-40 transition-opacity">Editorial</a>
            <a href="#" className="hover:opacity-40 transition-opacity">Contato</a>
          </nav>
        </div>
      </header>

      {/* Slider Vertical 9:16 */}
      <main className="flex-grow flex flex-col items-center justify-center py-12 px-4 relative overflow-hidden">
        
        <div className="mb-12 text-center">
          <h2 className="serif text-4xl md:text-5xl font-normal text-black italic tracking-widest uppercase">
            New Arrival
          </h2>
          <div className="w-16 h-[1px] bg-black/20 mx-auto mt-4"></div>
        </div>

        <div className="w-full max-w-4xl relative flex flex-col items-center">
          <div className="slider-perspective w-full h-[65vh] md:h-[75vh] flex items-center justify-center relative">
            {REPOSITORY_IMAGES.map((slide, index) => {
              const isActive = index === currentIndex;
              return (
                <div
                  key={slide.id}
                  className={`slide-card-3d absolute w-[280px] md:w-[420px] aspect-[9/16] bg-white overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                    isActive ? 'z-20 opacity-100 scale-100 shadow-[0_50px_100px_rgba(0,0,0,0.12)]' : 'z-10 opacity-0 scale-95 pointer-events-none'
                  }`}
                  style={{
                    transform: isActive ? 'translateY(0)' : 'translateY(20px)',
                  }}
                >
                  <img src={slide.url} className="w-full h-full object-cover" alt="Fashion Look" />
                </div>
              );
            })}

            {/* Setas Laterais */}
            <button onClick={prevSlide} className="absolute -left-4 md:-left-20 top-1/2 -translate-y-1/2 z-50 p-4 text-black/30 hover:text-black transition-colors transform active:scale-90" aria-label="Anterior">
              <ChevronLeft size={60} strokeWidth={0.5} />
            </button>
            <button onClick={nextSlide} className="absolute -right-4 md:-right-20 top-1/2 -translate-y-1/2 z-50 p-4 text-black/30 hover:text-black transition-colors transform active:scale-90" aria-label="Próximo">
              <ChevronRight size={60} strokeWidth={0.5} />
            </button>
          </div>

          {/* Contador e Indicadores */}
          <div className="mt-12 flex flex-col items-center space-y-4">
            <span className="text-[10px] font-bold text-black tracking-[0.5em] uppercase">
              {String(currentIndex + 1).padStart(2, '0')} / {REPOSITORY_IMAGES.length}
            </span>
            <div className="flex space-x-2">
              {REPOSITORY_IMAGES.map((_, index) => (
                <div 
                  key={index}
                  className={`h-[2px] transition-all duration-500 ${index === currentIndex ? 'w-12 bg-black' : 'w-2 bg-black/10'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Rodapé com link da Agência */}
      <footer className="w-full py-10 mt-auto border-t border-black/5">
        <div className="flex flex-col items-center justify-center space-y-4 px-6 text-center">
          <a 
            href="https://ag.arautus.com.br" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-[10px] uppercase tracking-[0.4em] text-black/60 hover:text-black transition-colors font-bold"
          >
            site feito por ag.arautus.com.br
          </a>
          <p className="text-[8px] uppercase tracking-[0.2em] text-black/30">© Joanna Fashion Boutique Exclusive</p>
        </div>
      </footer>

      {/* Botão WhatsApp */}
      <div className="fixed bottom-10 right-10 z-[100]">
        <button 
          onClick={handleWhatsAppClick}
          className="relative p-6 bg-black text-white rounded-full shadow-2xl transition-all transform hover:scale-110 active:scale-95 group"
          aria-label="WhatsApp"
        >
          <div className="wp-glow-effect"></div>
          <MessageSquare size={24} strokeWidth={2} />
          <span className="absolute right-full mr-6 bg-black text-white px-6 py-3 text-[9px] font-bold opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap hidden lg:block tracking-[0.3em] uppercase border border-white/10 pointer-events-none">
            Atendimento
          </span>
        </button>
      </div>
    </div>
  );
};

export default App;
