import { useState } from "react";
import Icon from "@/components/ui/icon";

interface DashboardSectionProps {
  onBook: () => void;
}

const sessions = [
  {
    id: 1,
    date: "22 мая 2026",
    time: "18:00",
    type: "Индивидуальная сессия",
    status: "upcoming",
    duration: "50 мин",
    price: 3500,
  },
  {
    id: 2,
    date: "15 мая 2026",
    time: "19:30",
    type: "Индивидуальная сессия",
    status: "done",
    duration: "50 мин",
    price: 3500,
    note: "Проработали тему тревоги в отношениях. Домашнее задание: дневник мыслей.",
  },
  {
    id: 3,
    date: "8 мая 2026",
    time: "17:00",
    type: "Экспресс-сессия",
    status: "done",
    duration: "30 мин",
    price: 2000,
    note: "Кризисная поддержка. Техники заземления.",
  },
  {
    id: 4,
    date: "1 мая 2026",
    time: "18:00",
    type: "Индивидуальная сессия",
    status: "done",
    duration: "50 мин",
    price: 3500,
    note: "Первичная сессия, определение запроса. Цель: снижение тревожности.",
  },
];

const materials = [
  { icon: "FileText", title: "Дневник мыслей", desc: "Шаблон КПТ", tag: "практика" },
  { icon: "BookOpen", title: "Техники дыхания", desc: "PDF-инструкция", tag: "инструмент" },
  { icon: "Headphones", title: "Медитация 10 мин", desc: "Аудио для сна", tag: "аудио" },
];

const DashboardSection = ({ onBook }: DashboardSectionProps) => {
  const [activeTab, setActiveTab] = useState<"sessions" | "materials" | "profile">("sessions");

  const upcomingSession = sessions.find((s) => s.status === "upcoming");
  const pastSessions = sessions.filter((s) => s.status === "done");
  const totalSpent = pastSessions.reduce((acc, s) => acc + s.price, 0);

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Welcome */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-serif text-4xl font-light text-white mb-1">
              Добро пожаловать, <span className="text-gradient italic">Александра</span>
            </h1>
            <p className="text-white/50">Ваш личный кабинет</p>
          </div>
          <button onClick={onBook} className="btn-primary px-6 py-3 rounded-2xl font-semibold text-sm flex items-center gap-2">
            <Icon name="Plus" size={16} className="relative z-10" />
            <span>Новая запись</span>
          </button>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: "Calendar", label: "Всего сессий", value: sessions.length.toString(), color: "purple" },
            { icon: "CheckCircle", label: "Завершено", value: pastSessions.length.toString(), color: "teal" },
            { icon: "TrendingUp", label: "Недель в терапии", value: "3", color: "pink" },
            { icon: "Wallet", label: "Потрачено", value: `${totalSpent.toLocaleString()} ₽`, color: "amber" },
          ].map((stat) => (
            <div key={stat.label} className={`glass border border-white/8 rounded-2xl p-4 flex items-center gap-3`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                stat.color === "purple" ? "bg-purple-500/20 border border-purple-500/20" :
                stat.color === "teal" ? "bg-teal-500/20 border border-teal-500/20" :
                stat.color === "pink" ? "bg-pink-500/20 border border-pink-500/20" :
                "bg-amber-500/20 border border-amber-500/20"
              }`}>
                <Icon name={stat.icon} size={18} className={
                  stat.color === "purple" ? "text-purple-400" :
                  stat.color === "teal" ? "text-teal-400" :
                  stat.color === "pink" ? "text-pink-400" :
                  "text-amber-400"
                } />
              </div>
              <div>
                <div className="text-white font-semibold">{stat.value}</div>
                <div className="text-white/45 text-xs">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Upcoming session banner */}
        {upcomingSession && (
          <div className="glass border border-purple-500/25 neon-glow rounded-2xl p-5 mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Icon name="Video" size={20} className="text-white" />
              </div>
              <div>
                <div className="text-white/50 text-xs mb-0.5">Ближайшая сессия</div>
                <div className="text-white font-semibold">{upcomingSession.type}</div>
                <div className="text-purple-300 text-sm">{upcomingSession.date} · {upcomingSession.time} · {upcomingSession.duration}</div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="glass border border-white/15 px-4 py-2 rounded-xl text-white/70 text-sm font-medium hover:border-white/25 transition-colors flex items-center gap-2">
                <Icon name="RefreshCw" size={14} />
                Перенести
              </button>
              <button className="btn-primary px-5 py-2 rounded-xl text-sm font-semibold flex items-center gap-2">
                <Icon name="Video" size={14} className="relative z-10" />
                <span>Войти</span>
              </button>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 glass border border-white/8 rounded-2xl p-1 mb-6 w-fit">
          {[
            { key: "sessions" as const, label: "Сессии", icon: "Calendar" },
            { key: "materials" as const, label: "Материалы", icon: "BookOpen" },
            { key: "profile" as const, label: "Профиль", icon: "User" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === tab.key
                  ? "bg-gradient-to-r from-purple-500/30 to-pink-500/20 text-white border border-purple-500/30"
                  : "text-white/50 hover:text-white/80"
              }`}
            >
              <Icon name={tab.icon} size={14} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === "sessions" && (
          <div className="space-y-4">
            {sessions.map((session) => (
              <div
                key={session.id}
                className={`glass border rounded-2xl p-5 transition-all hover:border-white/12 ${
                  session.status === "upcoming"
                    ? "border-purple-500/25"
                    : "border-white/8"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      session.status === "upcoming"
                        ? "bg-purple-500/20 border border-purple-500/25"
                        : "bg-white/5 border border-white/8"
                    }`}>
                      <Icon name={session.status === "upcoming" ? "Clock" : "CheckCircle"} size={18} className={session.status === "upcoming" ? "text-purple-400" : "text-teal-400"} />
                    </div>
                    <div>
                      <div className="text-white font-medium">{session.type}</div>
                      <div className="text-white/50 text-sm">{session.date} · {session.time} · {session.duration}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      session.status === "upcoming"
                        ? "bg-purple-500/20 text-purple-300 border border-purple-500/25"
                        : "bg-teal-500/10 text-teal-400 border border-teal-500/20"
                    }`}>
                      {session.status === "upcoming" ? "Предстоит" : "Завершена"}
                    </span>
                    <span className="text-white/50 text-sm">{session.price.toLocaleString()} ₽</span>
                  </div>
                </div>
                {session.note && (
                  <div className="mt-3 p-3 rounded-xl bg-white/3 border border-white/6 text-sm text-white/55 leading-relaxed">
                    <span className="text-white/30 text-xs uppercase tracking-wide font-medium mr-2">Заметка:</span>
                    {session.note}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === "materials" && (
          <div className="grid md:grid-cols-3 gap-4">
            {materials.map((m) => (
              <div key={m.title} className="glass border border-white/8 rounded-2xl p-5 hover:border-purple-500/25 transition-all group cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/15 border border-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon name={m.icon} size={20} className="text-purple-400" />
                </div>
                <div className="text-white font-medium mb-1">{m.title}</div>
                <div className="text-white/50 text-sm mb-3">{m.desc}</div>
                <span className="px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/20 text-purple-300 text-xs font-medium">
                  {m.tag}
                </span>
              </div>
            ))}
            <div className="glass border border-dashed border-white/12 rounded-2xl p-5 flex flex-col items-center justify-center text-center min-h-40">
              <Icon name="Plus" size={24} className="text-white/30 mb-2" />
              <div className="text-white/40 text-sm">Новые материалы появятся после сессий</div>
            </div>
          </div>
        )}

        {activeTab === "profile" && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass border border-white/8 rounded-2xl p-7">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl font-bold text-white">А</div>
                <div>
                  <div className="text-white font-semibold text-lg">Александра Морозова</div>
                  <div className="text-purple-300/70 text-sm">Клиент с апреля 2026</div>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { label: "Email", value: "a.morozova@mail.ru", icon: "Mail" },
                  { label: "Телефон", value: "+7 (903) 123-45-67", icon: "Phone" },
                  { label: "Часовой пояс", value: "Москва (GMT+3)", icon: "Globe" },
                ].map((field) => (
                  <div key={field.label}>
                    <label className="text-white/40 text-xs font-medium uppercase tracking-wide block mb-1.5">{field.label}</label>
                    <div className="flex items-center gap-3 bg-white/3 border border-white/8 rounded-xl px-4 py-3">
                      <Icon name={field.icon} size={14} className="text-purple-400" />
                      <span className="text-white/80 text-sm">{field.value}</span>
                    </div>
                  </div>
                ))}
                <button className="w-full mt-2 py-3 rounded-xl glass border border-white/12 text-white/60 text-sm hover:border-white/20 hover:text-white/80 transition-all flex items-center justify-center gap-2">
                  <Icon name="Edit2" size={14} />
                  Редактировать профиль
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="glass border border-white/8 rounded-2xl p-6">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Icon name="Bell" size={16} className="text-purple-400" />
                  Уведомления
                </h3>
                <div className="space-y-3">
                  {[
                    { label: "Напоминание о сессии за 1 день", on: true },
                    { label: "Напоминание за 1 час", on: true },
                    { label: "Новые материалы", on: false },
                  ].map((n) => (
                    <div key={n.label} className="flex items-center justify-between">
                      <span className="text-white/60 text-sm">{n.label}</span>
                      <div className={`w-11 h-6 rounded-full border transition-colors cursor-pointer flex items-center ${n.on ? "bg-purple-500/40 border-purple-500/50" : "bg-white/5 border-white/15"}`}>
                        <div className={`w-4 h-4 rounded-full bg-white transition-transform mx-1 ${n.on ? "translate-x-5" : ""}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass border border-white/8 rounded-2xl p-6">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Icon name="CreditCard" size={16} className="text-purple-400" />
                  Оплата
                </h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-7 rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">VISA</span>
                  </div>
                  <div>
                    <div className="text-white text-sm">•••• •••• •••• 4291</div>
                    <div className="text-white/40 text-xs">Истекает 08/27</div>
                  </div>
                  <div className="ml-auto px-2 py-1 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs">Основная</div>
                </div>
                <button className="w-full py-2.5 rounded-xl glass border border-white/12 text-white/60 text-sm hover:border-white/20 transition-all flex items-center justify-center gap-2">
                  <Icon name="Plus" size={14} />
                  Добавить карту
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardSection;
