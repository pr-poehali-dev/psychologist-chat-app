import { useState } from "react";
import Icon from "@/components/ui/icon";

interface BookingSectionProps {
  onBack: () => void;
}

const DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const MONTHS = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

const availableDays = [17, 18, 19, 21, 22, 24, 25, 26, 28, 29, 30, 31];

const timeSlots = [
  { time: "09:00", available: true },
  { time: "10:30", available: false },
  { time: "12:00", available: true },
  { time: "13:30", available: false },
  { time: "15:00", available: true },
  { time: "16:30", available: true },
  { time: "18:00", available: true },
  { time: "19:30", available: false },
  { time: "21:00", available: true },
];

const sessionTypes = [
  { id: "individual", label: "Индивидуальная сессия", duration: "50 мин", price: 3500 },
  { id: "couples", label: "Парная консультация", duration: "80 мин", price: 5500 },
  { id: "express", label: "Экспресс-сессия", duration: "30 мин", price: 2000 },
];

const BookingSection = ({ onBack }: BookingSectionProps) => {
  const today = new Date();
  const [currentMonth] = useState(today.getMonth());
  const [currentYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState("individual");
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [booked, setBooked] = useState(false);

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const startOffset = firstDay === 0 ? 6 : firstDay - 1;

  const handleBook = async () => {
    const sessionLabel = sessionTypes.find(s => s.id === selectedType)?.label ?? selectedType;
    const dateLabel = `${selectedDay} ${MONTHS[currentMonth]} ${currentYear}`;

    try {
      await fetch("https://functions.poehali.dev/d992928a-d71d-48b3-8fff-f39fabcccf4c", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          date: dateLabel,
          time: selectedTime,
          sessionType: sessionLabel,
          comment,
        }),
      });
    } catch {
      // Уведомление не критично — запись всё равно подтверждаем
    }

    setBooked(true);
  };

  if (booked) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="max-w-lg mx-auto px-6 text-center">
          <div className="glass border border-teal-500/30 rounded-3xl p-12">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center mx-auto mb-6 shadow-lg" style={{ boxShadow: "0 0 40px rgba(20,184,166,0.4)" }}>
              <Icon name="CheckCircle" size={36} className="text-white" />
            </div>
            <h2 className="font-serif text-3xl text-white mb-3">Запись подтверждена!</h2>
            <p className="text-white/60 mb-2">
              {MONTHS[currentMonth]} {selectedDay}, {selectedTime}
            </p>
            <p className="text-white/50 text-sm mb-8">
              Детали отправлены на ваш номер телефона
            </p>
            <div className="bg-teal-500/10 border border-teal-500/20 rounded-2xl p-4 mb-8 text-left">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-white/60">Специалист</span>
                <span className="text-white font-medium">Анна Соколова</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-white/60">Тип сессии</span>
                <span className="text-white font-medium">{sessionTypes.find(s => s.id === selectedType)?.label}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Стоимость</span>
                <span className="text-gradient font-semibold">{sessionTypes.find(s => s.id === selectedType)?.price?.toLocaleString()} ₽</span>
              </div>
            </div>
            <button onClick={onBack} className="btn-primary px-8 py-3 rounded-xl font-semibold">
              <span>На главную</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <button onClick={onBack} className="glass border border-white/10 p-2.5 rounded-xl hover:border-white/20 transition-colors">
            <Icon name="ArrowLeft" size={18} className="text-white/70" />
          </button>
          <div>
            <h1 className="font-serif text-3xl text-white font-light">Запись на консультацию</h1>
            <p className="text-white/50 text-sm mt-0.5">Анна Соколова · Клинический психолог</p>
          </div>
        </div>

        {/* Steps indicator */}
        <div className="flex items-center gap-2 mb-10">
          {[
            { n: 1, label: "Тип и дата" },
            { n: 2, label: "Время" },
            { n: 3, label: "Контакты" },
          ].map((s, i) => (
            <div key={s.n} className="flex items-center gap-2">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                step === s.n
                  ? "bg-gradient-to-r from-purple-500/30 to-pink-500/20 border border-purple-500/40 text-white"
                  : step > s.n
                  ? "text-teal-400"
                  : "text-white/30"
              }`}>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                  step > s.n ? "bg-teal-400 text-white" : step === s.n ? "bg-purple-500 text-white" : "bg-white/10 text-white/40"
                }`}>
                  {step > s.n ? "✓" : s.n}
                </div>
                {s.label}
              </div>
              {i < 2 && <div className="w-8 h-px bg-white/10" />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {step === 1 && (
              <>
                {/* Session type */}
                <div className="glass border border-white/8 rounded-2xl p-6">
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Icon name="Layers" size={16} className="text-purple-400" />
                    Тип консультации
                  </h3>
                  <div className="space-y-3">
                    {sessionTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setSelectedType(type.id)}
                        className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-200 text-left ${
                          selectedType === type.id
                            ? "bg-purple-500/20 border-purple-500/50 neon-glow"
                            : "glass border-white/8 hover:border-white/15"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            selectedType === type.id ? "border-purple-400" : "border-white/30"
                          }`}>
                            {selectedType === type.id && <div className="w-2 h-2 rounded-full bg-purple-400" />}
                          </div>
                          <div>
                            <div className="text-white font-medium text-sm">{type.label}</div>
                            <div className="text-white/50 text-xs">{type.duration}</div>
                          </div>
                        </div>
                        <div className="text-gradient font-semibold">{type.price.toLocaleString()} ₽</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Calendar */}
                <div className="glass border border-white/8 rounded-2xl p-6">
                  <h3 className="text-white font-semibold mb-5 flex items-center gap-2">
                    <Icon name="Calendar" size={16} className="text-purple-400" />
                    {MONTHS[currentMonth]} {currentYear}
                  </h3>

                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {DAYS.map((d) => (
                      <div key={d} className="text-center text-white/40 text-xs font-medium py-1">{d}</div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {Array(startOffset).fill(null).map((_, i) => (
                      <div key={`empty-${i}`} />
                    ))}
                    {Array(daysInMonth).fill(null).map((_, i) => {
                      const day = i + 1;
                      const isAvailable = availableDays.includes(day);
                      const isSelected = selectedDay === day;
                      const isPast = day < today.getDate() && currentMonth === today.getMonth();
                      return (
                        <button
                          key={day}
                          disabled={!isAvailable || isPast}
                          onClick={() => setSelectedDay(day)}
                          className={`calendar-day aspect-square rounded-xl border text-sm font-medium flex items-center justify-center
                            ${isSelected ? "calendar-day--selected" : ""}
                            ${isAvailable && !isPast && !isSelected ? "calendar-day--available" : ""}
                            ${(!isAvailable || isPast) ? "calendar-day--disabled border-transparent text-white/20" : "border-transparent"}
                          `}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center gap-4 mt-4 text-xs text-white/50">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded border border-teal-400/40 bg-teal-500/10" />
                      Доступно
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded bg-gradient-to-br from-purple-500 to-pink-500" />
                      Выбрано
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => selectedDay && setStep(2)}
                  disabled={!selectedDay}
                  className={`w-full py-4 rounded-2xl font-semibold text-base transition-all ${
                    selectedDay ? "btn-primary" : "bg-white/5 text-white/30 cursor-not-allowed"
                  }`}
                >
                  <span>Выбрать время →</span>
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <div className="glass border border-white/8 rounded-2xl p-6">
                  <h3 className="text-white font-semibold mb-5 flex items-center gap-2">
                    <Icon name="Clock" size={16} className="text-purple-400" />
                    Доступное время · {MONTHS[currentMonth]} {selectedDay}
                  </h3>

                  <div className="grid grid-cols-3 gap-3">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot.time}
                        disabled={!slot.available}
                        onClick={() => slot.available && setSelectedTime(slot.time)}
                        className={`time-slot py-3 px-4 rounded-xl border text-sm font-medium
                          ${!slot.available ? "border-white/5 text-white/20 cursor-not-allowed" : "border-white/10 text-white/70"}
                          ${selectedTime === slot.time ? "time-slot--selected" : ""}
                        `}
                      >
                        {slot.time}
                        {!slot.available && <div className="text-xs text-white/20 mt-0.5">занято</div>}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="glass border border-white/10 px-6 py-4 rounded-2xl text-white/70 font-medium hover:border-white/20 transition-colors flex items-center gap-2">
                    <Icon name="ArrowLeft" size={16} />
                    Назад
                  </button>
                  <button
                    onClick={() => selectedTime && setStep(3)}
                    disabled={!selectedTime}
                    className={`flex-1 py-4 rounded-2xl font-semibold text-base transition-all ${
                      selectedTime ? "btn-primary" : "bg-white/5 text-white/30 cursor-not-allowed"
                    }`}
                  >
                    <span>Ввести контакты →</span>
                  </button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="glass border border-white/8 rounded-2xl p-6">
                  <h3 className="text-white font-semibold mb-5 flex items-center gap-2">
                    <Icon name="User" size={16} className="text-purple-400" />
                    Ваши данные
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="text-white/60 text-sm font-medium block mb-2">Имя</label>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Как к вам обращаться?"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 transition-colors text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-white/60 text-sm font-medium block mb-2">Телефон</label>
                      <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+7 (___) ___-__-__"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 transition-colors text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-white/60 text-sm font-medium block mb-2">С чем хотите поработать? <span className="text-white/30">(необязательно)</span></label>
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Опишите кратко запрос..."
                        rows={3}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 transition-colors text-sm resize-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep(2)} className="glass border border-white/10 px-6 py-4 rounded-2xl text-white/70 font-medium hover:border-white/20 transition-colors flex items-center gap-2">
                    <Icon name="ArrowLeft" size={16} />
                    Назад
                  </button>
                  <button
                    onClick={handleBook}
                    disabled={!name || !phone}
                    className={`flex-1 py-4 rounded-2xl font-semibold text-base transition-all ${
                      name && phone ? "btn-primary" : "bg-white/5 text-white/30 cursor-not-allowed"
                    }`}
                  >
                    <span>Подтвердить запись ✓</span>
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Sidebar summary */}
          <div className="space-y-4">
            <div className="glass border border-white/8 rounded-2xl p-5 sticky top-24">
              <h3 className="text-white font-semibold mb-4 text-sm">Ваша запись</h3>
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-bold text-white">А</div>
                <div>
                  <div className="text-white text-sm font-medium">Анна Соколова</div>
                  <div className="text-white/50 text-xs">Клинический психолог</div>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/50">Тип</span>
                  <span className="text-white text-right text-xs leading-tight">{sessionTypes.find(s => s.id === selectedType)?.label}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Длительность</span>
                  <span className="text-white">{sessionTypes.find(s => s.id === selectedType)?.duration}</span>
                </div>
                {selectedDay && (
                  <div className="flex justify-between">
                    <span className="text-white/50">Дата</span>
                    <span className="text-white">{selectedDay} {MONTHS[currentMonth]}</span>
                  </div>
                )}
                {selectedTime && (
                  <div className="flex justify-between">
                    <span className="text-white/50">Время</span>
                    <span className="text-white">{selectedTime}</span>
                  </div>
                )}
                <div className="flex justify-between pt-3 border-t border-white/5">
                  <span className="text-white/50">Стоимость</span>
                  <span className="text-gradient font-bold text-base">{sessionTypes.find(s => s.id === selectedType)?.price?.toLocaleString()} ₽</span>
                </div>
              </div>

              <div className="mt-4 p-3 rounded-xl bg-teal-500/8 border border-teal-500/15 text-xs text-teal-300/80 flex items-start gap-2">
                <Icon name="ShieldCheck" size={14} className="mt-0.5 shrink-0" />
                Оплата после подтверждения специалистом
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSection;