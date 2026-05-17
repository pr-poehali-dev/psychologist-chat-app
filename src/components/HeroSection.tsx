import Icon from "@/components/ui/icon";

interface HeroSectionProps {
  onBook: () => void;
  onPricing: () => void;
}

const stats = [
  { value: "1200+", label: "клиентов" },
  { value: "8 лет", label: "опыта" },
  { value: "4.9", label: "рейтинг" },
];

const features = [
  {
    icon: "ShieldCheck",
    title: "Конфиденциальность",
    desc: "Полная анонимность и защита данных",
  },
  {
    icon: "Video",
    title: "Онлайн-сессии",
    desc: "Видеозвонок из любой точки мира",
  },
  {
    icon: "Clock",
    title: "Гибкое расписание",
    desc: "Доступные слоты 7 дней в неделю",
  },
  {
    icon: "Award",
    title: "Сертифицированный специалист",
    desc: "Диплом КПТ, НЛП и гештальт-терапия",
  },
];

const HeroSection = ({ onBook, onPricing }: HeroSectionProps) => {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Decorative orbs */}
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-purple-600/15 blur-3xl animate-float pointer-events-none" />
        <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-pink-600/10 blur-3xl animate-float pointer-events-none" style={{ animationDelay: "-3s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-teal-600/5 blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center w-full">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-purple-500/20 mb-6 animate-fade-up">
              <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              <span className="text-sm text-white/70 font-medium">Психолог онлайн · Запись открыта</span>
            </div>

            <h1 className="font-serif text-5xl lg:text-7xl font-light leading-tight mb-6 animate-fade-up-delay-1">
              Пространство для{" "}
              <span className="text-gradient italic">внутреннего</span>{" "}
              роста
            </h1>

            <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-md animate-fade-up-delay-2">
              Индивидуальные сессии с опытным психологом. Безопасная среда для проработки тревоги, отношений и жизненных изменений.
            </p>

            <div className="flex flex-wrap gap-4 mb-12 animate-fade-up-delay-3">
              <button onClick={onBook} className="btn-primary px-8 py-4 rounded-2xl text-base font-semibold flex items-center gap-2">
                <span>Записаться на сессию</span>
                <Icon name="ArrowRight" size={18} className="relative z-10" />
              </button>
              <button
                onClick={onPricing}
                className="px-8 py-4 rounded-2xl text-base font-semibold glass border border-white/10 text-white/80 hover:text-white hover:border-white/20 transition-all duration-200 flex items-center gap-2"
              >
                <Icon name="CreditCard" size={18} />
                Тарифы
              </button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 animate-fade-up-delay-3">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-serif text-3xl font-semibold text-gradient-cool">{s.value}</div>
                  <div className="text-white/50 text-sm mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Psychologist card */}
          <div className="flex justify-center lg:justify-end animate-fade-up-delay-2">
            <div className="relative">
              {/* Main card */}
              <div className="glass neon-glow rounded-3xl p-8 w-80 border border-purple-500/20">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl font-serif font-bold text-white shadow-lg">
                    А
                  </div>
                  <div>
                    <div className="font-semibold text-white text-lg">Анна Соколова</div>
                    <div className="text-purple-300/80 text-sm">Клинический психолог</div>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Icon key={i} name="Star" size={12} className="text-amber-400 fill-amber-400" />
                      ))}
                      <span className="text-white/50 text-xs ml-1">4.9</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm text-white/70">
                    <div className="w-8 h-8 rounded-xl bg-teal-500/15 border border-teal-500/20 flex items-center justify-center">
                      <Icon name="GraduationCap" size={14} className="text-teal-400" />
                    </div>
                    МГУ, Психологический факультет
                  </div>
                  <div className="flex items-center gap-3 text-sm text-white/70">
                    <div className="w-8 h-8 rounded-xl bg-purple-500/15 border border-purple-500/20 flex items-center justify-center">
                      <Icon name="Clock" size={14} className="text-purple-400" />
                    </div>
                    8 лет практики
                  </div>
                  <div className="flex items-center gap-3 text-sm text-white/70">
                    <div className="w-8 h-8 rounded-xl bg-pink-500/15 border border-pink-500/20 flex items-center justify-center">
                      <Icon name="Heart" size={14} className="text-pink-400" />
                    </div>
                    КПТ, гештальт, НЛП
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-teal-500/10 border border-teal-500/20">
                  <span className="text-teal-300 text-sm font-medium">Ближайший слот</span>
                  <span className="text-white font-semibold text-sm">Сегодня, 18:00</span>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 glass border border-amber-400/20 px-4 py-2 rounded-2xl neon-glow-pink">
                <div className="text-amber-300 text-xs font-semibold">✦ Топ специалист</div>
              </div>

              {/* Online indicator */}
              <div className="absolute -bottom-4 -left-4 glass border border-teal-500/20 px-4 py-2 rounded-2xl flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                <span className="text-teal-300 text-xs font-semibold">Онлайн сейчас</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="font-serif text-4xl font-light text-white mb-3">
              Почему выбирают <span className="text-gradient">МайндСпейс</span>
            </h2>
            <p className="text-white/50 text-lg">Профессиональная поддержка в удобном формате</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="glass border border-white/5 rounded-2xl p-6 hover:border-purple-500/20 hover:neon-glow transition-all duration-300 group"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                  <Icon name={f.icon} size={20} className="text-purple-400" />
                </div>
                <div className="font-semibold text-white mb-2">{f.title}</div>
                <div className="text-white/50 text-sm leading-relaxed">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="glass border border-purple-500/20 neon-glow rounded-3xl p-12">
            <div className="text-5xl mb-4">🧠</div>
            <h2 className="font-serif text-4xl font-light text-white mb-4">
              Начните путь к себе
            </h2>
            <p className="text-white/60 text-lg mb-8 leading-relaxed">
              Первая консультация — знакомство и определение целей терапии. Без обязательств.
            </p>
            <button onClick={onBook} className="btn-primary px-10 py-4 rounded-2xl text-base font-semibold">
              <span>Записаться бесплатно</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
