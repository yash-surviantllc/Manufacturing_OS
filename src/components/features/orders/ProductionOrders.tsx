import { Search, Filter, Plus, MoreVertical, Eye, Edit, XCircle, Printer, CheckCircle2, AlertCircle, Minus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PRODUCTION_ORDERS, SKUs } from '@/lib/apparel-data';
import { useState } from 'react';
import { OrderActionsDropdown } from './components/OrderActionsDropdown';

type ProductionOrdersProps = {
  language: 'en' | 'hi' | 'kn' | 'ta' | 'te' | 'mr' | 'gu' | 'pa';
};

export function ProductionOrders({ language }: ProductionOrdersProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [noteText, setNoteText] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');
  const [newDueDate, setNewDueDate] = useState('');
  const [isEditingTimeline, setIsEditingTimeline] = useState(false);
  const [showNewOrderModal, setShowNewOrderModal] = useState(false);
  const [newOrderData, setNewOrderData] = useState({
    product: '',
    quantity: '',
    dueDate: '',
    priority: 'normal',
    customerName: '',
    stage: 'Material Planning',
    assignedTeam: '',
    notes: '',
    shiftNumber: 'Shift 1',
    startTime: '',
    endTime: ''
  });
  const [timelineData, setTimelineData] = useState({
    stage1Start: '2024-12-01T09:00',
    stage1End: '2024-12-01T14:00',
    stage1Team: 'Planning Team',
    stage2Start: '2024-12-02T08:00',
    stage2End: '2024-12-02T16:00',
    stage2Team: 'Team A - Cutting Department',
    stage3Start: '2024-12-03T07:00',
    stage3End: '2024-12-04T18:00',
    stage3Team: 'Team B - Sewing Department',
    stage4Start: '2024-12-04T18:30',
    stage4End: '2024-12-05T12:00',
    stage4Team: 'Team C - Quality Control',
    stage5Start: '2024-12-05T13:00',
    stage5End: '2024-12-05T17:00',
    stage5Team: 'Team D - Packaging',
    stage6Start: '2024-12-05T17:30',
  });

  const translations = {
    en: {
      title: 'Production Orders',
      search: 'Search orders...',
      filter: 'Filter',
      newOrder: 'New Order',
      order: 'Order',
      product: 'Product',
      quantity: 'Quantity',
      stage: 'Stage',
      status: 'Status',
      dueDate: 'Due Date',
      actions: 'Actions',
      // Dropdown actions
      viewDetails: 'View Details',
      editOrder: 'Edit Order',
      duplicateOrder: 'Duplicate Order',
      printOrder: 'Print Order Sheet',
      trackProgress: 'Track Progress',
      productionPlan: 'Production Plan Timeline',
      assignTeam: 'Assign to Team',
      addNotes: 'Add Notes',
      downloadBOM: 'Download BOM',
      exportExcel: 'Export to Excel',
      generateQR: 'Generate QR Code',
      sendToProduction: 'Send to Production',
      requestMaterials: 'Request Materials',
      reschedule: 'Reschedule Delivery',
      shareOrder: 'Share Order',
      viewHistory: 'View History',
      archiveOrder: 'Archive Order',
      markPriority: 'Mark as Priority',
      cancelOrder: 'Cancel Order',
      deleteOrder: 'Delete Order',
      editTimeline: 'Edit Timeline',
      viewMode: 'View Mode',
      saveChanges: 'Save Changes',
      cancel: 'Cancel',
      // New Order Form
      createNewOrder: 'Create New Production Order',
      selectProduct: 'Select Product',
      chooseProduct: 'Choose product...',
      enterQuantity: 'Enter Quantity',
      units: 'units',
      selectDueDate: 'Due Date',
      orderPriority: 'Order Priority',
      normal: 'Normal',
      high: 'High',
      urgent: 'Urgent',
      customerName: 'Customer Name',
      enterCustomer: 'Enter customer name...',
      productionStage: 'Production Stage',
      assignTeamLabel: 'Assign Team',
      selectTeam: 'Select team...',
      orderNotes: 'Order Notes',
      enterNotes: 'Enter special instructions or notes...',
      requiredFields: 'Required Fields',
      createOrder: 'Create Order',
      shiftNumber: 'Shift Number',
      shift1: 'Shift 1 (6 AM - 2 PM)',
      shift2: 'Shift 2 (2 PM - 10 PM)',
      shift3: 'Shift 3 (10 PM - 6 AM)',
      productionTimeline: 'Production Timeline',
      startTime: 'Start Time',
      endTime: 'End Time',
      selectStartTime: 'Select start time...',
      selectEndTime: 'Select end time...'
    },
    hi: {
      title: 'उत्पादन आदेश',
      search: 'ऑर्डर खोजें...',
      filter: 'फ़िल्टर',
      newOrder: 'नया ऑर्डर',
      order: 'ऑर्डर',
      product: 'उत्पाद',
      quantity: 'मात्रा',
      stage: 'स्टेज',
      status: 'स्थिति',
      dueDate: 'नियत तारीख',
      actions: 'क्रियाएं',
      // Dropdown actions
      viewDetails: 'विवरण देखें',
      editOrder: 'ऑर्डर संपादित करें',
      duplicateOrder: 'ऑर्डर डुप्लिकेट करें',
      printOrder: 'ऑर्डर शीट प्रिंट करें',
      trackProgress: 'प्रगति ट्रैक करें',
      productionPlan: 'उत्पादन योजना का समयरेखा',
      assignTeam: 'टीम को असाइन करें',
      addNotes: 'नोट्स जोड़ें',
      downloadBOM: 'BOM डाउनलोड करें',
      exportExcel: 'Excel में निर्यात करें',
      generateQR: 'QR कोड जनरेट करें',
      sendToProduction: 'उत्पादन में भेजें',
      requestMaterials: 'सामग्री का अनुरोध करें',
      reschedule: 'डिलीवरी पुनर्निर्धारित करें',
      shareOrder: 'ऑर्डर साझा करें',
      viewHistory: 'इतिहास देखें',
      archiveOrder: 'ऑर्डर संग्रहित करें',
      markPriority: 'प्राथमिकता के रूप में चिह्नित करें',
      cancelOrder: 'ऑर्डर रद्द करें',
      deleteOrder: 'ऑर्डर हटाएं',
      editTimeline: 'समयरेखा संपादित करें',
      viewMode: 'देखें मोड',
      saveChanges: 'परिवर्तन सहेजें',
      cancel: 'रद्द करें',
      // New Order Form
      createNewOrder: 'नया उत्पादन ऑर्डर बनाएं',
      selectProduct: 'उत्पाद चुनें',
      chooseProduct: 'उत्पाद चुनें...',
      enterQuantity: 'मात्रा दर्ज करें',
      units: 'यूनिट',
      selectDueDate: 'नियत तारीख',
      orderPriority: 'ऑर्डर प्राथमिकता',
      normal: 'सामान्य',
      high: 'उच्च',
      urgent: 'तत्काल',
      customerName: 'ग्राहक का नाम',
      enterCustomer: 'ग्राहक का नाम दर्ज करें...',
      productionStage: 'उत्पादन चरण',
      assignTeamLabel: 'टीम असाइन करें',
      selectTeam: 'टीम चुनें...',
      orderNotes: 'ऑर्डर नोट्स',
      enterNotes: 'विशेष निर्देश या नोट्स दर्ज करें...',
      requiredFields: 'आवश्यक फ़ील्ड',
      createOrder: 'ऑर्डर बनाएं',
      shiftNumber: 'शिफ्ट नंबर',
      shift1: 'शिफ्ट 1 (सुबह 6 - दोपहर 2)',
      shift2: 'शिफ्ट 2 (दोपहर 2 - रात 10)',
      shift3: 'शिफ्ट 3 (रात 10 - सुबह 6)',
      productionTimeline: 'उत्पादन समयरेखा',
      startTime: 'शुरू समय',
      endTime: 'समाप्ति समय',
      selectStartTime: 'शुरू समय चुनें...',
      selectEndTime: 'समाप्ति समय चुनें...'
    },
    kn: {
      title: 'उत्पादन आदेश',
      search: 'ऑर्डर ಖೋಜಿಸಿ...',
      filter: 'फ़िल्टर',
      newOrder: 'ಹೊಸ ಆದೇಶ',
      order: 'ಆದೇಶ',
      product: 'उत्पाद',
      quantity: 'ಪ್ರಮಾಣ',
      stage: 'ಸ್ಟೇಜ',
      status: 'ಸ್ಥಿತಿ',
      dueDate: 'ನಿಯತ ತಾರೀಖ',
      actions: 'ಕ್ರಿಯೆಗಳು',
      // Dropdown actions
      viewDetails: 'ವಿವರಗಳನ್ನು ನೋಡಿ',
      editOrder: 'ಆದೇಶವನ್ನು ಸಂಪಾದಿಸಿ',
      duplicateOrder: 'ಆದೇಶವನ್ನು ನಕಲಿಸಿ',
      downloadBOM: 'BOM ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ',
      generateQR: 'QR ಕೋಡ್ ರಚಿಸಿ',
      markPriority: 'ಆದ್ಯತೆ ಎಂದು ಗುರುತಿಸಿ',
      cancelOrder: 'ಆದೇಶ ರದ್ದುಮಾಡಿ',
      deleteOrder: 'ಆದೇಶ ಅಳಿಸಿ'
    },
    ta: {
      title: 'உற்பத்தி ஆட்டாளங்கள்',
      search: 'ஆட்டாளங்களை தேடுக...',
      filter: 'பில்டர்',
      newOrder: 'புதிய ஆட்டாளம்',
      order: 'ஆட்டாளம்',
      product: 'பொருத்தம்',
      quantity: 'அளவு',
      stage: 'வரிசை',
      status: 'நிலை',
      dueDate: 'காலப்பாடு',
      actions: 'செயல்கள்',
      // Dropdown actions
      viewDetails: 'விவரங்களைக் காண்க',
      editOrder: 'ஆட்டாளத்தைத் திருத்து',
      duplicateOrder: 'ஆட்டாளத்தை நகலெடு',
      downloadBOM: 'BOM பதிவிறக்கு',
      generateQR: 'QR குறியீட்டை உருவாக்கு',
      markPriority: 'முன்னுரிமை எனக் குறி',
      cancelOrder: 'ஆட்டாளத்தை ரத்துசெய்',
      deleteOrder: 'ஆட்டாளத்தை அழி'
    },
    te: {
      title: 'ఉత్పత్తి ఆదేశాలు',
      search: 'ఆదేశాలను శోధించు...',
      filter: 'ఫిల్టర్',
      newOrder: 'కొత్త ఆదేశం',
      order: 'ఆదేశం',
      product: 'ఉత్పత్తి',
      quantity: 'పరిమాణం',
      stage: 'స్టేజ్',
      status: 'స్థితి',
      dueDate: 'ముక్తి తేదీ',
      actions: 'క్రియలు',
      // Dropdown actions
      viewDetails: 'వివరాలను చూడండి',
      editOrder: 'ఆదేశాన్ని సవరించండి',
      duplicateOrder: 'ఆదేశాన్ని నకలు చేయండి',
      downloadBOM: 'BOM డౌన్‌లోడ్ చేయండి',
      generateQR: 'QR కోడ్ రూపొందించండి',
      markPriority: 'ప్రాధాన్యతగా గుర్తించండి',
      cancelOrder: 'ఆదేశాన్ని రద్దు చేయండి',
      deleteOrder: 'ఆదేశాన్ని తొలగించండి'
    },
    mr: {
      title: 'उत्पादन आदेश',
      search: 'आदेश शोधा...',
      filter: 'फ़िल्टर',
      newOrder: 'नवीन आदेश',
      order: 'आदेश',
      product: 'उत्पाद',
      quantity: 'मात्रा',
      stage: 'स्टेज',
      status: 'स्थिति',
      dueDate: 'नियत तारीख',
      actions: 'क्रियाएं',
      // Dropdown actions
      viewDetails: 'तपशील पहा',
      editOrder: 'आदेश संपादित करा',
      duplicateOrder: 'आदेश डुप्लिकेट करा',
      downloadBOM: 'BOM डाउनलोड करा',
      generateQR: 'QR कोड तयार करा',
      markPriority: 'प्राधान्य म्हणून चिन्हांकित करा',
      cancelOrder: 'आदेश रद्द करा',
      deleteOrder: 'आदेश हटवा'
    },
    gu: {
      title: 'ઉત્પદન આદેશો',
      search: 'આદેશો શોધો...',
      filter: 'ફિલ્ટર',
      newOrder: 'નવો આદેશ',
      order: 'આદેશ',
      product: 'ઉત્પદ',
      quantity: 'માત્રા',
      stage: 'સ્ટેજ',
      status: 'સ્થિતિ',
      dueDate: 'નિયત તારીખ',
      actions: 'ક્રિયાઓ',
      // Dropdown actions
      viewDetails: 'વિગતો જુઓ',
      editOrder: 'આદેશ સંપાદિત કરો',
      duplicateOrder: 'આદેશ ડુપ્લિકેટ કરો',
      downloadBOM: 'BOM ડાઉનલોડ કરો',
      generateQR: 'QR કોડ બનાવો',
      markPriority: 'પ્રાથમિકતા તરીકે ચિહ્નિત કરો',
      cancelOrder: 'આદેશ રદ કરો',
      deleteOrder: 'આદેશ કાઢી નાખો'
    },
    pa: {
      title: 'ਉਤਪਾਦਨ ਆਦੇਸ਼',
      search: 'ਆਦੇਸ਼ ਖੋਜੋ...',
      filter: 'ਫਿਲਟਰ',
      newOrder: 'ਨਵਾਂ ਆਦੇਸ਼',
      order: 'ਆਦੇਸ਼',
      product: 'ਉਤਪਾਦ',
      quantity: 'ਮਾਤਰਾ',
      stage: 'ਸਟੇ',
      status: 'ਸਥਿਤੀ',
      dueDate: 'ਨਿਯਤ ਤਾਰੀਖ',
      actions: 'ਕ੍ਰਿਆਵਾਂ',
      // Dropdown actions
      viewDetails: 'ਵੇਰਵੇ ਦੇਖੋ',
      editOrder: 'ਆਦੇਸ਼ ਸੰਪਾਦਿਤ ਕਰੋ',
      duplicateOrder: 'ਆਦੇਸ਼ ਡੁਪਲੀਕੇਟ ਕਰੋ',
      downloadBOM: 'BOM ਡਾਊਨਲੋਡ ਕਰੋ',
      generateQR: 'QR ਕੋਡ ਬਣਾਓ',
      markPriority: 'ਤਰਜੀਹ ਵਜੋਂ ਚਿੰਨ੍ਹਿਤ ਕਰੋ',
      cancelOrder: 'ਆਦੇਸ਼ ਰੱਦ ਕਰੋ',
      deleteOrder: 'ਆਦੇਸ਼ ਮਿਟਾਓ'
    }
  };

  const t = translations[language];

  const orders = PRODUCTION_ORDERS;

  const handleAction = (action: string, orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    setSelectedOrder(order);
    setOpenDropdown(null);
    setActiveModal(action);
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedOrder(null);
    setNoteText('');
    setSelectedTeam('');
    setNewDueDate('');
    setIsEditingTimeline(false);
  };

  const closeNewOrderModal = () => {
    setShowNewOrderModal(false);
    setNewOrderData({
      product: '',
      quantity: '',
      dueDate: '',
      priority: 'normal',
      customerName: '',
      stage: 'Material Planning',
      assignedTeam: '',
      notes: '',
      shiftNumber: 'Shift 1',
      startTime: '',
      endTime: ''
    });
  };

  const handleNewOrderChange = (field: string, value: string) => {
    setNewOrderData(prev => ({ ...prev, [field]: value }));
  };

  const createNewOrder = () => {
    // Validate required fields
    if (!newOrderData.product || !newOrderData.quantity || !newOrderData.dueDate) {
      alert(language === 'en' 
        ? '⚠️ Please fill in all required fields (Product, Quantity, Due Date)' 
        : '⚠️ कृपया सभी आवश्यक फ़ील्ड भरें (उत्पाद, मात्रा, नियत तारीख)');
      return;
    }

    const newOrderId = `PO-${String(orders.length + 1).padStart(4, '0')}`;
    
    console.log('Creating new order:', {
      id: newOrderId,
      ...newOrderData
    });

    const timelineInfo = newOrderData.startTime && newOrderData.endTime 
      ? `\n${language === 'en' ? 'Timeline' : 'समयरेखा'}: ${new Date(newOrderData.startTime).toLocaleString(language === 'en' ? 'en-US' : 'hi-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })} → ${new Date(newOrderData.endTime).toLocaleString(language === 'en' ? 'en-US' : 'hi-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}`
      : '';
    
    alert(`✅ ${language === 'en' ? 'New Order Created!' : 'नया ऑर्डर बनाया गया!'}\n\n${language === 'en' ? 'Order ID' : 'ऑर्डर आईडी'}: ${newOrderId}\n${language === 'en' ? 'Product' : 'उत्पाद'}: ${newOrderData.product}\n${language === 'en' ? 'Quantity' : 'मात्रा'}: ${newOrderData.quantity} ${language === 'en' ? 'units' : 'यूनिट'}\n${language === 'en' ? 'Due Date' : 'नियत तारीख'}: ${newOrderData.dueDate}\n${language === 'en' ? 'Shift' : 'शिफ्ट'}: ${newOrderData.shiftNumber}${timelineInfo}`);
    
    closeNewOrderModal();
  };

  const handleTimelineUpdate = (field: string, value: string) => {
    setTimelineData(prev => ({ ...prev, [field]: value }));
  };

  const saveTimeline = () => {
    console.log('Saving timeline:', timelineData);
    alert(`✅ Production timeline updated for ${selectedOrder?.id}`);
    setIsEditingTimeline(false);
  };

  const handleSubmit = (action: string) => {
    console.log(`Submitting ${action} for order ${selectedOrder?.id}`);
    
    switch (action) {
      case 'print':
        alert(`✅ Order sheet printed for ${selectedOrder?.id}`);
        break;
      case 'assignTeam':
        alert(`✅ ${selectedOrder?.id} assigned to ${selectedTeam}`);
        break;
      case 'addNotes':
        alert(`✅ Note added to ${selectedOrder?.id}: "${noteText}"`);
        break;
      case 'downloadBOM':
        alert(`✅ BOM downloaded for ${selectedOrder?.id}`);
        break;
      case 'exportExcel':
        alert(`✅ ${selectedOrder?.id} exported to Excel`);
        break;
      case 'generateQR':
        alert(`✅ QR Code generated for ${selectedOrder?.id}`);
        break;
      case 'sendToProduction':
        alert(`✅ ${selectedOrder?.id} sent to production floor`);
        break;
      case 'requestMaterials':
        alert(`✅ Material request created for ${selectedOrder?.id}`);
        break;
      case 'reschedule':
        alert(`✅ ${selectedOrder?.id} rescheduled to ${newDueDate}`);
        break;
      case 'share':
        alert(`✅ ${selectedOrder?.id} shared successfully`);
        break;
      case 'archive':
        alert(`✅ ${selectedOrder?.id} archived`);
        break;
      case 'priority':
        alert(`✅ ${selectedOrder?.id} marked as priority`);
        break;
      case 'cancel':
        alert(`✅ ${selectedOrder?.id} cancelled`);
        break;
      case 'delete':
        alert(`✅ ${selectedOrder?.id} deleted`);
        break;
    }
    
    closeModal();
  };

  const ActionDropdown = ({ orderId }: { orderId: string }) => {
    const isOpen = openDropdown === orderId;
    
    return (
      <div className="relative">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            setOpenDropdown(isOpen ? null : orderId);
          }}
        >
          <MoreVertical className="h-4 w-4" />
        </Button>

        <OrderActionsDropdown
          orderId={orderId}
          isOpen={isOpen}
          onClose={() => setOpenDropdown(null)}
          onAction={handleAction}
          translations={{
            viewDetails: t.viewDetails,
            editOrder: t.editOrder,
            duplicateOrder: t.duplicateOrder,
            printOrder: t.printOrder,
            trackProgress: t.trackProgress,
            productionPlan: t.productionPlan,
            assignTeam: t.assignTeam,
            addNotes: t.addNotes,
            downloadBOM: t.downloadBOM,
            exportExcel: t.exportExcel,
            generateQR: t.generateQR,
            sendToProduction: t.sendToProduction,
            requestMaterials: t.requestMaterials,
            reschedule: t.reschedule,
            shareOrder: t.shareOrder,
            viewHistory: t.viewHistory,
            archiveOrder: t.archiveOrder,
            markPriority: t.markPriority,
            cancelOrder: t.cancelOrder,
            deleteOrder: t.deleteOrder,
          }}
        />
      </div>
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'planned':
        return <Badge className="bg-emerald-500">{language === 'en' ? 'Planned' : 'योजनित'}</Badge>;
      case 'delayed':
        return <Badge className="bg-red-500">{language === 'en' ? 'Delayed' : 'विलंबित'}</Badge>;
      case 'ahead':
        return <Badge className="bg-blue-500">{language === 'en' ? 'Ahead' : 'आगे'}</Badge>;
      case 'shortage':
        return <Badge className="bg-yellow-500">{language === 'en' ? 'Shortage' : 'कमी'}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Modal Components
  const ModalWrapper = ({ children, title }: { children: React.ReactNode; title: string }) => (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={closeModal} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl">{title}</h2>
            <Button variant="ghost" size="sm" onClick={closeModal}>
              <XCircle className="h-5 w-5" />
            </Button>
          </div>
          {children}
        </Card>
      </div>
    </>
  );

  const renderModal = () => {
    if (!activeModal || !selectedOrder) return null;

    switch (activeModal) {
      case 'view':
        return (
          <ModalWrapper title={`${language === 'en' ? 'Order Details' : 'ऑर्डर विवरण'}: ${selectedOrder.id}`}>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-zinc-600">{t.product}</p>
                  <p>{selectedOrder.product}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-600">{t.quantity}</p>
                  <p>{selectedOrder.quantity} {language === 'en' ? 'units' : 'यूनिट'}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-600">{t.stage}</p>
                  <p>{selectedOrder.stage}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-600">{t.status}</p>
                  {getStatusBadge(selectedOrder.status)}
                </div>
                <div>
                  <p className="text-sm text-zinc-600">{t.dueDate}</p>
                  <p>{selectedOrder.dueDate}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-600">{language === 'en' ? 'Progress' : 'प्रगति'}</p>
                  <p>{selectedOrder.progress}%</p>
                </div>
              </div>
              <div className="pt-4">
                <Button onClick={closeModal} className="w-full">
                  {language === 'en' ? 'Close' : 'बंद करें'}
                </Button>
              </div>
            </div>
          </ModalWrapper>
        );

      case 'edit':
        return (
          <ModalWrapper title={`${t.editOrder}: ${selectedOrder.id}`}>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-zinc-600">{t.product}</label>
                <Input defaultValue={selectedOrder.product} />
              </div>
              <div>
                <label className="text-sm text-zinc-600">{t.quantity}</label>
                <Input type="number" defaultValue={selectedOrder.quantity} />
              </div>
              <div>
                <label className="text-sm text-zinc-600">{t.dueDate}</label>
                <Input type="date" defaultValue={selectedOrder.dueDate} />
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={closeModal} variant="outline" className="flex-1">
                  {language === 'en' ? 'Cancel' : 'रद्द करें'}
                </Button>
                <Button onClick={() => handleSubmit('edit')} className="flex-1">
                  {language === 'en' ? 'Save Changes' : 'परिवर्तन सहेजें'}
                </Button>
              </div>
            </div>
          </ModalWrapper>
        );

      case 'print':
        return (
          <ModalWrapper title={t.printOrder}>
            <div className="space-y-4">
              <div className="bg-zinc-50 p-4 rounded-lg">
                <h3 className="mb-3">{language === 'en' ? 'Order Sheet Preview' : 'ऑर्डर शीट पूर्वावलोकन'}</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>{t.order}:</strong> {selectedOrder.id}</p>
                  <p><strong>{t.product}:</strong> {selectedOrder.product}</p>
                  <p><strong>{t.quantity}:</strong> {selectedOrder.quantity}</p>
                  <p><strong>{t.dueDate}:</strong> {selectedOrder.dueDate}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={closeModal} variant="outline" className="flex-1">
                  {language === 'en' ? 'Cancel' : 'रद्द करें'}
                </Button>
                <Button onClick={() => handleSubmit('print')} className="flex-1">
                  <Printer className="h-4 w-4 mr-2" />
                  {language === 'en' ? 'Print' : 'प्रिंट करें'}
                </Button>
              </div>
            </div>
          </ModalWrapper>
        );

      case 'trackProgress':
        return (
          <ModalWrapper title={`${t.trackProgress}: ${selectedOrder.id}`}>
            <div className="space-y-4">
              <div className="space-y-3">
                {[
                  { stage: 'Material Planning', progress: 100, status: 'complete' },
                  { stage: 'Cutting', progress: 100, status: 'complete' },
                  { stage: 'Sewing', progress: selectedOrder.progress, status: 'active' },
                  { stage: 'Quality Check', progress: 0, status: 'pending' },
                  { stage: 'Packaging', progress: 0, status: 'pending' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      item.status === 'complete' ? 'bg-emerald-500 text-white' :
                      item.status === 'active' ? 'bg-blue-500 text-white' :
                      'bg-zinc-200 text-zinc-500'
                    }`}>
                      {item.status === 'complete' ? '✓' : idx + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{item.stage}</p>
                      <div className="h-2 bg-zinc-200 rounded-full overflow-hidden mt-1">
                        <div 
                          className={`h-full ${item.status === 'complete' ? 'bg-emerald-500' : item.status === 'active' ? 'bg-blue-500' : 'bg-zinc-300'}`}
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-sm text-zinc-600">{item.progress}%</span>
                  </div>
                ))}
              </div>
              <Button onClick={closeModal} className="w-full">
                {language === 'en' ? 'Close' : 'बंद करें'}
              </Button>
            </div>
          </ModalWrapper>
        );

      case 'productionPlan':
        return (
          <>
            <div className="fixed inset-0 bg-black/50 z-40" onClick={closeModal} />
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl max-h-[90vh] overflow-hidden">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl">{`${t.productionPlan}: ${selectedOrder.id}`}</h2>
                  <div className="flex gap-2">
                    {!isEditingTimeline ? (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setIsEditingTimeline(true)}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        {language === 'en' ? 'Edit Timeline' : 'समयरेखा संपादित करें'}
                      </Button>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setIsEditingTimeline(false)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        {language === 'en' ? 'View Mode' : 'देखें मोड'}
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" onClick={closeModal}>
                      <XCircle className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                  {/* Order Summary */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-zinc-600">{t.product}</p>
                        <p className="font-medium">{selectedOrder.product}</p>
                      </div>
                      <div>
                        <p className="text-zinc-600">{t.quantity}</p>
                        <p className="font-medium">{selectedOrder.quantity} {language === 'en' ? 'units' : 'यूनिट'}</p>
                      </div>
                      <div>
                        <p className="text-zinc-600">{language === 'en' ? 'Start Date' : 'प्रारंभ तिथि'}</p>
                        <p className="font-medium">Dec 1, 2024</p>
                      </div>
                      <div>
                        <p className="text-zinc-600">{t.dueDate}</p>
                        <p className="font-medium">{selectedOrder.dueDate}</p>
                      </div>
                    </div>
                  </div>

                  {/* Edit Mode Notice */}
                  {isEditingTimeline && (
                    <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg flex items-start gap-2">
                      <Edit className="h-5 w-5 text-amber-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-amber-900">
                          {language === 'en' ? 'Edit Mode Active' : 'संपादन मोड सक्रिय'}
                        </p>
                        <p className="text-sm text-amber-700">
                          {language === 'en' 
                            ? 'Modify schedules, teams, and dates below. Click Save Changes when done.' 
                            : 'नीचे शेड्यूल, टीम और तारीखें संशोधित करें। पूर्ण होने पर परिवर्तन सहेजें पर क्लिक करें।'}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Timeline Stages */}
                  <div className="space-y-4">
                    {/* Stage 1 - Material Planning */}
                    <div className="relative border-l-4 border-emerald-500 pl-4 pb-6">
                      <div className="absolute -left-[13px] top-0 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-white" />
                      </div>
                      <div className="bg-white border border-zinc-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-medium">{language === 'en' ? '1. Material Planning' : '1. सामग्री योजना'}</h3>
                            <p className="text-sm text-emerald-600">{language === 'en' ? 'Completed' : 'पूर्ण'}</p>
                          </div>
                          <Badge className="bg-emerald-500">{language === 'en' ? 'Done' : 'हो गया'}</Badge>
                        </div>
                        {isEditingTimeline ? (
                          <div className="grid grid-cols-2 gap-3 mt-3">
                            <div>
                              <label className="text-xs text-zinc-600 mb-1 block">{language === 'en' ? 'Start Time' : 'प्रारंभ समय'}</label>
                              <Input 
                                type="datetime-local" 
                                value={timelineData.stage1Start}
                                onChange={(e) => handleTimelineUpdate('stage1Start', e.target.value)}
                                className="text-sm h-8"
                              />
                            </div>
                            <div>
                              <label className="text-xs text-zinc-600 mb-1 block">{language === 'en' ? 'End Time' : 'समाप्ति समय'}</label>
                              <Input 
                                type="datetime-local" 
                                value={timelineData.stage1End}
                                onChange={(e) => handleTimelineUpdate('stage1End', e.target.value)}
                                className="text-sm h-8"
                              />
                            </div>
                            <div className="col-span-2">
                              <label className="text-xs text-zinc-600 mb-1 block">{language === 'en' ? 'Team' : 'टीम'}</label>
                              <select
                                value={timelineData.stage1Team}
                                onChange={(e) => handleTimelineUpdate('stage1Team', e.target.value)}
                                className="w-full p-1.5 text-sm border border-zinc-300 rounded-md"
                              >
                                <option value="Planning Team">Planning Team</option>
                                <option value="Team A - Cutting Department">Team A - Cutting Department</option>
                                <option value="Team B - Sewing Department">Team B - Sewing Department</option>
                                <option value="Team C - Quality Control">Team C - Quality Control</option>
                                <option value="Team D - Packaging">Team D - Packaging</option>
                              </select>
                            </div>
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 gap-2 text-sm mt-3">
                            <div>
                              <p className="text-zinc-600">{language === 'en' ? 'Start' : 'शुरू'}</p>
                              <p>Dec 1, 9:00 AM</p>
                            </div>
                            <div>
                              <p className="text-zinc-600">{language === 'en' ? 'Completed' : 'पूर्ण'}</p>
                              <p>Dec 1, 2:00 PM</p>
                            </div>
                            <div>
                              <p className="text-zinc-600">{language === 'en' ? 'Team' : 'टीम'}</p>
                              <p>{timelineData.stage1Team}</p>
                            </div>
                            <div>
                              <p className="text-zinc-600">{language === 'en' ? 'Duration' : 'अवधि'}</p>
                              <p>5 {language === 'en' ? 'hours' : 'घंटे'}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Stage 2 - Cutting */}
                    <div className="relative border-l-4 border-emerald-500 pl-4 pb-6">
                      <div className="absolute -left-[13px] top-0 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-white" />
                      </div>
                      <div className="bg-white border border-zinc-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-medium">{language === 'en' ? '2. Fabric Cutting' : '2. कपड़ा कटाई'}</h3>
                            <p className="text-sm text-emerald-600">{language === 'en' ? 'Completed' : 'पूर्ण'}</p>
                          </div>
                          <Badge className="bg-emerald-500">{language === 'en' ? 'Done' : 'हो गया'}</Badge>
                        </div>
                        {isEditingTimeline ? (
                          <div className="grid grid-cols-2 gap-3 mt-3">
                            <div>
                              <label className="text-xs text-zinc-600 mb-1 block">{language === 'en' ? 'Start Time' : 'प्रारंभ समय'}</label>
                              <Input 
                                type="datetime-local" 
                                value={timelineData.stage2Start}
                                onChange={(e) => handleTimelineUpdate('stage2Start', e.target.value)}
                                className="text-sm h-8"
                              />
                            </div>
                            <div>
                              <label className="text-xs text-zinc-600 mb-1 block">{language === 'en' ? 'End Time' : 'समाप्ति समय'}</label>
                              <Input 
                                type="datetime-local" 
                                value={timelineData.stage2End}
                                onChange={(e) => handleTimelineUpdate('stage2End', e.target.value)}
                                className="text-sm h-8"
                              />
                            </div>
                            <div className="col-span-2">
                              <label className="text-xs text-zinc-600 mb-1 block">{language === 'en' ? 'Team' : 'टीम'}</label>
                              <select
                                value={timelineData.stage2Team}
                                onChange={(e) => handleTimelineUpdate('stage2Team', e.target.value)}
                                className="w-full p-1.5 text-sm border border-zinc-300 rounded-md"
                              >
                                <option value="Planning Team">Planning Team</option>
                                <option value="Team A - Cutting Department">Team A - Cutting Department</option>
                                <option value="Team B - Sewing Department">Team B - Sewing Department</option>
                                <option value="Team C - Quality Control">Team C - Quality Control</option>
                                <option value="Team D - Packaging">Team D - Packaging</option>
                              </select>
                            </div>
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 gap-2 text-sm mt-3">
                            <div>
                              <p className="text-zinc-600">{language === 'en' ? 'Start' : 'शुरू'}</p>
                              <p>Dec 2, 8:00 AM</p>
                            </div>
                            <div>
                              <p className="text-zinc-600">{language === 'en' ? 'Completed' : 'पूर्ण'}</p>
                              <p>Dec 2, 4:00 PM</p>
                            </div>
                            <div>
                              <p className="text-zinc-600">{language === 'en' ? 'Team' : 'टीम'}</p>
                              <p>{timelineData.stage2Team}</p>
                            </div>
                            <div>
                              <p className="text-zinc-600">{language === 'en' ? 'Duration' : 'अवधि'}</p>
                              <p>8 {language === 'en' ? 'hours' : 'घंटे'}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Stage 3 - Sewing (Active) */}
                    <div className="relative border-l-4 border-blue-500 pl-4 pb-6">
                      <div className="absolute -left-[13px] top-0 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center animate-pulse">
                        <Minus className="h-4 w-4 text-white" />
                      </div>
                      <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-medium text-blue-900">{language === 'en' ? '3. Sewing & Assembly' : '3. सिलाई और असेंबली'}</h3>
                            <p className="text-sm text-blue-600">{language === 'en' ? 'In Progress' : 'प्रगति में'}</p>
                          </div>
                          <Badge className="bg-blue-500">{language === 'en' ? 'Active' : 'सक्रिय'}</Badge>
                        </div>
                        {isEditingTimeline ? (
                          <div className="grid grid-cols-2 gap-3 mt-3 mb-3">
                            <div>
                              <label className="text-xs text-zinc-600 mb-1 block">{language === 'en' ? 'Start Time' : 'प्रारंभ समय'}</label>
                              <Input 
                                type="datetime-local" 
                                value={timelineData.stage3Start}
                                onChange={(e) => handleTimelineUpdate('stage3Start', e.target.value)}
                                className="text-sm h-8"
                              />
                            </div>
                            <div>
                              <label className="text-xs text-zinc-600 mb-1 block">{language === 'en' ? 'Est. Complete' : 'अनुमानित पूर्ण'}</label>
                              <Input 
                                type="datetime-local" 
                                value={timelineData.stage3End}
                                onChange={(e) => handleTimelineUpdate('stage3End', e.target.value)}
                                className="text-sm h-8"
                              />
                            </div>
                            <div className="col-span-2">
                              <label className="text-xs text-zinc-600 mb-1 block">{language === 'en' ? 'Team' : 'टीम'}</label>
                              <select
                                value={timelineData.stage3Team}
                                onChange={(e) => handleTimelineUpdate('stage3Team', e.target.value)}
                                className="w-full p-1.5 text-sm border border-zinc-300 rounded-md"
                              >
                                <option value="Planning Team">Planning Team</option>
                                <option value="Team A - Cutting Department">Team A - Cutting Department</option>
                                <option value="Team B - Sewing Department">Team B - Sewing Department</option>
                                <option value="Team C - Quality Control">Team C - Quality Control</option>
                                <option value="Team D - Packaging">Team D - Packaging</option>
                              </select>
                            </div>
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 gap-2 text-sm mt-3 mb-3">
                            <div>
                              <p className="text-zinc-600">{language === 'en' ? 'Started' : 'शुरू किया'}</p>
                              <p>Dec 3, 7:00 AM</p>
                            </div>
                            <div>
                              <p className="text-zinc-600">{language === 'en' ? 'Est. Complete' : 'अनुमानित पूर्ण'}</p>
                              <p>Dec 4, 6:00 PM</p>
                            </div>
                            <div>
                              <p className="text-zinc-600">{language === 'en' ? 'Team' : 'टीम'}</p>
                              <p>{timelineData.stage3Team}</p>
                            </div>
                            <div>
                              <p className="text-zinc-600">{language === 'en' ? 'Progress' : 'प्रगति'}</p>
                              <p>{selectedOrder.progress}%</p>
                            </div>
                          </div>
                        )}
                        <div className="bg-white rounded-lg p-2">
                          <div className="flex justify-between text-xs mb-1">
                            <span>{language === 'en' ? 'Current Progress' : 'वर्तमान प्रगति'}</span>
                            <span className="font-medium">{selectedOrder.progress}%</span>
                          </div>
                          <div className="h-3 bg-zinc-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                              style={{ width: `${selectedOrder.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Stage 4 - Quality Check */}
                    <div className="relative border-l-4 border-zinc-300 pl-4 pb-6">
                      <div className="absolute -left-[13px] top-0 w-6 h-6 rounded-full bg-zinc-300 flex items-center justify-center">
                        <AlertCircle className="h-4 w-4 text-zinc-600" />
                      </div>
                      <div className="bg-white border border-zinc-200 rounded-lg p-4 opacity-75">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-medium">{language === 'en' ? '4. Quality Check' : '4. गुणवत्ता जांच'}</h3>
                            <p className="text-sm text-zinc-500">{language === 'en' ? 'Pending' : 'लंबित'}</p>
                          </div>
                          <Badge className="bg-zinc-400">{language === 'en' ? 'Queued' : 'कतारबद्ध'}</Badge>
                        </div>
                        {isEditingTimeline ? (
                          <div className="grid grid-cols-2 gap-3 mt-3">
                            <div>
                              <label className="text-xs text-zinc-600 mb-1 block">{language === 'en' ? 'Scheduled Start' : 'निर्धारित प्रारंभ'}</label>
                              <Input 
                                type="datetime-local" 
                                value={timelineData.stage4Start}
                                onChange={(e) => handleTimelineUpdate('stage4Start', e.target.value)}
                                className="text-sm h-8"
                              />
                            </div>
                            <div>
                              <label className="text-xs text-zinc-600 mb-1 block">{language === 'en' ? 'Est. Complete' : 'अनुमानित पूर्ण'}</label>
                              <Input 
                                type="datetime-local" 
                                value={timelineData.stage4End}
                                onChange={(e) => handleTimelineUpdate('stage4End', e.target.value)}
                                className="text-sm h-8"
                              />
                            </div>
                            <div className="col-span-2">
                              <label className="text-xs text-zinc-600 mb-1 block">{language === 'en' ? 'Team' : 'टीम'}</label>
                              <select
                                value={timelineData.stage4Team}
                                onChange={(e) => handleTimelineUpdate('stage4Team', e.target.value)}
                                className="w-full p-1.5 text-sm border border-zinc-300 rounded-md"
                              >
                                <option value="Planning Team">Planning Team</option>
                                <option value="Team A - Cutting Department">Team A - Cutting Department</option>
                                <option value="Team B - Sewing Department">Team B - Sewing Department</option>
                                <option value="Team C - Quality Control">Team C - Quality Control</option>
                                <option value="Team D - Packaging">Team D - Packaging</option>
                              </select>
                            </div>
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 gap-2 text-sm mt-3">
                            <div>
                              <p className="text-zinc-600">{language === 'en' ? 'Scheduled' : 'निर्धारित'}</p>
                              <p>Dec 4, 6:30 PM</p>
                            </div>
                            <div>
                              <p className="text-zinc-600">{language === 'en' ? 'Est. Complete' : 'अनुमानित पूर्ण'}</p>
                              <p>Dec 5, 12:00 PM</p>
                            </div>
                            <div>
                              <p className="text-zinc-600">{language === 'en' ? 'Team' : 'टीम'}</p>
                              <p>{timelineData.stage4Team}</p>
                            </div>
                            <div>
                              <p className="text-zinc-600">{language === 'en' ? 'Est. Duration' : 'अनुमानित अवधि'}</p>
                              <p>6 {language === 'en' ? 'hours' : 'घंटे'}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Stage 5 - Packaging */}
                    <div className="relative border-l-4 border-zinc-300 pl-4 pb-2">
                      <div className="absolute -left-[13px] top-0 w-6 h-6 rounded-full bg-zinc-300 flex items-center justify-center">
                        <AlertCircle className="h-4 w-4 text-zinc-600" />
                      </div>
                      <div className="bg-white border border-zinc-200 rounded-lg p-4 opacity-75">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-medium">{language === 'en' ? '5. Packaging & Labeling' : '5. पैकेजिंग और लेबलिंग'}</h3>
                            <p className="text-sm text-zinc-500">{language === 'en' ? 'Pending' : 'लंबित'}</p>
                          </div>
                          <Badge className="bg-zinc-400">{language === 'en' ? 'Queued' : 'कतारबद्ध'}</Badge>
                        </div>
                        {isEditingTimeline ? (
                          <div className="grid grid-cols-2 gap-3 mt-3">
                            <div>
                              <label className="text-xs text-zinc-600 mb-1 block">{language === 'en' ? 'Scheduled Start' : 'निर्धारित प्रारंभ'}</label>
                              <Input 
                                type="datetime-local" 
                                value={timelineData.stage5Start}
                                onChange={(e) => handleTimelineUpdate('stage5Start', e.target.value)}
                                className="text-sm h-8"
                              />
                            </div>
                            <div>
                              <label className="text-xs text-zinc-600 mb-1 block">{language === 'en' ? 'Est. Complete' : 'अनुमानित पूर्ण'}</label>
                              <Input 
                                type="datetime-local" 
                                value={timelineData.stage5End}
                                onChange={(e) => handleTimelineUpdate('stage5End', e.target.value)}
                                className="text-sm h-8"
                              />
                            </div>
                            <div className="col-span-2">
                              <label className="text-xs text-zinc-600 mb-1 block">{language === 'en' ? 'Team' : 'टीम'}</label>
                              <select
                                value={timelineData.stage5Team}
                                onChange={(e) => handleTimelineUpdate('stage5Team', e.target.value)}
                                className="w-full p-1.5 text-sm border border-zinc-300 rounded-md"
                              >
                                <option value="Planning Team">Planning Team</option>
                                <option value="Team A - Cutting Department">Team A - Cutting Department</option>
                                <option value="Team B - Sewing Department">Team B - Sewing Department</option>
                                <option value="Team C - Quality Control">Team C - Quality Control</option>
                                <option value="Team D - Packaging">Team D - Packaging</option>
                              </select>
                            </div>
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 gap-2 text-sm mt-3">
                            <div>
                              <p className="text-zinc-600">{language === 'en' ? 'Scheduled' : 'निर्धारित'}</p>
                              <p>Dec 5, 1:00 PM</p>
                            </div>
                            <div>
                              <p className="text-zinc-600">{language === 'en' ? 'Est. Complete' : 'अनुमानित पूर्ण'}</p>
                              <p>Dec 5, 5:00 PM</p>
                            </div>
                            <div>
                              <p className="text-zinc-600">{language === 'en' ? 'Team' : 'टीम'}</p>
                              <p>{timelineData.stage5Team}</p>
                            </div>
                            <div>
                              <p className="text-zinc-600">{language === 'en' ? 'Est. Duration' : 'अनुमानित अवधि'}</p>
                              <p>4 {language === 'en' ? 'hours' : 'घंटे'}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Stage 6 - Dispatch */}
                    <div className="relative pl-4">
                      <div className="absolute -left-[13px] top-0 w-6 h-6 rounded-full bg-zinc-300 flex items-center justify-center">
                        <Package className="h-4 w-4 text-zinc-600" />
                      </div>
                      <div className="bg-white border border-zinc-200 rounded-lg p-4 opacity-75">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-medium">{language === 'en' ? '6. Ready for Dispatch' : '6. प्रेषण के लिए तैयार'}</h3>
                            <p className="text-sm text-zinc-500">{language === 'en' ? 'Final Stage' : 'अंतिम चरण'}</p>
                          </div>
                          <Badge className="bg-zinc-400">{language === 'en' ? 'Queued' : 'कतारबद्ध'}</Badge>
                        </div>
                        {isEditingTimeline ? (
                          <div className="grid grid-cols-2 gap-3 mt-3">
                            <div className="col-span-2">
                              <label className="text-xs text-zinc-600 mb-1 block">{language === 'en' ? 'Dispatch Time' : 'प्रेषण समय'}</label>
                              <Input 
                                type="datetime-local" 
                                value={timelineData.stage6Start}
                                onChange={(e) => handleTimelineUpdate('stage6Start', e.target.value)}
                                className="text-sm h-8"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 gap-2 text-sm mt-3">
                            <div>
                              <p className="text-zinc-600">{language === 'en' ? 'Scheduled' : 'निर्धारित'}</p>
                              <p>Dec 5, 5:30 PM</p>
                            </div>
                            <div>
                              <p className="text-zinc-600">{language === 'en' ? 'Delivery Date' : 'वितरण तिथि'}</p>
                              <p className="font-medium text-emerald-600">{selectedOrder.dueDate}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Summary Card */}
                  <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-4 rounded-lg border border-emerald-200">
                    <h3 className="font-medium mb-2">{language === 'en' ? 'Production Summary' : 'उत्पादन सारांश'}</h3>
                    <div className="grid grid-cols-3 gap-3 text-sm">
                      <div>
                        <p className="text-zinc-600">{language === 'en' ? 'Completed' : 'पूर्ण'}</p>
                        <p className="text-lg font-medium text-emerald-600">2/6</p>
                      </div>
                      <div>
                        <p className="text-zinc-600">{language === 'en' ? 'Active' : 'सक्रिय'}</p>
                        <p className="text-lg font-medium text-blue-600">1/6</p>
                      </div>
                      <div>
                        <p className="text-zinc-600">{language === 'en' ? 'Pending' : 'लंबित'}</p>
                        <p className="text-lg font-medium text-zinc-600">3/6</p>
                      </div>
                    </div>
                  </div>

                  {isEditingTimeline ? (
                    <div className="flex gap-2">
                      <Button onClick={() => setIsEditingTimeline(false)} variant="outline" className="flex-1">
                        {language === 'en' ? 'Cancel' : 'रद्द करें'}
                      </Button>
                      <Button onClick={saveTimeline} className="flex-1 bg-emerald-600">
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        {language === 'en' ? 'Save Changes' : 'परिवर्तन सहेजें'}
                      </Button>
                    </div>
                  ) : (
                    <Button onClick={closeModal} className="w-full">
                      {language === 'en' ? 'Close Timeline' : 'समयरेखा बंद करें'}
                    </Button>
                  )}
                </div>
              </Card>
            </div>
          </>
        );

      case 'assignTeam':
        return (
          <ModalWrapper title={`${t.assignTeam}: ${selectedOrder.id}`}>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-zinc-600 mb-2 block">
                  {language === 'en' ? 'Select Team' : 'टीम चुनें'}
                </label>
                <select 
                  value={selectedTeam}
                  onChange={(e) => setSelectedTeam(e.target.value)}
                  className="w-full p-2 border border-zinc-300 rounded-md"
                >
                  <option value="">{language === 'en' ? 'Choose team...' : 'टीम चुनें...'}</option>
                  <option value="Team A - Cutting Department">Team A - Cutting Department</option>
                  <option value="Team B - Sewing Department">Team B - Sewing Department</option>
                  <option value="Team C - Quality Control">Team C - Quality Control</option>
                  <option value="Team D - Packaging">Team D - Packaging</option>
                </select>
              </div>
              <div className="flex gap-2">
                <Button onClick={closeModal} variant="outline" className="flex-1">
                  {language === 'en' ? 'Cancel' : 'रद्द करें'}
                </Button>
                <Button 
                  onClick={() => handleSubmit('assignTeam')} 
                  className="flex-1"
                  disabled={!selectedTeam}
                >
                  <Users className="h-4 w-4 mr-2" />
                  {language === 'en' ? 'Assign' : 'असाइन करें'}
                </Button>
              </div>
            </div>
          </ModalWrapper>
        );

      case 'addNotes':
        return (
          <ModalWrapper title={`${t.addNotes}: ${selectedOrder.id}`}>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-zinc-600 mb-2 block">
                  {language === 'en' ? 'Add Note or Comment' : 'नोट या टिप्पणी जोड़ें'}
                </label>
                <textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  className="w-full p-3 border border-zinc-300 rounded-md min-h-[120px]"
                  placeholder={language === 'en' ? 'Enter notes or special instructions...' : 'नोट्स या विशेष निर्देश दर्ज करें...'}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={closeModal} variant="outline" className="flex-1">
                  {language === 'en' ? 'Cancel' : 'रद्द करें'}
                </Button>
                <Button 
                  onClick={() => handleSubmit('addNotes')} 
                  className="flex-1"
                  disabled={!noteText.trim()}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  {language === 'en' ? 'Save Note' : 'नोट सहेजें'}
                </Button>
              </div>
            </div>
          </ModalWrapper>
        );

      case 'downloadBOM':
      case 'exportExcel':
      case 'generateQR':
        return (
          <ModalWrapper title={activeModal === 'downloadBOM' ? t.downloadBOM : activeModal === 'exportExcel' ? t.exportExcel : t.generateQR}>
            <div className="space-y-4">
              <div className="text-center py-8">
                {activeModal === 'downloadBOM' && <FileText className="h-16 w-16 mx-auto text-emerald-500 mb-4" />}
                {activeModal === 'exportExcel' && <Download className="h-16 w-16 mx-auto text-blue-500 mb-4" />}
                {activeModal === 'generateQR' && <QrCode className="h-16 w-16 mx-auto text-zinc-700 mb-4" />}
                <p className="text-zinc-600">
                  {language === 'en' 
                    ? `Preparing ${activeModal === 'downloadBOM' ? 'BOM document' : activeModal === 'exportExcel' ? 'Excel file' : 'QR code'} for ${selectedOrder.id}...` 
                    : `${selectedOrder.id} के लिए ${activeModal === 'downloadBOM' ? 'BOM दस्तावेज़' : activeModal === 'exportExcel' ? 'Excel फ़ाइल' : 'QR कोड'} तैयार किया जा रहा है...`}
                </p>
              </div>
              <div className="flex gap-2">
                <Button onClick={closeModal} variant="outline" className="flex-1">
                  {language === 'en' ? 'Cancel' : 'रद्द करें'}
                </Button>
                <Button onClick={() => handleSubmit(activeModal)} className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  {language === 'en' ? 'Download' : 'डाउनलोड करें'}
                </Button>
              </div>
            </div>
          </ModalWrapper>
        );

      case 'sendToProduction':
        return (
          <ModalWrapper title={t.sendToProduction}>
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <p className="text-blue-900">
                  {language === 'en' 
                    ? `Send order ${selectedOrder.id} to production floor?` 
                    : `ऑर्डर ${selectedOrder.id} को उत्पादन तल पर भेजें?`}
                </p>
                <p className="text-sm text-blue-700 mt-2">
                  {language === 'en' 
                    ? 'This will notify the production team and start the manufacturing process.' 
                    : 'यह उत्पादन टीम को सूचित करेगा और निर्माण प्रक्रिया शुरू करेगा।'}
                </p>
              </div>
              <div className="flex gap-2">
                <Button onClick={closeModal} variant="outline" className="flex-1">
                  {language === 'en' ? 'Cancel' : 'रद्द करें'}
                </Button>
                <Button onClick={() => handleSubmit('sendToProduction')} className="flex-1 bg-blue-600">
                  <Send className="h-4 w-4 mr-2" />
                  {language === 'en' ? 'Send to Production' : 'उत्पादन में भेजें'}
                </Button>
              </div>
            </div>
          </ModalWrapper>
        );

      case 'requestMaterials':
        return (
          <ModalWrapper title={t.requestMaterials}>
            <div className="space-y-4">
              <p className="text-zinc-600">
                {language === 'en' 
                  ? `Create material request for order ${selectedOrder.id}?` 
                  : `ऑर्डर ${selectedOrder.id} के लिए सामग्री अनुरोध बनाएं?`}
              </p>
              <div className="bg-zinc-50 p-4 rounded-lg">
                <p className="text-sm mb-2">{language === 'en' ? 'Required Materials:' : 'आवश्यक सामग्री:'}</p>
                <ul className="text-sm space-y-1 text-zinc-600">
                  <li>• Cotton Fabric: {selectedOrder.quantity * 2}kg</li>
                  <li>• Thread: {selectedOrder.quantity * 0.5}kg</li>
                  <li>• Labels: {selectedOrder.quantity} pcs</li>
                </ul>
              </div>
              <div className="flex gap-2">
                <Button onClick={closeModal} variant="outline" className="flex-1">
                  {language === 'en' ? 'Cancel' : 'रद्द करें'}
                </Button>
                <Button onClick={() => handleSubmit('requestMaterials')} className="flex-1">
                  <Package className="h-4 w-4 mr-2" />
                  {language === 'en' ? 'Create Request' : 'अनुरोध बनाएं'}
                </Button>
              </div>
            </div>
          </ModalWrapper>
        );

      case 'reschedule':
        return (
          <ModalWrapper title={t.reschedule}>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-zinc-600 mb-2 block">
                  {language === 'en' ? 'Current Due Date' : 'वर्तमान नियत तारीख'}
                </label>
                <Input type="text" value={selectedOrder.dueDate} disabled />
              </div>
              <div>
                <label className="text-sm text-zinc-600 mb-2 block">
                  {language === 'en' ? 'New Due Date' : 'नई नियत तारीख'}
                </label>
                <Input 
                  type="date" 
                  value={newDueDate}
                  onChange={(e) => setNewDueDate(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={closeModal} variant="outline" className="flex-1">
                  {language === 'en' ? 'Cancel' : 'रद्द करें'}
                </Button>
                <Button 
                  onClick={() => handleSubmit('reschedule')} 
                  className="flex-1"
                  disabled={!newDueDate}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  {language === 'en' ? 'Reschedule' : 'पुनर्निर्धारित करें'}
                </Button>
              </div>
            </div>
          </ModalWrapper>
        );

      case 'share':
        return (
          <ModalWrapper title={t.shareOrder}>
            <div className="space-y-4">
              <p className="text-zinc-600">
                {language === 'en' ? `Share order ${selectedOrder.id} with:` : `इसके साथ ऑर्डर ${selectedOrder.id} साझा करें:`}
              </p>
              <div className="space-y-2">
                {[
                  { icon: '📧', label: language === 'en' ? 'Email' : 'ईमेल' },
                  { icon: '💬', label: language === 'en' ? 'WhatsApp' : 'WhatsApp' },
                  { icon: '🔗', label: language === 'en' ? 'Copy Link' : 'लिंक कॉपी करें' },
                  { icon: '📱', label: language === 'en' ? 'SMS' : 'SMS' }
                ].map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSubmit('share')}
                    className="w-full p-3 border border-zinc-200 rounded-lg hover:bg-zinc-50 flex items-center gap-3"
                  >
                    <span className="text-2xl">{option.icon}</span>
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </ModalWrapper>
        );

      case 'viewHistory':
        return (
          <ModalWrapper title={`${t.viewHistory}: ${selectedOrder.id}`}>
            <div className="space-y-3">
              {[
                { date: '2024-12-03 10:30', action: 'Order created', user: 'Admin' },
                { date: '2024-12-03 11:15', action: 'Sent to production', user: 'Manager' },
                { date: '2024-12-03 14:20', action: 'Material requested', user: 'Supervisor' },
                { date: '2024-12-03 16:45', action: 'Progress updated to 45%', user: 'System' }
              ].map((entry, idx) => (
                <div key={idx} className="flex gap-3 pb-3 border-b last:border-0">
                  <Clock className="h-5 w-5 text-zinc-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm">{entry.action}</p>
                    <p className="text-xs text-zinc-500">{entry.date} • {entry.user}</p>
                  </div>
                </div>
              ))}
              <Button onClick={closeModal} className="w-full mt-4">
                {language === 'en' ? 'Close' : 'बंद करें'}
              </Button>
            </div>
          </ModalWrapper>
        );

      case 'archive':
      case 'priority':
      case 'cancel':
      case 'delete':
        const config = {
          archive: { color: 'blue', icon: Archive, title: t.archiveOrder },
          priority: { color: 'amber', icon: Star, title: t.markPriority },
          cancel: { color: 'amber', icon: XCircle, title: t.cancelOrder },
          delete: { color: 'red', icon: Trash2, title: t.deleteOrder }
        }[activeModal];

        return (
          <ModalWrapper title={config.title}>
            <div className="space-y-4">
              <div className={`bg-${config.color}-50 border border-${config.color}-200 p-4 rounded-lg`}>
                <div className="flex items-center gap-3 mb-2">
                  <config.icon className={`h-6 w-6 text-${config.color}-600`} />
                  <p className={`text-${config.color}-900`}>
                    {language === 'en' 
                      ? `Are you sure you want to ${activeModal} this order?` 
                      : `क्या आप वाकई इस ऑर्डर को ${activeModal === 'delete' ? 'हटाना' : activeModal === 'cancel' ? 'रद्द करना' : activeModal === 'archive' ? 'संग्रहित करना' : 'प्राथमिकता के रूप में चिह्नित करना'} चाहते हैं?`}
                  </p>
                </div>
                <p className="text-sm text-zinc-600">
                  {t.order}: <strong>{selectedOrder.id}</strong>
                </p>
                {activeModal === 'delete' && (
                  <p className={`text-sm text-${config.color}-700 mt-2`}>
                    {language === 'en' ? '⚠️ This action cannot be undone!' : '⚠️ यह क्रिया पूर्ववत नहीं की जा सकती!'}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <Button onClick={closeModal} variant="outline" className="flex-1">
                  {language === 'en' ? 'Cancel' : 'रद्द करें'}
                </Button>
                <Button 
                  onClick={() => handleSubmit(activeModal)} 
                  className={`flex-1 bg-${config.color}-600`}
                >
                  {config.title}
                </Button>
              </div>
            </div>
          </ModalWrapper>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Render Modal */}
      {renderModal()}
      
      <div className="flex items-center justify-between">
        <h1>{t.title}</h1>
        <Button className="hidden sm:flex" onClick={() => setShowNewOrderModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          {t.newOrder}
        </Button>
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

      {/* Orders List - Mobile Card View */}
      <div className="lg:hidden space-y-3">
        {orders.map((order) => (
          <Card key={order.id} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span>{order.id}</span>
                  {getStatusBadge(order.status)}
                </div>
                <p className="text-zinc-600">{order.product}</p>
              </div>
              <ActionDropdown orderId={order.id} />
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-600">{t.quantity}:</span>
                <span>{order.quantity} {language === 'en' ? 'units' : 'यूनिट'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-600">{t.stage}:</span>
                <span>{order.stage}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-600">{t.dueDate}:</span>
                <span>{order.dueDate}</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-3">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-zinc-600">{language === 'en' ? 'Progress' : 'प्रगति'}</span>
                <span>{order.progress}%</span>
              </div>
              <div className="h-2 bg-zinc-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all"
                  style={{ width: `${order.progress}%` }}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Orders Table - Desktop View */}
      <Card className="hidden lg:block overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-zinc-50 border-b">
              <tr>
                <th className="text-left p-4">{t.order}</th>
                <th className="text-left p-4">{t.product}</th>
                <th className="text-left p-4">{t.quantity}</th>
                <th className="text-left p-4">{t.stage}</th>
                <th className="text-left p-4">{t.status}</th>
                <th className="text-left p-4">{language === 'en' ? 'Progress' : 'प्रगति'}</th>
                <th className="text-left p-4">{t.dueDate}</th>
                <th className="text-left p-4">{t.actions}</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-zinc-50">
                  <td className="p-4">{order.id}</td>
                  <td className="p-4">{order.product}</td>
                  <td className="p-4">{order.quantity} {language === 'en' ? 'units' : 'यूनिट'}</td>
                  <td className="p-4">{order.stage}</td>
                  <td className="p-4">{getStatusBadge(order.status)}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-zinc-200 rounded-full overflow-hidden max-w-[100px]">
                        <div
                          className="h-full bg-emerald-500"
                          style={{ width: `${order.progress}%` }}
                        />
                      </div>
                      <span className="text-sm text-zinc-600">{order.progress}%</span>
                    </div>
                  </td>
                  <td className="p-4">{order.dueDate}</td>
                  <td className="p-4">
                    <ActionDropdown orderId={order.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Mobile New Order Button */}
      <Button 
        className="lg:hidden fixed bottom-20 right-4 h-14 w-14 rounded-full shadow-lg"
        onClick={() => setShowNewOrderModal(true)}
      >
        <Plus className="h-6 w-6" />
      </Button>

      {/* New Order Modal */}
      {showNewOrderModal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={closeNewOrderModal} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl">{t.createNewOrder}</h2>
                <Button variant="ghost" size="sm" onClick={closeNewOrderModal}>
                  <XCircle className="h-5 w-5" />
                </Button>
              </div>

              <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                {/* Product Selection */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    {t.selectProduct} <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={newOrderData.product}
                    onChange={(e) => handleNewOrderChange('product', e.target.value)}
                    className="w-full p-2.5 border border-zinc-300 rounded-md"
                  >
                    <option value="">{t.chooseProduct}</option>
                    {Object.entries(SKUs).map(([skuId, productName]) => (
                      <option key={skuId} value={productName}>
                        {productName} ({skuId})
                      </option>
                    ))}
                  </select>
                  
                  {/* Product Preview */}
                  {newOrderData.product && (
                    <div className="mt-2 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-medium text-blue-900">{newOrderData.product}</p>
                          <p className="text-xs text-blue-700 mt-1">
                            {Object.entries(SKUs).find(([_, name]) => name === newOrderData.product)?.[0]}
                          </p>
                        </div>
                        <Badge className="bg-blue-600">
                          {Object.entries(SKUs).find(([skuId, name]) => name === newOrderData.product)?.[0]}
                        </Badge>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quantity and Due Date Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      {t.enterQuantity} <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="number"
                      min="1"
                      placeholder="500"
                      value={newOrderData.quantity}
                      onChange={(e) => handleNewOrderChange('quantity', e.target.value)}
                    />
                    <p className="text-xs text-zinc-500 mt-1">{t.units}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      {t.selectDueDate} <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="date"
                      value={newOrderData.dueDate}
                      onChange={(e) => handleNewOrderChange('dueDate', e.target.value)}
                    />
                  </div>
                </div>

                {/* Priority and Stage Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      {t.orderPriority}
                    </label>
                    <select
                      value={newOrderData.priority}
                      onChange={(e) => handleNewOrderChange('priority', e.target.value)}
                      className="w-full p-2.5 border border-zinc-300 rounded-md"
                    >
                      <option value="normal">⚪ {t.normal}</option>
                      <option value="high">🟡 {t.high}</option>
                      <option value="urgent">🔴 {t.urgent}</option>
                    </select>
                    {newOrderData.priority === 'high' && (
                      <p className="text-xs text-amber-600 mt-1">🟡 {language === 'en' ? 'High priority order' : 'उच्च प्राथमिकता ऑर्डर'}</p>
                    )}
                    {newOrderData.priority === 'urgent' && (
                      <p className="text-xs text-red-600 mt-1">🔴 {language === 'en' ? 'Urgent - Top Priority!' : 'तत्काल - शीर्ष प्राथमिकता!'}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      {t.productionStage}
                    </label>
                    <select
                      value={newOrderData.stage}
                      onChange={(e) => handleNewOrderChange('stage', e.target.value)}
                      className="w-full p-2.5 border border-zinc-300 rounded-md"
                    >
                      <option value="Material Planning">Material Planning</option>
                      <option value="Cutting">Cutting</option>
                      <option value="Sewing">Sewing</option>
                      <option value="Quality Check">Quality Check</option>
                      <option value="Packaging">Packaging</option>
                      <option value="Dispatch">Dispatch</option>
                    </select>
                  </div>
                </div>

                {/* Customer Name */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    {t.customerName}
                  </label>
                  <Input
                    type="text"
                    placeholder={t.enterCustomer}
                    value={newOrderData.customerName}
                    onChange={(e) => handleNewOrderChange('customerName', e.target.value)}
                  />
                </div>

                {/* Assign Team */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    {t.assignTeamLabel}
                  </label>
                  <select
                    value={newOrderData.assignedTeam}
                    onChange={(e) => handleNewOrderChange('assignedTeam', e.target.value)}
                    className="w-full p-2.5 border border-zinc-300 rounded-md"
                  >
                    <option value="">{t.selectTeam}</option>
                    <option value="Planning Team">Planning Team</option>
                    <option value="Team A - Cutting Department">Team A - Cutting Department</option>
                    <option value="Team B - Sewing Department">Team B - Sewing Department</option>
                    <option value="Team C - Quality Control">Team C - Quality Control</option>
                    <option value="Team D - Packaging">Team D - Packaging</option>
                  </select>
                </div>

                {/* Shift Number */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    {t.shiftNumber}
                  </label>
                  <select
                    value={newOrderData.shiftNumber}
                    onChange={(e) => handleNewOrderChange('shiftNumber', e.target.value)}
                    className="w-full p-2.5 border border-zinc-300 rounded-md"
                  >
                    <option value="Shift 1">🌅 {t.shift1}</option>
                    <option value="Shift 2">🌤️ {t.shift2}</option>
                    <option value="Shift 3">🌙 {t.shift3}</option>
                  </select>
                  
                  {/* Shift Visual Indicator */}
                  <div className={`mt-2 p-2.5 rounded-lg border ${
                    newOrderData.shiftNumber === 'Shift 1' 
                      ? 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200' 
                      : newOrderData.shiftNumber === 'Shift 2'
                      ? 'bg-gradient-to-r from-blue-50 to-sky-50 border-blue-200'
                      : 'bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200'
                  }`}>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-lg">
                        {newOrderData.shiftNumber === 'Shift 1' && '🌅'}
                        {newOrderData.shiftNumber === 'Shift 2' && '🌤️'}
                        {newOrderData.shiftNumber === 'Shift 3' && '🌙'}
                      </span>
                      <div>
                        <p className={`font-medium ${
                          newOrderData.shiftNumber === 'Shift 1' 
                            ? 'text-amber-900' 
                            : newOrderData.shiftNumber === 'Shift 2'
                            ? 'text-blue-900'
                            : 'text-indigo-900'
                        }`}>
                          {newOrderData.shiftNumber === 'Shift 1' && (language === 'en' ? 'Morning Shift' : 'सुबह की शिफ्ट')}
                          {newOrderData.shiftNumber === 'Shift 2' && (language === 'en' ? 'Afternoon Shift' : 'दोपहर की शिफ्ट')}
                          {newOrderData.shiftNumber === 'Shift 3' && (language === 'en' ? 'Night Shift' : 'रात की शिफ्ट')}
                        </p>
                        <p className={`${
                          newOrderData.shiftNumber === 'Shift 1' 
                            ? 'text-amber-700' 
                            : newOrderData.shiftNumber === 'Shift 2'
                            ? 'text-blue-700'
                            : 'text-indigo-700'
                        }`}>
                          {newOrderData.shiftNumber === 'Shift 1' && '6:00 AM - 2:00 PM'}
                          {newOrderData.shiftNumber === 'Shift 2' && '2:00 PM - 10:00 PM'}
                          {newOrderData.shiftNumber === 'Shift 3' && '10:00 PM - 6:00 AM'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Production Timeline */}
                <div className="border-t border-zinc-200 pt-4">
                  <h3 className="font-medium mb-3 text-zinc-900">
                    ⏱️ {t.productionTimeline}
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        {t.startTime}
                      </label>
                      <input
                        type="datetime-local"
                        value={newOrderData.startTime}
                        onChange={(e) => handleNewOrderChange('startTime', e.target.value)}
                        className="w-full p-2.5 border border-zinc-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        {t.endTime}
                      </label>
                      <input
                        type="datetime-local"
                        value={newOrderData.endTime}
                        onChange={(e) => handleNewOrderChange('endTime', e.target.value)}
                        className="w-full p-2.5 border border-zinc-300 rounded-md"
                      />
                    </div>
                  </div>
                  
                  {/* Timeline Duration Preview */}
                  {newOrderData.startTime && newOrderData.endTime && (
                    <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-blue-900">
                          {language === 'en' ? 'Duration:' : 'अवधि:'} 
                        </span>
                        <span className="text-blue-700">
                          {(() => {
                            const start = new Date(newOrderData.startTime);
                            const end = new Date(newOrderData.endTime);
                            const diffMs = end.getTime() - start.getTime();
                            const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
                            const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
                            return diffHours > 0 
                              ? `${diffHours}h ${diffMins}m`
                              : `${diffMins}m`;
                          })()}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Order Notes */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    {t.orderNotes}
                  </label>
                  <textarea
                    placeholder={t.enterNotes}
                    value={newOrderData.notes}
                    onChange={(e) => handleNewOrderChange('notes', e.target.value)}
                    className="w-full p-2.5 border border-zinc-300 rounded-md min-h-[100px] resize-none"
                  />
                </div>

                {/* Order Summary Preview */}
                {newOrderData.product && newOrderData.quantity && newOrderData.dueDate && (
                  <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 p-4 rounded-lg">
                    <h3 className="font-medium text-emerald-900 mb-3">
                      {language === 'en' ? '📋 Order Summary' : '📋 ऑर्डर सारांश'}
                    </h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-zinc-600">{t.product}</p>
                        <p className="font-medium text-emerald-900">{newOrderData.product}</p>
                      </div>
                      <div>
                        <p className="text-zinc-600">{t.quantity}</p>
                        <p className="font-medium text-emerald-900">{newOrderData.quantity} {t.units}</p>
                      </div>
                      <div>
                        <p className="text-zinc-600">{t.dueDate}</p>
                        <p className="font-medium text-emerald-900">{newOrderData.dueDate}</p>
                      </div>
                      <div>
                        <p className="text-zinc-600">{t.orderPriority}</p>
                        <p className="font-medium text-emerald-900">
                          {newOrderData.priority === 'urgent' && '🔴 '}
                          {newOrderData.priority === 'high' && '🟡 '}
                          {newOrderData.priority === 'normal' && '⚪ '}
                          {newOrderData.priority === 'urgent' ? t.urgent : newOrderData.priority === 'high' ? t.high : t.normal}
                        </p>
                      </div>
                      {newOrderData.customerName && (
                        <div className="col-span-2">
                          <p className="text-zinc-600">{t.customerName}</p>
                          <p className="font-medium text-emerald-900">{newOrderData.customerName}</p>
                        </div>
                      )}
                      {newOrderData.assignedTeam && (
                        <div className="col-span-2">
                          <p className="text-zinc-600">{t.assignTeamLabel}</p>
                          <p className="font-medium text-emerald-900">{newOrderData.assignedTeam}</p>
                        </div>
                      )}
                      
                      {/* Shift Information */}
                      <div>
                        <p className="text-zinc-600">{t.shiftNumber}</p>
                        <p className="font-medium text-emerald-900">
                          {newOrderData.shiftNumber === 'Shift 1' && '🌅 '}
                          {newOrderData.shiftNumber === 'Shift 2' && '🌤️ '}
                          {newOrderData.shiftNumber === 'Shift 3' && '🌙 '}
                          {newOrderData.shiftNumber}
                        </p>
                      </div>
                      
                      {/* Timeline Information */}
                      {newOrderData.startTime && newOrderData.endTime && (
                        <div>
                          <p className="text-zinc-600">⏱️ {t.productionTimeline}</p>
                          <p className="font-medium text-emerald-900 text-xs">
                            {new Date(newOrderData.startTime).toLocaleString(language === 'en' ? 'en-US' : 'hi-IN', { 
                              month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
                            })}
                            {' → '}
                            {new Date(newOrderData.endTime).toLocaleString(language === 'en' ? 'en-US' : 'hi-IN', { 
                              month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
                            })}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Required Fields Notice */}
                <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg text-sm">
                  <p className="text-blue-900">
                    <span className="text-red-500">*</span> {t.requiredFields}: {t.selectProduct}, {t.enterQuantity}, {t.selectDueDate}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  <Button 
                    onClick={closeNewOrderModal} 
                    variant="outline" 
                    className="flex-1"
                  >
                    {t.cancel}
                  </Button>
                  <Button 
                    onClick={createNewOrder} 
                    className="flex-1 bg-emerald-600"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    {t.createOrder}
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}