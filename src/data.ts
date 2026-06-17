import { Product, Review } from './types';

const BASE_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Royal Kundan Choker',
    category: 'necklaces',
    price: 4999,
    originalPrice: 7500,
    rating: 4.2,
    reviewsCount: 42,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuzSMxHgzQnG7F3iiMKJ8cL0AEI0ZaYuJQZdrnAutGNAP7nQUjG1l1NcD8U809nGHiuoCgydpZl_9qi6CCIvSKBGWcYCv_q-_Xm9PcDtOVrhcZtL4tqBt7UUzrmzuAwi6rjJnD_OsnjbcadsbERL5S8cXYVxIDYJlF9c2jcJ0cLhOJqyisiFHZNZx1GfaV4q1ZgQZ4qBPqcMEtRTgLtEsBvEL7C3z7nvNffNnvGUm62pFpId5jR2p7',
    description: 'This Royal Kundan Choker is a breathtaking masterpiece, combining precision hand-cut Kundan stones with flawless gold leafing. Modeled for high-end celebrations, it represents an instantaneous aura of regal, classic elegance.',
    materials: ['Gold-Plated Alloy', 'Hand-cut Jadau Kundan', 'Pristine Seed Pearls', 'Synthetic Rubies'],
    dimensions: 'Adjustable thread-work cord width 1.8 in',
    artisan: 'Master Ji Shrinath from Jaipur',
    isTrending: true,
    details: [
      'Authentic Jadau Style Stone Setting',
      'Comfortable and soft fabric-lined back backing plate',
      'Delicate micro-beading with natural seed pearls',
      'Lead-free and Nickel-free hypoallergenic build'
    ]
  },
  {
    id: 'prod-2',
    name: 'Emerald Drop Jhumkas',
    category: 'earrings',
    price: 2499,
    originalPrice: 3999,
    rating: 4.8,
    reviewsCount: 89,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpBExZQwbTq3zGni1M1ZZ68VbcJGshxRE7pH0VgjVP97qm_45Xi0QI60v-jD4D-bFQJNExyRIUyuJwuZqdNqeeH4u8lISnNwQ_Co4v83ZaFXXatU4wRpf-U_oQ1O-jkwi6nh7TWmcISLcIiQt7PIGMPUBLo0BxEfio-ImpXG1pdBbMxQfngQpaqpoJ_ZBOw7LnjkF-bErdxDtybqsNckl2GRt3PKqAl21eRHVSUP-W8tVJJSrrgS9F',
    description: 'Exquisite traditional bell earrings crafted with intricate filigree templates and dripping with high-grade handpicked emerald tear beads. Perfect for festive gatherings.',
    materials: ['Sterling Silver base', '22k Gold Gilding', 'Premium Emerald Glaze', 'Glass Gems'],
    dimensions: 'Length: 2.5 in, Width: 1.2 in',
    artisan: 'Chandra Prakash G., Jodhpur',
    isTrending: true,
    details: [
      'Intricate filigree craftsmanship',
      'Emerald drops dangling cleanly on luxury gold pins',
      'Double gold polish layer to prevent early dulling',
      'Includes high-comfort silicone bullet backings'
    ]
  },
  {
    id: 'prod-3',
    name: 'Minimalist Rose Cuff',
    category: 'bangles',
    price: 1899,
    originalPrice: 2800,
    rating: 4.3,
    reviewsCount: 15,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDz70q4Lztw-chJpwkrSbFLG1DT0pA8w1hG2hwwqbLE29lo4bTWtjtsdBCDbEVpOrkqMu1TvYd6yxchFUQEf1buz5isGxwhHsU5Ffp-NdKK4SA1xzVRGSUXjLTDzwJtUZB6es1Ld3tHZ4TQ1gyPkF0UyIRwnDpKcvatODQ7yKiGAX5f_NnDCsS5gTd3vi5WAxY76hUzGijfjqrMf2MC9O8HCDk4TOlMTau2lFlxdCpeDsjkEZe6rgP',
    description: 'A delicate contemporary rose gold cuff reflecting a modern minimalist charm. Perfectly structured with soft inner curves to comfortably hug the wrist for daytime or nighttime sophistication.',
    materials: ['Rose Gold Finished Brass', 'Micro Cubic Zirconia Stones', 'Antitarnish Coating'],
    dimensions: 'Inner Diameter: 2.2 in (Flexible Wrap)',
    artisan: 'Virendra Kumar and sons, Surat',
    isTrending: true,
    details: [
      'Sleek modern minimal bangle profile',
      'Premium anti-tarnish protective lacquer guard',
      'Hand-set brilliant round micro zircon elements',
      'Extremely lightweight, designed for continuous office wear'
    ]
  },
  {
    id: 'prod-4',
    name: 'Royal Pearl Mathapatti / Maang Tikka',
    category: 'earrings',
    price: 3299,
    originalPrice: 5000,
    rating: 4.9,
    reviewsCount: 64,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYDIU67c4Gww-NoG5HEnClXAslWj1YcIKM2ZeTJr5emnVkxG1VlXAzMpuvZkEw7bishWzVaE5cucb6pFftylYoFo_kVymEMD8uBpxHc7mV22_qccRohvL7yYmp9Y-NDShNq5Oh-DswxC8W50x9Te-7XPsQgk_CPJeLzNSpj9AaJS0UGMkR6vGZoR25iZs1meTeRRrl_wWVXSBoeKTv7XP07OCcn893P91XMYpuqhd4nKqWHgVD8fi4',
    description: 'A traditional forehead-defining headpiece decorated with pristine cultured seed pearls and structured in brilliant gold work, displaying the luxurious signature style of Jaipur royal palaces.',
    materials: ['Brass core', '24k Yellow Gold Electroplating', 'Natural Rice Pearls', 'CZ Crystals'],
    dimensions: 'Overall span 6.5 inches including drop chain',
    artisan: 'Ram Avtar Meena, Alwar',
    isTrending: true,
    details: [
      'Intricate rawa detailing hand-applied on edges',
      'Pristine white seed pearls looped on micro-twisted gold wire',
      'Includes premium hair hooks for steady head grip',
      'Perfect centerpiece for bridal, engagement, and wedding festivities'
    ]
  },
  {
    id: 'prod-5',
    name: 'Heritage Emerald Temple Haar',
    category: 'necklaces',
    price: 14999,
    originalPrice: 22000,
    rating: 4.9,
    reviewsCount: 110,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJxAIRlp6IJfM78zFCTg-vSDtmYoqfjx2YeN-q3gWT08yOjgfztMV9RqMw5bEcb81_M_tPDArYCl92z75q75pq-m6p8PB3O42ORidIMWgYIOVaZS4Qljkuz4YEG6gZ9i14BuY2665wB9VK1hdXUnuV9rmU9afR4KcEDqui4YnOqp68rR6CvAJiZFJAgrSIa4_nnt8aWpDuc5Nci_TEVyvt4vfIF1vNO_wfsFUSztqVPtz1bqOIcRfc',
    description: 'An expansive masterpiece featuring high-fidelity emerald tiers combined with historic Indian temple jewelry templates, presented on premium white silk display frames in our luxury boutique.',
    materials: ['Antique Finish Brass', 'Faceted Colombian-grade Emerald drops', 'Handcrafted Gold Filigree'],
    dimensions: 'Adjustable drop height up to 12 in, Pendant: 3.5 in wide',
    artisan: 'Hariprasad Sharma, Varanasi',
    isBridal: true,
    details: [
      'Stately multi-layer design resembling classical royalty',
      'Flawless emerald drops with high-sheen facets',
      'Meticulous filigree work matching ancient sculpture carvings',
      'Individually numbered master design series'
    ]
  },
  {
    id: 'prod-6',
    name: 'Mayur Filigree Bangles (Set of 6)',
    category: 'bangles',
    price: 4199,
    originalPrice: 6000,
    rating: 4.7,
    reviewsCount: 38,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXWTnAcbhQ2FcqJB6eaYe1FuCiHdWXu-ITT-UVbu9BtPBy_HuG-9aPsvNaEF0atVW3GxsVMGoKNG37OAepD3HcIrN_ZBwfrJwq7UXr3NrMEhGXxulO0Xk-aka62mKxC6v1pIFApXzjha84Dch0u8Wug1_5timKwtcueNKxvLa5uB-mpw2J7HSkA-zVTYddRxfyBA6MPR2LRS7MV5FwtMzkk_ECq0bXTzKFGM9JxO_Sfxqglc7qAkqK',
    description: 'An elegant stack of custom-carved bangles featuring intricate floral and peacock motifs, resting on fine silk context backgrounds to represent the highest quality of celebratory jewelry.',
    materials: ['Brass', '22k Gold plating layer', 'Meenakari Enamel work', 'Semi-precious stone settings'],
    dimensions: 'Sizes available: 2.4, 2.6, 2.8',
    artisan: 'Zafar Hussain, Lucknow',
    isTrending: false,
    details: [
      'Six-piece modular collection to customize stacking style',
      'Elegant handpainted red and green Meenakari highlights',
      'Soft curved edges prevent luxury silks from snagging',
      'Delivered in an elegant velvet-lined hand-carved box'
    ]
  },
  {
    id: 'prod-7',
    name: 'Aishwarya Imperial Bridal Set',
    category: 'sets',
    price: 24999,
    originalPrice: 38000,
    rating: 5.0,
    reviewsCount: 57,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIgRPpjEpMSl6OmON1eBpkMf_mhFPlAfKDsoaDYnVPzS6c8qOPX1Fq0HubqkNONHujMllro_ktXo_v-lA-t3iL4BzEKVcW5bCHv1rN4X8TFrZSx1ayFmxWi_c_MLEYdyvKD3mNRsMV2WvQEqBQs9auWDvY4J59fvvQy4QLw9SzQ_9zsvx6CIqpO8sHdM9DeVJGGMaLdp_63CU-e9w2a6uts7ZfkcQnVoByPCGHsUBQmdanSREh5pOY',
    description: 'A breathtaking bridal jewelry set with kundan, rubies, and premium pearl layers laid out on a royal white velvet surface. Specially crafted for the grand wedding day.',
    materials: ['Vermeil Gold (22k Over Silver)', 'Handpicked Freshwater Pearls', 'Imperial Burmese Rubies (Simulated)'],
    dimensions: 'Choker: 14 in (Adjustable), Long Necklace: 24 in',
    artisan: 'The Royal Jewellers of Jaipur Syndicate',
    isBridal: true,
    details: [
      'Signature Viraasat bridal centerpiece product of the year',
      'Includes heavy matching jhumkas and statement maang tikka',
      'Embellished with over 800 hand-set stones',
      'Crafted over a period of 45 working days by 4 master craftsmen'
    ]
  },
  {
    id: 'prod-8',
    name: 'Devi Heritage Kundan Chandbalis',
    category: 'earrings',
    price: 3899,
    originalPrice: 5500,
    rating: 5.0,
    reviewsCount: 29,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApWc-87-nV_7pYuacu0E3ImQFInxDCY7zWZKQ07IJOEJMGUCiRvO2inEYF1mvrv6LEpBRPw43VkIpVMxwYwBHR_QoOKuNf2z__ZuJHX-IPOYJsYzkMXvwTksJQOsLIkS_Ldw7UiCWYg5AjWIhW7xRppFgpR7YbyZYHVFYKbKt9OHEG8b0rdAHFYyHvGr86LSOtRNtiRmo5YABsF-ulLXpHba7ir6ltluipTDqO5WdPdGxeJA0yieo0',
    description: 'Impeccable gold moon-shaped earrings showcasing pristine kundan stone alignments and ivory bead drop details, capturing modern luxury jewelry aesthetics.',
    materials: ['Gold Polish Brass Alloy', 'Premium Glass Kundan Stones', 'Natural Cultured Seed Pearl loops'],
    dimensions: 'Drop length: 3.2 inches, Weight: Balanced for comfort',
    artisan: 'Mahendra Singh, Jaipur',
    isTrending: true,
    details: [
      'Stately double-crescent Chandbali layout',
      'Classic high-sheen pearls surrounding the outer edge',
      'Balanced design guarantees no earlobe stretching',
      'Polished in antique warm champagne gold lacquer'
    ]
  }
];

// PROGRAMMATIC HIGH-QUALITY HISTORIC EXPANSION DATA FOR DETAILED CATALOG PLACEMENT
const CLASSIFICATIONS = ['earrings', 'necklaces', 'bangles', 'sets'];

const PREFIXES = [
  "Maharani", "Rani", "Nizam", "Shekhawati", "Patiala", "Jaipur", "Amber", "Mughal", 
  "Bikaner", "Marwar", "Deccan", "Chola", "Patalia", "Kashi", "Avadh", "Royal", "Rajkumari"
];

const DESCRIPTORS = [
  "Jadau Polki", "Royal Kundan", "Antique Filigree", "Meenakari Gold", "Basra Pearl", 
  "Zardozi Enamel", "Moissanite Diamond", "Temple Emerald", "Champagne Gold Jadau", 
  "Faceted Ruby", "Kemp Temple", "Imperial Gilded", "Ganga-Jamuni Polki", "Jodhpur Meena"
];

const ITEM_TYPES: Record<string, string[]> = {
  earrings: ["Chandbalis", "Jhumkas", "Kaan Chains", "Sui Dhaga Drops", "Studs Set", "Latkans", "Sahara Drops", "Karanphool Drops"],
  necklaces: ["Choker", "Panchlada Haar", "Hasli Collar", "Lariat Collar", "Chandra Haar", "Guluband Collar", "Satlada Haar", "Aadh Necklace"],
  bangles: ["Kadaa", "Kangans Stack", "Hathphool Bracelet", "Cuff Bangle", "Choora Jod", "Pachheli Bangles", "Gajra Cuffs"],
  sets: ["Grand Celebration Set", "Bespoke Shringar Set", "Imperial Festivity Set", "Bridal Heritage Set", "Sangeet Couture Ensemble"]
};

const IMAGES: Record<string, string[]> = {
  earrings: [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDpBExZQwbTq3zGni1M1ZZ68VbcJGshxRE7pH0VgjVP97qm_45Xi0QI60v-jD4D-bFQJNExyRIUyuJwuZqdNqeeH4u8lISnNwQ_Co4v83ZaFXXatU4wRpf-U_oQ1O-jkwi6nh7TWmcISLcIiQt7PIGMPUBLo0BxEfio-ImpXG1pdBbMxQfngQpaqpoJ_ZBOw7LnjkF-bErdxDtybqsNckl2GRt3PKqAl21eRHVSUP-W8tVJJSrrgS9F',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCYDIU67c4Gww-NoG5HEnClXAslWj1YcIKM2ZeTJr5emnVkxG1VlXAzMpuvZkEw7bishWzVaE5cucb6pFftylYoFo_kVymEMD8uBpxHc7mV22_qccRohvL7yYmp9Y-NDShNq5Oh-DswxC8W50x9Te-7XPsQgk_CPJeLzNSpj9AaJS0UGMkR6vGZoR25iZs1meTeRRrl_wWVXSBoeKTv7XP07OCcn893P91XMYpuqhd4nKqWHgVD8fi4',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuApWc-87-nV_7pYuacu0E3ImQFInxDCY7zWZKQ07IJOEJMGUCiRvO2inEYF1mvrv6LEpBRPw43VkIpVMxwYwBHR_QoOKuNf2z__ZuJHX-IPOYJsYzkMXvwTksJQOsLIkS_Ldw7UiCWYg5AjWIhW7xRppFgpR7YbyZYHVFYKbKt9OHEG8b0rdAHFYyHvGr86LSOtRNtiRmo5YABsF-ulLXpHba7ir6ltluipTDqO5WdPdGxeJA0yieo0',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuANr__WJAQQu7aIHlwOdQ7TjQU23a-B5pVPpFP8-NTFPgKsoTHblyTprZ39t4GpmfGnjSs9zeOCr5Li25C1NWSTKele58mwK91fiKWu7Kh2lDkpmjz3-2eeiAuDPJvdMk8Gbiabf7civJ_o1hXZmAZYsYzXu_3CgpMGQkwlLUlr9JcDNW-EaIGl5mI6F2s1Z7JBV6Epce3LR4USe9FZHRkl0NpSI5Cb9xERXSW0HaZGu869AXsDAXb6'
  ],
  necklaces: [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBuzSMxHgzQnG7F3iiMKJ8cL0AEI0ZaYuJQZdrnAutGNAP7nQUjG1l1NcD8U809nGHiuoCgydpZl_9qi6CCIvSKBGWcYCv_q-_Xm9PcDtOVrhcZtL4tqBt7UUzrmzuAwi6rjJnD_OsnjbcadsbERL5S8cXYVxIDYJlF9c2jcJ0cLhOJqyisiFHZNZx1GfaV4q1ZgQZ4qBPqcMEtRTgLtEsBvEL7C3z7nvNffNnvGUm62pFpId5jR2p7',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDJxAIRlp6IJfM78zFCTg-vSDtmYoqfjx2YeN-q3gWT08yOjgfztMV9RqMw5bEcb81_M_tPDArYCl92z75q75pq-m6p8PB3O42ORidIMWgYIOVaZS4Qljkuz4YEG6gZ9i14BuY2665wB9VK1hdXUnuV9rmU9afR4KcEDqui4YnOqp68rR6CvAJiZFJAgrSIa4_nnt8aWpDuc5Nci_TEVyvt4vfIF1vNO_wfsFUSztqVPtz1bqOIcRfc',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAIgRPpjEpMSl6OmON1eBpkMf_mhFPlAfKDsoaDYnVPzS6c8qOPX1Fq0HubqkNONHujMllro_ktXo_v-lA-t3iL4BzEKVcW5bCHv1rN4X8TFrZSx1ayFmxWi_c_MLEYdyvKD3mNRsMV2WvQEqBQs9auWDvY4J59fvvQy4QLw9SzQ_9zsvx6CIqpO8sHdM9DeVJGGMaLdp_63CU-e9w2a6uts7ZfkcQnVoByPCGHsUBQmdanSREh5pOY',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuA2AJZJP7DyijBUDw5B3a9k19oaY9cYcLVzYdMnFX0dTAQ07Sc5G8H5n1FZRkOUA8r-HxzKTOQC_QP8TihzEgrBgLKqKogtzQAzaj0hSfE6SkAQEB0LY4K8DW8l9e9QHKojbApEoXuh4zCCp3vv2OkgsKfHNhVhxH3vcx8j2IMrFvHjDzAgkzzmIni_nuVWWmp6g13QBdJsUEuNe081vHTrFbvzpxtbhJETeSIX_H8epLVz3FC2qepk'
  ],
  bangles: [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDDz70q4Lztw-chJpwkrSbFLG1DT0pA8w1hG2hwwqbLE29lo4bTWtjtsdBCDbEVpOrkqMu1TvYd6yxchFUQEf1buz5isGxwhHsU5Ffp-NdKK4SA1xzVRGSUXjLTDzwJtUZB6es1Ld3tHZ4TQ1gyPkF0UyIRwnDpKcvatODQ7yKiGAX5f_NnDCsS5gTd3vi5WAxY76hUzGijfjqrMf2MC9O8HCDk4TOlMTau2lFlxdCpeDsjkEZe6rgP',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBXWTnAcbhQ2FcqJB6eaYe1FuCiHdWXu-ITT-UVbu9BtPBy_HuG-9aPsvNaEF0atVW3GxsVMGoKNG37OAepD3HcIrN_ZBwfrJwq7UXr3NrMEhGXxulO0Xk-aka62mKxC6v1pIFApXzjha84Dch0u8Wug1_5timKwtcueNKxvLa5uB-mpw2J7HSkA-zVTYddRxfyBA6MPR2LRS7MV5FwtMzkk_ECq0bXTzKFGM9JxO_Sfxqglc7qAkqK',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAx25l89V1MYUb8y45dj1HW82o2uHgmmqF5N5pMptMLAaMR0DiUvG9eu-mggOGNd2wHUUuqNVQYp89JKUKpwZ0hj1C3HVI7qaRi_bDzZVkibhJJTMR7XzEEl0X7rQW7QshvKiqMgAGkzXSc-NqK1yng4aAwZjelRWEagsFgVyCFYhQBOkKJmJUNzxAwczQ0-cGJbTZMoR4J-COpRvuYel38Ho1q3Jc0uuoqvk2O2cauaFsi00uc7Mck'
  ],
  sets: [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAIgRPpjEpMSl6OmON1eBpkMf_mhFPlAfKDsoaDYnVPzS6c8qOPX1Fq0HubqkNONHujMllro_ktXo_v-lA-t3iL4BzEKVcW5bCHv1rN4X8TFrZSx1ayFmxWi_c_MLEYdyvKD3mNRsMV2WvQEqBQs9auWDvY4J59fvvQy4QLw9SzQ_9zsvx6CIqpO8sHdM9DeVJGGMaLdp_63CU-e9w2a6uts7ZfkcQnVoByPCGHsUBQmdanSREh5pOY',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCy1X1baeGzzgXCWHhZFXoUonLTCbOWG5-_F4nPtwpHhGi_qy0DLNtFLnPF8DByXD-fkzdRkPnm5e8oxa71w8As8B3DovRgsnXhQA7M2nxeNF6Y4c-RR2cxsW-Q_c_P5BnPQ3dyFuGphnShaOwCYBqH8sDdBno8eI_zxqkTJ6tH9L_bRFxoAIlFU27TYN6kwMom5KcNZtO3rDnOFx3UzwxmmSxtjHtcm4umdq4BWPkLWtMI4FHQNMwU',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBFA--mcMTF8r3l6Q1MzVpnubLy6jgiQ9TLqKVkImhZkQ2auYLs66KOE1t4Nck2GRkTxGuKy45uaPDxR__w0g65R_60MAU02iVdA5HFWi17WgZ_Gr3ublXv97k9V4ou4F0fVJJQRdvUyJmy0MYqWfR8-ebRaJ-oy6pfKyEsDaHOhthRFoNFL-M1msYh_Vg6rZ3dr7nR4rhGbuMB5-Y5c1XOT6cHaKECSlOMi6vsad_3vKHPazMDPkyx',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAMSw104PSqeEdvjcvqt1By7uxwzugUgTCWzPyA8VQQrgBI__f5h2Sz7kLDli-8WhzNwVRy5qqqfOLWaoi_ccPoXn9rnQq8UtrIKuB1uTzyHJwoNMGANeH8yARpCUJFurYlDAPlMFiZ8MbqjfY5KQNLDtCNLHdoRDbV7s-OkQ5JNHPNo7YSZHuxX2_eaVMuMHmaI6p3i2tWkVVzGZ5KRYaaT2yP6rLcOmzrbrTJZbwHYlp5uHOXgNa3'
  ]
};

const ARTISANS = [
  "Master Ji Shrinath, Jaipur",
  "Chandra Prakash G., Jodhpur",
  "Virendra Kumar Soni, Surat",
  "Ram Avtar Meena, Alwar",
  "Zafar Hussain Karim, Lucknow",
  "Girdhari Lal, Udaipur",
  "Rajendra Prasanna Sharma, Varanasi",
  "Satish Soni, Surajgarh",
  "Gopal Roy Joshi, Bikaner",
  "Lalit Prasad Pathak, Kashi",
  "Vikram Aditya Dev, Jodhpur"
];

const MATERIALS_POOL = [
  ["Gold-Plated Fine Alloy", "Hand-cut Jadau Kundan", "Pristine Seed Pearls", "Synthetic Rubies"],
  ["Sterling Silver base", "22k Gold Gilding", "Colombian emerald accents", "Faceted Glazed Gems"],
  ["Antique Gold Polish base", "Red Burmese Ruby beads", "Karat Brass Base", "Rice Pearls"],
  ["Rose Gold Finished Brass", "AAA grade cubic zirconia crystals", "Antitarnish protective coating"],
  ["Antique Copper base weight", "Basra Pearl replications", "Un-cut Polki Kundan settings"],
  ["Fine Filigree Silver Base", "Sabyasachi-style gilding", "Meenakari floral enamel plates"],
  ["Pure Brass Alloy Frame", "South Sea Pearl settings", "Uncut Moissanite Zircons"]
];

const DETAILS_POOL = [
  [
    "Authentic Jadau traditional stone-setting architecture",
    "Soft protective velvet fabric felt lining to guarantee zero skin scratching",
    "Micro-beading with premium pearls individually hand-looped on fine wire",
    "Hypoallergenic build entirely lead-free and nickel-free for absolute comfort"
  ],
  [
    "Highly polished double gold lacquer finish preventing early color oxidation",
    "Gem drops dangling cleanly on master-twisted luxury copper pins",
    "Extremely light structural configuration for prolonged daytime wearing comfort",
    "Shipped in an authentic velvet-bound hand-carved solid wooden keepsakes casket"
  ],
  [
    "Detailed handapplied Meenakari enamel motifs on the interior backing plates",
    "Semi-precious stone cells individually calculated for flawless weight balance",
    "Includes adjustable thread-work cotton dori cord for personalized chest alignment",
    "Provided with an official master artisan certificate of heritage classification"
  ]
];

const DESCRIPTIONS = [
  "An outstanding testament to traditional luxury, this handcrafted masterpiece embodies historical Indian artistry. Ideal for high-vibe family celebrations and palace event wear.",
  "Dusk-tinted royal jewelry piece featuring incredibly intricate filigree patterns. Curated specifically for elite cocktail drapes and sangeet night gatherings.",
  "A majestic addition to your heirloom scrolls, reflecting centuries of Rajasthani craft guild wisdom. Finished in double-layered anti-tarnish champagne gold glaze.",
  "Highly customizable jewelry showing pristine material symmetry. Hand-sculpted in our Rajasthan workspace for modern women seeking a distinct royal charm."
];

// Helper to reliably generate distinct extra products until we have 132 items total
function generateComprehensiveProducts(): Product[] {
  const completeList = [...BASE_PRODUCTS];
  let currentIdIndex = 9;

  // Let's create enough permutations to fill the catalog completely with gorgeous items.
  for (let p = 0; p < PREFIXES.length; p++) {
    for (let d = 0; d < DESCRIPTORS.length; d++) {
      const category = CLASSIFICATIONS[(p + d) % CLASSIFICATIONS.length];
      const itemsCat = ITEM_TYPES[category];
      const itemType = itemsCat[(p * 3 + d) % itemsCat.length];
      
      const name = `${PREFIXES[p]} ${DESCRIPTORS[d]} ${itemType}`;
      
      // Prevent duplicates
      if (completeList.some(item => item.name === name)) continue;

      const id = `prod-g${currentIdIndex}`;
      
      // Determine prices dynamically based on category
      let price = 2200;
      let originalPrice = 3500;
      
      if (category === 'sets') {
        price = 12000 + ((p * 7 + d * 13) % 23) * 1000 + 499;
        originalPrice = Math.round(price * 1.5);
      } else if (category === 'necklaces') {
        price = 4000 + ((p * 5 + d * 11) % 15) * 500 + 199;
        originalPrice = Math.round(price * 1.4);
      } else if (category === 'earrings') {
        price = 1500 + ((p * 2 + d * 7) % 11) * 300 + 99;
        originalPrice = Math.round(price * 1.5);
      } else { // bangles
        price = 1800 + ((p * 3 + d * 5) % 9) * 400 + 299;
        originalPrice = Math.round(price * 1.5);
      }

      const rankModifier = (p + d) % 11;
      const rating = parseFloat((4.0 + (rankModifier % 11) * 0.1).toFixed(1));
      const reviewsCount = 10 + (p * 9 + d * 4) % 135;
      
      // Grab image
      const categoryImages = IMAGES[category];
      const image = categoryImages[(p + d) % categoryImages.length];

      // Grab dynamic materials and details
      const materials = MATERIALS_POOL[(p + d) % MATERIALS_POOL.length];
      const details = DETAILS_POOL[(p * 2 + d) % DETAILS_POOL.length];
      const artisan = ARTISANS[(p + d) % ARTISANS.length];
      const description = DESCRIPTIONS[(p * 3 + d) % DESCRIPTIONS.length];

      let dimensions = "Drop: 2.2 inches, Weight: Light";
      if (category === 'necklaces') {
        dimensions = "Collar depth: 14-16 in, Adjustable thread cord padding";
      } else if (category === 'bangles') {
        dimensions = "Inner Diameter options: 2.4, 2.6, 2.8 standard fits";
      } else if (category === 'sets') {
        dimensions = "Choker height 2.2 in, Jhumka drops 2.8 in";
      }

      const isBridal = category === 'sets' || p % 5 === 0;
      const isTrending = d % 3 === 0;

      completeList.push({
        id,
        name,
        category,
        price,
        originalPrice,
        rating: rating > 5.0 ? 5.0 : rating,
        reviewsCount,
        image,
        description,
        materials,
        dimensions,
        artisan,
        isTrending,
        isBridal,
        details
      });

      currentIdIndex++;
      
      // Stop when we hit a secure high-volume catalog size of exactly 132 products
      if (completeList.length >= 132) {
        break;
      }
    }
    if (completeList.length >= 132) {
      break;
    }
  }

  return completeList;
}

export const PRODUCTS: Product[] = generateComprehensiveProducts();

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'review-1',
    author: 'Ananya Sharma',
    rating: 5,
    content: "The quality is beyond my expectations. I wore the Polki set for my brother's wedding and everyone asked me if it was real gold! Highly recommend.",
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPOG_q3T3Rjmd3zYm3izwW1-IY5NY9lxWW5tJP_gFAdliQsvy3H9mWrmHbLXQBJxTMtEAupEXBIa4xl0W4yz2ShatoX8U4PWw15qZF1YARwYEB8wvM2EwG55IiyHAx9LMruu4Rxwqb0h5_GMfU2bgo_LzGdT9UHod-F3JY9rhqXBOJMMuJ6voDUXtLiMEsfiVDsayB8Trm2RNSRnbOMrUCF_TPYSjSLUfLIZoY7kjAzGUQMhsyBlf4',
    date: '2026-05-15',
    verified: true,
    productName: 'Royal Kundan Choker'
  },
  {
    id: 'review-2',
    author: 'Priya Kapoor',
    rating: 5,
    content: "Viraasat jewelry is my go-to for daily office wear. Their minimalist collection is so lightweight and doesn't irritate my skin at all. Absolutely love it!",
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2qdujUrIrtsrPd4S-T6ynGIS53h9U28ge4tdZjRXSxa-J_ENY56iaGTYAoKNwHEGxGLOvEM-kU72OHumEageB9QBPpoJssuZxI2q8l6IkbIm2frYvJ2oHTvnBytY0IDxO4Ifk-lHo9yrhYkLNlh1xatzCr2LXrcuWNXQy7EvW8TlfFh4JBPg20VDIEm9F3eGqd-ieoLmDWLUEgRhAcRiTa2V7hDYHEbT6FdE-i_CxY0jrmIQksMpm',
    date: '2026-06-01',
    verified: true,
    productName: 'Minimalist Rose Cuff'
  },
  {
    id: 'review-3',
    author: 'Sonal Verma',
    rating: 5,
    content: "Fast delivery and beautiful packaging! It felt like I was opening a high-end luxury brand box. Perfect for gifting.",
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfwDW6oo0--g6pE8Pwtdbc39k_iCYXnyKDWCrqJlLGCLVL5ac981tzKy4fRPtzCbE_OfA3HBei0hj7nT-UbfeX7G43yweKAd2nNJZBYMm2FRLKjtWgvI9NdXRshs7KF8Fp5z2nvLFIOlTQ0VO-UAoNXBpDsJ0k9ZeMC4CF9js0LGJfRsG-xvrCB23Eq-vlqpan3zCZkAGgoqoNL3K09Rliy2WSKdDpmgGMzVapacByPdAYSNLDhHPq',
    date: '2026-06-10',
    verified: true,
    productName: 'Emerald Drop Jhumkas'
  }
];
