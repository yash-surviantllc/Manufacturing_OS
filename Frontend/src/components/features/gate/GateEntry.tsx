import { useState } from 'react';
import { Truck, Package, User, FileText, CheckCircle, Clock, AlertCircle, Search, Plus, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

type GateEntryProps = {
  language: 'en' | 'hi' | 'kn' | 'ta' | 'te' | 'mr' | 'gu' | 'pa';
};

type EntryType = 'material' | 'courier' | 'visitor' | 'jobwork_return' | 'subcontract_return' | 'delivery' | 'machine_spare';

type GateEntryRecord = {
  id: string;
  entryType: EntryType;
  vendor: string;
  vehicleNo: string;
  driverName: string;
  materials: {
    materialCode: string;
    materialName: string;
    qty: number;
    uom: string;
  }[];
  linkedDocument: string;
  destinationDepartment: string;
  status: 'arrived' | 'under_verification' | 'accepted' | 'rejected';
  timestamp: string;
  remarks: string;
};

export function GateEntry({ language }: GateEntryProps) {
  const [showEntryModal, setShowEntryModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'new' | 'history'>('new');
  
  const [entryData, setEntryData] = useState<Partial<GateEntryRecord>>({
    entryType: 'material',
    materials: [{ materialCode: '', materialName: '', qty: 0, uom: 'kg' }],
    status: 'arrived'
  });

  // Mock data for history
  const [entryHistory] = useState<GateEntryRecord[]>([
    {
      id: 'GE-001',
      entryType: 'material',
      vendor: 'ABC Textiles',
      vehicleNo: 'KA-01-AB-1234',
      driverName: 'Ramesh Kumar',
      materials: [
        { materialCode: 'RM-001', materialName: 'Cotton Yarn', qty: 600, uom: 'kg' }
      ],
      linkedDocument: 'PO-1001',
      destinationDepartment: 'Store',
      status: 'accepted',
      timestamp: '2025-12-03 09:30 AM',
      remarks: 'Quality verified'
    },
    {
      id: 'GE-002',
      entryType: 'courier',
      vendor: 'BlueDart',
      vehicleNo: 'N/A',
      driverName: 'Delivery Agent',
      materials: [
        { materialCode: 'N/A', materialName: 'Documents Package', qty: 1, uom: 'pcs' }
      ],
      linkedDocument: 'AWB-789456',
      destinationDepartment: 'Admin',
      status: 'accepted',
      timestamp: '2025-12-03 08:15 AM',
      remarks: 'Signed by reception'
    },
    {
      id: 'GE-003',
      entryType: 'jobwork_return',
      vendor: 'XYZ Stitching Co.',
      vehicleNo: 'KA-05-CD-5678',
      driverName: 'Suresh',
      materials: [
        { materialCode: 'WIP-045', materialName: 'Stitched T-Shirt Panels', qty: 500, uom: 'pcs' }
      ],
      linkedDocument: 'JW-DC-123',
      destinationDepartment: 'QA',
      status: 'under_verification',
      timestamp: '2025-12-03 07:45 AM',
      remarks: 'QA inspection pending'
    }
  ]);

  const translations = {
    en: {
      title: 'Gate Entry (Inward)',
      subtitle: 'Manage all incoming materials, deliveries, and visitors',
      newEntry: 'New Entry',
      history: 'Entry History',
      createEntry: '+ Create Gate Entry',
      entryType: 'Entry Type',
      vendor: 'Vendor / Source',
      vehicleNo: 'Vehicle Number',
      driverName: 'Driver Name',
      materials: 'Materials / Items',
      materialCode: 'Material Code',
      materialName: 'Material Name',
      quantity: 'Quantity',
      uom: 'UOM',
      linkedDocument: 'Linked Document',
      destinationDept: 'Destination Department',
      remarks: 'Remarks',
      status: 'Status',
      timestamp: 'Date & Time',
      actions: 'Actions',
      search: 'Search entries...',
      addMaterial: '+ Add Material',
      cancel: 'Cancel',
      createRecord: 'Create Entry',
      viewDetails: 'View',
      entryTypes: {
        material: 'Material Delivery',
        courier: 'Courier / Parcel',
        visitor: 'Visitor Entry',
        jobwork_return: 'Job-work Return',
        subcontract_return: 'Subcontract Return',
        delivery: 'Purchase Delivery',
        machine_spare: 'Machine Spare'
      },
      departments: {
        store: 'Store',
        qa: 'QA / Inspection',
        maintenance: 'Maintenance',
        production: 'Production',
        admin: 'Admin'
      },
      statuses: {
        arrived: 'Arrived',
        under_verification: 'Under Verification',
        accepted: 'Accepted',
        rejected: 'Rejected'
      },
      enterVendor: 'Enter vendor name',
      enterVehicle: 'Enter vehicle number',
      enterDriver: 'Enter driver name',
      enterMaterialCode: 'Enter code',
      enterMaterialName: 'Enter material name',
      enterDocument: 'PO/Invoice/DC number',
      enterRemarks: 'Add notes or remarks',
      selectType: 'Select entry type',
      selectDepartment: 'Select department',
      noEntries: 'No gate entries yet',
      createFirst: 'Create your first gate entry above'
    },
    hi: {
      title: 'गेट एंट्री (इनवर्ड)',
      subtitle: 'सभी आने वाली सामग्री, डिलीवरी और विज़िटर्स को प्रबंधित करें',
      newEntry: 'नई एंट्री',
      history: 'एंट्री इतिहास',
      createEntry: '+ गेट एंट्री बनाएं',
      entryType: 'एंट्री प्रकार',
      vendor: 'विक्रेता / स्रोत',
      vehicleNo: 'वाहन नंबर',
      driverName: 'ड्राइवर का नाम',
      materials: 'सामग्री / आइटम',
      materialCode: 'सामग्री कोड',
      materialName: 'सामग्री का नाम',
      quantity: 'मात्रा',
      uom: 'UOM',
      linkedDocument: 'लिंक्ड दस्तावेज़',
      destinationDept: 'गंतव्य विभाग',
      remarks: 'टिप्पणी',
      status: 'स्थिति',
      timestamp: 'दिनांक और समय',
      actions: 'कार्रवाई',
      search: 'एंट्री खोजें...',
      addMaterial: '+ सामग्री जोड़ें',
      cancel: 'रद्द करें',
      createRecord: 'एंट्री बनाएं',
      viewDetails: 'देखें',
      entryTypes: {
        material: 'सामग्री डिलीवरी',
        courier: 'कूरियर / पार्सल',
        visitor: 'विज़िटर एंट्री',
        jobwork_return: 'जॉब-वर्क रिटर्न',
        subcontract_return: 'सबकॉन्ट्रैक्ट रिटर्न',
        delivery: 'खरीद डिलीवरी',
        machine_spare: 'मशीन स्पेयर'
      },
      departments: {
        store: 'स्टोर',
        qa: 'QA / निरीक्षण',
        maintenance: 'रखरखाव',
        production: 'उत्पादन',
        admin: 'प्रशासन'
      },
      statuses: {
        arrived: 'आगमन',
        under_verification: 'सत्यापन में',
        accepted: 'स्वीकृत',
        rejected: 'अस्वीकृत'
      },
      enterVendor: 'विक्रेता का नाम दर्ज करें',
      enterVehicle: 'वाहन नंबर दर्ज करें',
      enterDriver: 'ड्राइवर का नाम दर्ज करें',
      enterMaterialCode: 'कोड दर्ज करें',
      enterMaterialName: 'सामग्री का नाम दर्ज करें',
      enterDocument: 'PO/चालान/DC नंबर',
      enterRemarks: 'नोट्स या टिप्पणी जोड़ें',
      selectType: 'एंट्री प्रकार चुनें',
      selectDepartment: 'विभाग चुनें',
      noEntries: 'अभी तक कोई गेट एंट्री नहीं',
      createFirst: 'ऊपर अपनी पहली गेट एंट्री बनाएं'
    },
    kn: {
      title: 'ಗೇಟ್ ಎಂಟ್ರಿ (ಇನ್‌ವರ್ಡ್)',
      subtitle: 'ಎಲ್ಲಾ ಒಳಬರುವ ವಸ್ತುಗಳು, ವಿತರಣೆಗಳು ಮತ್ತು ಸಂದರ್ಶಕರನ್ನು ನಿರ್ವಹಿಸಿ',
      newEntry: 'ಹೊಸ ಎಂಟ್ರಿ',
      history: 'ಎಂಟ್ರಿ ಇತಿಹಾಸ',
      createEntry: '+ ಗೇಟ್ ಎಂಟ್ರಿ ರಚಿಸಿ',
      entryType: 'ಎಂಟ್ರಿ ಪ್ರಕಾರ',
      vendor: 'ಮಾರಾಟಗಾರ / ಮೂಲ',
      vehicleNo: 'ವಾಹನ ಸಂಖ್ಯೆ',
      driverName: 'ಚಾಲಕ ಹೆಸರು',
      materials: 'ವಸ್ತುಗಳು / ಐಟಂಗಳು',
      materialCode: 'ವಸ್ತು ಕೋಡ್',
      materialName: 'ವಸ್ತು ಹೆಸರು',
      quantity: 'ಪ್ರಮಾಣ',
      uom: 'UOM',
      linkedDocument: 'ಲಿಂಕ್ ದಾಖಲೆ',
      destinationDept: 'ಗಮ್ಯಸ್ಥಾನ ವಿಭಾಗ',
      remarks: 'ಟಿಪ್ಪಣಿಗಳು',
      status: 'ಸ್ಥಿತಿ',
      timestamp: 'ದಿನಾಂಕ ಮತ್ತು ಸಮಯ',
      actions: 'ಕ್ರಿಯೆಗಳು',
      search: 'ಎಂಟ್ರಿಗಳನ್ನು ಹುಡುಕಿ...',
      addMaterial: '+ ವಸ್ತು ಸೇರಿಸಿ',
      cancel: 'ರದ್ದುಮಾಡಿ',
      createRecord: 'ಎಂಟ್ರಿ ರಚಿಸಿ',
      viewDetails: 'ನೋಡಿ',
      entryTypes: {
        material: 'ವಸ್ತು ವಿತರಣೆ',
        courier: 'ಕೊರಿಯರ್ / ಪಾರ್ಸೆಲ್',
        visitor: 'ಸಂದರ್ಶಕ ಎಂಟ್ರಿ',
        jobwork_return: 'ಜಾಬ್-ವರ್ಕ್ ರಿಟರ್ನ್',
        subcontract_return: 'ಉಪಗುತ್ತಿಗೆ ರಿಟರ್ನ್',
        delivery: 'ಖರೀದಿ ವಿತರಣೆ',
        machine_spare: 'ಯಂತ್ರ ಸ್ಪೇರ್'
      },
      departments: {
        store: 'ಸ್ಟೋರ್',
        qa: 'QA / ತಪಾಸಣೆ',
        maintenance: 'ನಿರ್ವಹಣೆ',
        production: 'ಉತ್ಪಾದನೆ',
        admin: 'ಆಡಳಿತ'
      },
      statuses: {
        arrived: 'ಆಗಮನ',
        under_verification: 'ಪರಿಶೀಲನೆಯಲ್ಲಿ',
        accepted: 'ಸ್ವೀಕರಿಸಲಾಗಿದೆ',
        rejected: 'ತಿರಸ್ಕರಿಸಲಾಗಿದೆ'
      },
      enterVendor: 'ಮಾರಾಟಗಾರ ಹೆಸರು ನಮೂದಿಸಿ',
      enterVehicle: 'ವಾಹನ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ',
      enterDriver: 'ಚಾಲಕ ಹೆಸರು ನಮೂದಿಸಿ',
      enterMaterialCode: 'ಕೋಡ್ ನಮೂದಿಸಿ',
      enterMaterialName: 'ವಸ್ತು ಹೆಸರು ನಮೂದಿಸಿ',
      enterDocument: 'PO/ಇನ್‌ವಾಯ್ಸ್/DC ಸಂಖ್ಯೆ',
      enterRemarks: 'ಟಿಪ್ಪಣಿಗಳನ್ನು ಸೇರಿಸಿ',
      selectType: 'ಎಂಟ್ರಿ ಪ್ರಕಾರ ಆಯ್ಕೆಮಾಡಿ',
      selectDepartment: 'ವಿಭಾಗ ಆಯ್ಕೆಮಾಡಿ',
      noEntries: 'ಇನ್ನೂ ಗೇಟ್ ಎಂಟ್ರಿಗಳಿಲ್ಲ',
      createFirst: 'ಮೇಲೆ ನಿಮ್ಮ ಮೊದಲ ಗೇಟ್ ಎಂಟ್ರಿ ರಚಿಸಿ'
    },
    ta: {
      title: 'கேட் என்ட்ரி (உள்ளரங்கு)',
      subtitle: 'அனைத்து உள்வரும் பொருட்கள், டெலிவரி மற்றும் பார்வையாளர்களை நிர்வகிக்கவும்',
      newEntry: 'புதிய என்ட்ரி',
      history: 'என்ட்ரி வரலாறு',
      createEntry: '+ கேட் என்ட்ரி உருவாக்கவும்',
      entryType: 'என்ட்ரி வகை',
      vendor: 'விற்பனையாளர் / மூலம்',
      vehicleNo: 'வாகன எண்',
      driverName: 'ஓட்டுநர் பெயர்',
      materials: 'பொருட்கள் / பொருட்கள்',
      materialCode: 'பொருள் குறியீடு',
      materialName: 'பொருள் பெயர்',
      quantity: 'அளவு',
      uom: 'UOM',
      linkedDocument: 'இணைக்கப்பட்ட ஆவணம்',
      destinationDept: 'இலக்கு துறை',
      remarks: 'குறிப்புகள்',
      status: 'நிலை',
      timestamp: 'தேதி மற்றும் நேரம்',
      actions: 'செயல்கள்',
      search: 'என்ட்ரிகளை தேடவும்...',
      addMaterial: '+ பொருள் சேர்க்கவும்',
      cancel: 'ரத்து செய்',
      createRecord: 'என்ட்ரி உருவாக்கவும்',
      viewDetails: 'பார்க்கவும்',
      entryTypes: {
        material: 'பொருள் டெலிவரி',
        courier: 'கூரியர் / பார்சல்',
        visitor: 'பார்வையாளர் என்ட்ரி',
        jobwork_return: 'ஜாப்-வர்க் ரிட்டர்ன்',
        subcontract_return: 'துணை ஒப்பந்தம் ரிட்டர்ன்',
        delivery: 'வாங்குதல் டெலிவரி',
        machine_spare: 'இயந்திர ஸ்பேர்'
      },
      departments: {
        store: 'ஸ்டோர்',
        qa: 'QA / ஆய்வு',
        maintenance: 'பராமரிப்பு',
        production: 'உற்பத்தி',
        admin: 'நிர்வாகம்'
      },
      statuses: {
        arrived: 'வந்தது',
        under_verification: 'சரிபார்ப்பில்',
        accepted: 'ஏற்றுக்கொள்ளப்பட்டது',
        rejected: 'நிராகரிக்கப்பட்டது'
      },
      enterVendor: 'விற்பனையாளர் பெயரை உள்ளிடவும்',
      enterVehicle: 'வாகன எண்ணை உள்ளிடவும்',
      enterDriver: 'ஓட்டுநர் பெயரை உள்ளிடவும்',
      enterMaterialCode: 'குறியீட்டை உள்ளிடவும்',
      enterMaterialName: 'பொருள் பெயரை உள்ளிடவும்',
      enterDocument: 'PO/இன்வாய்ஸ்/DC எண்',
      enterRemarks: 'குறிப்புகளை சேர்க்கவும்',
      selectType: 'என்ட்ரி வகையைத் தேர்ந்தெடுக்கவும்',
      selectDepartment: 'துறையைத் தேர்ந்தெடுக்கவும்',
      noEntries: 'இன்னும் கேட் என்ட்ரிகள் இல்லை',
      createFirst: 'மேலே உங்கள் முதல் கேட் என்ட்ரியை உருவாக்கவும்'
    },
    te: {
      title: 'గేట్ ఎంట్రీ (ఇన్‌వార్డ్)',
      subtitle: 'అన్ని ఇన్‌కమింగ్ మెటీరియల్స్, డెలివరీలు మరియు విజిటర్లను నిర్వహించండి',
      newEntry: 'కొత్త ఎంట్రీ',
      history: 'ఎంట్రీ చరిత్ర',
      createEntry: '+ గేట్ ఎంట్రీ సృష్టించండి',
      entryType: 'ఎంట్రీ రకం',
      vendor: 'విక్రేత / మూలం',
      vehicleNo: 'వాహన నంబర్',
      driverName: 'డ్రైవర్ పేరు',
      materials: 'మెటీరియల్స్ / ఐటెమ్స్',
      materialCode: 'మెటీరియల్ కోడ్',
      materialName: 'మెటీరియల్ పేరు',
      quantity: 'పరిమాణం',
      uom: 'UOM',
      linkedDocument: 'లింక్ చేసిన పత్రం',
      destinationDept: 'గమ్యం విభాగం',
      remarks: 'గమనికలు',
      status: 'స్థితి',
      timestamp: 'తేదీ మరియు సమయం',
      actions: 'చర్యలు',
      search: 'ఎంట్రీలను శోధించండి...',
      addMaterial: '+ మెటీరియల్ జోడించండి',
      cancel: 'రద్దు చేయండి',
      createRecord: 'ఎంట్రీ సృష్టించండి',
      viewDetails: 'చూడండి',
      entryTypes: {
        material: 'మెటీరియల్ డెలివరీ',
        courier: 'కొరియర్ / పార్సెల్',
        visitor: 'విజిటర్ ఎంట్రీ',
        jobwork_return: 'జాబ్-వర్క్ రిటర్న్',
        subcontract_return: 'సబ్‌కాంట్రాక్ట్ రిటర్న్',
        delivery: 'కొనుగోలు డెలివరీ',
        machine_spare: 'మెషిన్ స్పేర్'
      },
      departments: {
        store: 'స్టోర్',
        qa: 'QA / తనిఖీ',
        maintenance: 'నిర్వహణ',
        production: 'ఉత్పత్తి',
        admin: 'నిర్వహణ'
      },
      statuses: {
        arrived: 'వచ్చింది',
        under_verification: 'ధృవీకరణలో',
        accepted: 'ఆమోదించబడింది',
        rejected: 'తిరస్కరించబడింది'
      },
      enterVendor: 'విక్రేత పేరు నమోదు చేయండి',
      enterVehicle: 'వాహన నంబర్ నమోదు చేయండి',
      enterDriver: 'డ్రైవర్ పేరు నమోదు చేయండి',
      enterMaterialCode: 'కోడ్ నమోదు చేయండి',
      enterMaterialName: 'మెటీరియల్ పేరు నమోదు చేయండి',
      enterDocument: 'PO/ఇన్‌వాయిస్/DC నంబర్',
      enterRemarks: 'గమనికలు జోడించండి',
      selectType: 'ఎంట్రీ రకాన్ని ఎంచుకోండి',
      selectDepartment: 'విభాగాన్ని ఎంచుకోండి',
      noEntries: 'ఇంకా గేట్ ఎంట్రీలు లేవు',
      createFirst: 'పైన మీ మొదటి గేట్ ఎంట్రీని సృష్టించండి'
    },
    mr: {
      title: 'गेट एंट्री (इनवर्ड)',
      subtitle: 'सर्व येणारे साहित्य, डिलिव्हरी आणि पाहुणे व्यवस्थापित करा',
      newEntry: 'नवीन एंट्री',
      history: 'एंट्री इतिहास',
      createEntry: '+ गेट एंट्री तयार करा',
      entryType: 'एंट्री प्रकार',
      vendor: 'विक्रेता / स्रोत',
      vehicleNo: 'वाहन क्रमांक',
      driverName: 'ड्रायव्हरचे नाव',
      materials: 'साहित्य / आयटम',
      materialCode: 'साहित्य कोड',
      materialName: 'साहित्य नाव',
      quantity: 'प्रमाण',
      uom: 'UOM',
      linkedDocument: 'लिंक केलेले दस्तऐवज',
      destinationDept: 'गंतव्य विभाग',
      remarks: 'टिपा',
      status: 'स्थिती',
      timestamp: 'तारीख आणि वेळ',
      actions: 'कृती',
      search: 'एंट्री शोधा...',
      addMaterial: '+ साहित्य जोडा',
      cancel: 'रद्द करा',
      createRecord: 'एंट्री तयार करा',
      viewDetails: 'पहा',
      entryTypes: {
        material: 'साहित्य डिलिव्हरी',
        courier: 'कुरियर / पार्सल',
        visitor: 'पाहुणे एंट्री',
        jobwork_return: 'जॉब-वर्क परत',
        subcontract_return: 'सबकॉन्ट्रॅक्ट परत',
        delivery: 'खरेदी डिलिव्हरी',
        machine_spare: 'मशीन स्पेअर'
      },
      departments: {
        store: 'स्टोअर',
        qa: 'QA / तपासणी',
        maintenance: 'देखभाल',
        production: 'उत्पादन',
        admin: 'प्रशासन'
      },
      statuses: {
        arrived: 'आलेले',
        under_verification: 'पडताळणीमध्ये',
        accepted: 'स्वीकारले',
        rejected: 'नाकारले'
      },
      enterVendor: 'विक्रेत्याचे नाव प्रविष्ट करा',
      enterVehicle: 'वाहन क्रमांक प्रविष्ट करा',
      enterDriver: 'ड्रायव्हरचे नाव प्रविष्ट करा',
      enterMaterialCode: 'कोड प्रविष्ट करा',
      enterMaterialName: 'साहित्य नाव प्रविष्ट करा',
      enterDocument: 'PO/बीजक/DC क्रमांक',
      enterRemarks: 'टिपा जोडा',
      selectType: 'एंट्री प्रकार निवडा',
      selectDepartment: 'विभाग निवडा',
      noEntries: 'अद्याप गेट एंट्री नाहीत',
      createFirst: 'वर आपली पहिली गेट एंट्री तयार करा'
    },
    gu: {
      title: 'ગેટ એન્ટ્રી (ઇનવર્ડ)',
      subtitle: 'તમામ આવતી સામગ્રી, ડિલિવરી અને મુલાકાતીઓ મેનેજ કરો',
      newEntry: 'નવી એન્ટ્રી',
      history: 'એન્ટ્રી ઇતિહાસ',
      createEntry: '+ ગેટ એન્ટ્રી બનાવો',
      entryType: 'એન્ટ્રી પ્રકાર',
      vendor: 'વિક્રેતા / સ્રોત',
      vehicleNo: 'વાહન નંબર',
      driverName: 'ડ્રાઇવરનું નામ',
      materials: 'સામગ્રી / આઇટમ્સ',
      materialCode: 'સામગ્રી કોડ',
      materialName: 'સામગ્રી નામ',
      quantity: 'જથ્થો',
      uom: 'UOM',
      linkedDocument: 'લિંક કરેલ દસ્તાવેજ',
      destinationDept: 'ગંતવ્ય વિભાગ',
      remarks: 'ટિપ્પણીઓ',
      status: 'સ્થિતિ',
      timestamp: 'તારીખ અને સમય',
      actions: 'ક્રિયાઓ',
      search: 'એન્ટ્રી શોધો...',
      addMaterial: '+ સામગ્રી ઉમેરો',
      cancel: 'રદ કરો',
      createRecord: 'એન્ટ્રી બનાવો',
      viewDetails: 'જુઓ',
      entryTypes: {
        material: 'સામગ્રી ડિલિવરી',
        courier: 'કુરિયર / પાર્સલ',
        visitor: 'મુલાકાતી એન્ટ્રી',
        jobwork_return: 'જોબ-વર્ક રિટર્ન',
        subcontract_return: 'સબકોન્ટ્રાક્ટ રિટર્ન',
        delivery: 'ખરીદી ડિલિવરી',
        machine_spare: 'મશીન સ્પેર'
      },
      departments: {
        store: 'સ્ટોર',
        qa: 'QA / નિરીક્ષણ',
        maintenance: 'જાળવણી',
        production: 'ઉત્પાદન',
        admin: 'વહીવટ'
      },
      statuses: {
        arrived: 'આવ્યું',
        under_verification: 'ચકાસણીમાં',
        accepted: 'સ્વીકારવામાં',
        rejected: 'નકારવામાં'
      },
      enterVendor: 'વિક્રેતાનું નામ દાખલ કરો',
      enterVehicle: 'વાહન નંબર દાખલ કરો',
      enterDriver: 'ડ્રાઇવરનું નામ દાખલ કરો',
      enterMaterialCode: 'કોડ દાખલ કરો',
      enterMaterialName: 'સામગ્રી નામ દાખલ કરો',
      enterDocument: 'PO/ઇન્વોઇસ/DC નંબર',
      enterRemarks: 'ટિપ્પણીઓ ઉમેરો',
      selectType: 'એન્ટ્રી પ્રકાર પસંદ કરો',
      selectDepartment: 'વિભાગ પસંદ કરો',
      noEntries: 'હજી સુધી કોઈ ગેટ એન્ટ્રી નથી',
      createFirst: 'ઉપર તમારી પ્રથમ ગેટ એન્ટ્રી બનાવો'
    },
    pa: {
      title: 'ਗੇਟ ਐਂਟਰੀ (ਇਨਵਰਡ)',
      subtitle: 'ਸਾਰੀਆਂ ਆਉਣ ਵਾਲੀਆਂ ਸਮੱਗਰੀਆਂ, ਡਿਲੀਵਰੀਆਂ ਅਤੇ ਮੁਲਾਕਾਤੀਆਂ ਦਾ ਪ੍ਰਬੰਧਨ ਕਰੋ',
      newEntry: 'ਨਵੀਂ ਐਂਟਰੀ',
      history: 'ਐਂਟਰੀ ਇਤਿਹਾਸ',
      createEntry: '+ ਗੇਟ ਐਂਟਰੀ ਬਣਾਓ',
      entryType: 'ਐਂਟਰੀ ਕਿਸਮ',
      vendor: 'ਵਿਕਰੇਤਾ / ਸਰੋਤ',
      vehicleNo: 'ਵਾਹਨ ਨੰਬਰ',
      driverName: 'ਡਰਾਈਵਰ ਦਾ ਨਾਮ',
      materials: 'ਸਮੱਗਰੀ / ਆਈਟਮਾਂ',
      materialCode: 'ਸਮੱਗਰੀ ਕੋਡ',
      materialName: 'ਸਮੱਗਰੀ ਨਾਮ',
      quantity: 'ਮਾਤਰਾ',
      uom: 'UOM',
      linkedDocument: 'ਲਿੰਕ ਕੀਤਾ ਦਸਤਾਵੇਜ਼',
      destinationDept: 'ਮੰਜ਼ਿਲ ਵਿਭਾਗ',
      remarks: 'ਟਿੱਪਣੀਆਂ',
      status: 'ਸਥਿਤੀ',
      timestamp: 'ਤਾਰੀਖ਼ ਅਤੇ ਸਮਾਂ',
      actions: 'ਕਾਰਵਾਈਆਂ',
      search: 'ਐਂਟਰੀਆਂ ਖੋਜੋ...',
      addMaterial: '+ ਸਮੱਗਰੀ ਸ਼ਾਮਲ ਕਰੋ',
      cancel: 'ਰੱਦ ਕਰੋ',
      createRecord: 'ਐਂਟਰੀ ਬਣਾਓ',
      viewDetails: 'ਦੇਖੋ',
      entryTypes: {
        material: 'ਸਮੱਗਰੀ ਡਿਲੀਵਰੀ',
        courier: 'ਕੋਰੀਅਰ / ਪਾਰਸਲ',
        visitor: 'ਮੁਲਾਕਾਤੀ ਐਂਟਰੀ',
        jobwork_return: 'ਜੌਬ-ਵਰਕ ਰਿਟਰਨ',
        subcontract_return: 'ਸਬ-ਕੌਂਟਰੈਕਟ ਰਿਟਰਨ',
        delivery: 'ਖਰੀਦ ਡਿਲੀਵਰੀ',
        machine_spare: 'ਮਸ਼ੀਨ ਸਪੇਅਰ'
      },
      departments: {
        store: 'ਸਟੋਰ',
        qa: 'QA / ਨਿਰੀਖਣ',
        maintenance: 'ਰੱਖ-ਰਖਾਅ',
        production: 'ਉਤਪਾਦਨ',
        admin: 'ਪ੍ਰਸ਼ਾਸਨ'
      },
      statuses: {
        arrived: 'ਆਇਆ',
        under_verification: 'ਤਸਦੀਕ ਵਿੱਚ',
        accepted: 'ਸਵੀਕਾਰ ਕੀਤਾ',
        rejected: 'ਅਸਵੀਕਾਰ ਕੀਤਾ'
      },
      enterVendor: 'ਵਿਕਰੇਤਾ ਨਾਮ ਦਾਖਲ ਕਰੋ',
      enterVehicle: 'ਵਾਹਨ ਨੰਬਰ ਦਾਖਲ ਕਰੋ',
      enterDriver: 'ਡਰਾਈਵਰ ਨਾਮ ਦਾਖਲ ਕਰੋ',
      enterMaterialCode: 'ਕੋਡ ਦਾਖਲ ਕਰੋ',
      enterMaterialName: 'ਸਮੱਗਰੀ ਨਾਮ ਦਾਖਲ ਕਰੋ',
      enterDocument: 'PO/ਇਨਵੌਇਸ/DC ਨੰਬਰ',
      enterRemarks: 'ਟਿੱਪਣੀਆਂ ਸ਼ਾਮਲ ਕਰੋ',
      selectType: 'ਐਂਟਰੀ ਕਿਸਮ ਚੁਣੋ',
      selectDepartment: 'ਵਿਭਾਗ ਚੁਣੋ',
      noEntries: 'ਅਜੇ ਤੱਕ ਕੋਈ ਗੇਟ ਐਂਟਰੀਆਂ ਨਹੀਂ',
      createFirst: 'ਉੱਪਰ ਆਪਣੀ ਪਹਿਲੀ ਗੇਟ ਐਂਟਰੀ ਬਣਾਓ'
    }
  };

  const t = translations[language];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'under_verification':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-300';
    }
  };

  const getEntryTypeIcon = (type: EntryType) => {
    switch (type) {
      case 'material':
      case 'delivery':
        return Package;
      case 'courier':
        return FileText;
      case 'visitor':
        return User;
      case 'jobwork_return':
      case 'subcontract_return':
        return Truck;
      default:
        return Package;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="flex items-center gap-2">
          <Truck className="w-8 h-8 text-blue-600" />
          {t.title}
        </h1>
        <p className="text-zinc-600 mt-1">{t.subtitle}</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b-2 border-zinc-200">
        <button
          onClick={() => setActiveTab('new')}
          className={`px-6 py-3 font-medium transition-colors ${
            activeTab === 'new'
              ? 'border-b-4 border-blue-600 text-blue-600 -mb-0.5'
              : 'text-zinc-600 hover:text-zinc-900'
          }`}
        >
          {t.newEntry}
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-6 py-3 font-medium transition-colors ${
            activeTab === 'history'
              ? 'border-b-4 border-blue-600 text-blue-600 -mb-0.5'
              : 'text-zinc-600 hover:text-zinc-900'
          }`}
        >
          {t.history}
        </button>
      </div>

      {activeTab === 'new' ? (
        <div className="space-y-6">
          {/* Quick Entry Section */}
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-blue-900 mb-1">{t.title}</h2>
                <p className="text-sm text-blue-700">{t.subtitle}</p>
              </div>
              <Button
                onClick={() => setShowEntryModal(true)}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                {t.createEntry}
              </Button>
            </div>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-600">{t.statuses.arrived}</p>
                  <h3 className="mt-1">12</h3>
                </div>
                <Clock className="w-8 h-8 text-blue-500" />
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-600">{t.statuses.under_verification}</p>
                  <h3 className="mt-1">5</h3>
                </div>
                <AlertCircle className="w-8 h-8 text-yellow-500" />
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-600">{t.statuses.accepted}</p>
                  <h3 className="mt-1">89</h3>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-600">Today</p>
                  <h3 className="mt-1">18</h3>
                </div>
                <Package className="w-8 h-8 text-indigo-500" />
              </div>
            </Card>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
            <Input
              type="text"
              placeholder={t.search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-2"
            />
          </div>

          {/* History Table */}
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-zinc-100 border-b-2 border-zinc-200">
                  <tr>
                    <th className="text-left p-4 font-medium text-zinc-900">ID</th>
                    <th className="text-left p-4 font-medium text-zinc-900">{t.entryType}</th>
                    <th className="text-left p-4 font-medium text-zinc-900">{t.vendor}</th>
                    <th className="text-left p-4 font-medium text-zinc-900">{t.vehicleNo}</th>
                    <th className="text-left p-4 font-medium text-zinc-900">{t.materials}</th>
                    <th className="text-left p-4 font-medium text-zinc-900">{t.destinationDept}</th>
                    <th className="text-left p-4 font-medium text-zinc-900">{t.status}</th>
                    <th className="text-left p-4 font-medium text-zinc-900">{t.timestamp}</th>
                    <th className="text-left p-4 font-medium text-zinc-900">{t.actions}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                  {entryHistory
                    .filter(entry =>
                      entry.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      entry.id.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((entry) => {
                      const Icon = getEntryTypeIcon(entry.entryType);
                      return (
                        <tr key={entry.id} className="hover:bg-zinc-50">
                          <td className="p-4 font-medium text-blue-600">{entry.id}</td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <Icon className="w-4 h-4 text-zinc-500" />
                              <span className="text-sm">
                                {t.entryTypes[entry.entryType]}
                              </span>
                            </div>
                          </td>
                          <td className="p-4">{entry.vendor}</td>
                          <td className="p-4 font-mono text-sm">{entry.vehicleNo}</td>
                          <td className="p-4">
                            <div className="text-sm">
                              {entry.materials[0].materialName}
                              {entry.materials.length > 1 && (
                                <span className="text-zinc-500"> +{entry.materials.length - 1}</span>
                              )}
                            </div>
                            <div className="text-xs text-zinc-500">
                              {entry.materials[0].qty} {entry.materials[0].uom}
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge variant="outline" className="border-zinc-300">
                              {entry.destinationDepartment}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <Badge className={getStatusColor(entry.status)}>
                              {t.statuses[entry.status]}
                            </Badge>
                          </td>
                          <td className="p-4 text-sm text-zinc-600">{entry.timestamp}</td>
                          <td className="p-4">
                            <Button size="sm" variant="outline">
                              {t.viewDetails}
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* Create Entry Modal */}
      {showEntryModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Truck className="w-6 h-6" />
                <div>
                  <h2 className="text-2xl">{t.createEntry}</h2>
                  <p className="text-sm text-blue-100">{t.subtitle}</p>
                </div>
              </div>
              <button
                onClick={() => setShowEntryModal(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-8 space-y-6">
              {/* Entry Type */}
              <div>
                <label className="block mb-2 text-zinc-900 font-medium">
                  {t.entryType} <span className="text-red-500">*</span>
                </label>
                <select
                  value={entryData.entryType}
                  onChange={(e) => setEntryData({ ...entryData, entryType: e.target.value as EntryType })}
                  className="w-full p-3 border-2 border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {Object.entries(t.entryTypes).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>

              {/* Vendor and Vehicle Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-zinc-900 font-medium">
                    {t.vendor} <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    value={entryData.vendor || ''}
                    onChange={(e) => setEntryData({ ...entryData, vendor: e.target.value })}
                    placeholder={t.enterVendor}
                    className="border-2"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-zinc-900 font-medium">
                    {t.vehicleNo}
                  </label>
                  <Input
                    type="text"
                    value={entryData.vehicleNo || ''}
                    onChange={(e) => setEntryData({ ...entryData, vehicleNo: e.target.value })}
                    placeholder={t.enterVehicle}
                    className="border-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-zinc-900 font-medium">
                    {t.driverName}
                  </label>
                  <Input
                    type="text"
                    value={entryData.driverName || ''}
                    onChange={(e) => setEntryData({ ...entryData, driverName: e.target.value })}
                    placeholder={t.enterDriver}
                    className="border-2"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-zinc-900 font-medium">
                    {t.linkedDocument}
                  </label>
                  <Input
                    type="text"
                    value={entryData.linkedDocument || ''}
                    onChange={(e) => setEntryData({ ...entryData, linkedDocument: e.target.value })}
                    placeholder={t.enterDocument}
                    className="border-2"
                  />
                </div>
              </div>

              {/* Destination Department */}
              <div>
                <label className="block mb-2 text-zinc-900 font-medium">
                  {t.destinationDept} <span className="text-red-500">*</span>
                </label>
                <select
                  value={entryData.destinationDepartment}
                  onChange={(e) => setEntryData({ ...entryData, destinationDepartment: e.target.value })}
                  className="w-full p-3 border-2 border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">{t.selectDepartment}</option>
                  {Object.entries(t.departments).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>

              {/* Materials */}
              <div>
                <label className="block mb-3 text-zinc-900 font-medium">
                  {t.materials} <span className="text-red-500">*</span>
                </label>
                
                <div className="space-y-3">
                  {entryData.materials?.map((material, index) => (
                    <div key={index} className="flex gap-3 p-4 bg-zinc-50 rounded-lg border-2 border-zinc-200">
                      <div className="flex-1 grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={material.materialCode}
                          onChange={(e) => {
                            const newMaterials = [...(entryData.materials || [])];
                            newMaterials[index].materialCode = e.target.value;
                            setEntryData({ ...entryData, materials: newMaterials });
                          }}
                          placeholder={t.enterMaterialCode}
                          className="p-2 border border-zinc-300 rounded"
                        />
                        <input
                          type="text"
                          value={material.materialName}
                          onChange={(e) => {
                            const newMaterials = [...(entryData.materials || [])];
                            newMaterials[index].materialName = e.target.value;
                            setEntryData({ ...entryData, materials: newMaterials });
                          }}
                          placeholder={t.enterMaterialName}
                          className="p-2 border border-zinc-300 rounded"
                        />
                      </div>
                      
                      <div className="w-28">
                        <input
                          type="number"
                          value={material.qty}
                          onChange={(e) => {
                            const newMaterials = [...(entryData.materials || [])];
                            newMaterials[index].qty = Number(e.target.value);
                            setEntryData({ ...entryData, materials: newMaterials });
                          }}
                          placeholder={t.quantity}
                          className="w-full p-2 border border-zinc-300 rounded"
                        />
                      </div>
                      
                      <div className="w-24">
                        <select
                          value={material.uom}
                          onChange={(e) => {
                            const newMaterials = [...(entryData.materials || [])];
                            newMaterials[index].uom = e.target.value;
                            setEntryData({ ...entryData, materials: newMaterials });
                          }}
                          className="w-full p-2 border border-zinc-300 rounded"
                        >
                          <option value="kg">kg</option>
                          <option value="pcs">pcs</option>
                          <option value="m">m</option>
                          <option value="L">L</option>
                        </select>
                      </div>
                      
                      {(entryData.materials?.length || 0) > 1 && (
                        <button
                          onClick={() => {
                            const newMaterials = entryData.materials?.filter((_, i) => i !== index) || [];
                            setEntryData({ ...entryData, materials: newMaterials });
                          }}
                          className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                
                <Button
                  onClick={() => setEntryData({
                    ...entryData,
                    materials: [...(entryData.materials || []), { materialCode: '', materialName: '', qty: 0, uom: 'kg' }]
                  })}
                  variant="outline"
                  className="w-full mt-3 border-2 border-blue-300 text-blue-700 hover:bg-blue-50"
                >
                  <Package className="w-4 h-4 mr-2" />
                  {t.addMaterial}
                </Button>
              </div>

              {/* Remarks */}
              <div>
                <label className="block mb-2 text-zinc-900 font-medium">
                  {t.remarks}
                </label>
                <textarea
                  value={entryData.remarks || ''}
                  onChange={(e) => setEntryData({ ...entryData, remarks: e.target.value })}
                  placeholder={t.enterRemarks}
                  rows={3}
                  className="w-full p-3 border-2 border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white border-t-2 border-zinc-200 p-6 flex gap-3">
              <Button
                onClick={() => {
                  setShowEntryModal(false);
                  setEntryData({
                    entryType: 'material',
                    materials: [{ materialCode: '', materialName: '', qty: 0, uom: 'kg' }],
                    status: 'arrived'
                  });
                }}
                variant="outline"
                className="flex-1 border-2"
              >
                {t.cancel}
              </Button>
              <Button
                onClick={() => {
                  const summary = entryData.materials
                    ?.filter(m => m.materialName && m.qty)
                    .map(m => `${m.qty} ${m.uom} ${m.materialName}`)
                    .join(', ');
                    
                  alert(`✅ ${language === 'en' ? 'Gate Entry Created!' : 'गेट एंट्री बनाई गई!'}

Vendor: ${entryData.vendor}
Type: ${t.entryTypes[entryData.entryType || 'material']}
Destination: ${entryData.destinationDepartment}
Materials: ${summary}
Status: ${t.statuses.arrived}`);
                  
                  setShowEntryModal(false);
                  setEntryData({
                    entryType: 'material',
                    materials: [{ materialCode: '', materialName: '', qty: 0, uom: 'kg' }],
                    status: 'arrived'
                  });
                }}
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                disabled={!entryData.vendor || !entryData.destinationDepartment}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                {t.createRecord}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
