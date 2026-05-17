import Icon from "@/components/ui/icon";

interface PricingSectionProps {
  onBook: () => void;
  onBack: () => void;
}

const plans = [
  {
    id: "start",
    name: "Старт",
    subtitle: "Первый шаг",
    price: 3500,
    sessions: 1,
    color: "from-blue-500/20 to-teal-500/20",
    borderColor: "border-teal-500/20",
    icon: "Sprout",
    iconColor: "text-teal-400",
    features: [
      "1 индивидуальная сессия (50 мин)",
      "Видеозвонок или телефон",
      "Определение запроса",
      "Рекомендации по работе",
    ],
    cta: "Попробовать",
    popular: false,
  },
  {
    id: "course",
    name: "Курс",
    subtitle: "Глубокая работа",
    price: 12500,
    sessions: 4,
    color: "from-purple-500/25 to-pink-500/20",
    borderColor: "border-purple-500/40",
    icon: "Flame",
    iconColor: "text-purple-400",
    features: [
      "4 сессии (50 мин каждая)",
      "Приоритетное расписание",
      "Материалы между сессиями",
      "Поддержка в мессенджере",
      "Скидка 10% vs разовых",
    ],
    cta: "Выбрать курс",
    popular: true,
  },
  {
    id: "intensive",
    name: "Интенсив",
    subtitle: "Трансформация",
    price: 28000,
    sessions: 10,
    color: "from-amber-500/15 to-orange-500/15",
    borderColor: "border-amber-500/25",
    icon: "Zap",
    iconColor: "text-amber-400",
    features: [
      "10 сессий (50 мин каждая)",
      "Персональная программа",
      "Ежедневная поддержка",
      "Медитации и практики",
      "Итоговая рефлексия",
      "Скидка 20% vs разовых",
    ],
    cta: "Начать интенсив",
    popular: false,
  },
];

const methods = [
  { icon: "CreditCard", name: "Банковская карта" },
  { icon: "Smartphone", name: "СБП" },
  { icon: "Building2", name: "Юрлицо / счёт" },
  { icon: "Wallet", name: "ЮMoney" },
];

const PricingSection = ({ onBook, onBack }: PricingSectionProps) => {
  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <button onClick={onBack} className="glass border border-white/10 p-2.5 rounded-xl hover:border-white/20 transition-colors">
            <Icon name="ArrowLeft" size={18} className="text-white/70" />
          </button>
        </div>

        <div className="text-center mb-14">
          <h1 className="font-serif text-5xl font-light text-white mb-4">
            Тарифы и <span className="text-gradient">оплата</span>
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Выберите формат, который подходит для вашего запроса
          </p>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative glass bg-gradient-to-b ${plan.color} border ${plan.borderColor} rounded-3xl p-7 flex flex-col transition-all duration-300 hover:-translate-y-1 ${
                plan.popular ? "neon-glow" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold shadow-lg">
                  ✦ Популярный
                </div>
              )}

              <div className="flex items-center gap-3 mb-5">
                <div className={`w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center`}>
                  <Icon name={plan.icon} size={20} className={plan.iconColor} />
                </div>
                <div>
                  <div className="font-semibold text-white">{plan.name}</div>
                  <div className="text-white/50 text-xs">{plan.subtitle}</div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="font-serif text-4xl font-light text-white">{plan.price.toLocaleString()}</span>
                  <span className="text-white/60 text-lg">₽</span>
                </div>
                <div className="text-white/40 text-sm mt-1">
                  {plan.sessions > 1
                    ? `${plan.sessions} сессии · ${Math.round(plan.price / plan.sessions).toLocaleString()} ₽/сессия`
                    : "одна сессия"
                  }
                </div>
              </div>

              <ul className="space-y-2.5 flex-1 mb-7">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-white/70">
                    <div className="w-4 h-4 rounded-full bg-teal-500/20 border border-teal-500/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon name="Check" size={10} className="text-teal-400" />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={onBook}
                className={`w-full py-3.5 rounded-2xl font-semibold text-sm transition-all ${
                  plan.popular
                    ? "btn-primary"
                    : "glass border border-white/15 text-white hover:border-white/30 hover:bg-white/5"
                }`}
              >
                <span>{plan.cta}</span>
              </button>
            </div>
          ))}
        </div>

        {/* Payment section */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Payment methods */}
          <div className="glass border border-white/8 rounded-2xl p-7">
            <h2 className="font-serif text-2xl text-white font-light mb-6">
              Способы оплаты
            </h2>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {methods.map((m) => (
                <div key={m.name} className="flex items-center gap-3 p-3.5 rounded-xl bg-white/3 border border-white/8">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/20 flex items-center justify-center">
                    <Icon name={m.icon} size={16} className="text-purple-400" />
                  </div>
                  <span className="text-white/70 text-sm">{m.name}</span>
                </div>
              ))}
            </div>

            {/* Mock payment form */}
            <div className="space-y-4">
              <div>
                <label className="text-white/50 text-xs font-medium block mb-1.5">Номер карты</label>
                <div className="relative">
                  <input
                    disabled
                    placeholder="0000 0000 0000 0000"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/40 placeholder-white/25 text-sm pr-10"
                  />
                  <Icon name="CreditCard" size={16} className="text-white/30 absolute right-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-white/50 text-xs font-medium block mb-1.5">Срок</label>
                  <input disabled placeholder="MM / YY" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/40 placeholder-white/25 text-sm" />
                </div>
                <div>
                  <label className="text-white/50 text-xs font-medium block mb-1.5">CVV</label>
                  <input disabled placeholder="•••" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/40 placeholder-white/25 text-sm" />
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-purple-500/8 border border-purple-500/15">
                <Icon name="Lock" size={14} className="text-purple-400 shrink-0" />
                <span className="text-white/50 text-xs">Оплата защищена SSL-шифрованием</span>
              </div>
            </div>
          </div>

          {/* FAQ & guarantees */}
          <div className="space-y-4">
            <div className="glass border border-white/8 rounded-2xl p-6">
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <Icon name="ShieldCheck" size={18} className="text-teal-400" />
                Гарантии
              </h3>
              <div className="space-y-3">
                {[
                  { icon: "RefreshCw", text: "Перенос сессии за 24 часа — бесплатно" },
                  { icon: "XCircle", text: "Отмена за 24 часа — полный возврат" },
                  { icon: "Shield", text: "Конфиденциальность данных GDPR" },
                  { icon: "Star", text: "Не понравилось? Вернём деньги" },
                ].map((g) => (
                  <div key={g.text} className="flex items-start gap-3 text-sm">
                    <div className="w-7 h-7 rounded-lg bg-teal-500/15 border border-teal-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon name={g.icon} size={12} className="text-teal-400" />
                    </div>
                    <span className="text-white/60">{g.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass border border-white/8 rounded-2xl p-6">
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <Icon name="HelpCircle" size={18} className="text-purple-400" />
                Частые вопросы
              </h3>
              <div className="space-y-4">
                {[
                  { q: "Когда происходит оплата?", a: "После подтверждения записи специалистом." },
                  { q: "Можно ли оплатить по частям?", a: "Да, для пакетов от 4 сессий доступна рассрочка." },
                  { q: "Как получить чек?", a: "Чек придёт на email автоматически." },
                ].map((item) => (
                  <div key={item.q}>
                    <div className="text-white/80 text-sm font-medium mb-1">{item.q}</div>
                    <div className="text-white/45 text-xs leading-relaxed">{item.a}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
