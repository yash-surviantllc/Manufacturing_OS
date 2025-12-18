import { useState } from 'react';
import { Plus, Edit, Trash2, AlertCircle, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { SKUs, BOM_DATA, INVENTORY_STOCK, calculateMaterialRequirements } from '@/lib/apparel-data';

type BOMPlannerProps = {
  language: 'en' | 'hi' | 'kn' | 'ta' | 'te' | 'mr' | 'gu' | 'pa';
};

export function BOMPlanner({ language }: BOMPlannerProps) {
  const [selectedProduct, setSelectedProduct] = useState<string>('TS-001');
  const [productionQty, setProductionQty] = useState<number>(600);
  const [editableUnitCosts, setEditableUnitCosts] = useState<Record<number, number>>({});
  const [showAddBOMModal, setShowAddBOMModal] = useState(false);
  const [newBOM, setNewBOM] = useState({
    productCode: '',
    productName: '',
    materials: [{ itemCode: '', material: '', qty: '', unit: 'kg', unitCost: '' }]
  });

  const translations = {
    en: {
      title: 'BOM Auto-Planner',
      selectProduct: 'Select Product',
      materials: 'Materials Required',
      material: 'Material',
      qtyPerUnit: 'Qty per Unit',
      unit: 'Unit',
      unitCost: 'Unit Cost',
      stock: 'Stock',
      status: 'Status',
      actions: 'Actions',
      addMaterial: 'Add Material',
      saveBOM: 'Save BOM',
      autoCalculate: 'Auto Calculate',
      stockCheck: 'Stock Check',
      createNewBOM: '+ Create New BOM',
      newBOM: 'New BOM',
      productCode: 'Product Code',
      productName: 'Product Name',
      enterProductCode: 'Enter product code (e.g., JK-001)',
      enterProductName: 'Enter product name',
      bomMaterials: 'BOM Materials',
      quantity: 'Quantity',
      removeMaterial: 'Remove',
      cancel: 'Cancel',
      createBOM: 'Create BOM',
      itemCode: 'Item Code',
      enterItemCode: 'e.g., MAT-001',
      available: 'Available',
      shortage: 'Shortage',
      sufficient: 'Sufficient',
      for: 'for',
      units: 'units'
    },
    hi: {
      title: 'BOM स्वत: योजनाकार',
      selectProduct: 'उत्पाद चुनें',
      materials: 'आवश्यक सामग्री',
      material: 'सामग्री',
      qtyPerUnit: 'प्रति यूनिट मात्रा',
      unit: 'यूनिट',
      unitCost: 'यूनिट कीमत',
      stock: 'स्टॉक',
      status: 'स्थिति',
      actions: 'क्रियाएं',
      addMaterial: 'सामग्री जोड़ें',
      saveBOM: 'BOM सहेजें',
      autoCalculate: 'स्वत: गणना',
      stockCheck: 'स्टॉक जांच',
      createNewBOM: '+ नया BOM बनाएं',
      newBOM: 'नया BOM',
      productCode: 'उत्पाद कोड',
      productName: 'उत्पाद का नाम',
      enterProductCode: 'उत्पाद कोड दर्ज करें (उदा., JK-001)',
      enterProductName: 'उत्पाद का नाम दर्ज करें',
      bomMaterials: 'BOM सामग्री',
      quantity: 'मात्रा',
      removeMaterial: 'हटाएं',
      cancel: 'रद्द करें',
      createBOM: 'BOM बनाएं',
      itemCode: 'आइटम कोड',
      enterItemCode: 'उदा., MAT-001',
      available: 'उपलब्ध',
      shortage: 'कमी',
      sufficient: 'पर्याप्त',
      for: 'के लिए',
      units: 'यूनिट'
    },
    kn: {
      title: 'BOM ಸ್ವತ: ಯೋಜನಾಕಾರ',
      selectProduct: 'ಉತ್ಪಾದ ಆಯ್ಕೆಮಾಡಿ',
      materials: 'ಅಗತ್ಯವಿರುವ ಸಾಮಾನಗಳು',
      material: 'ಸಾಮಾನ',
      qtyPerUnit: 'ಯೂನಿಟ್ ಪ್ರತಿ ಮಾತ್ರೆ',
      unit: 'ಯೂನಿಟ್',
      unitCost: 'ಯೂನಿಟ್ ವೆಚ್ಚ',
      stock: 'ಸ್ಟಾಕ್',
      status: 'ಸ್ಥಿತಿ',
      actions: 'ಕ್ರಿಯೆಗಳು',
      addMaterial: 'ಸಾಮಾನ ಸೇರಿಸಿ',
      saveBOM: 'BOM ಸಂಗ್ರಹಿಸಿ',
      autoCalculate: 'ಸ್ವತ: ಗಣನೆ',
      stockCheck: 'ಸ್ಟಾಕ್ ಪರೀಕ್ಷೆ',
      createNewBOM: '+ ಹೊಸ BOM ರಚಿಸಿ',
      newBOM: 'ಹೊಸ BOM',
      productCode: 'ಉತ್ಪನ್ನ ಕೋಡ್',
      productName: 'ಉತ್ಪನ್ನ ಹೆಸರು',
      enterProductCode: 'ಉತ್ಪನ್ನ ಕೋಡ್ ನಮೂದಿಸಿ (ಉದಾ., JK-001)',
      enterProductName: 'ಉತ್ಪನ್ನ ಹೆಸರು ನಮೂದಿಸಿ',
      bomMaterials: 'BOM ವಸ್ತುಗಳು',
      quantity: 'ಪ್ರಮಾಣ',
      removeMaterial: 'ತೆಗೆದುಹಾಕಿ',
      cancel: 'ರದ್ದುಮಾಡಿ',
      createBOM: 'BOM ರಚಿಸಿ',
      itemCode: 'ವಸ್ತು ಕೋಡ್',
      enterItemCode: 'ಉದಾ., MAT-001',
      available: 'उपलब्ध',
      shortage: 'ಕೆಲಸ',
      sufficient: 'ಪರ್ಯಾಪ್ತ',
      for: 'ಕ್ರಿಯೆಗಳು',
      units: 'ಯೂನಿಟ್'
    },
    ta: {
      title: 'BOM தானியாக்கு திட்டம்',
      selectProduct: 'தயாரிப்பு தெர்க்கவும்',
      materials: 'வேண்டிய பொருள்கள்',
      material: 'பொருள்',
      qtyPerUnit: 'ஒரு அலகு பொருள்',
      unit: 'அலகு',
      unitCost: 'அலகு செலவு',
      stock: 'செயலாக்கு',
      status: 'நிலை',
      actions: 'செயல்கள்',
      addMaterial: 'பொருள் சேர்க்கவும்',
      saveBOM: 'BOM சேமிக்கவும்',
      autoCalculate: 'தானியாக்கு கணிதம்',
      stockCheck: 'செயலாக்கு பரிக்ஷை',
      createNewBOM: '+ புதிய BOM உருவாக்கு',
      newBOM: 'புதிய BOM',
      productCode: 'தயாரிப்பு குறியீடு',
      productName: 'தயாரிப்பு பெயர்',
      enterProductCode: 'தயாரிப்பு குறியீடு உள்ளிடவும் (எ.கா., JK-001)',
      enterProductName: 'தயாரிப்பு பெயர் உள்ளிடவும்',
      bomMaterials: 'BOM பொருட்கள்',
      quantity: 'அளவு',
      removeMaterial: 'நீக்கு',
      cancel: 'ரத்துசெய்',
      createBOM: 'BOM உருவாக்கு',
      itemCode: 'பொருள் குறியீடு',
      enterItemCode: 'எ.கா., MAT-001',
      available: 'கிடைக்கும்',
      shortage: 'விடுப்பு',
      sufficient: 'பரம்பரைய',
      for: 'க்ரியைகளுக்கு',
      units: 'அலகுகள்'
    },
    te: {
      title: 'BOM స్వత: యోజనాకారం',
      selectProduct: 'ఉత్పత్తి ఎంచుకోండి',
      materials: 'అవసరమైన సమాచారం',
      material: 'సమాచారం',
      qtyPerUnit: 'ఒక యూనిట్ ప్రతి మాత్రా',
      unit: 'యూనిట్',
      unitCost: 'యూనిట్ ఖర్చు',
      stock: 'స్టాక్',
      status: 'స్థితి',
      actions: 'క్రియలు',
      addMaterial: 'సమాచారం జోడించండి',
      saveBOM: 'BOM సేవ్ చేయండి',
      autoCalculate: 'స్వత: గణన',
      stockCheck: 'స్టాక్ పరిశోధన',
      createNewBOM: '+ కొత్త BOM సృష్టించండి',
      newBOM: 'కొత్త BOM',
      productCode: 'ఉత్పత్తి కోడ్',
      productName: 'ఉత్పత్తి పేరు',
      enterProductCode: 'ఉత్పత్తి కోడ్ నమోదు చేయండి (ఉదా., JK-001)',
      enterProductName: 'ఉత్పత్తి పేరు నమోదు చేయండి',
      bomMaterials: 'BOM మెటీరియల్స్',
      quantity: 'పరిమాణం',
      removeMaterial: 'తీసివేయి',
      cancel: 'రద్దుచేయి',
      createBOM: 'BOM సృష్టించండి',
      itemCode: 'ఐటెమ్ కోడ్',
      enterItemCode: 'ఉదా., MAT-001',
      available: 'ఉపలభ్యం',
      shortage: 'కోమ్ప్యూటర్',
      sufficient: 'పర్యాప్తం',
      for: 'క్రియలకు',
      units: 'యూనిట్'
    },
    mr: {
      title: 'BOM स्वत: योजनाकार',
      selectProduct: 'उत्पाद चुना',
      materials: 'आवश्यक सामग्री',
      material: 'सामग्री',
      qtyPerUnit: 'प्रति यूनिट मात्रा',
      unit: 'यूनिट',
      unitCost: 'यूनिट किंमत',
      stock: 'स्टॉक',
      status: 'स्थिति',
      actions: 'क्रियाएं',
      addMaterial: 'सामग्री जोडा',
      saveBOM: 'BOM संग्रहीत करा',
      autoCalculate: 'स्वत: गणना',
      stockCheck: 'स्टॉक जांच',
      createNewBOM: '+ नवीन BOM तयार करा',
      newBOM: 'नवीन BOM',
      productCode: 'उत्पाद कोड',
      productName: 'उत्पाद नाव',
      enterProductCode: 'उत्पाद कोड प्रविष्ट करा (उदा., JK-001)',
      enterProductName: 'उत्पाद नाव प्रविष्ट करा',
      bomMaterials: 'BOM साहित्य',
      quantity: 'प्रमाण',
      removeMaterial: 'काढा',
      cancel: 'रद्द करा',
      createBOM: 'BOM तयार करा',
      itemCode: 'वस्तू कोड',
      enterItemCode: 'उदा., MAT-001',
      available: 'उपलब्ध',
      shortage: 'कमी',
      sufficient: 'पर्याप्त',
      for: 'क्रियाएं',
      units: 'यूनिट'
    },
    gu: {
      title: 'BOM સ્વત: યોજનાકાર',
      selectProduct: 'ઉત્પદ પસંદ કરો',
      materials: 'અવસર માટે માટેરિયલ્સ',
      material: 'માટેરિયલ',
      qtyPerUnit: 'યૂનિટ પ્રતી કિંમત',
      unit: 'યૂનિટ',
      unitCost: 'યૂનિટ કિંમત',
      stock: 'સ્ટોક',
      status: 'સ્થિતિ',
      actions: 'ક્રિયાઓ',
      addMaterial: 'માટેરિયલ જોડો',
      saveBOM: 'BOM સંગ્રહીત કરો',
      autoCalculate: 'સ્વત: ગણના',
      stockCheck: 'સ્ટોક જાંચ',
      createNewBOM: '+ નવું BOM બનાવો',
      newBOM: 'નવું BOM',
      productCode: 'ઉત્પાદન કોડ',
      productName: 'ઉત્પાદન નામ',
      enterProductCode: 'ઉત્પાદન કોડ દાખલ કરો (ઉદા., JK-001)',
      enterProductName: 'ઉત્પાદન નામ દાખલ કરો',
      bomMaterials: 'BOM સામગ્રી',
      quantity: 'જથ્થો',
      removeMaterial: 'દૂર કરો',
      cancel: 'રદ કરો',
      createBOM: 'BOM બનાવો',
      itemCode: 'આઇટમ કોડ',
      enterItemCode: 'ઉદા., MAT-001',
      available: 'ઉપલભ્ય',
      shortage: 'કમી',
      sufficient: 'પર્યાપ્ત',
      for: 'ક્રિયાઓ',
      units: 'યૂનિટ્સ'
    },
    pa: {
      title: 'BOM ਸਵੈੱਖਾਵਾਂ ਯੋਜਨਾਕਾਰ',
      selectProduct: 'ਉਤਪਾਦ ਚੁਣੋ',
      materials: 'ਅਵਸਰ ਮਾਟੇ ਮਾਟੇਰੀਅਲ',
      material: 'ਮਾਟੇਰੀਅਲ',
      qtyPerUnit: 'ਹਰ ਯੂਨਿਟ ਪ੍ਰਤੀ ਮਾਤਰਾ',
      unit: 'ਯੂਨਿਟ',
      unitCost: 'ਯੂਨਿਟ ਕੀਮਤ',
      stock: 'ਸਟੋਕ',
      status: 'ਸਥਿਤੀ',
      actions: 'ਕ੍ਰਿਆਵਾਂ',
      addMaterial: 'ਮਾਟੇਰੀਅਲ ਜੋੰਡੋ',
      saveBOM: 'BOM ਸੰਗ੍ਰਹੀਤ ਕਰੋ',
      autoCalculate: 'ਸਵੈੱਖਾਵਾਂ ਗਣਨਾ',
      stockCheck: 'ਸਟੋਕ ਜਾਂਚ',
      createNewBOM: '+ ਨਵਾਂ BOM ਬਣਾਓ',
      newBOM: 'ਨਵਾਂ BOM',
      productCode: 'ਉਤਪਾਦ ਕੋਡ',
      productName: 'ਉਤਪਾਦ ਨਾਮ',
      enterProductCode: 'ਉਤਪਾਦ ਕੋਡ ਦਾਖਲ ਕਰੋ (ਉਦਾ., JK-001)',
      enterProductName: 'ਉਤਪਾਦ ਨਾਮ ਦਾਖਲ ਕਰੋ',
      bomMaterials: 'BOM ਸਮੱਗਰੀ',
      quantity: 'ਮਾਤਰਾ',
      removeMaterial: 'ਹਟਾਓ',
      cancel: 'ਰੱਦ ਕਰੋ',
      createBOM: 'BOM ਬਣਾਓ',
      itemCode: 'ਆਈਟਮ ਕੋਡ',
      enterItemCode: 'ਉਦਾ., MAT-001',
      available: 'ਉਪਲਭ્ય',
      shortage: 'ਕਮੀ',
      sufficient: 'ਪਰ્યાપ્ત',
      for: 'ਕ੍ਰਿਆਵਾਂ',
      units: 'ਯੂਨਿਟ'
    }
  };

  const t = translations[language];

  const products = Object.keys(SKUs);

  const currentBOM = BOM_DATA[selectedProduct as keyof typeof BOM_DATA] || [];
  
  const materials = currentBOM.map((item, idx) => {
    const stock = INVENTORY_STOCK[item.material as keyof typeof INVENTORY_STOCK];
    const requiredQty = item.qty * productionQty;
    const stockAvailable = stock?.qty || 0;
    const isShortage = requiredQty > stockAvailable;
    
    return {
      id: idx,
      material: item.material,
      qtyPerUnit: item.qty,
      unit: item.unit,
      unitCost: item.unitCost,
      stockAvailable,
      requiredTotal: Math.ceil(requiredQty * 10) / 10,
      status: isShortage ? 'shortage' : 'sufficient'
    };
  });

  const getStatusBadge = (status: string) => {
    if (status === 'sufficient') {
      return (
        <Badge className="bg-emerald-500 flex items-center gap-1">
          <CheckCircle className="h-3 w-3" />
          {t.sufficient}
        </Badge>
      );
    }
    return (
      <Badge className="bg-red-500 flex items-center gap-1">
        <AlertCircle className="h-3 w-3" />
        {t.shortage}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1>{t.title}</h1>
        <div className="flex gap-2">
          <Button 
            onClick={() => setShowAddBOMModal(true)}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            {t.createNewBOM}
          </Button>
          <Button variant="outline">
            {t.autoCalculate}
          </Button>
          <Button>
            {t.saveBOM}
          </Button>
        </div>
      </div>

      {/* Product Selection */}
      <Card className="p-6">
        <label className="block mb-2 text-zinc-600">{t.selectProduct}</label>
        <div className="flex flex-col sm:flex-row gap-2">
          {products.map((product) => (
            <Button
              key={product}
              variant={selectedProduct === product ? 'default' : 'outline'}
              onClick={() => setSelectedProduct(product)}
              className="justify-start sm:flex-1"
            >
              <div className="flex flex-col items-start">
                <span className="font-semibold">{product}</span>
                <span className="text-xs opacity-80">{SKUs[product as keyof typeof SKUs]}</span>
              </div>
            </Button>
          ))}
        </div>
        
        {/* Production Quantity Input */}
        <div className="mt-4">
          <label className="block mb-2 text-zinc-600">Production Quantity</label>
          <Input
            type="number"
            value={productionQty}
            onChange={(e) => setProductionQty(Number(e.target.value))}
            className="max-w-xs"
          />
        </div>
      </Card>

      {/* BOM Table - Mobile View */}
      <div className="lg:hidden space-y-3">
        {materials.map((item) => (
          <Card key={item.id} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div>{item.material}</div>
                {getStatusBadge(item.status)}
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-600">{t.qtyPerUnit}:</span>
                <span>{item.qtyPerUnit} {item.unit}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-600">{t.stock}:</span>
                <span>{item.stockAvailable} {item.unit}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-600">{t.unitCost}:</span>
                <Input
                  type="number"
                  value={editableUnitCosts[item.id] ?? item.unitCost ?? ''}
                  onChange={(e) => setEditableUnitCosts({
                    ...editableUnitCosts,
                    [item.id]: Number(e.target.value)
                  })}
                  className="w-24 h-8 text-sm text-right"
                  placeholder="0"
                />
              </div>
            </div>
          </Card>
        ))}
        <Button className="w-full" variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          {t.addMaterial}
        </Button>
      </div>

      {/* BOM Table - Desktop View */}
      <Card className="hidden lg:block overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-zinc-50 border-b">
              <tr>
                <th className="text-left p-4">{t.material}</th>
                <th className="text-left p-4">{t.qtyPerUnit}</th>
                <th className="text-left p-4">{t.unit}</th>
                <th className="text-left p-4">{t.stock}</th>
                <th className="text-left p-4">{t.status}</th>
                <th className="text-left p-4">{t.unitCost}</th>
                <th className="text-left p-4">{t.actions}</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((item) => (
                <tr key={item.id} className="border-b hover:bg-zinc-50">
                  <td className="p-4">{item.material}</td>
                  <td className="p-4">{item.qtyPerUnit}</td>
                  <td className="p-4">{item.unit}</td>
                  <td className="p-4">{item.stockAvailable} {item.unit}</td>
                  <td className="p-4">{getStatusBadge(item.status)}</td>
                  <td className="p-4">
                    <Input
                      type="number"
                      value={editableUnitCosts[item.id] ?? item.unitCost ?? ''}
                      onChange={(e) => setEditableUnitCosts({
                        ...editableUnitCosts,
                        [item.id]: Number(e.target.value)
                      })}
                      className="w-28 h-9 text-right"
                      placeholder="0"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t">
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            {t.addMaterial}
          </Button>
        </div>
      </Card>

      {/* Stock Check Summary */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <h3 className="text-blue-900 mb-3">{t.stockCheck}</h3>
        <div className="space-y-2">
          {materials
            .filter((item) => item.status === 'shortage')
            .map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-white rounded-lg">
                <div>
                  <div>{item.material}</div>
                  <div className="text-sm text-zinc-600">
                    {language === 'en' ? 'Required' : 'आवश्यक'}: {item.qtyPerUnit * 100} {item.unit} {t.for} 100 {t.units}
                  </div>
                </div>
                <Badge className="bg-red-500">
                  {language === 'en' ? 'Order needed' : 'ऑर्डर चाहिए'}
                </Badge>
              </div>
            ))}
          {materials.filter((item) => item.status === 'shortage').length === 0 && (
            <div className="text-center py-4 text-emerald-700">
              {language === 'en' ? 'All materials are sufficient!' : 'सभी सामग्री पर्याप्त हैं!'}
            </div>
          )}
        </div>
      </Card>

      {/* Add New BOM Modal */}
      {showAddBOMModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Plus className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl">{t.newBOM}</h2>
                  <p className="text-sm text-emerald-100">Create a new Bill of Materials</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowAddBOMModal(false);
                  setNewBOM({
                    productCode: '',
                    productName: '',
                    materials: [{ itemCode: '', material: '', qty: '', unit: 'kg', unitCost: '' }]
                  });
                }}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <Plus className="w-6 h-6 rotate-45" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-8 space-y-6">
              {/* Product Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-zinc-900 font-medium">
                    {t.productCode} <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    value={newBOM.productCode}
                    onChange={(e) => setNewBOM({ ...newBOM, productCode: e.target.value })}
                    placeholder={t.enterProductCode}
                    className="border-2"
                  />
                </div>
                
                <div>
                  <label className="block mb-2 text-zinc-900 font-medium">
                    {t.productName} <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    value={newBOM.productName}
                    onChange={(e) => setNewBOM({ ...newBOM, productName: e.target.value })}
                    placeholder={t.enterProductName}
                    className="border-2"
                  />
                </div>
              </div>

              {/* BOM Materials */}
              <div>
                <label className="block mb-3 text-zinc-900 font-medium">
                  {t.bomMaterials} <span className="text-red-500">*</span>
                </label>
                
                {/* Desktop View - Table */}
                <div className="hidden lg:block">
                  <div className="border-2 border-zinc-200 rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-zinc-50 border-b-2 border-zinc-200">
                        <tr>
                          <th className="text-left p-3 text-zinc-700">{t.itemCode}</th>
                          <th className="text-left p-3 text-zinc-700">{t.material}</th>
                          <th className="text-left p-3 text-zinc-700">{t.quantity}</th>
                          <th className="text-left p-3 text-zinc-700">{t.unit}</th>
                          <th className="text-left p-3 text-zinc-700">{t.unitCost}</th>
                          <th className="text-left p-3 text-zinc-700">{t.actions}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {newBOM.materials.map((material, index) => (
                          <tr key={index} className="border-b border-zinc-200 last:border-b-0">
                            <td className="p-3">
                              <Input
                                type="text"
                                value={material.itemCode}
                                onChange={(e) => {
                                  const newMaterials = [...newBOM.materials];
                                  newMaterials[index].itemCode = e.target.value;
                                  setNewBOM({ ...newBOM, materials: newMaterials });
                                }}
                                placeholder={t.enterItemCode}
                                className="w-full"
                              />
                            </td>
                            <td className="p-3">
                              <Input
                                type="text"
                                value={material.material}
                                onChange={(e) => {
                                  const newMaterials = [...newBOM.materials];
                                  newMaterials[index].material = e.target.value;
                                  setNewBOM({ ...newBOM, materials: newMaterials });
                                }}
                                placeholder="e.g., Cotton Fabric"
                                className="w-full"
                              />
                            </td>
                            <td className="p-3">
                              <Input
                                type="number"
                                value={material.qty}
                                onChange={(e) => {
                                  const newMaterials = [...newBOM.materials];
                                  newMaterials[index].qty = e.target.value;
                                  setNewBOM({ ...newBOM, materials: newMaterials });
                                }}
                                placeholder="0.00"
                                className="w-full"
                              />
                            </td>
                            <td className="p-3">
                              <select
                                value={material.unit}
                                onChange={(e) => {
                                  const newMaterials = [...newBOM.materials];
                                  newMaterials[index].unit = e.target.value;
                                  setNewBOM({ ...newBOM, materials: newMaterials });
                                }}
                                className="w-full p-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                              >
                                <option value="kg">kg</option>
                                <option value="m">m</option>
                                <option value="pcs">pcs</option>
                                <option value="L">L</option>
                              </select>
                            </td>
                            <td className="p-3">
                              <Input
                                type="number"
                                value={material.unitCost}
                                onChange={(e) => {
                                  const newMaterials = [...newBOM.materials];
                                  newMaterials[index].unitCost = e.target.value;
                                  setNewBOM({ ...newBOM, materials: newMaterials });
                                }}
                                placeholder="0"
                                className="w-full"
                              />
                            </td>
                            <td className="p-3">
                              {newBOM.materials.length > 1 && (
                                <Button
                                  onClick={() => {
                                    const newMaterials = newBOM.materials.filter((_, i) => i !== index);
                                    setNewBOM({ ...newBOM, materials: newMaterials });
                                  }}
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Mobile View - Cards */}
                <div className="lg:hidden space-y-3">
                  {newBOM.materials.map((material, index) => (
                    <Card key={index} className="p-4 border-2 border-zinc-200">
                      <div className="flex items-start justify-between mb-3">
                        <span className="text-sm font-medium text-zinc-700">Material {index + 1}</span>
                        {newBOM.materials.length > 1 && (
                          <Button
                            onClick={() => {
                              const newMaterials = newBOM.materials.filter((_, i) => i !== index);
                              setNewBOM({ ...newBOM, materials: newMaterials });
                            }}
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 -mt-2 -mr-2"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs text-zinc-600 mb-1">{t.itemCode}</label>
                          <Input
                            type="text"
                            value={material.itemCode}
                            onChange={(e) => {
                              const newMaterials = [...newBOM.materials];
                              newMaterials[index].itemCode = e.target.value;
                              setNewBOM({ ...newBOM, materials: newMaterials });
                            }}
                            placeholder={t.enterItemCode}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-xs text-zinc-600 mb-1">{t.material}</label>
                          <Input
                            type="text"
                            value={material.material}
                            onChange={(e) => {
                              const newMaterials = [...newBOM.materials];
                              newMaterials[index].material = e.target.value;
                              setNewBOM({ ...newBOM, materials: newMaterials });
                            }}
                            placeholder="e.g., Cotton Fabric"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-xs text-zinc-600 mb-1">{t.quantity}</label>
                            <Input
                              type="number"
                              value={material.qty}
                              onChange={(e) => {
                                const newMaterials = [...newBOM.materials];
                                newMaterials[index].qty = e.target.value;
                                setNewBOM({ ...newBOM, materials: newMaterials });
                              }}
                              placeholder="0.00"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-xs text-zinc-600 mb-1">{t.unit}</label>
                            <select
                              value={material.unit}
                              onChange={(e) => {
                                const newMaterials = [...newBOM.materials];
                                newMaterials[index].unit = e.target.value;
                                setNewBOM({ ...newBOM, materials: newMaterials });
                              }}
                              className="w-full p-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            >
                              <option value="kg">kg</option>
                              <option value="m">m</option>
                              <option value="pcs">pcs</option>
                              <option value="L">L</option>
                            </select>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-xs text-zinc-600 mb-1">{t.unitCost}</label>
                          <Input
                            type="number"
                            value={material.unitCost}
                            onChange={(e) => {
                              const newMaterials = [...newBOM.materials];
                              newMaterials[index].unitCost = e.target.value;
                              setNewBOM({ ...newBOM, materials: newMaterials });
                            }}
                            placeholder="0"
                          />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
                
                <Button
                  onClick={() => setNewBOM({
                    ...newBOM,
                    materials: [...newBOM.materials, { itemCode: '', material: '', qty: '', unit: 'kg', unitCost: '' }]
                  })}
                  variant="outline"
                  className="w-full mt-3 border-2 border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {t.addMaterial}
                </Button>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white border-t-2 border-zinc-200 p-6 flex gap-3">
              <Button
                onClick={() => {
                  setShowAddBOMModal(false);
                  setNewBOM({
                    productCode: '',
                    productName: '',
                    materials: [{ itemCode: '', material: '', qty: '', unit: 'kg', unitCost: '' }]
                  });
                }}
                variant="outline"
                className="flex-1 border-2"
              >
                {t.cancel}
              </Button>
              <Button
                onClick={() => {
                  const materialsInfo = newBOM.materials
                    .filter(m => m.material && m.qty)
                    .map(m => `${m.itemCode ? `[${m.itemCode}] ` : ''}${m.qty} ${m.unit} ${m.material} @ ₹${m.unitCost}/${m.unit}`)
                    .join('\n');
                    
                  alert(`✅ ${language === 'en' ? 'BOM Created Successfully!' : 'BOM सफलतापूर्वक बनाया गया!'}

Product Code: ${newBOM.productCode}
Product Name: ${newBOM.productName}

Materials:
${materialsInfo}`);
                  
                  setShowAddBOMModal(false);
                  setNewBOM({
                    productCode: '',
                    productName: '',
                    materials: [{ itemCode: '', material: '', qty: '', unit: 'kg', unitCost: '' }]
                  });
                }}
                className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                disabled={!newBOM.productCode || !newBOM.productName || newBOM.materials.filter(m => m.material && m.qty).length === 0}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                {t.createBOM}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}