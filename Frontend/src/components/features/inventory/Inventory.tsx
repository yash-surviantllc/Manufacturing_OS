import { Search, QrCode, Filter, Package, ArrowUpDown, AlertTriangle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { INVENTORY_STOCK } from '@/lib/apparel-data';

type InventoryProps = {
  language: 'en' | 'hi' | 'kn' | 'ta' | 'te' | 'mr' | 'gu' | 'pa';
};

export function Inventory({ language }: InventoryProps) {
  const translations = {
    en: {
      title: 'Inventory',
      search: 'Search materials...',
      filter: 'Filter',
      materialCode: 'Material Code',
      material: 'Material',
      available: 'Available',
      allocated: 'Allocated',
      free: 'Free Stock',
      location: 'Location',
      status: 'Status',
      reorderLevel: 'Reorder Level',
      lowStock: 'Low Stock',
      sufficient: 'Sufficient',
      critical: 'Critical',
      unit: 'Unit'
    },
    hi: {
      title: 'सूची',
      search: 'सामग्री खोजें...',
      filter: 'फ़िल्टर',
      materialCode: 'सामग्री कोड',
      material: 'सामग्री',
      available: 'उपलब्ध',
      allocated: 'आवंटित',
      free: 'मुक्त स्टॉक',
      location: 'स्थान',
      status: 'स्थिति',
      reorderLevel: 'पुन: ऑर्डर स्तर',
      lowStock: 'कम स्टॉक',
      sufficient: 'पर्याप्त',
      critical: 'गंभीर',
      unit: 'यूनिट'
    },
    kn: {
      title: 'توجಾರಿ',
      search: 'ಸಾಮಾನಗಳನ್ನು ಹುಡುಕಿ...',
      filter: 'ಶೋಧನೆ',
      materialCode: 'ಸಾಮಾನ ಕೋಡ್',
      material: 'ಸಾಮಾನ',
      available: 'उपलब्ध',
      allocated: 'ವಿಭಾಜಿತ',
      free: 'ಸ್ವತಂತ್ರ ಸ್ಟಾಕ್',
      location: 'ಸ್ಥಾನ',
      status: 'ಸ್ಥಿತಿ',
      reorderLevel: 'ಪುನರಾರ್ಡರ್ ಸ್ಥಾನ',
      lowStock: 'ಕಡಿಮೆ ಸ್ಟಾಕ್',
      sufficient: 'पर्याप्त',
      critical: 'गंभीर',
      unit: 'ಯೂನಿಟ್'
    },
    ta: {
      title: 'சரக்கு',
      search: 'சாமன்களை தேடு...',
      filter: 'பிலாட்டர்',
      materialCode: 'பொருள் குறியீடு',
      material: 'சாமனம்',
      available: 'उपलब्ध',
      allocated: 'விதிநिर्धாரித',
      free: 'தொகுப்பு மூலம்',
      location: 'இடம்',
      status: 'நிலை',
      reorderLevel: 'மீட்டு மேல்',
      lowStock: 'குறைந்த தொகுப்பு',
      sufficient: 'பரம்பரைய',
      critical: 'கритிகல்',
      unit: 'அலகு'
    },
    te: {
      title: 'సమావేశం',
      search: 'సమానాలను శోధించు...',
      filter: 'ఫిల్టర్',
      materialCode: 'మెటీరియల్ కోడ్',
      material: 'సమానం',
      available: 'ఉపపడిన',
      allocated: 'విభాజితం',
      free: 'ముక్త స్టాక్',
      location: 'స్థానం',
      status: 'స్థితి',
      reorderLevel: 'పునరార్డర్ స్థానం',
      lowStock: 'కానీసం స్టాక్',
      sufficient: 'పరిమాణం',
      critical: 'క్రిటికల్',
      unit: 'అలకా'
    },
    mr: {
      title: 'संचय',
      search: 'सामग्री शोधा...',
      filter: 'फळ्टर',
      materialCode: 'सामग्री कोड',
      material: 'सामग्री',
      available: 'उपलब्ध',
      allocated: 'विभाजित',
      free: 'मुक्त स्टॉक',
      location: 'स्थान',
      status: 'स्थिति',
      reorderLevel: 'पुनरार्डर स्तर',
      lowStock: 'कम स्टॉक',
      sufficient: 'पर्याप्त',
      critical: 'गंभीर',
      unit: 'यूनिट'
    },
    gu: {
      title: 'સ્થોલ',
      search: 'માટેરિયલ્સ શોધો...',
      filter: 'ફિલ્ટર',
      materialCode: 'સામગ્રી કોડ',
      material: 'માટેરિયલ',
      available: 'ઉપલબ્ધ',
      allocated: 'અનુદાન',
      free: 'મુક્ત સ્ટોક',
      location: 'સ્થાન',
      status: 'સ્થિતિ',
      reorderLevel: 'પન્નું આર્ડર સ્તર',
      lowStock: 'નીચું સ્ટોક',
      sufficient: 'પરયાપ્ત',
      critical: 'ક્રિટિકલ',
      unit: 'યૂનિટ'
    },
    pa: {
      title: 'ਖੋਜ',
      search: 'ਮਾਟੇਰਿਅਲ ਖੋਜੋ...',
      filter: 'ਫਿਲਟਰ',
      materialCode: 'ਸਮੱਗਰੀ ਕੋਡ',
      material: 'ਮਾਟੇਰਿਅਲ',
      available: 'उपलब्ध',
      allocated: 'ਵਿਭਾਜਿਤ',
      free: 'ਮੁਕਤ ਸਟੋਕ',
      location: 'ਸਥਾਨ',
      status: 'ਸਥਿਤਿ',
      reorderLevel: 'ਪੁਨ: ਆਰਡਰ ਸਤਰ',
      lowStock: 'ਕਮ ਸਟੋਕ',
      sufficient: 'ਪਰਯਾਪਤ',
      critical: 'ਕ੍ਰਿਟਿਕਲ',
      unit: 'ਯੂਨਿਟ'
    }
  };

  const t = translations[language];

  const inventoryItems = Object.entries(INVENTORY_STOCK).map(([material, data]) => {
    const available = data.qty;
    const allocated = Math.floor(available * 0.3); // 30% allocated for simulation
    const free = available - allocated;
    const reorderLevel = Math.floor(available * 0.2); // 20% as reorder level
    
    let status = 'sufficient';
    if (free <= reorderLevel) {
      status = 'critical';
    } else if (free <= reorderLevel * 2) {
      status = 'low';
    }
    
    return {
      id: material,
      materialCode: data.materialCode,
      material,
      available,
      allocated,
      free,
      unit: data.unit,
      location: data.location,
      reorderLevel,
      status
    };
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'sufficient':
        return <Badge className="bg-emerald-500">{t.sufficient}</Badge>;
      case 'low':
        return <Badge className="bg-yellow-500">{t.lowStock}</Badge>;
      case 'critical':
        return <Badge className="bg-red-500">{t.critical}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const criticalCount = inventoryItems.filter((item) => item.status === 'critical').length;
  const lowStockCount = inventoryItems.filter((item) => item.status === 'low').length;

  return (
    <div className="space-y-6">
      <div>
        <h1>{t.title}</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-600">{language === 'en' ? 'Total Materials' : 'कुल सामग्री'}</p>
              <h2 className="mt-1">{inventoryItems.length}</h2>
            </div>
            <div className="h-12 w-12 rounded-lg bg-blue-500 text-white flex items-center justify-center">
              <Package className="h-6 w-6" />
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-600">{t.lowStock}</p>
              <h2 className="mt-1">{lowStockCount}</h2>
            </div>
            <div className="h-12 w-12 rounded-lg bg-yellow-500 text-white flex items-center justify-center">
              <ArrowUpDown className="h-6 w-6" />
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-600">{t.critical}</p>
              <h2 className="mt-1">{criticalCount}</h2>
            </div>
            <div className="h-12 w-12 rounded-lg bg-red-500 text-white flex items-center justify-center">
              <AlertTriangle className="h-6 w-6" />
            </div>
          </div>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="p-4">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <Input placeholder={t.search} className="pl-10" />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            {t.filter}
          </Button>
        </div>
      </Card>

      {/* Inventory List - Mobile View */}
      <div className="lg:hidden space-y-3">
        {inventoryItems.map((item) => (
          <Card key={item.id} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span>{item.material}</span>
                  {getStatusBadge(item.status)}
                </div>
                <p className="text-xs text-zinc-500 mb-1">
                  <span className="font-mono bg-zinc-100 px-2 py-0.5 rounded">{item.materialCode}</span>
                </p>
                <p className="text-sm text-zinc-600">{item.location}</p>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-600">{t.available}:</span>
                <span>{item.available} {item.unit}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-600">{t.allocated}:</span>
                <span>{item.allocated} {item.unit}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-600">{t.free}:</span>
                <span className={item.free <= item.reorderLevel ? 'text-red-600' : 'text-emerald-600'}>
                  {item.free} {item.unit}
                </span>
              </div>
            </div>

            {/* Stock Level Bar */}
            <div className="mt-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-zinc-600">{language === 'en' ? 'Stock Level' : 'स्टॉक स्तर'}</span>
                <span>
                  {Math.round((item.free / item.available) * 100)}% {language === 'en' ? 'free' : 'मुक्त'}
                </span>
              </div>
              <div className="h-2 bg-zinc-200 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    item.status === 'critical'
                      ? 'bg-red-500'
                      : item.status === 'low'
                      ? 'bg-yellow-500'
                      : 'bg-emerald-500'
                  }`}
                  style={{ width: `${(item.free / item.available) * 100}%` }}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Inventory Table - Desktop View */}
      <Card className="hidden lg:block overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-zinc-50 border-b">
              <tr>
                <th className="text-left p-4">{t.materialCode}</th>
                <th className="text-left p-4">{t.material}</th>
                <th className="text-left p-4">{t.available}</th>
                <th className="text-left p-4">{t.allocated}</th>
                <th className="text-left p-4">{t.free}</th>
                <th className="text-left p-4">{t.location}</th>
                <th className="text-left p-4">{t.reorderLevel}</th>
                <th className="text-left p-4">{t.status}</th>
              </tr>
            </thead>
            <tbody>
              {inventoryItems.map((item) => (
                <tr key={item.id} className="border-b hover:bg-zinc-50">
                  <td className="p-4">
                    <span className="font-mono text-sm bg-zinc-100 px-2 py-1 rounded">{item.materialCode}</span>
                  </td>
                  <td className="p-4">{item.material}</td>
                  <td className="p-4">
                    {item.available} {item.unit}
                  </td>
                  <td className="p-4">
                    {item.allocated} {item.unit}
                  </td>
                  <td className="p-4">
                    <span className={item.free <= item.reorderLevel ? 'text-red-600' : 'text-emerald-600'}>
                      {item.free} {item.unit}
                    </span>
                  </td>
                  <td className="p-4">{item.location}</td>
                  <td className="p-4">
                    {item.reorderLevel} {item.unit}
                  </td>
                  <td className="p-4">{getStatusBadge(item.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Low Stock Alert */}
      {criticalCount > 0 && (
        <Card className="p-4 bg-red-50 border-red-200">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-red-900 mb-1">
                {language === 'en' ? 'Critical Stock Levels' : 'गंभीर स्टॉक स्तर'}
              </h3>
              <p className="text-red-700 text-sm">
                {language === 'en'
                  ? `${criticalCount} material(s) below reorder level. Consider ordering stock.`
                  : `${criticalCount} सामग्री पुन: ऑर्डर स्तर से नीचे। स्टॉक ऑर्डर करने पर विचार करें।`}
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}