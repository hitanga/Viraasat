import { Instagram, Sparkles } from 'lucide-react';

export default function InstaTimeline() {
  const images = [
    {
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2AJZJP7DyijBUDw5B3a9k19oaY9cYcLVzYdMnFX0dTAQ07Sc5G8H5n1FZRkOUA8r-HxzKTOQC_QP8TihzEgrBgLKqKogtzQAzaj0hSfE6SkAQEB0LY4K8DW8l9e9QHKojbApEoXuh4zCCp3vv2OkgsKfHNhVhxH3vcx8j2IMrFvHjDzAgkzzmIni_nuVWWmp6g13QBdJsUEuNe081vHTrFbvzpxtbhJETeSIX_H8epLVz3FC2qepk',
      caption: 'Golden Hour Silhouettes'
    },
    {
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANr__WJAQQu7aIHlwOdQ7TjQU23a-B5pVPpFP8-NTFPgKsoTHblyTprZ39t4GpmfGnjSs9zeOCr5Li25C1NWSTKele58mwK91fiKWu7Kh2lDkpmjz3-2eeiAuDPJvdMk8Gbiabf7civJ_o1hXZmAZYsYzXu_3CgpMGQkwlLUlr9JcDNW-EaIGl5mI6F2s1Z7JBV6Epce3LR4USe9FZHRkl0NpSI5Cb9xERXSW0HaZGu869AXsDAXb6',
      caption: 'Delicate Jhumkas and Jasmines'
    },
    {
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAx25l89V1MYUb8y45dj1HW82o2uHgmmqF5N5pMptMLAaMR0DiUvG9eu-mggOGNd2wHUUuqNVQYp89JKUKpwZ0hj1C3HVI7qaRi_bDzZVkibhJJTMR7XzEEl0X7rQW7QshvKiqMgAGkzXSc-NqK1yng4aAwZjelRWEagsFgVyCFYhQBOkKJmJUNzxAwczQ0-cGJbTZMoR4J-COpRvuYel38Ho1q3Jc0uuoqvk2O2cauaFsi00uc7Mck',
      caption: 'The Bridal Mehendi Stack'
    },
    {
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCy1X1baeGzzgXCWHhZFXoUonLTCbOWG5-_F4nPtwpHhGi_qy0DLNtFLnPF8DByXD-fkzdRkPnm5e8oxa71w8As8B3DovRgsnXhQA7M2nxeNF6Y4c-RR2cxsW-Q_c_P5BnPQ3dyFuGphnShaOwCYBqH8sDdBno8eI_zxqkTJ6tH9L_bRFxoAIlFU27TYN6kwMom5KcNZtO3rDnOFx3UzwxmmSxtjHtcm4umdq4BWPkLWtMI4FHQNMwU',
      caption: 'The Minimalist Showcase pedestal'
    },
    {
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFA--mcMTF8r3l6Q1MzVpnubLy6jgiQ9TLqKVkImhZkQ2auYLs66KOE1t4Nck2GRkTxGuKy45uaPDxR__w0g65R_60MAU02iVdA5HFWi17WgZ_Gr3ublXv97k9V4ou4F0fVJJQRdvUyJmy0MYqWfR8-ebRaJ-oy6pfKyEsDaHOhthRFoNFL-M1msYh_Vg6rZ3dr7nR4rhGbuMB5-Y5c1XOT6cHaKECSlOMi6vsad_3vKHPazMDPkyx',
      caption: 'Morning Reflection Fitting'
    },
    {
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMSw104PSqeEdvjcvqt1By7uxwzugUgTCWzPyA8VQQrgBI__f5h2Sz7kLDli-8WhzNwVRy5qqqfOLWaoi_ccPoXn9rnQq8UtrIKuB1uTzyHJwoNMGANeH8yARpCUJFurYlDAPlMFiZ8MbqjfY5KQNLDtCNLHdoRDbV7s-OkQ5JNHPNo7YSZHuxX2_eaVMuMHmaI6p3i2tWkVVzGZ5KRYaaT2yP6rLcOmzrbrTJZbwHYlp5uHOXgNa3',
      caption: 'Silk Stack rings collection'
    }
  ];

  return (
    <section className="py-20 border-t border-accent-peach/30 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center space-y-3 mb-12">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary-gold flex items-center justify-center gap-1">
          <Instagram className="w-3.5 h-3.5" /> Social Lookbook
        </span>
        <h2 className="font-serif text-3xl md:text-4xl text-luxury-dark font-medium">Follow Our Journey</h2>
        <p className="text-xs sm:text-sm text-luxury-slate font-sans">
          @ViraasatOfficial • Follow Us For Daily Style Inspiration & Heirloom Stories
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 px-2">
        {images.map((img, i) => (
          <div 
            key={i} 
            className="aspect-square group overflow-hidden relative cursor-pointer shadow-sm border border-accent-peach/5"
          >
            {/* Hover lookbook overlay */}
            <div className="absolute inset-0 bg-luxury-dark/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-4 text-center z-10">
              <Instagram className="w-6 h-6 text-white mb-2 transform scale-75 group-hover:scale-100 transition-transform duration-300" />
              <p className="text-[10px] tracking-wider uppercase font-sans font-bold">{img.caption}</p>
            </div>

            <img 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              src={img.url} 
              alt={img.caption}
              referrerPolicy="no-referrer"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
