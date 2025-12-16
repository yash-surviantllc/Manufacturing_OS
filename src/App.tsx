import { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import {
  Dashboard,
  ProductionOrders,
  WorkingOrder,
  BOMPlanner,
  WIPBoard,
  MaterialTransfer,
  MaterialRequest,
  QCCheck,
  Inventory,
  GateEntry,
  GateExit,
  ChatBot,
  Login,
  UserProfile,
} from './components/features';
import type { UserData } from './components/features';
import { MobileNav } from './components/layout/MobileNav';
import { Button } from './components/ui/button';
import type { View, Language } from '@/types';

const viewToPath: Record<View, string> = {
  'dashboard': '/',
  'orders': '/orders',
  'working-order': '/working-order',
  'bom': '/bom',
  'wip': '/wip',
  'transfer': '/transfer',
  'material-request': '/material-request',
  'qc': '/qc',
  'inventory': '/inventory',
  'gate-entry': '/gate-entry',
  'gate-exit': '/gate-exit',
};

const pathToView: Record<string, View> = {
  '/': 'dashboard',
  '/orders': 'orders',
  '/working-order': 'working-order',
  '/bom': 'bom',
  '/wip': 'wip',
  '/transfer': 'transfer',
  '/material-request': 'material-request',
  '/qc': 'qc',
  '/inventory': 'inventory',
  '/gate-entry': 'gate-entry',
  '/gate-exit': 'gate-exit',
};

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentView = pathToView[location.pathname] || 'dashboard';

  const setCurrentView = (view: View | string) => {
    const path = viewToPath[view as View] || '/';
    navigate(path);
  };
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  const handleLogin = (username: string, _password: string) => {
    // In production, validate credentials against backend
    console.log('User logged in:', username);
    // Set mock user data - in production this would come from API
    setCurrentUser({
      name: username || 'John Doe',
      email: `${username.toLowerCase().replace(' ', '.')}@omnix.com`,
      mobile: '+91 98765 43210',
      role: 'Manager',
      department: 'Production',
      employeeId: 'EMP-001',
    });
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    navigate('/');
  };

  const translations = {
    en: {
      title: 'OMNIX',
      tagline: 'Precision at every step.',
      dashboard: 'Dashboard',
      orders: 'Production Orders',
      'working-order': 'Working Order',
      bom: 'BOM Planner',
      wip: 'WIP Board',
      transfer: 'Material Transfer',
      'material-request': 'Material Request',
      qc: 'QC Check',
      inventory: 'Inventory',
      'gate-entry': 'Gate Entry',
      'gate-exit': 'Gate Exit',
      selectLanguage: 'Select Language'
    },
    hi: {
      title: 'OMNIX',
      tagline: 'प्रत्येक चरण में सटीकता।',
      dashboard: 'डैशबोर्ड',
      orders: 'उत्पादन आदेश',
      'working-order': 'कार्य आदेश',
      bom: 'BOM योजनाकार',
      wip: 'WIP बोर्ड',
      transfer: 'सामग्री स्थानांतरण',
      'material-request': 'सामग्री अनुरोध',
      qc: 'QC जांच',
      inventory: 'सूची',
      'gate-entry': 'दरवाज़े प्रवेश',
      'gate-exit': 'दरवाज़े निकास',
      selectLanguage: 'भाषा चुनें'
    },
    kn: {
      title: 'OMNIX',
      tagline: 'ಪ್ರತಿ ಹಂತದಲ್ಲೂ ನಿಖರತೆ.',
      dashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
      orders: 'ಉತ್ಪಾದನಾ ಆದೇಶಗಳು',
      'working-order': 'ಕೆಲಸದ ಆದೇಶ',
      bom: 'BOM ಯೋಜಕ',
      wip: 'WIP ಬೋರ್ಡ್',
      transfer: 'ವಸ್ತು ವರ್ಗಾವಣೆ',
      'material-request': 'ವಸ್ತು ಅನುರೋಧ',
      qc: 'QC ಪರಿಶೀಲನೆ',
      inventory: 'ದಾಸ್ತಾನು',
      'gate-entry': 'ದರ್ವಾಜೆ ಪ್ರವೇಶ',
      'gate-exit': 'ದರ್ವಾಜೆ ನಿಕಾಸ',
      selectLanguage: 'ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ'
    },
    ta: {
      title: 'OMNIX',
      tagline: 'ஒவ்வொரு அடியிலும் துல்லியம்.',
      dashboard: 'டாஷ்போர்டு',
      orders: 'உற்பத்தி ஆர்டர்கள்',
      'working-order': 'வேலை ஆணை',
      bom: 'BOM திட்டமிடுபவர்',
      wip: 'WIP பலகை',
      transfer: 'பொருள் இடமாற்றம்',
      'material-request': 'பொருள் அனுமதி',
      qc: 'QC சரிபார்ப்பு',
      inventory: 'சரக்கு',
      'gate-entry': 'வாலை உள்ப входம்',
      'gate-exit': 'வாலை வெளிப் வெளியேற்பு',
      selectLanguage: 'மொழியைத் தேர்ந்தெடுக்கவும்'
    },
    te: {
      title: 'OMNIX',
      tagline: 'ప్రతి దశలో ఖచ్చితత్వం.',
      dashboard: 'డాష్‌బోర్డ్',
      orders: 'ఉత్పత్తి ఆర్డర్లు',
      'working-order': 'పని ఆదేశం',
      bom: 'BOM ప్లానర్',
      wip: 'WIP బోర్డ్',
      transfer: 'పదార్థ బదిలీ',
      'material-request': 'పదార్థ అనురోధం',
      qc: 'QC తనిఖీ',
      inventory: 'జాబితా',
      'gate-entry': 'వెలా ప్రవేశం',
      'gate-exit': 'వెలా నికాసం',
      selectLanguage: 'భాషను ఎంచుకోండి'
    },
    mr: {
      title: 'OMNIX',
      tagline: 'प्रत्येक टप्प्यावर अचूकता.',
      dashboard: 'डॅशबोर्ड',
      orders: 'उत्पादन ऑर्डर',
      'working-order': 'कार्य आदेश',
      bom: 'BOM नियोजक',
      wip: 'WIP बोर्ड',
      transfer: 'साहित्य हस्तांतरण',
      'material-request': 'सामग्री अनुरोध',
      qc: 'QC तपासणी',
      inventory: 'यादी',
      'gate-entry': 'दरवाज़े प्रवेश',
      'gate-exit': 'दरवाज़े निकास',
      selectLanguage: 'भाषा निवडा'
    },
    gu: {
      title: 'OMNIX',
      tagline: 'અન્ય પ્રત્યેક પાસે નિખરતા.',
      dashboard: 'ડેશબોર્ડ',
      orders: 'ઉત્પાદન ઓર્ડર',
      'working-order': 'કામનો ઓર્ડર',
      bom: 'BOM આયોજક',
      wip: 'WIP બોર્ડ',
      transfer: 'સામગ્રી સ્થાનાંતરણ',
      'material-request': 'સામગ્રી અનુરોધ',
      qc: 'QC તપાસ',
      inventory: 'સૂચિ',
      'gate-entry': 'દર્વાજે પ્રવેશ',
      'gate-exit': 'દર્વાજે નિકાસ',
      selectLanguage: 'ભાષા પસંદ કરો'
    },
    pa: {
      title: 'OMNIX',
      tagline: 'ਹਰ ਪਹਿਲਾਵੇ ਤੱਕ ਪ੍ਰਤੀਸ਼ਠਿਤਤਾ.',
      dashboard: 'ਡੈਸ਼ਬੋਰਡ',
      orders: 'ਉਤਪਾਦਨ ਆਰਡਰ',
      'working-order': 'ਕੰਮ ਦਾ ਆਦੇਸ਼',
      bom: 'BOM ਯੋਜਨਾਕਾਰ',
      wip: 'WIP ਬੋਰਡ',
      transfer: 'ਸਮੱਗਰੀ ਟ੍ਰਾਂਸਫਰ',
      'material-request': 'ਸਮੱਗਰੀ ਅਨੁਰੋਧ',
      qc: 'QC ਜਾਂਚ',
      inventory: 'ਸੂਚੀ',
      'gate-entry': 'ਦਰਵਾਜੇ ਪ੍ਰવੇਸ਼',
      'gate-exit': 'ਦਰਵਾਜੇ ਨਿਕਾਸ',
      selectLanguage: 'ਭਾਸ਼ਾ ਚੁਣੋ'
    }
  };

  const languageOptions = [
    { code: 'en' as Language, name: 'English' },
    { code: 'hi' as Language, name: 'हिंदी' },
    { code: 'kn' as Language, name: 'ಕನ್ನಡ' },
    { code: 'ta' as Language, name: 'தமிழ்' },
    { code: 'te' as Language, name: 'తెలుగు' },
    { code: 'mr' as Language, name: 'मराठी' },
    { code: 'gu' as Language, name: 'ગુજરાતી' },
    { code: 'pa' as Language, name: 'ਪੰਜਾਬੀ' }
  ];

  const t = translations[language];

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return (
      <Login
        onLogin={handleLogin}
        language={language}
        onLanguageChange={setLanguage}
      />
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col bg-zinc-900 text-white">
        <div className="flex flex-col h-20 justify-center border-b border-zinc-800 px-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded bg-emerald-500 flex items-center justify-center shrink-0">
              <span>O</span>
            </div>
            <div className="flex flex-col">
              <span className="tracking-wider">{t.title}</span>
              <span className="text-[10px] text-zinc-400 leading-none">{t.tagline}</span>
            </div>
          </div>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
          <NavButton active={currentView === 'dashboard'} onClick={() => setCurrentView('dashboard')}>
            {t.dashboard}
          </NavButton>
          <NavButton active={currentView === 'bom'} onClick={() => setCurrentView('bom')}>
            {t.bom}
          </NavButton>
          <NavButton active={currentView === 'orders'} onClick={() => setCurrentView('orders')}>
            {t.orders}
          </NavButton>
          <NavButton active={currentView === 'working-order'} onClick={() => setCurrentView('working-order')}>
            {t['working-order']}
          </NavButton>
          <NavButton active={currentView === 'wip'} onClick={() => setCurrentView('wip')}>
            {t.wip}
          </NavButton>
          <NavButton active={currentView === 'transfer'} onClick={() => setCurrentView('transfer')}>
            {t.transfer}
          </NavButton>
          <NavButton active={currentView === 'material-request'} onClick={() => setCurrentView('material-request')}>
            {t['material-request']}
          </NavButton>
          <NavButton active={currentView === 'qc'} onClick={() => setCurrentView('qc')}>
            {t.qc}
          </NavButton>
          <NavButton active={currentView === 'inventory'} onClick={() => setCurrentView('inventory')}>
            {t.inventory}
          </NavButton>
          <NavButton active={currentView === 'gate-entry'} onClick={() => setCurrentView('gate-entry')}>
            {t['gate-entry']}
          </NavButton>
          <NavButton active={currentView === 'gate-exit'} onClick={() => setCurrentView('gate-exit')}>
            {t['gate-exit']}
          </NavButton>
        </nav>
        <div className="border-t border-zinc-800 p-4">
          <div className="relative">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
            >
              {languageOptions.find(l => l.code === language)?.name}
            </Button>
            {showLanguageMenu && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-zinc-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
                {languageOptions.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setShowLanguageMenu(false);
                    }}
                    className={`w-full text-left px-4 py-3 hover:bg-zinc-100 transition-colors ${
                      language === lang.code ? 'bg-emerald-50 text-emerald-900' : 'text-zinc-900'
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* User Profile Section */}
        {currentUser && (
          <div className="border-t border-zinc-800 p-3">
            <UserProfile
              user={currentUser}
              language={language}
              onLogout={handleLogout}
              isCompact={true}
            />
          </div>
        )}
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 h-16 bg-zinc-900 text-white flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded bg-emerald-500 flex items-center justify-center shrink-0">
            <span>O</span>
          </div>
          <div className="flex flex-col">
            <span className="tracking-wider">{t.title}</span>
            <span className="text-[9px] text-zinc-400 leading-none">{t.tagline}</span>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-30 bg-zinc-900 text-white pt-16 overflow-y-auto">
          <nav className="flex flex-col p-4 space-y-2">
            <MobileNavButton
              active={currentView === 'dashboard'}
              onClick={() => {
                setCurrentView('dashboard');
                setIsMobileMenuOpen(false);
              }}
            >
              {t.dashboard}
            </MobileNavButton>
            <MobileNavButton
              active={currentView === 'bom'}
              onClick={() => {
                setCurrentView('bom');
                setIsMobileMenuOpen(false);
              }}
            >
              {t.bom}
            </MobileNavButton>
            <MobileNavButton
              active={currentView === 'orders'}
              onClick={() => {
                setCurrentView('orders');
                setIsMobileMenuOpen(false);
              }}
            >
              {t.orders}
            </MobileNavButton>
            <MobileNavButton
              active={currentView === 'working-order'}
              onClick={() => {
                setCurrentView('working-order');
                setIsMobileMenuOpen(false);
              }}
            >
              {t['working-order']}
            </MobileNavButton>
            <MobileNavButton
              active={currentView === 'wip'}
              onClick={() => {
                setCurrentView('wip');
                setIsMobileMenuOpen(false);
              }}
            >
              {t.wip}
            </MobileNavButton>
            <MobileNavButton
              active={currentView === 'transfer'}
              onClick={() => {
                setCurrentView('transfer');
                setIsMobileMenuOpen(false);
              }}
            >
              {t.transfer}
            </MobileNavButton>
            <MobileNavButton
              active={currentView === 'material-request'}
              onClick={() => {
                setCurrentView('material-request');
                setIsMobileMenuOpen(false);
              }}
            >
              {t['material-request']}
            </MobileNavButton>
            <MobileNavButton
              active={currentView === 'qc'}
              onClick={() => {
                setCurrentView('qc');
                setIsMobileMenuOpen(false);
              }}
            >
              {t.qc}
            </MobileNavButton>
            <MobileNavButton
              active={currentView === 'inventory'}
              onClick={() => {
                setCurrentView('inventory');
                setIsMobileMenuOpen(false);
              }}
            >
              {t.inventory}
            </MobileNavButton>
            <MobileNavButton
              active={currentView === 'gate-entry'}
              onClick={() => {
                setCurrentView('gate-entry');
                setIsMobileMenuOpen(false);
              }}
            >
              {t['gate-entry']}
            </MobileNavButton>
            <MobileNavButton
              active={currentView === 'gate-exit'}
              onClick={() => {
                setCurrentView('gate-exit');
                setIsMobileMenuOpen(false);
              }}
            >
              {t['gate-exit']}
            </MobileNavButton>
            <div className="pt-4">
              <div className="relative">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                >
                  {languageOptions.find(l => l.code === language)?.name}
                </Button>
                {showLanguageMenu && (
                  <div className="bg-white border border-zinc-200 rounded-lg shadow-lg max-h-64 overflow-y-auto mt-2">
                    {languageOptions.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setShowLanguageMenu(false);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 hover:bg-zinc-100 transition-colors ${
                          language === lang.code ? 'bg-emerald-50 text-emerald-900' : 'text-zinc-900'
                        }`}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Mobile User Profile */}
            {currentUser && (
              <div className="pt-4 border-t border-zinc-700 mt-4">
                <UserProfile
                  user={currentUser}
                  language={language}
                  onLogout={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  isCompact={true}
                />
              </div>
            )}
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="lg:pl-64 pt-16 lg:pt-0">
        <div className="p-4 lg:p-8 pb-24 lg:pb-8">
          <Routes>
            <Route path="/" element={<Dashboard onNavigate={setCurrentView} language={language} />} />
            <Route path="/orders" element={<ProductionOrders language={language} />} />
            <Route path="/working-order" element={<WorkingOrder language={language} />} />
            <Route path="/bom" element={<BOMPlanner language={language} />} />
            <Route path="/wip" element={<WIPBoard language={language} />} />
            <Route path="/transfer" element={<MaterialTransfer language={language} />} />
            <Route path="/material-request" element={<MaterialRequest language={language} />} />
            <Route path="/qc" element={<QCCheck language={language} />} />
            <Route path="/inventory" element={<Inventory language={language} />} />
            <Route path="/gate-entry" element={<GateEntry language={language} />} />
            <Route path="/gate-exit" element={<GateExit language={language} />} />
            <Route path="*" element={<Dashboard onNavigate={setCurrentView} language={language} />} />
          </Routes>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileNav currentView={currentView} onNavigate={setCurrentView} language={language} />

      {/* ChatBot */}
      <ChatBot
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
        language={language}
        onNavigate={setCurrentView}
      />
    </div>
  );
}

function NavButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
        active ? 'bg-emerald-600 text-white' : 'text-zinc-300 hover:bg-zinc-800'
      }`}
    >
      {children}
    </button>
  );
}

function MobileNavButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-4 rounded-lg transition-colors ${
        active ? 'bg-emerald-600 text-white' : 'text-zinc-300 hover:bg-zinc-800'
      }`}
    >
      {children}
    </button>
  );
}