import { Component, ElementRef, afterNextRender, inject, signal } from '@angular/core';

const INSTAGRAM_USER = 'vinicustodiio.personal';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly host = inject(ElementRef<HTMLElement>);

  protected readonly menuOpen = signal(false);
  protected readonly year = new Date().getFullYear();

  protected readonly instagramUser = INSTAGRAM_USER;
  /** Abre direto o direct (DM) do Instagram. */
  protected readonly directUrl = `https://ig.me/m/${INSTAGRAM_USER}`;
  protected readonly instagramUrl = `https://www.instagram.com/${INSTAGRAM_USER}/`;

  protected readonly nav = [
    { label: 'Início', href: '#inicio' },
    { label: 'Consultoria', href: '#consultoria' },
    { label: 'Como funciona', href: '#como-funciona' },
    { label: 'Resultados', href: '#resultados' },
    { label: 'Planos', href: '#planos' },
    { label: 'Depoimentos', href: '#depoimentos' },
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
    { icon: '📋', title: 'Avaliação inicial', text: 'Questionário sobre seus objetivos, histórico de treino, rotina e limitações.' },
    { icon: '🎯', title: 'Treino individualizado', text: 'Montado de acordo com os equipamentos e os dias que você tem disponíveis.' },
    { icon: '📱', title: 'Aplicativo com vídeos', text: 'Acesso ao app com todos os exercícios e vídeos explicativos.' },
    { icon: '📈', title: 'Progressão orientada', text: 'Séries, repetições, intervalos e progressão de cargas bem definidos.' },
    { icon: '💬', title: 'Suporte pelo WhatsApp', text: 'Tire suas dúvidas sobre o treinamento sempre que precisar.' },
    { icon: '🎥', title: 'Análise de vídeos', text: 'Envie seus vídeos e receba orientações sobre a execução dos exercícios.' },
    { icon: '🔄', title: 'Revisão do treino', text: 'Ajustes conforme a sua evolução e as suas necessidades.' },
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

  protected readonly plans = [
    { name: 'Mensal', duration: '1 mês', total: 'R$ 160', monthly: '160', note: 'Ideal para começar', featured: false },
    { name: 'Trimestral', duration: '3 meses', total: 'R$ 420', monthly: '140', note: 'Economia de R$ 60', featured: false },
    { name: 'Semestral', duration: '6 meses', total: 'R$ 780', monthly: '130', note: 'Economia de R$ 180', featured: true },
  ];

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

  constructor() {
    afterNextRender(() => {
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
    });
  }

  protected toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }
}
