import Icon from "@/components/ui/icon";

type Section = "home" | "booking" | "pricing" | "dashboard";

interface NavBarProps {
  activeSection: Section;
  onNavigate: (s: Section) => void;
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

const NavBar = ({ activeSection, onNavigate, isLoggedIn, onLogin, onLogout }: NavBarProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2 group"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center neon-glow">
            <Icon name="Brain" size={16} className="text-white" />
          </div>
          <span className="font-serif text-xl font-semibold text-white">МайндСпейс</span>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {[
            { key: "home" as Section, label: "Главная", icon: "Home" },
            { key: "booking" as Section, label: "Запись", icon: "Calendar" },
            { key: "pricing" as Section, label: "Тарифы", icon: "CreditCard" },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => onNavigate(item.key)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeSection === item.key
                  ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                  : "text-white/60 hover:text-white/90 hover:bg-white/5"
              }`}
            >
              <Icon name={item.icon} size={14} />
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <button
                onClick={() => onNavigate("dashboard")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeSection === "dashboard"
                    ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                  <span className="text-xs font-bold text-white">А</span>
                </div>
                <span className="hidden md:block">Кабинет</span>
              </button>
              <button
                onClick={onLogout}
                className="text-white/40 hover:text-white/70 transition-colors p-2"
              >
                <Icon name="LogOut" size={16} />
              </button>
            </>
          ) : (
            <button
              onClick={onLogin}
              className="btn-primary px-5 py-2 rounded-xl text-sm font-semibold"
            >
              <span>Войти</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
