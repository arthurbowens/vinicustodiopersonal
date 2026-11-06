import {
  Component,
  DOCUMENT,
  DestroyRef,
  ElementRef,
  HostListener,
  afterNextRender,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { Icon } from './icon';

const INSTAGRAM_USER = 'vinicustodiio.personal';
const WHATSAPP_NUMBER = '556285034081'; // +55 62 8503-4081
const WHATSAPP_DISPLAY = '(62) 8503-4081';
const WHATSAPP_MESSAGE = 'Olá, Vinícius! Quero começar a Consultoria On-line. Meu objetivo é: ';

function whatsappUrl(text: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

@Component({
  selector: 'app-root',
  imports: [Icon],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);

  private readonly track = viewChild<ElementRef<HTMLElement>>('track');

  protected readonly menuOpen = signal(false);
  protected readonly activeSlide = signal(0);
  protected readonly year = new Date().getFullYear();

  protected readonly instagramUser = INSTAGRAM_USER;
  protected readonly instagramUrl = `https://www.instagram.com/${INSTAGRAM_USER}/`;
  protected readonly whatsappDisplay = WHATSAPP_DISPLAY;
  protected readonly whatsappUrl = whatsappUrl(WHATSAPP_MESSAGE);

  protected readonly nav = [
    { label: 'Consultoria', href: '#consultoria' },
    { label: 'Como funciona', href: '#como-funciona' },
    { label: 'Resultados', href: '#resultados' },
    { label: 'Planos', href: '#planos' },
    { label: 'Dúvidas', href: '#duvidas' },
  ];

  protected readonly goals = ['Emagrecimento', 'Hipertrofia', 'Saúde', 'Condicionamento', 'Qualidade de vida'];

  protected readonly pains = [
    'Você treina, mas não sabe se está fazendo o certo.',
    'Repete sempre os mesmos exercícios e parou de evoluir.',
    'Não sabe quando nem quanto aumentar a carga.',
    'Tem pouco tempo e sente que desperdiça o treino.',
    'Tem medo de se machucar pela execução errada.',
  ];

  protected readonly included = [
    { icon: 'clipboard', title: 'Avaliação inicial', text: 'Questionário sobre seus objetivos, histórico de treino, rotina e limitações.' },
    { icon: 'target', title: 'Treino individualizado', text: 'Montado de acordo com os equipamentos e os dias que você tem disponíveis.' },
    { icon: 'smartphone', title: 'Aplicativo com vídeos', text: 'Acesso ao app com todos os exercícios e vídeos explicativos.' },
    { icon: 'trending-up', title: 'Progressão orientada', text: 'Séries, repetições, intervalos e progressão de cargas bem definidos.' },
    { icon: 'whatsapp', title: 'Suporte pelo WhatsApp', text: 'Tire suas dúvidas sobre o treinamento sempre que precisar.' },
    { icon: 'video', title: 'Análise de vídeos', text: 'Envie seus vídeos e receba orientações sobre a execução dos exercícios.' },
    { icon: 'refresh', title: 'Revisão do treino', text: 'Ajustes conforme a sua evolução e as suas necessidades.' },
  ];

  protected readonly appFeatures = [
    { icon: 'video', title: 'Vídeo de cada exercício', text: 'Veja a execução correta antes de começar a série.' },
    { icon: 'clipboard', title: 'Treino do dia organizado', text: 'Séries, repetições, intervalos e cargas na ordem certa.' },
    { icon: 'trending-up', title: 'Sua evolução registrada', text: 'Anote as cargas e acompanhe a sua progressão treino após treino.' },
    { icon: 'refresh', title: 'Ajustes direto no app', text: 'Quando o treino é revisado, a nova versão chega no seu celular.' },
  ];

  /** Exemplo ilustrativo exibido no celular da seção do app. */
  protected readonly appWorkout = [
    { name: 'Agachamento livre', sets: '4 × 10 · 90s', done: true },
    { name: 'Leg press 45°', sets: '4 × 12 · 60s', done: true },
    { name: 'Cadeira extensora', sets: '3 × 15 · 45s', done: false },
    { name: 'Stiff com halteres', sets: '3 × 12 · 60s', done: false },
  ];

  protected readonly steps = [
    { n: '01', title: 'Escolha e avaliação', text: 'Você escolhe o plano e preenche a avaliação inicial.' },
    { n: '02', title: 'Elaboração', text: 'Eu elaboro o seu treinamento com base nas suas informações.' },
    { n: '03', title: 'Início', text: 'Você recebe o treino pelo aplicativo e começa o acompanhamento.' },
    { n: '04', title: 'Ajustes e evolução', text: 'Avaliamos sua adaptação, dificuldades e evolução para ajustar o treino.' },
  ];

  protected readonly audience = [
    { title: 'Quer emagrecer', text: 'Com um treino organizado e progressivo, que cabe na sua rotina.' },
    { title: 'Quer ganhar massa', text: 'Com volume, cargas e progressão pensados para hipertrofia.' },
    { title: 'Está começando', text: 'Com segurança, respeitando seu nível e aprendendo a execução correta.' },
    { title: 'Parou de evoluir', text: 'Com uma estratégia nova para sair da estagnação.' },
  ];

  /**
   * Fotos em public/ (já recortadas sem o rosto). Se `after` existir, as duas ficam lado a lado.
   * `beforePos`/`afterPos` = object-position para centralizar a pessoa no enquadramento.
   */
  protected readonly results = [
    { before: 'resultado1.jpeg', after: '', alt: 'Resultado de aluna 1', beforePos: 'center', afterPos: '' },
    { before: 'resultado2.jpeg', after: '', alt: 'Resultado de aluna 2', beforePos: 'center', afterPos: '' },
    { before: 'resultado3antes.jpeg', after: 'resultado3dps.jpeg', alt: 'Resultado de aluna 3', beforePos: '80% center', afterPos: '53% center' },
  ];

  /** Depoimentos reais de alunas (texto enviado por elas, só com ajustes de pontuação). */
  protected readonly testimonials = [
    {
      name: 'Maria Auxiliadora',
      initials: 'MA',
      role: 'Aluna',
      text: [
        'Falar do seu trabalho é falar de profissionalismo, dedicação e, principalmente, de muito alto astral! ✨💪',
        'Cada treino é diferente, desafiador e, ao mesmo tempo, leve e prazeroso. Sua energia contagiante, seu incentivo constante e a forma como você acompanha cada detalhe fazem toda a diferença.',
        'Você não entrega apenas um treino: entrega motivação, confiança e vontade de superar limites. É aquele profissional que consegue transformar a obrigação de treinar em um momento que a gente realmente espera chegar.',
        'Parabéns pelo excelente trabalho, pela competência e por colocar tanta energia e alegria em tudo o que faz! Quem treina com você sabe o quanto faz diferença ter um profissional tão dedicado e alto astral ao nosso lado. 👏🏼🏋️‍♀️✨',
      ],
    },
    {
      name: 'Jordana',
      initials: 'J',
      role: 'Aluna',
      text: [
        'Muito satisfeita com meus resultados! O Vinícius é um profissional de excelência, dedicado, muito prestativo, cauteloso, sempre elabora meu plano de treino dentro das minhas limitações!',
        'Sempre me cobra sabendo que eu consigo, sem nem mesmo eu acreditar! Observador e muito preciso nas execuções, nunca sinto nada mais que dores musculares, que é o primordial e esperado a cada treino!',
        'Com a ajuda do Vinícius eu recuperei minha saúde mental e minha autoestima! E digo mais: estamos apenas no começo. Com um profissional desse me acompanhando, sei que posso conseguir muito mais! Projeto em construção!',
        'Sou muito grata a ele por todo o carinho e dedicação com que cuida de mim!',
      ],
    },
  ];

  protected readonly plans = [
    { name: 'Mensal', duration: '1 mês', total: 'R$ 160', monthly: '160', note: 'Ideal para começar', featured: false },
    { name: 'Trimestral', duration: '3 meses', total: 'R$ 420', monthly: '140', note: 'Economia de R$ 60', featured: false },
    { name: 'Semestral', duration: '6 meses', total: 'R$ 780', monthly: '130', note: 'Economia de R$ 180', featured: true },
  ].map((p) => ({
    ...p,
    url: whatsappUrl(`Olá, Vinícius! Tenho interesse no plano ${p.name} da Consultoria On-line. Meu objetivo é: `),
  }));

  protected readonly faq = [
    {
      q: 'Preciso treinar em academia?',
      a: 'Não necessariamente. O treino é montado de acordo com os equipamentos que você tem disponíveis.',
    },
    {
      q: 'Sou iniciante. Posso fazer a consultoria?',
      a: 'Pode, sim. O treinamento respeita o seu nível, o seu histórico e as suas limitações, com foco em organização, segurança e progressão.',
    },
    {
      q: 'Como eu recebo o treino?',
      a: 'Pelo aplicativo, com todos os exercícios, vídeos explicativos e as orientações de séries, repetições, intervalos e cargas.',
    },
    {
      q: 'E se eu tiver dúvidas na execução?',
      a: 'Você tem suporte pelo WhatsApp e pode enviar vídeos dos exercícios para receber orientações sobre a execução.',
    },
    {
      q: 'O treino muda ao longo do plano?',
      a: 'Sim. Avaliamos sua adaptação e evolução e o treino é revisado conforme a sua necessidade.',
    },
    {
      q: 'Qual a diferença entre os planos?',
      a: 'Todos incluem o mesmo acompanhamento. Os períodos maiores têm valor mensal menor e dão mais tempo para desenvolver o treinamento.',
    },
  ];

  private autoplayId: ReturnType<typeof setInterval> | undefined;
  private autoplayPaused = false;
  private scrollRaf = 0;

  constructor() {
    afterNextRender(() => {
      this.setupReveal();
      this.startAutoplay();
    });
    this.destroyRef.onDestroy(() => {
      clearInterval(this.autoplayId);
      this.lockScroll(false);
    });
  }

  // ---------- Menu mobile ----------
  protected toggleMenu(): void {
    this.menuOpen.update((v) => !v);
    this.lockScroll(this.menuOpen());
  }

  protected closeMenu(): void {
    if (!this.menuOpen()) return;
    this.menuOpen.set(false);
    this.lockScroll(false);
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    this.closeMenu();
  }

  @HostListener('window:resize')
  protected onResize(): void {
    if (window.innerWidth > 1180) this.closeMenu();
  }

  private lockScroll(lock: boolean): void {
    this.document.body.style.overflow = lock ? 'hidden' : '';
  }

  // ---------- Carrossel de resultados ----------
  protected goTo(index: number, smooth = true): void {
    const track = this.track()?.nativeElement;
    if (!track) return;
    const count = this.results.length;
    const i = ((index % count) + count) % count;
    const slide = track.children[i] as HTMLElement | undefined;
    if (!slide) return;
    const left = slide.offsetLeft - (track.clientWidth - slide.clientWidth) / 2;
    track.scrollTo({ left, behavior: smooth ? 'smooth' : 'auto' });
    this.activeSlide.set(i);
  }

  protected prev(): void {
    this.goTo(this.activeSlide() - 1);
    this.restartAutoplay();
  }

  protected next(): void {
    this.goTo(this.activeSlide() + 1);
    this.restartAutoplay();
  }

  protected select(i: number): void {
    this.goTo(i);
    this.restartAutoplay();
  }

  protected onTrackScroll(): void {
    cancelAnimationFrame(this.scrollRaf);
    this.scrollRaf = requestAnimationFrame(() => {
      const track = this.track()?.nativeElement;
      if (!track) return;
      const center = track.scrollLeft + track.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      Array.from(track.children).forEach((el, i) => {
        const s = el as HTMLElement;
        const dist = Math.abs(s.offsetLeft + s.clientWidth / 2 - center);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      this.activeSlide.set(best);
    });
  }

  protected pauseAutoplay(paused: boolean): void {
    this.autoplayPaused = paused;
  }

  private startAutoplay(): void {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    clearInterval(this.autoplayId);
    this.autoplayId = setInterval(() => {
      if (!this.autoplayPaused && !this.document.hidden) this.goTo(this.activeSlide() + 1);
    }, 4500);
  }

  private restartAutoplay(): void {
    if (this.autoplayId !== undefined) this.startAutoplay();
  }

  // ---------- Animação ao rolar ----------
  private setupReveal(): void {
    const root = this.host.nativeElement as HTMLElement;
    const items = root.querySelectorAll<HTMLElement>('.reveal');
    if (!('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('visible'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12 },
    );
    items.forEach((el) => io.observe(el));
    this.destroyRef.onDestroy(() => io.disconnect());
  }
}
