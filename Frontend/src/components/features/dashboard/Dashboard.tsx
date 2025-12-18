import { Package, AlertTriangle, TrendingUp, Clock, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PRODUCTION_ORDERS } from '@/lib/apparel-data';

type DashboardProps = {
  onNavigate: (view: string) => void;
  language: 'en' | 'hi' | 'kn' | 'ta' | 'te' | 'mr' | 'gu' | 'pa';
};

export function Dashboard({ onNavigate, language }: DashboardProps) {
  const translations = {
    en: {
      title: 'Dashboard',
      liveOrders: 'Live Orders',
      shortages: 'Material Shortages',
      rework: 'Rework Alerts',
      onTime: 'On-Time Delivery',
      viewDetails: 'View Details',
      ordersInProgress: 'Orders in Progress',
      criticalShortages: 'Critical Shortages',
      reworkItems: 'Items in Rework',
      deliveryRate: 'This Month',
      recentActivity: 'Recent Activity',
      askBot: 'Ask the bot for more details'
    },
    hi: {
      title: 'डैशबोर्ड',
      liveOrders: 'लाइव ऑर्डर',
      shortages: 'सामग्री की कमी',
      rework: 'रीवर्क अलर्ट',
      onTime: 'समय पर डिलीवरी',
      viewDetails: 'विवरण देखें',
      ordersInProgress: 'प्रगति में आदेश',
      criticalShortages: 'गंभीर कमी',
      reworkItems: 'रीवर्क में आइटम',
      deliveryRate: 'इस महीने',
      recentActivity: 'हाल की गतिविधि',
      askBot: 'अधिक विवरण के लिए बॉट से पूछें'
    },
    kn: {
      title: 'ಡೈಶ್‌बೋರ್ಡ್',
      liveOrders: 'ಸ್ಥಿರ ಆರ್ಡರ್ಸ್',
      shortages: 'ಸಾಮಾನ್‍ಯ ಕೆಲಸ',
      rework: 'ರಿವರ್ಕ್ ಅಲರ್ಟ್',
      onTime: 'ಸಮಯದಿಷ್ಟ ಪರಿವಹನ',
      viewDetails: 'ವಿವರಣೆಗಳನ್ನು ನೋಡಿ',
      ordersInProgress: 'ವಿವರ್ತಿತ ಆರ್ಡರ್ಸ್',
      criticalShortages: 'ಸುರಖ್ಷಿತ ಕೆಲಸ',
      reworkItems: 'ರಿವರ್ಕ್ ಮೀಟ್ಸ್',
      deliveryRate: 'ಈ ಮಾಸ',
      recentActivity: 'ಕ್ರೀಡೆಯ ಕ್ರಿಯೆ',
      askBot: 'ಹೆಚ್ಚು ವಿವರಣೆಗಳನ್ನು ಬೋಟ್ ನಿಂದ ಕೇಳಿ'
    },
    ta: {
      title: 'டைஷ்போர்ட்',
      liveOrders: 'தற்போதைய ஆர்டர்கள்',
      shortages: 'விலக்ஷனம்',
      rework: 'மீட்சம் அலர்ட்கள்',
      onTime: 'நேர்காலம் பரிவahanம்',
      viewDetails: 'விவரங்களை பாருங்கள்',
      ordersInProgress: 'உருவாக்கியில் ஆர்டர்கள்',
      criticalShortages: 'முக்கிய விலக்ஷனம்',
      reworkItems: 'மீட்சம் பொருட்கள்',
      deliveryRate: 'இந்த மாதம்',
      recentActivity: 'சமீப கொடுக்கம்',
      askBot: 'மேலும் விவரங்களுக்கு போட்டானின் கேள்வி'
    },
    te: {
      title: 'డైష్‌బోర్డ్',
      liveOrders: 'ప్రతిసాహిత ఆర్డర్స్',
      shortages: 'ప్రయత్నిక కెలసం',
      rework: 'రీవర్క్ అలర్ట్',
      onTime: 'సమయం ప్రకటిత పరివహనం',
      viewDetails: 'వివరణలను చూడండి',
      ordersInProgress: 'ప్రకటిత ఆర్డర్స్',
      criticalShortages: 'సమాచారిక కెలసం',
      reworkItems: 'రీవర్క్ ప్రయత్నికం',
      deliveryRate: 'ఈ మాసం',
      recentActivity: 'సమీప కార్యకలాపం',
      askBot: 'మేలుమాత్రాల కోసం బోట్ నుండి ప్రశ్న'
    },
    mr: {
      title: 'डॅशबोर्ड',
      liveOrders: 'साकारात्मक आर्डर्स',
      shortages: 'कमी',
      rework: 'रीवर्क अलर्ट',
      onTime: 'समय पर डिलीवरी',
      viewDetails: 'विवरण देखें',
      ordersInProgress: 'प्रगति में आर्डर्स',
      criticalShortages: 'गंभीर कमी',
      reworkItems: 'रीवर्क में आइटम',
      deliveryRate: 'इस महीने',
      recentActivity: 'हाल की गतिविधि',
      askBot: 'अधिक विवरण के लिए बॉट से पूछें'
    },
    gu: {
      title: 'ડૈશબોર્ડ',
      liveOrders: 'લાઇવ આર્ડર્સ',
      shortages: 'માટેરિયલ કેલસ',
      rework: 'રીવર્ક અલર્ટ',
      onTime: 'સમય પર ડિલિવરી',
      viewDetails: 'વિવરણો દેખો',
      ordersInProgress: 'પ્રગતિમાં આર્ડર્સ',
      criticalShortages: 'ક્રિટિકલ કેલસ',
      reworkItems: 'રીવર્ક આઇટમ્સ',
      deliveryRate: 'આ મહિને',
      recentActivity: 'નિર્ણય કાર્ય',
      askBot: 'અધિક વિવરણ માટે બોટથી પુછો'
    },
    pa: {
      title: 'ਡੈਸ਼ਬੋਰਡ',
      liveOrders: 'ਲਾਈਵ ਆਰਡਰਜ਼',
      shortages: 'ਮਾਟੇਰਿਅਲ ਕੇਲਸ',
      rework: 'ਰੀਵਰਕ ਅਲਾਰਟ',
      onTime: 'ਸਮਾਨ ਸਮੇਂ ਪ੍ਰਦਾਨ',
      viewDetails: 'ਵਿਸਤਾਰਤ ਵਿਵਰਨਾਵਾਂ ਦੇਖੋ',
      ordersInProgress: 'ਵਿਕਾਸ ਵਿਚ ਆਰਡਰਜ਼',
      criticalShortages: 'ਕ੍ਰਿਟੀਕਲ ਕੇਲਸ',
      reworkItems: 'ਰੀਵਰਕ ਆਇਟਮਜ਼',
      deliveryRate: 'ਇਸ ਮਹੀਨੇ',
      recentActivity: 'ਨਿਰਣਤ ਕਾਰਨਾ',
      askBot: 'ਵਿਸਤਾਰਤ ਵਿਵਰਨਾਵਾਂ ਲਈ ਬੋਟ ਤੋਂ ਪੁਛੋ'
    }
  };

  const t = translations[language];

  const stats = [
    {
      title: t.liveOrders,
      value: '24',
      subtitle: t.ordersInProgress,
      icon: Package,
      color: 'bg-blue-500',
      trend: '+3 today'
    },
    {
      title: t.shortages,
      value: '5',
      subtitle: t.criticalShortages,
      icon: AlertTriangle,
      color: 'bg-red-500',
      trend: 'Action needed'
    },
    {
      title: t.rework,
      value: '12',
      subtitle: t.reworkItems,
      icon: Clock,
      color: 'bg-yellow-500',
      trend: '-2 from yesterday'
    },
    {
      title: t.onTime,
      value: '94%',
      subtitle: t.deliveryRate,
      icon: TrendingUp,
      color: 'bg-emerald-500',
      trend: '+2% vs last month'
    }
  ];

  const activities = [
    { text: language === 'en' ? 'PO-1001: 600 T-Shirts planned' : 'PO-1001: 600 टी-शर्ट योजनाबद्ध', time: '2m ago', type: 'info' },
    { text: language === 'en' ? 'Low stock: Cotton Fabric (800m remaining)' : 'कम स्टॉक: कॉटन फैब्रिक (800m शेष)', time: '15m ago', type: 'warning' },
    { text: language === 'en' ? 'PO-1002: 400 Hoodies planned' : 'PO-1002: 400 हुडी योजनाबद्ध', time: '1h ago', type: 'info' },
    { text: language === 'en' ? 'Material shortage: Check PO-1003' : 'सामग्री की कमी: PO-1003 जांचें', time: '2h ago', type: 'alert' }
  ];

  const activeOrders = PRODUCTION_ORDERS.filter(po => po.status === 'planned').length;

  return (
    <div className="space-y-6">
      <div>
        <h1>{t.title}</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <Card key={idx} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-zinc-600 mb-1">{stat.title}</p>
                <h2 className="mb-1">{stat.value}</h2>
                <p className="text-sm text-zinc-500">{stat.subtitle}</p>
                <p className="text-sm text-zinc-400 mt-2">{stat.trend}</p>
              </div>
              <div className={`${stat.color} text-white p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h3 className="mb-4">
          {language === 'en' ? 'Quick Actions' : 'त्वरित क्रियाएं'}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Button
            variant="outline"
            className="justify-start h-auto py-4"
            onClick={() => onNavigate('bom')}
          >
            <div className="text-left">
              <div>{language === 'en' ? 'Plan Materials' : 'सामग्री योजना'}</div>
              <div className="text-sm text-zinc-500 mt-1">
                {language === 'en' ? 'Create BOMs' : 'BOM बनाएं'}
              </div>
            </div>
          </Button>
          <Button
            variant="outline"
            className="justify-start h-auto py-4"
            onClick={() => onNavigate('orders')}
          >
            <div className="text-left">
              <div>{language === 'en' ? 'View Orders' : 'ऑर्डर देखें'}</div>
              <div className="text-sm text-zinc-500 mt-1">
                {language === 'en' ? 'Manage production' : 'उत्पादन प्रबंधित करें'}
              </div>
            </div>
          </Button>
          <Button
            variant="outline"
            className="justify-start h-auto py-4"
            onClick={() => onNavigate('wip')}
          >
            <div className="text-left">
              <div>{language === 'en' ? 'WIP Board' : 'WIP बोर्ड'}</div>
              <div className="text-sm text-zinc-500 mt-1">
                {language === 'en' ? 'Track progress' : 'प्रगति ट्रैक करें'}
              </div>
            </div>
          </Button>
          <Button
            variant="outline"
            className="justify-start h-auto py-4"
            onClick={() => onNavigate('qc')}
          >
            <div className="text-left">
              <div>{language === 'en' ? 'QC Check' : 'QC जांच'}</div>
              <div className="text-sm text-zinc-500 mt-1">
                {language === 'en' ? 'Quality control' : 'गुणवत्ता नियंत्रण'}
              </div>
            </div>
          </Button>
        </div>
      </Card>

      {/* Recent Activity */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3>{t.recentActivity}</h3>
          <Button variant="ghost" size="sm">
            {language === 'en' ? 'View All' : 'सभी देखें'}
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        <div className="space-y-3">
          {activities.map((activity) => (
            <div key={activity.text} className="flex items-start gap-3 p-3 bg-zinc-50 rounded-lg">
              <div
                className={`h-2 w-2 rounded-full mt-2 ${
                  activity.type === 'info'
                    ? 'bg-emerald-500'
                    : activity.type === 'warning'
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                }`}
              />
              <div className="flex-1 min-w-0">
                <p className="text-zinc-900">{activity.text}</p>
                <p className="text-sm text-zinc-500 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* AI Assistant Prompt */}
      <Card className="p-6 bg-gradient-to-r from-emerald-50 to-blue-50 border-emerald-200">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-emerald-600 flex items-center justify-center text-white">
            <Package className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-emerald-900">{t.askBot}</h3>
            <p className="text-emerald-700 mt-1">
              {language === 'en'
                ? 'Try: "Show me shortages" or "Transfer materials to Assembly"'
                : 'प्रयास करें: "मुझे कमी दिखाएं" या "असेंबली में सामग्री स्थानांतरित करें"'}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}