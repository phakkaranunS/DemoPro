const steps=['🏭 Factory','🚚 Truck','🛃 Export Customs','⚓ Export Port','🚢 Main Carriage','⚓ Import Port','🛃 Import Customs','🚚 Truck','🏢 Warehouse'];
const terms={
EXW:{full:'Ex Works',group:'All modes / Origin',risk:0,desc:'ผู้ขายเตรียมสินค้าไว้ที่โรงงาน ผู้ซื้อรับผิดชอบต่อเกือบทั้งหมด',seller:'เตรียมสินค้าและแจ้งให้ Buyer มารับ',buyer:'รับสินค้า ขนส่งต้นทาง ศุลกากร Freight ประกัน และปลายทางทั้งหมด',freight:'Buyer',insurance:'Buyer',duty:'Buyer',icon:'📦',short:'ผู้ขายส่งมอบสินค้า ณ สถานที่ของตนเอง',example:'Buyer มีทีม Logistics ของตัวเองและต้องการจัดการทุกขั้นตอน'},
FCA:{full:'Free Carrier',group:'All modes / Origin',risk:2,desc:'ผู้ขายส่งมอบสินค้าให้ Carrier ณ จุดที่ตกลงกัน',seller:'เตรียมสินค้า ส่งออก และส่งมอบให้ Carrier',buyer:'รับผิดชอบหลังส่งมอบให้ Carrier รวม Freight และปลายทาง',freight:'Buyer',insurance:'Buyer',duty:'Buyer',icon:'🚚',short:'ผู้ขายส่งมอบสินค้าให้ผู้ขนส่งที่ตกลงกัน',example:'Buyer แต่งตั้ง Forwarder มารับสินค้า'},
FAS:{full:'Free Alongside Ship',group:'Sea only / Origin',risk:3,desc:'ผู้ขายนำสินค้าไปวางข้างเรือที่ท่าเรือต้นทาง',seller:'เตรียมสินค้า ส่งออก และวางสินค้าไว้ข้างเรือ',buyer:'โหลดขึ้นเรือ จ่าย Freight ประกัน และปลายทาง',freight:'Buyer',insurance:'Buyer',duty:'Buyer',icon:'🚢',short:'ผู้ขายส่งมอบสินค้าไว้ข้างเรือ',example:'สินค้าขนาดใหญ่และผู้ซื้อจัดเรือเอง'},
FOB:{full:'Free On Board',group:'Sea only / Origin',risk:3,desc:'ผู้ขายรับผิดชอบจนสินค้าขึ้นเรือ',seller:'เตรียมสินค้า ส่งออก และโหลดสินค้าขึ้นเรือ',buyer:'รับผิดชอบตั้งแต่สินค้าขึ้นเรือ รวม Freight และปลายทาง',freight:'Buyer',insurance:'Buyer',duty:'Buyer',icon:'🚢',short:'ผู้ขายส่งมอบสินค้าขึ้นเรือ',example:'Importer ต้องการเลือก Shipping Line เอง'},
CFR:{full:'Cost and Freight',group:'Sea only / Main Carriage',risk:3,desc:'ผู้ขายจ่าย Freight ถึงท่าเรือปลายทาง แต่ Risk โอนตั้งแต่ขึ้นเรือ',seller:'ส่งออก โหลดขึ้นเรือ และจ่าย Freight',buyer:'รับความเสี่ยงหลังขึ้นเรือ ซื้อประกัน และจัดการปลายทาง',freight:'Seller',insurance:'Buyer',duty:'Buyer',icon:'🚢',short:'ผู้ขายจ่ายค่าขนส่งถึงท่าเรือปลายทาง',example:'Buyer ต้องการให้รวมค่าขนส่ง แต่ไม่ต้องซื้อประกัน'},
CIF:{full:'Cost, Insurance and Freight',group:'Sea only / Main Carriage',risk:3,desc:'ผู้ขายจ่าย Freight และ Insurance ถึงท่าเรือปลายทาง',seller:'ส่งออก โหลดขึ้นเรือ จ่าย Freight และประกัน',buyer:'รับความเสี่ยงหลังขึ้นเรือ และจัดการปลายทาง',freight:'Seller',insurance:'Seller',duty:'Buyer',icon:'🚢',short:'ผู้ขายจ่ายค่าขนส่งและประกันภัย',example:'Buyer ต้องการราคาที่รวมค่าขนส่งและประกัน'},
CPT:{full:'Carriage Paid To',group:'All modes / Main Carriage',risk:2,desc:'ผู้ขายจ่ายค่าขนส่งถึงจุดที่ตกลง ใช้ได้หลายโหมด',seller:'ส่งมอบให้ Carrier และจ่ายค่าขนส่ง',buyer:'รับความเสี่ยงเมื่อส่งมอบให้ Carrier และซื้อประกันเอง',freight:'Seller',insurance:'Buyer',duty:'Buyer',icon:'🚚',short:'ผู้ขายจ่ายค่าขนส่งไปยังปลายทาง',example:'ขนส่งรถต่อเครื่องบิน แต่ไม่รวมประกัน'},
CIP:{full:'Carriage and Insurance Paid To',group:'All modes / Main Carriage',risk:2,desc:'เหมือน CPT แต่ Seller ต้องซื้อประกันให้ด้วย',seller:'ส่งมอบให้ Carrier จ่ายค่าขนส่ง และซื้อประกัน',buyer:'รับความเสี่ยงเมื่อส่งมอบให้ Carrier',freight:'Seller',insurance:'Seller',duty:'Buyer',icon:'🛡️',short:'ผู้ขายจ่ายค่าขนส่งและประกันภัย',example:'ขนส่งทางอากาศและรวมประกัน'},
DAP:{full:'Delivered At Place',group:'All modes / Destination',risk:8,desc:'ผู้ขายส่งถึงปลายทาง แต่ผู้ซื้อจ่ายภาษีนำเข้าเอง',seller:'รับผิดชอบขนส่งถึงสถานที่ปลายทาง',buyer:'จัดการศุลกากรขาเข้า ภาษีนำเข้า และขนลง',freight:'Seller',insurance:'Seller/ตกลงกัน',duty:'Buyer',icon:'🚚',short:'ผู้ขายส่งมอบถึงสถานที่ปลายทาง',example:'Seller ส่งถึงคลัง Buyer แต่ Buyer จ่ายภาษีเอง'},
DPU:{full:'Delivered at Place Unloaded',group:'All modes / Destination',risk:8,desc:'ผู้ขายส่งถึงปลายทางและขนลงสินค้าให้',seller:'ขนส่งถึงปลายทางและขนลงสินค้า',buyer:'จัดการศุลกากรขาเข้าและภาษีนำเข้า',freight:'Seller',insurance:'Seller/ตกลงกัน',duty:'Buyer',icon:'🚢',short:'ผู้ขายส่งถึงปลายทางและขนลง',example:'Seller ส่งถึง Distribution Center และขนลงให้'},
DDP:{full:'Delivered Duty Paid',group:'All modes / Destination',risk:8,desc:'ผู้ขายรับผิดชอบมากที่สุด รวมถึงภาษีนำเข้า',seller:'รับผิดชอบทุกขั้นตอนจนส่งถึง Buyer รวม Import Duty',buyer:'รับสินค้า ณ จุดปลายทาง',freight:'Seller',insurance:'Seller',duty:'Seller',icon:'🛡️',short:'ผู้ขายรับผิดชอบทั้งหมดจนถึงผู้ซื้อ',example:'Buyer ไม่ต้องการจัดการนำเข้าเอง'}
};


const glossaryItems=[
 {en:"Seller",th:"ผู้ขาย / ผู้ส่งออก",desc:"ฝ่ายที่ขายสินค้าและมีหน้าที่ตาม Incoterm ที่ตกลง"},
 {en:"Buyer",th:"ผู้ซื้อ / ผู้นำเข้า",desc:"ฝ่ายที่ซื้อสินค้าและรับผิดชอบตามจุดที่กติกากำหนด"},
 {en:"Risk",th:"ความเสี่ยง",desc:"ความรับผิดชอบเมื่อสินค้าเสียหาย สูญหาย หรือเกิดอุบัติเหตุ ไม่ได้หมายถึงค่าใช้จ่าย"},
 {en:"Risk Transfer",th:"จุดโอนความเสี่ยง",desc:"จุดที่ความเสี่ยงเปลี่ยนจากผู้ขายไปยังผู้ซื้อ"},
 {en:"Cost",th:"ค่าใช้จ่าย",desc:"ค่าใช้จ่าย เช่น ค่ารถ ค่าท่าเรือ ค่าระวาง และค่าดำเนินพิธีการ"},
 {en:"Freight",th:"ค่าระวาง / ค่าขนส่งหลัก",desc:"ค่าขนส่งระหว่างประเทศ เช่น ค่าระวางเรือหรือค่าขนส่งทางอากาศ"},
 {en:"Insurance",th:"ประกันภัยสินค้า",desc:"ความคุ้มครองกรณีสินค้าเสียหายหรือสูญหายระหว่างขนส่ง"},
 {en:"Carrier",th:"ผู้รับขนส่ง",desc:"บริษัทหรือบุคคลที่รับขนส่งสินค้า เช่น สายเรือ สายการบิน หรือรถบรรทุก"},
 {en:"Forwarder",th:"ผู้รับจัดการขนส่งสินค้า",desc:"ผู้ประสานงานด้านขนส่ง เอกสาร และพิธีการ"},
 {en:"Shipper",th:"ผู้ส่งสินค้า / ผู้ส่งออก",desc:"ผู้จัดส่งสินค้าออกจากต้นทาง"},
 {en:"Consignee",th:"ผู้รับสินค้า / ผู้นำเข้า",desc:"ผู้ที่มีชื่อเป็นผู้รับสินค้าที่ปลายทาง"},
 {en:"Origin",th:"ต้นทาง",desc:"ช่วงก่อนสินค้าออกจากประเทศผู้ขาย"},
 {en:"Main Carriage",th:"การขนส่งหลักระหว่างประเทศ",desc:"ช่วงที่สินค้าเดินทางระหว่างประเทศ"},
 {en:"Destination",th:"ปลายทาง",desc:"ช่วงหลังสินค้าถึงประเทศผู้ซื้อ"},
 {en:"Delivery Point",th:"จุดส่งมอบสินค้า",desc:"จุดที่ถือว่าผู้ขายส่งมอบสินค้าแล้ว"},
 {en:"Export Clearance",th:"พิธีการศุลกากรขาออก",desc:"ขั้นตอนเพื่อนำสินค้าออกจากประเทศต้นทาง"},
 {en:"Import Clearance",th:"พิธีการศุลกากรขาเข้า",desc:"ขั้นตอนเพื่อนำสินค้าเข้าประเทศปลายทาง"},
 {en:"Duty",th:"อากรนำเข้า",desc:"เงินที่ชำระต่อศุลกากรเมื่อนำสินค้าเข้าประเทศ"},
 {en:"Tax",th:"ภาษี",desc:"ภาษีที่เกี่ยวข้องกับการนำเข้า เช่น VAT"},
 {en:"Loading",th:"การยกขึ้น / การบรรทุกขึ้น",desc:"การนำสินค้าขึ้นยานพาหนะ"},
 {en:"Unloading",th:"การขนลง / การยกลง",desc:"การนำสินค้าลงจากยานพาหนะ"},
 {en:"Port",th:"ท่าเรือ",desc:"สถานที่รับ–ส่งสินค้าและเรือขนส่ง"},
 {en:"Warehouse",th:"คลังสินค้า",desc:"สถานที่เก็บสินค้า ณ ต้นทางหรือปลายทาง"},
 {en:"Any Mode",th:"การขนส่งทุกประเภท",desc:"ใช้ได้กับรถ เรือ เครื่องบิน รถไฟ หรือหลายรูปแบบ"},
 {en:"Sea Mode",th:"การขนส่งทางทะเลและทางน้ำ",desc:"ใช้กับ FAS, FOB, CFR และ CIF"},
 {en:"Multimodal Transport",th:"การขนส่งหลายรูปแบบ",desc:"ใช้มากกว่าหนึ่งโหมด เช่น รถต่อเครื่องบิน"},
 {en:"Incoterms",th:"ข้อกำหนดการค้าระหว่างประเทศ",desc:"กติกาที่กำหนดหน้าที่ ค่าใช้จ่าย จุดส่งมอบ และความเสี่ยง"}
];
const termTranslations={
 EXW:{full:"Ex Works",thai:"ส่งมอบ ณ สถานที่ของผู้ขาย"},FCA:{full:"Free Carrier",thai:"ส่งมอบให้ผู้รับขนส่ง"},
 FAS:{full:"Free Alongside Ship",thai:"ส่งมอบข้างเรือ"},FOB:{full:"Free On Board",thai:"ส่งมอบบนเรือ"},
 CFR:{full:"Cost and Freight",thai:"รวมต้นทุนและค่าระวาง"},CIF:{full:"Cost, Insurance and Freight",thai:"รวมต้นทุน ประกันภัย และค่าระวาง"},
 CPT:{full:"Carriage Paid To",thai:"ชำระค่าขนส่งถึงจุดที่ตกลง"},CIP:{full:"Carriage and Insurance Paid To",thai:"ชำระค่าขนส่งและประกันภัยถึงจุดที่ตกลง"},
 DAP:{full:"Delivered At Place",thai:"ส่งมอบ ณ สถานที่ปลายทาง"},DPU:{full:"Delivered at Place Unloaded",thai:"ส่งมอบ ณ ปลายทางและขนลง"},
 DDP:{full:"Delivered Duty Paid",thai:"ส่งมอบโดยชำระอากรแล้ว"}
};
function glossaryMarkup(text){
 let result=String(text||"");
 glossaryItems.slice().sort((a,b)=>b.en.length-a.en.length).forEach(item=>{
  const safe=item.en.replace(/[.*+?^${}()|[\\]\\]/g,'\\$&');
  result=result.replace(new RegExp(`\\b${safe}\\b`,'g'),`<span class="glossary-word" tabindex="0">${item.en}<span class="glossary-tip"><b>${item.en}</b><em>${item.th}</em><small>${item.desc}</small></span></span>`);
 });
 return result;
}
function renderGlossary(query=""){
 const grid=document.getElementById("glossaryGrid"); if(!grid)return;
 const q=query.trim().toLowerCase();
 const items=glossaryItems.filter(x=>!q||`${x.en} ${x.th} ${x.desc}`.toLowerCase().includes(q));
 grid.innerHTML=items.map(x=>`<article class="glossary-card"><div class="glossary-en">${x.en}</div><div class="glossary-th">${x.th}</div><p>${x.desc}</p></article>`).join('')||'<div class="empty-glossary">ไม่พบคำศัพท์</div>';
}
function translateTermInfo(term){const x=termTranslations[term];return x?`${x.full} — ${x.th}`:term;}


const extraGlossaryItems=[
 {en:"Contract of Carriage",th:"สัญญาการขนส่ง",desc:"ข้อตกลงกับผู้รับขนส่งเพื่อเคลื่อนย้ายสินค้าจากต้นทางไปยังปลายทาง"},
 {en:"Named Place",th:"สถานที่ที่ระบุไว้",desc:"สถานที่ซึ่งคู่สัญญาต้องเขียนกำกับหลังชื่อ Incoterm เพื่อกำหนดจุดส่งมอบหรือปลายทางให้ชัดเจน"},
 {en:"Place of Delivery",th:"สถานที่ส่งมอบ",desc:"จุดที่ผู้ขายส่งมอบสินค้าและความเสี่ยงอาจโอนไปยังผู้ซื้อ"},
 {en:"Port of Shipment",th:"ท่าเรือต้นทาง",desc:"ท่าเรือที่สินค้าถูกส่งขึ้นเรือในประเทศผู้ขาย"},
 {en:"Port of Destination",th:"ท่าเรือปลายทาง",desc:"ท่าเรือที่สินค้าถึงในประเทศผู้ซื้อ"},
 {en:"Customs",th:"ศุลกากร",desc:"หน่วยงานรัฐที่ควบคุมการนำเข้าและส่งออกสินค้า"},
 {en:"Ocean Freight",th:"ค่าระวางเรือ",desc:"ค่าใช้จ่ายสำหรับการขนส่งสินค้าทางทะเล"},
 {en:"Air Freight",th:"ค่าขนส่งทางอากาศ",desc:"ค่าใช้จ่ายสำหรับการขนส่งสินค้าด้วยเครื่องบิน"},
 {en:"Inland Waterway",th:"การขนส่งทางน้ำภายในประเทศ",desc:"การขนส่งผ่านแม่น้ำ คลอง หรือเส้นทางน้ำภายในประเทศ"},
 {en:"Exporter",th:"ผู้ส่งออก",desc:"บุคคลหรือบริษัทที่ส่งสินค้าออกจากประเทศ"},
 {en:"Importer",th:"ผู้นำเข้า",desc:"บุคคลหรือบริษัทที่นำสินค้าเข้าสู่ประเทศปลายทาง"},
 {en:"Cargo",th:"สินค้า / สินค้าที่ขนส่ง",desc:"สินค้าที่อยู่ระหว่างการเคลื่อนย้ายหรือขนส่ง"},
 {en:"Container",th:"ตู้คอนเทนเนอร์",desc:"ตู้มาตรฐานสำหรับบรรจุสินค้าเพื่อขนส่งระหว่างประเทศ"},
 {en:"Terminal",th:"สถานีหรือจุดปฏิบัติการขนส่ง",desc:"พื้นที่ที่ใช้รับ ส่ง จัดเก็บ หรือเปลี่ยนรูปแบบการขนส่งสินค้า"},
 {en:"Quay",th:"ท่าเทียบเรือ",desc:"บริเวณริมท่าที่เรือเทียบเพื่อรับหรือส่งสินค้า"},
 {en:"On Board",th:"อยู่บนเรือ",desc:"สินค้าถูกวางและส่งมอบบนเรือเรียบร้อยแล้ว"},
 {en:"Alongside Ship",th:"ข้างเรือ",desc:"สินค้าถูกนำไปวางข้างเรือ แต่ยังไม่ได้ยกขึ้นเรือ"},
 {en:"Ready for Unloading",th:"พร้อมสำหรับการขนลง",desc:"สินค้ายังอยู่บนยานพาหนะและพร้อมให้ฝ่ายที่รับผิดชอบนำลง"},
 {en:"Unloaded",th:"ขนลงเรียบร้อยแล้ว",desc:"สินค้าถูกนำลงจากยานพาหนะ ณ จุดปลายทางแล้ว"},
 {en:"Transport Document",th:"เอกสารการขนส่ง",desc:"เอกสารหลักฐานการรับและขนส่งสินค้า เช่น Bill of Lading หรือ Air Waybill"},
 {en:"Bill of Lading",th:"ใบตราส่งสินค้าทางทะเล",desc:"เอกสารสำคัญที่สายเรือออกเพื่อยืนยันการรับสินค้าและเงื่อนไขการขนส่ง"},
 {en:"Air Waybill",th:"ใบตราส่งสินค้าทางอากาศ",desc:"เอกสารการขนส่งสินค้าทางอากาศที่สายการบินหรือผู้ขนส่งออกให้"},
 {en:"VAT",th:"ภาษีมูลค่าเพิ่ม",desc:"ภาษีที่เรียกเก็บจากมูลค่าของสินค้าและบริการตามกฎหมายของแต่ละประเทศ"}
];
glossaryItems.push(...extraGlossaryItems);

const termVocabularyMap={
 EXW:["Ex Works","Seller","Buyer","Origin","Export Clearance","Contract of Carriage","Risk"],
 FCA:["Free Carrier","Carrier","Forwarder","Named Place","Export Clearance","Risk Transfer","Any Mode"],
 FAS:["Free Alongside Ship","Alongside Ship","Port of Shipment","Sea Mode","Loading","Ocean Freight","Risk Transfer"],
 FOB:["Free On Board","On Board","Port of Shipment","Loading","Ocean Freight","Buyer","Risk Transfer"],
 CFR:["Cost","Freight","Ocean Freight","Port of Destination","Risk Transfer","Seller","Insurance"],
 CIF:["Cost","Insurance","Freight","Ocean Freight","Port of Destination","Risk Transfer","Seller"],
 CPT:["Carriage Paid To","Carrier","Main Carriage","Named Place","Risk Transfer","Any Mode","Insurance"],
 CIP:["Carriage and Insurance Paid To","Carrier","Insurance","Main Carriage","Named Place","Risk Transfer","Any Mode"],
 DAP:["Delivered At Place","Destination","Named Place","Ready for Unloading","Import Clearance","Duty","Buyer"],
 DPU:["Delivered at Place Unloaded","Destination","Unloaded","Import Clearance","Duty","Seller","Buyer"],
 DDP:["Delivered Duty Paid","Destination","Import Clearance","Duty","Tax","Importer","Seller"]
};

function findGlossaryItem(term){
 return glossaryItems.find(x=>x.en.toLowerCase()===term.toLowerCase()) ||
        {en:term,th:"คำศัพท์สำคัญของ Incoterm",desc:"ใช้ประกอบการทำความเข้าใจหน้าที่ ค่าใช้จ่าย และความเสี่ยงของเงื่อนไขนี้"};
}

function renderTermVocabulary(term){
 const box=document.getElementById("termVocabulary");
 if(!box) return;
 const list=termVocabularyMap[term]||[];
 box.innerHTML=list.map(word=>{
   const item=findGlossaryItem(word);
   return `<button class="term-vocab-card" onclick="showVocabModal('${item.en.replace(/'/g,"\\'")}')">
      <b>${item.en}</b><span>${item.th}</span><small>${item.desc}</small>
   </button>`;
 }).join("");
}

function showVocabModal(word){
 const item=findGlossaryItem(word);
 const existing=document.getElementById("vocabModal");
 if(existing) existing.remove();
 const modal=document.createElement("div");
 modal.id="vocabModal";
 modal.className="vocab-modal";
 modal.innerHTML=`<div class="vocab-modal-card">
   <button class="vocab-close" onclick="this.closest('.vocab-modal').remove()">×</button>
   <small>LOGISTICS VOCABULARY</small>
   <h2>${item.en}</h2>
   <h3>${item.th}</h3>
   <p>${item.desc}</p>
   <button class="primary" onclick="this.closest('.vocab-modal').remove()">เข้าใจแล้ว</button>
 </div>`;
 document.body.appendChild(modal);
}


const defaultProfileSettings={
 name:"",
 email:"",
 phone:"",
 organization:"",
 goal:"",
 avatar:"",
 prefThai:true,
 prefExplanation:true,
 prefAnimation:true,
 prefHistory:true,
 prefReviewReminder:true,
 prefEmailReport:true
};

function getProfileSettings(){
 const saved=JSON.parse(localStorage.getItem("zupProfileSettings")||"null");
 return {...defaultProfileSettings,...saved};
}

function loadSettings(){
 const s=getProfileSettings();
 document.getElementById("settingName").value=s.name || user?.name || "";
 document.getElementById("settingEmail").value=s.email || user?.email || "";
 document.getElementById("settingPhone").value=s.phone || "";
 document.getElementById("settingOrganization").value=s.organization || "";
 document.getElementById("settingGoal").value=s.goal || "";
 ["prefThai","prefExplanation","prefAnimation","prefHistory","prefReviewReminder","prefEmailReport"].forEach(id=>{
   const el=document.getElementById(id);
   if(el) el.checked=s[id]!==false;
 });
 updateSettingsProfile(s);
 applyPreferences(s);
}

function updateSettingsProfile(s=getProfileSettings()){
 const name=s.name || user?.name || "ผู้เรียน";
 const email=s.email || user?.email || "ยังไม่ได้ระบุอีเมล";
 const avatar=document.getElementById("settingsAvatar");
 const fallback=document.getElementById("avatarFallback");
 if(avatar && fallback){
   if(s.avatar){
     avatar.src=s.avatar;
     avatar.style.display="block";
     fallback.style.display="none";
   }else{
     avatar.removeAttribute("src");
     avatar.style.display="none";
     fallback.style.display="grid";
   }
 }
 const dn=document.getElementById("profileDisplayName");
 const de=document.getElementById("profileDisplayEmail");
 if(dn) dn.innerText=name;
 if(de) de.innerText=email;
}

function previewAvatar(event){
 const file=event.target.files?.[0];
 if(!file) return;
 if(file.size>2*1024*1024){
   showSettingsMessage("ไฟล์รูปต้องมีขนาดไม่เกิน 2 MB","error");
   event.target.value="";
   return;
 }
 const reader=new FileReader();
 reader.onload=()=>{
   const s=getProfileSettings();
   s.avatar=reader.result;
   localStorage.setItem("zupProfileSettings",JSON.stringify(s));
   updateSettingsProfile(s);
   showSettingsMessage("อัปเดตรูปโปรไฟล์แล้ว","success");
 };
 reader.readAsDataURL(file);
}

function removeAvatar(){
 const s=getProfileSettings();
 s.avatar="";
 localStorage.setItem("zupProfileSettings",JSON.stringify(s));
 updateSettingsProfile(s);
 showSettingsMessage("ลบรูปโปรไฟล์แล้ว","success");
}

function saveSettings(){
 const name=document.getElementById("settingName").value.trim();
 const email=document.getElementById("settingEmail").value.trim();
 if(email && !email.includes("@")){
   showSettingsMessage("กรุณากรอกอีเมลให้ถูกต้อง","error");
   return;
 }
 const old=getProfileSettings();
 const s={
   ...old,
   name,
   email,
   phone:document.getElementById("settingPhone").value.trim(),
   organization:document.getElementById("settingOrganization").value.trim(),
   goal:document.getElementById("settingGoal").value.trim(),
   prefThai:document.getElementById("prefThai").checked,
   prefExplanation:document.getElementById("prefExplanation").checked,
   prefAnimation:document.getElementById("prefAnimation").checked,
   prefHistory:document.getElementById("prefHistory").checked,
   prefReviewReminder:document.getElementById("prefReviewReminder").checked,
   prefEmailReport:document.getElementById("prefEmailReport").checked
 };
 localStorage.setItem("zupProfileSettings",JSON.stringify(s));
 if(name || email){
   user={name:name||user?.name||"ผู้เรียน",email:email||user?.email||""};
   localStorage.setItem("zupUser",JSON.stringify(user));
   updateUser();
 }
 applyPreferences(s);
 updateSettingsProfile(s);
 showSettingsMessage("บันทึกการตั้งค่าเรียบร้อยแล้ว","success");
}

function resetSettings(){
 const avatar=getProfileSettings().avatar;
 const reset={...defaultProfileSettings,avatar};
 localStorage.setItem("zupProfileSettings",JSON.stringify(reset));
 loadSettings();
 showSettingsMessage("คืนค่าการตั้งค่าเริ่มต้นแล้ว","success");
}

function applyPreferences(s=getProfileSettings()){
 document.body.classList.toggle("hide-thai-translations",s.prefThai===false);
 document.body.classList.toggle("reduce-learning-motion",s.prefAnimation===false);
 document.body.classList.toggle("hide-answer-explanations",s.prefExplanation===false);
}

function showSettingsMessage(message,type="success"){
 const box=document.getElementById("settingsMessage");
 if(!box) return;
 box.className="settings-message "+type;
 box.innerText=message;
 setTimeout(()=>{box.innerText="";box.className="settings-message";},3000);
}


const premiumDefaults={
 name:"",email:"",phone:"",university:"",organization:"",birthday:"",
 country:"Thailand",occupation:"Student",studentId:"",bio:"",goal:"Become Import Export Specialist",
 avatar:"",language:"both",theme:"light",darkMode:false,animation:true,sound:false,
 autoPlay:false,emailNotification:false,quizReminder:true,dailyGoal:true,weeklyReport:true
};

function maskEmail(email){
 if(!email || !email.includes("@")) return "Private User";
 const [name,domain]=email.split("@");
 return `${name.slice(0,2)}••••@${domain}`;
}

function maskPhone(phone){
 if(!phone) return "Not provided";
 const digits=phone.replace(/\D/g,"");
 return digits.length>=4 ? `•••-•••-${digits.slice(-4)}` : "••••";
}

function getPremiumSettings(){
 return {...premiumDefaults,...JSON.parse(localStorage.getItem("zupPremiumSettings")||"{}")};
}

function loadPremiumSettings(){
 const s=getPremiumSettings();
 const map={
  settingName:s.name||user?.name||"",settingEmail:s.email||user?.email||"",settingPhone:s.phone,
  settingUniversity:s.university,settingOrganization:s.organization,settingBirthday:s.birthday,
  settingCountry:s.country,settingOccupation:s.occupation,settingStudentId:s.studentId,
  settingBio:s.bio,settingGoal:s.goal
 };
 Object.entries(map).forEach(([id,value])=>{const el=document.getElementById(id);if(el)el.value=value||"";});
 ["prefDarkMode","prefAnimation","prefSound","prefAutoPlay","prefEmailNotification","prefQuizReminder","prefDailyGoal","prefWeeklyReport"].forEach(id=>{
   const key=id.replace("pref",""); const prop=key.charAt(0).toLowerCase()+key.slice(1);
   const el=document.getElementById(id); if(el)el.checked=!!s[prop];
 });
 document.querySelectorAll(".language-selector button").forEach(b=>b.classList.toggle("active",b.dataset.lang===s.language));
 document.querySelectorAll(".theme-preview").forEach(b=>b.classList.toggle("active",b.dataset.theme===s.theme));
 updatePremiumProfile(s);
 updateProfileCompletion(s);
 setTimeout(()=>{document.getElementById("settingsSkeleton")?.classList.add("hidden");document.getElementById("settingsContent")?.classList.remove("hidden");animateCounters();},650);
}

function updatePremiumProfile(s=getPremiumSettings()){
 const avatar=document.getElementById("premiumAvatar");
 const fallback=document.getElementById("premiumAvatarFallback");
 const initial=(s.name||user?.name||"L").trim().charAt(0).toUpperCase();
 if(fallback) fallback.innerText=initial;
 if(avatar&&fallback){
   if(s.avatar){avatar.src=s.avatar;avatar.style.display="block";fallback.style.display="none";}
   else{avatar.style.display="none";fallback.style.display="grid";}
 }
 const greeting=document.getElementById("premiumGreeting");
 if(greeting) greeting.innerText=`Good Afternoon, ${s.name||user?.name||"Learner"}`;
}

function previewPremiumAvatar(event){
 const file=event.target.files?.[0]; if(!file)return;
 if(file.size>2*1024*1024){showToast("รูปต้องมีขนาดไม่เกิน 2 MB","error");return;}
 const reader=new FileReader();
 reader.onload=()=>{const s=getPremiumSettings();s.avatar=reader.result;localStorage.setItem("zupPremiumSettings",JSON.stringify(s));updatePremiumProfile(s);showToast("อัปเดตรูปโปรไฟล์แล้ว","success");};
 reader.readAsDataURL(file);
}

function collectPremiumSettings(){
 const g=id=>document.getElementById(id)?.value.trim()||"";
 return {
  ...getPremiumSettings(),
  name:g("settingName"),email:g("settingEmail"),phone:g("settingPhone"),university:g("settingUniversity"),
  organization:g("settingOrganization"),birthday:g("settingBirthday"),country:g("settingCountry"),
  occupation:g("settingOccupation"),studentId:g("settingStudentId"),bio:g("settingBio"),goal:g("settingGoal"),
  darkMode:document.getElementById("prefDarkMode")?.checked||false,
  animation:document.getElementById("prefAnimation")?.checked!==false,
  sound:document.getElementById("prefSound")?.checked||false,
  autoPlay:document.getElementById("prefAutoPlay")?.checked||false,
  emailNotification:document.getElementById("prefEmailNotification")?.checked||false,
  quizReminder:document.getElementById("prefQuizReminder")?.checked!==false,
  dailyGoal:document.getElementById("prefDailyGoal")?.checked!==false,
  weeklyReport:document.getElementById("prefWeeklyReport")?.checked!==false
 };
}

function savePremiumSettings(){
 const s=collectPremiumSettings();
 if(s.email && !s.email.includes("@")){showToast("กรุณากรอกอีเมลให้ถูกต้อง","error");return;}
 localStorage.setItem("zupPremiumSettings",JSON.stringify(s));
 user={name:s.name||"Learner",email:s.email||""};
 localStorage.setItem("zupUser",JSON.stringify(user));
 updatePremiumProfile(s);updateProfileCompletion(s);applyPremiumAppearance(s);updateUser();
 showToast("บันทึกการตั้งค่าอย่างปลอดภัยแล้ว","success");
}

function resetPremiumSettings(){
 localStorage.setItem("zupPremiumSettings",JSON.stringify(premiumDefaults));
 loadPremiumSettings();showToast("คืนค่าเริ่มต้นแล้ว","success");
}

function updateProfileCompletion(s=getPremiumSettings()){
 const fields=["name","email","phone","university","organization","birthday","country","occupation","studentId","bio","goal"];
 const done=fields.filter(k=>String(s[k]||"").trim()).length;
 const pct=Math.round(done/fields.length*100);
 const text=document.getElementById("profileCompletionText");const bar=document.getElementById("profileCompletionBar");
 if(text)text.innerText=pct+"%";if(bar)bar.style.width=pct+"%";
}

function selectLanguage(btn){
 document.querySelectorAll(".language-selector button").forEach(b=>b.classList.remove("active"));btn.classList.add("active");
 const s=getPremiumSettings();s.language=btn.dataset.lang;localStorage.setItem("zupPremiumSettings",JSON.stringify(s));showToast("เปลี่ยนภาษาแล้ว","success");
}

function selectTheme(btn){
 document.querySelectorAll(".theme-preview").forEach(b=>b.classList.remove("active"));btn.classList.add("active");
 const s=getPremiumSettings();s.theme=btn.dataset.theme;localStorage.setItem("zupPremiumSettings",JSON.stringify(s));applyPremiumAppearance(s);showToast("เปลี่ยนธีมแล้ว","success");
}

function applyPremiumAppearance(s=getPremiumSettings()){
 document.body.dataset.theme=s.theme||"light";
 document.body.classList.toggle("premium-dark",s.darkMode||s.theme==="dark"||s.theme==="midnight");
 document.body.classList.toggle("reduce-learning-motion",s.animation===false);
}

function animateCounters(){
 document.querySelectorAll(".animated-counter").forEach(el=>{
  const target=Number(el.dataset.target||0),suffix=el.dataset.suffix||"";let value=0;
  const step=Math.max(1,Math.ceil(target/36));
  const timer=setInterval(()=>{value=Math.min(target,value+step);el.innerText=value+suffix;if(value>=target)clearInterval(timer);},28);
 });
}

function filterSettings(query){
 const q=query.toLowerCase().trim();
 document.querySelectorAll(".settings-searchable").forEach(card=>{
   card.classList.toggle("settings-filter-hidden",q && !card.dataset.keywords.toLowerCase().includes(q));
 });
}

function focusProfileSection(){
 document.getElementById("personalSection")?.scrollIntoView({behavior:"smooth",block:"center"});
 setTimeout(()=>document.getElementById("settingName")?.focus(),500);
}

function showToast(message,type="success"){
 const box=document.getElementById("settingsToast");if(!box)return;
 box.className=`modern-toast show ${type}`;box.innerHTML=`<span>${type==="error"?"✕":"✓"}</span>${message}`;
 setTimeout(()=>box.className="modern-toast",2800);
}

function showPrivacyCenter(){
 showToast("ข้อมูลส่วนตัวถูกซ่อนจากผู้เล่นคนอื่น และจัดเก็บเฉพาะในอุปกรณ์นี้","success");
}

function exportLearningData(){
 const data={profile:getPremiumSettings(),history:user?JSON.parse(localStorage.getItem("zupHist_"+user.email)||"[]"):[]};
 const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});
 const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="zupports-learning-data.json";a.click();
 showToast("ส่งออกข้อมูลการเรียนแล้ว","success");
}

function backupLearningData(){
 localStorage.setItem("zupLastBackup",new Date().toISOString());
 const el=document.getElementById("lastBackupText");if(el)el.innerText="Just now";
 showToast("สำรองข้อมูลในอุปกรณ์แล้ว","success");
}

let pendingConfirmAction="";
function openConfirmModal(action){
 pendingConfirmAction=action;
 const title=document.getElementById("confirmTitle"),text=document.getElementById("confirmText"),btn=document.getElementById("confirmActionBtn");
 const map={
  "reset-progress":["Reset Learning Progress","ลบคะแนนและประวัติการเรียนทั้งหมดจากอุปกรณ์นี้?"],
  "logout":["Logout","ออกจากระบบและซ่อนข้อมูลบัญชีบนหน้าจอนี้?"],
  "delete-account":["Delete Account","ลบข้อมูลบัญชีและประวัติทั้งหมดออกจากอุปกรณ์นี้อย่างถาวร?"]
 };
 title.innerText=map[action][0];text.innerText=map[action][1];
 btn.onclick=performConfirmedAction;
 document.getElementById("confirmModal").classList.remove("hidden");
}
function closeConfirmModal(){document.getElementById("confirmModal").classList.add("hidden");}
function performConfirmedAction(){
 if(pendingConfirmAction==="reset-progress" && user)localStorage.removeItem("zupHist_"+user.email);
 if(pendingConfirmAction==="logout"){user=null;localStorage.removeItem("zupUser");updateUser();goPage("home");}
 if(pendingConfirmAction==="delete-account"){localStorage.clear();user=null;updateUser();goPage("home");}
 closeConfirmModal();showToast("ดำเนินการเรียบร้อยแล้ว","success");
}

document.addEventListener("keydown",e=>{
 if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="k"){
  e.preventDefault();document.getElementById("settingsSearch")?.focus();
 }
});

function maskDisplayedIdentity(){
 const s=getPremiumSettings();
 const userBox=document.getElementById("userEmail");
 if(userBox) userBox.innerText=s.email?maskEmail(s.email):"Private User";
}


const minimalDefaults={
 name:"",
 email:"",
 phone:"",
 organization:"",
 goal:"",
 language:"th",
 animation:true,
 emailNotification:false,
 quizReminder:true
};

function getMinimalSettings(){
 return {...minimalDefaults,...JSON.parse(localStorage.getItem("zupMinimalSettings")||"{}")};
}

function loadMinimalSettings(){
 const s=getMinimalSettings();
 pendingProfileImage=null;
 pendingProfileAction=null;
 renderProfileImage(getSavedProfileImage());
 renderTopUserAvatar(getSavedProfileImage());
 const values={
  settingName:s.name||user?.name||"",
  settingEmail:s.email||user?.email||"",
  settingPhone:s.phone||"",
  settingOrganization:s.organization||"",
  settingGoal:s.goal||""
 };
 Object.entries(values).forEach(([id,value])=>{
   const el=document.getElementById(id);
   if(el) el.value=value;
 });
 const lang=document.getElementById("settingLanguage");
 if(lang) lang.value=s.language||"th";
 const anim=document.getElementById("prefAnimation");
 const email=document.getElementById("prefEmailNotification");
 const quiz=document.getElementById("prefQuizReminder");
 if(anim) anim.checked=s.animation!==false;
 if(email) email.checked=!!s.emailNotification;
 if(quiz) quiz.checked=s.quizReminder!==false;

 const logged=document.getElementById("settingsLoggedName");
 if(logged) logged.innerText=s.name||user?.name||"ผู้เรียน";
 updateMinimalCompletion(s);
}

function saveMinimalSettings(){
 const s={
  name:document.getElementById("settingName")?.value.trim()||"",
  email:document.getElementById("settingEmail")?.value.trim()||"",
  phone:document.getElementById("settingPhone")?.value.trim()||"",
  organization:document.getElementById("settingOrganization")?.value.trim()||"",
  goal:document.getElementById("settingGoal")?.value.trim()||"",
  language:document.getElementById("settingLanguage")?.value||"th",
  animation:document.getElementById("prefAnimation")?.checked!==false,
  emailNotification:document.getElementById("prefEmailNotification")?.checked||false,
  quizReminder:document.getElementById("prefQuizReminder")?.checked!==false
 };
 if(s.email && !s.email.includes("@")){
   showMinimalToast("กรุณากรอกอีเมลให้ถูกต้อง","error");
   return;
 }
 localStorage.setItem("zupMinimalSettings",JSON.stringify(s));
 const profileUpdated=savePendingProfileImage();
 user={name:s.name||"ผู้เรียน",email:s.email||""};
 localStorage.setItem("zupUser",JSON.stringify(user));
 document.body.classList.toggle("reduce-learning-motion",s.animation===false);
 updateUser();
 loadMinimalSettings();
 showMinimalToast(profileUpdated?"อัปเดตรูปโปรไฟล์สำเร็จ":"บันทึกการตั้งค่าเรียบร้อยแล้ว");
}

function updateMinimalCompletion(s=getMinimalSettings()){
 const fields=["name","email","phone","organization","goal"];
 const missing=fields.filter(key=>!String(s[key]||"").trim());
 const pct=Math.round((fields.length-missing.length)/fields.length*100);
 const text=document.getElementById("minimalCompletionText");
 const bar=document.getElementById("minimalCompletionBar");
 const hint=document.getElementById("minimalCompletionHint");
 if(text) text.innerText=pct+"%";
 if(bar) bar.style.width=pct+"%";
 const labels={name:"ชื่อ",email:"อีเมล",phone:"เบอร์โทรศัพท์",organization:"มหาวิทยาลัย / บริษัท",goal:"เป้าหมายการเรียนรู้"};
 if(hint){
   hint.innerText=missing.length
    ? "แนะนำให้เพิ่ม: "+missing.map(x=>labels[x]).join(", ")
    : "ข้อมูลบัญชีครบถ้วนแล้ว";
 }
}

function backupMinimalData(){
 localStorage.setItem("zupLastBackup",new Date().toISOString());
 showMinimalToast("สำรองข้อมูลเรียบร้อยแล้ว");
}

function showMinimalToast(message,type="success"){
 const box=document.getElementById("minimalToast");
 if(!box) return;
 box.className="minimal-toast show "+type;
 box.innerText=message;
 setTimeout(()=>box.className="minimal-toast",2400);
}


let pendingProfileImage = null;
let pendingProfileAction = null;

function getSavedProfileImage(){
  return localStorage.getItem("zupProfileImage") || "";
}

function renderProfileImage(src){
  const img=document.getElementById("profilePreview");
  const placeholder=document.getElementById("profilePlaceholder");
  if(!img||!placeholder) return;
  if(src){
    img.src=src;
    img.style.display="block";
    placeholder.style.display="none";
  }else{
    img.removeAttribute("src");
    img.style.display="none";
    placeholder.style.display="grid";
  }
}

function renderTopUserAvatar(src){
  const avatar=document.getElementById("topUserAvatar");
  if(!avatar) return;
  avatar.innerHTML=src?`<img src="${src}" alt="รูปโปรไฟล์">`:"👤";
}

function handleProfileImageSelect(event){
  const file=event.target.files?.[0];
  if(!file) return;

  const allowedTypes=["image/jpeg","image/png","image/webp"];
  if(!allowedTypes.includes(file.type)){
    event.target.value="";
    showMinimalToast("กรุณาเลือกไฟล์รูปภาพที่ถูกต้อง","error");
    return;
  }

  const maxSize=2*1024*1024;
  if(file.size>maxSize){
    event.target.value="";
    showMinimalToast("ขนาดไฟล์ใหญ่เกินกำหนด","error");
    return;
  }

  const reader=new FileReader();
  reader.onload=()=>{
    pendingProfileImage=reader.result;
    pendingProfileAction="update";
    renderProfileImage(pendingProfileImage);
  };
  reader.onerror=()=>showMinimalToast("ไม่สามารถอ่านไฟล์รูปภาพได้","error");
  reader.readAsDataURL(file);
}

function removeProfilePreview(){
  pendingProfileImage="";
  pendingProfileAction="remove";
  renderProfileImage("");
}

function restoreDefaultProfile(){
  pendingProfileImage="";
  pendingProfileAction="default";
  renderProfileImage("");
}

function cancelProfileChanges(){
  pendingProfileImage=null;
  pendingProfileAction=null;
  renderProfileImage(getSavedProfileImage());
  loadMinimalSettings();
  const input=document.getElementById("profileImageInput");
  if(input) input.value="";
  showMinimalToast("ยกเลิกการเปลี่ยนแปลงแล้ว");
}

function savePendingProfileImage(){
  if(pendingProfileAction===null) return false;
  if(pendingProfileImage){
    localStorage.setItem("zupProfileImage",pendingProfileImage);
  }else{
    localStorage.removeItem("zupProfileImage");
  }
  renderTopUserAvatar(getSavedProfileImage());
  pendingProfileImage=null;
  pendingProfileAction=null;
  return true;
}


let landingLanguageMode="TH / EN";
function toggleLandingLanguage(){
 const options=["TH / EN","TH","EN"];
 const idx=(options.indexOf(landingLanguageMode)+1)%options.length;
 landingLanguageMode=options[idx];
 const label=document.getElementById("landingLangLabel");
 if(label) label.innerText=landingLanguageMode;
}

function updateLandingUser(){
 const s=typeof getMinimalSettings==="function"?getMinimalSettings():{};
 const loginText=document.getElementById("landingLoginText");
 const userIcon=document.getElementById("landingUserIcon");
 const savedImage=typeof getSavedProfileImage==="function"?getSavedProfileImage():"";
 if(loginText) loginText.innerText=isLoggedIn()?(s.name||user?.name||"บัญชีของฉัน"):"เข้าสู่ระบบ";
 if(userIcon){
   userIcon.innerHTML=isLoggedIn()&&savedImage?`<img src="${savedImage}" alt="รูปโปรไฟล์">`:"👤";
 }
}


const protectedDestinations=new Set([
 "overview","learn","glossary","pretest","posttest","progress","settings"
]);
let pendingDestination=null;
let pendingButton=null;

function isLoggedIn(){
 return Boolean(user && user.email);
}

function requireLogin(destination,btn=null){
 closeMobileMenu();
 if(!isLoggedIn()){
   pendingDestination=destination;
   pendingButton=btn;
   openLogin();
   return false;
 }
 goPage(destination,btn || document.querySelector(`[data-page="${destination}"]`));
 return true;
}

function handleProfileButton(){
 if(isLoggedIn()) requireLogin("settings");
 else openLogin();
}

function toggleMobileMenu(){
 const nav=document.getElementById("mainNavigation");
 const button=document.getElementById("mobileMenuButton");
 if(!nav||!button) return;
 const open=nav.classList.toggle("mobile-open");
 button.setAttribute("aria-expanded",String(open));
 button.innerText=open?"✕":"☰";
}

function closeMobileMenu(){
 const nav=document.getElementById("mainNavigation");
 const button=document.getElementById("mobileMenuButton");
 if(nav) nav.classList.remove("mobile-open");
 if(button){
   button.setAttribute("aria-expanded","false");
   button.innerText="☰";
 }
}

const questions=[{"id": "Q01", "term": "EXW", "q": "ผู้ขายต้องการให้ผู้ซื้อไปรับสินค้าที่โรงงานเอง ควรใช้ Term ใด?", "ops": ["EXW", "FOB", "DAP", "CIF"], "reason": "EXW เป็นเงื่อนไขที่ผู้ขายรับผิดชอบน้อยที่สุด", "review": "ทบทวน EXW"}, {"id": "Q02", "term": "FOB", "q": "Importer ต้องการเลือกสายเรือเอง ควรใช้ Term ใด?", "ops": ["FOB", "CIF", "DDP", "DAP"], "reason": "FOB เหมาะเมื่อผู้ซื้อต้องการควบคุมสายเรือและ Freight เอง", "review": "ทบทวน FOB"}, {"id": "Q03", "term": "CFR", "q": "ผู้ขายจ่าย Freight แต่ไม่รวม Insurance ควรใช้ Term ใด?", "ops": ["CFR", "CIF", "FOB", "EXW"], "reason": "CFR ให้ผู้ขายจ่ายค่าขนส่งทางเรือ แต่ไม่รวมประกัน", "review": "ทบทวน CFR"}, {"id": "Q04", "term": "CIF", "q": "ผู้ขายจ่าย Freight และ Insurance ควรใช้ Term ใด?", "ops": ["CIF", "CFR", "FOB", "FCA"], "reason": "CIF รวมค่าขนส่งทางเรือและประกันภัย", "review": "ทบทวน CIF"}, {"id": "Q05", "term": "CIP", "q": "ขนส่งหลายโหมดและผู้ขายรวมประกัน ควรใช้ Term ใด?", "ops": ["CIP", "CPT", "CIF", "CFR"], "reason": "CIP ใช้ได้หลายโหมดและรวมประกัน", "review": "ทบทวน CIP"}, {"id": "Q06", "term": "DAP", "q": "ผู้ขายส่งถึงคลัง แต่ Buyer จ่ายภาษีนำเข้าเอง ควรใช้ Term ใด?", "ops": ["DAP", "DDP", "CIF", "EXW"], "reason": "DAP ส่งถึงปลายทาง แต่ Buyer จ่ายภาษีนำเข้าเอง", "review": "ทบทวน DAP"}, {"id": "Q07", "term": "DPU", "q": "ผู้ขายส่งถึงปลายทางและขนลงสินค้าให้ ควรใช้ Term ใด?", "ops": ["DPU", "DAP", "DDP", "CPT"], "reason": "DPU กำหนดให้ผู้ขายขนลงสินค้าให้", "review": "ทบทวน DPU"}, {"id": "Q08", "term": "DDP", "q": "Buyer ไม่อยากยุ่งเรื่องนำเข้าและภาษี ควรใช้ Term ใด?", "ops": ["DDP", "DAP", "DPU", "CIF"], "reason": "DDP ให้ผู้ขายรับผิดชอบรวมภาษีนำเข้า", "review": "ทบทวน DDP"}, {"id": "Q09", "term": "แบ่งเป็น 2 กลุ่ม: ทุกโหมด และทางทะเล/ทางน้ำ มี 11 เงื่อนไข", "q": "ข้อใดอธิบายการแบ่งประเภท Incoterms 2020 ตามรูปแบบการขนส่งได้ถูกต้อง?", "ops": ["แบ่งเป็น 4 กลุ่มเท่านั้น", "แบ่งเป็น 2 กลุ่ม: ทุกโหมด และทางทะเล/ทางน้ำ มี 11 เงื่อนไข", "มี 10 เงื่อนไข", "ใช้เฉพาะทางทะเล"], "reason": "Incoterms 2020 มี 11 เงื่อนไข และแบ่งตามรูปแบบการขนส่งเป็น 2 กลุ่มใหญ่", "review": "ทบทวนภาพรวม 11 Terms"}, {"id": "Q10", "term": "EXW, FCA, CPT, DPU, DAP", "q": "ชุดใดใช้ได้กับการขนส่งทุกประเภททั้งหมด?", "ops": ["EXW, FAS, FCA, CPT, DDU", "EXW, FCA, CPT, CIP, DEQ", "EXW, FCA, CFR, CPT, DPU", "EXW, FCA, CPT, DPU, DAP"], "reason": "ชุดนี้เป็น All Modes ทั้งหมด", "review": "ทบทวน All Modes"}, {"id": "Q11", "term": "CFR", "q": "ผู้ขายส่งมอบสินค้าบนเรือ และเป็นผู้ทำสัญญาขนส่งไปท่าเรือปลายทาง แต่ไม่รวมประกัน ควรใช้ข้อใด?", "ops": ["CFR", "CIF", "CPT", "CIP"], "reason": "CFR ใช้ทางทะเล ผู้ขายจ่าย Freight แต่ไม่รวมประกัน", "review": "ทบทวน CFR"}, {"id": "Q12", "term": "CFR, CIF, CPT, CIP", "q": "กลุ่มใดที่ความเสี่ยงโอนในประเทศผู้ขาย แต่ผู้ขายยังจ่ายค่าขนส่งไปปลายทาง?", "ops": ["EXW", "FOB, FAS, FCA", "CFR, CIF, CPT, CIP", "DAP, DPU, DDP"], "reason": "กลุ่ม C มีลักษณะสำคัญคือ Cost กับ Risk แยกจุดกัน", "review": "ทบทวน Group C"}, {"id": "Q13", "term": "DPU ใช้เฉพาะการขนส่งทางทะเลหรือทางน้ำ", "q": "ข้อใดไม่ถูกต้องเกี่ยวกับ DPU?", "ops": ["DPU ใช้เฉพาะการขนส่งทางทะเลหรือทางน้ำ", "ผู้ขายส่งถึงปลายทางและขนลง", "ความเสี่ยงโอน ณ ปลายทางหลังขนลง", "DPU ใช้ได้ทุกโหมด"], "reason": "DPU ใช้ได้กับการขนส่งทุกประเภท", "review": "ทบทวน DPU"}, {"id": "Q14", "term": "ถูกทุกข้อ", "q": "ข้อใดกล่าวถูกต้องเกี่ยวกับ DAP?", "ops": ["ใช้ได้กับการขนส่งทุกประเภท", "ผู้ขายส่งถึงปลายทางบนยานพาหนะพร้อมสำหรับการขนลง", "ความเสี่ยงโอน ณ ปลายทาง", "ถูกทุกข้อ"], "reason": "ทั้งสามข้อความแรกถูกต้อง", "review": "ทบทวน DAP"}, {"id": "Q15", "term": "FCA, FOB, DPU, DAP", "q": "ข้อใดเรียงความรับผิดชอบของผู้ขายจากน้อยไปมากได้เหมาะสมที่สุด?", "ops": ["EXW, FOB, FAS, CFR", "FOB, FCA, CPT, DPU", "FOB, CIF, DAP, DPU", "FCA, FOB, DPU, DAP"], "reason": "โดยภาพรวมความรับผิดชอบเพิ่มจาก F ไปสู่ D", "review": "ทบทวนลำดับความรับผิดชอบ"}, {"id": "Q16", "term": "ผู้ส่งออก (Shipper/Exporter)", "q": "ภายใต้ DDP ใครชำระอากรและภาษีนำเข้า?", "ops": ["ผู้ส่งออก (Shipper/Exporter)", "ผู้นำเข้า (Consignee/Importer)", "ทั้งสองฝ่ายแบ่งกัน", "ไม่มีผู้รับผิดชอบ"], "reason": "DDP ให้ผู้ขายรับผิดชอบ Import Duty", "review": "ทบทวน DDP"}, {"id": "Q17", "term": "แทบไม่มีความเสี่ยงด้านการขนส่ง", "q": "ข้อใดเป็นข้อได้เปรียบของผู้ส่งออกภายใต้ EXW?", "ops": ["ควบคุมการขนส่งได้ทั้งหมด", "แทบไม่มีความเสี่ยงด้านการขนส่ง", "ผลิตล่าช้าได้", "ไม่มีข้อได้เปรียบ"], "reason": "EXW ทำให้ผู้ขายมีภาระและความเสี่ยงด้านขนส่งต่ำ", "review": "ทบทวน EXW"}, {"id": "Q18", "term": "สามารถควบคุมการขนส่งได้ทั้งหมด", "q": "ข้อใดเป็นข้อได้เปรียบของผู้นำเข้าภายใต้ EXW?", "ops": ["สามารถควบคุมการขนส่งได้ทั้งหมด", "ไม่มีความเสี่ยง", "ไม่เสียค่าขนส่ง", "ไม่เสียภาษีนำเข้า"], "reason": "Buyer เลือกผู้ให้บริการและเส้นทางได้เอง", "review": "ทบทวน EXW"}, {"id": "Q19", "term": "ต้องรับความเสี่ยงในการขนส่งเกือบทั้งหมด", "q": "ข้อใดเป็นข้อเสียของผู้นำเข้าภายใต้ EXW?", "ops": ["ควบคุมการขนส่งได้ทั้งหมด", "ไม่เสียค่าขนส่ง", "ต้องรับความเสี่ยงในการขนส่งเกือบทั้งหมด", "ไม่มีข้อเสีย"], "reason": "Buyer รับความเสี่ยงตั้งแต่รับของจากสถานที่ผู้ขาย", "review": "ทบทวน EXW"}, {"id": "Q20", "term": "เมื่อสินค้าถูกยกขึ้นบนเรือ ณ ท่าเรือต้นทาง", "q": "ภายใต้ FOB ความเสี่ยงโอนเมื่อใด?", "ops": ["เมื่อตู้อยู่ลานฝั่งส่งออก", "เมื่อตู้อยู่ลานฝั่งนำเข้า", "เมื่อสินค้าถูกยกขึ้นบนเรือ ณ ท่าเรือต้นทาง", "เมื่อสินค้าถูกยกลงจากเรือ"], "reason": "FOB โอน Risk เมื่อสินค้าขึ้นเรือ", "review": "ทบทวน FOB"}, {"id": "Q21", "term": "FOB", "q": "ผู้ส่งออกต้องการลดภาระหลังสินค้าขึ้นเรือ ควรใช้ข้อใด?", "ops": ["DDP", "CFR", "CIF", "FOB"], "reason": "FOB ทำให้ผู้ขายจบหน้าที่เมื่อสินค้าขึ้นเรือ", "review": "ทบทวน FOB"}, {"id": "Q22", "term": "FOB", "q": "ผู้นำเข้าครั้งแรกไม่อยากจัดการขั้นตอนในประเทศผู้ส่งออก แต่ต้องการเลือก Freight เอง ควรใช้ข้อใด?", "ops": ["EXW", "FOB", "CFR", "FCA"], "reason": "FOB ให้ผู้ขายจัดการต้นทางและ Buyer จัด Freight", "review": "ทบทวน FOB"}, {"id": "Q23", "term": "CFR ผู้ขายไม่ต้องทำประกัน ส่วน CIF ผู้ขายต้องทำประกัน", "q": "ความแตกต่างระหว่าง CFR และ CIF คือข้อใด?", "ops": ["CFR ไม่มีภาษี ส่วน CIF จ่ายภาษี", "CFR Seller จ่าย Freight ส่วน CIF Buyer จ่าย", "CFR ผู้ขายไม่ต้องทำประกัน ส่วน CIF ผู้ขายต้องทำประกัน", "CFR Seller รับ Risk ถึงปลายทาง"], "reason": "CIF เพิ่มหน้าที่ Insurance จาก CFR", "review": "ทบทวน CFR/CIF"}, {"id": "Q24", "term": "ผู้นำเข้า", "q": "หากใช้ CFR ใครจัดทำประกันภัยหากต้องการความคุ้มครอง?", "ops": ["ผู้ส่งออก", "ผู้นำเข้า", "ทั้งสองฝ่าย", "สายเรือ"], "reason": "CFR ไม่บังคับผู้ขายทำประกัน", "review": "ทบทวน CFR"}, {"id": "Q25", "term": "CIP และ CPT", "q": "Incoterms กลุ่ม C ที่ใช้ได้กับการขนส่งหลายรูปแบบคือคู่ใด?", "ops": ["CFR และ CIF", "FAS และ FOB", "CIP และ CPT", "DAP และ DDP"], "reason": "CPT และ CIP ใช้ได้ทุกโหมด", "review": "ทบทวน CPT/CIP"}, {"id": "Q26", "term": "เมื่อส่งมอบสินค้าให้ Carrier ณ จุดที่ตกลง", "q": "ภายใต้ CPT และ CIP ความเสี่ยงโอนเมื่อใด?", "ops": ["เมื่อส่งมอบสินค้าให้ Carrier ณ จุดที่ตกลง", "เมื่อสินค้าขึ้นเรือ", "เมื่อสินค้าลงเรือ", "เมื่อถึงคลังผู้ซื้อ"], "reason": "CPT/CIP โอน Risk เมื่อส่งมอบให้ Carrier", "review": "ทบทวน CPT/CIP"}, {"id": "Q27", "term": "สถานที่ปลายทางที่ตกลง", "q": "ภายใต้ CPT และ CIP ผู้ขายจ่ายค่าขนส่งถึงที่ใด?", "ops": ["จุดรับสินค้าในประเทศผู้ส่งออก", "สถานที่ปลายทางที่ตกลง", "ท่าเรือต้นทาง", "โรงงานผู้ขาย"], "reason": "Seller จ่าย Carriage ถึงปลายทางที่ตกลง", "review": "ทบทวน Cost vs Risk"}, {"id": "Q28", "term": "CPT ไม่บังคับประกัน ส่วน CIP ผู้ขายต้องทำประกัน", "q": "ความแตกต่างระหว่าง CPT และ CIP คือข้อใด?", "ops": ["CPT จ่ายภาษี ส่วน CIP ไม่จ่าย", "CPT โอน Risk ที่ต้นทาง ส่วน CIP บนเรือ", "CPT ไม่บังคับประกัน ส่วน CIP ผู้ขายต้องทำประกัน", "CPT ใช้เฉพาะเรือ"], "reason": "CIP เพิ่ม Insurance จาก CPT", "review": "ทบทวน CPT/CIP"}, {"id": "Q29", "term": "DDU", "q": "Incoterm ข้อใดไม่มีอยู่ใน Incoterms 2020?", "ops": ["DDU", "DAP", "DPU", "DDP"], "reason": "DDU ไม่มีใน Incoterms 2020", "review": "ทบทวนการเปลี่ยนแปลง Incoterms 2020"}, {"id": "Q30", "term": "ตัวแทนปลายทางได้สำรองอากรและภาษีนำเข้าหรือไม่", "q": "ภายใต้ DDP Forwarder ฝั่งส่งออกควรระวังเรื่องใด?", "ops": ["ผู้รับสินค้าเป็นผู้ชำระภาษีหรือไม่", "ผู้รับสินค้าเป็นผู้รับความเสี่ยงหรือไม่", "ตัวแทนปลายทางได้สำรองอากรและภาษีนำเข้าหรือไม่", "ตัวแทนปลายทางออก B/L หรือไม่"], "reason": "DDP ต้องตรวจสอบการสำรอง Duty/Tax ที่ปลายทาง", "review": "ทบทวน DDP Operation"}, {"id": "Q31", "term": "ผู้ซื้อรับผิดชอบการขนสินค้าลงจากยานพาหนะ", "q": "ข้อใดเหมือนกันระหว่าง DAP และ DDP?", "ops": ["ผู้ซื้อรับผิดชอบการขนสินค้าลงจากยานพาหนะ", "ผู้ขายขนลง", "ผู้ซื้อชำระภาษีเสมอ", "ผู้ขายชำระภาษีเสมอ"], "reason": "ทั้ง DAP และ DDP ส่งมอบพร้อมสำหรับการขนลง", "review": "ทบทวน DAP/DDP"}, {"id": "Q32", "term": "DAP ผู้ซื้อขนลงสินค้า ส่วน DPU ผู้ขายขนลงสินค้า", "q": "ความแตกต่างระหว่าง DAP และ DPU คือข้อใด?", "ops": ["DAP ถูกยกเลิก", "DPU ถูกยกเลิก", "DAP Buyer จ่ายภาษี ส่วน DPU Seller จ่าย", "DAP ผู้ซื้อขนลงสินค้า ส่วน DPU ผู้ขายขนลงสินค้า"], "reason": "DPU เพิ่มหน้าที่ Unload ให้ Seller", "review": "ทบทวน DAP/DPU"}, {"id": "Q33", "term": "ใช้ได้ หากคู่สัญญาตกลงและระบุฉบับ/ปีในสัญญาชัดเจน", "q": "Incoterms ที่ไม่มีในฉบับ 2020 ยังนำมาใช้ได้หรือไม่?", "ops": ["ใช้ได้เมื่อศุลกากรยอมรับ", "ใช้ได้ หากคู่สัญญาตกลงและระบุฉบับ/ปีในสัญญาชัดเจน", "ใช้ได้เมื่อสายเรือยอมรับ", "ใช้ไม่ได้ทุกกรณี"], "reason": "คู่สัญญาอ้างอิงฉบับเก่าได้หากระบุชัดเจน", "review": "ทบทวน Version ของ Incoterms"}, {"id": "Q34", "term": "FCA", "q": "ผู้ขายต้องส่งสินค้าให้ Forwarder ของผู้ซื้อที่สนามบินต้นทาง ควรใช้ Term ใด?", "ops": ["FCA", "FOB", "CIF", "DDP"], "reason": "FCA เหมาะกับการส่งมอบให้ Carrier และใช้ได้ทุกโหมด", "review": "ทบทวน FCA"}, {"id": "Q35", "term": "CPT", "q": "ผู้ขายจ่ายค่าขนส่งทางอากาศ แต่ Buyer ซื้อประกันเอง ควรใช้ Term ใด?", "ops": ["CPT", "CIP", "CIF", "FOB"], "reason": "CPT ใช้ได้หลายโหมดและไม่รวม Insurance", "review": "ทบทวน CPT"}, {"id": "Q36", "term": "DPU", "q": "Term ใดกำหนดให้ผู้ขายขนลงสินค้า ณ ปลายทาง?", "ops": ["DPU", "DAP", "DDP", "CIP"], "reason": "DPU มีคำว่า Unloaded", "review": "ทบทวน DPU"}, {"id": "Q37", "term": "FAS", "q": "ผู้ขายวางสินค้าไว้ข้างเรือ แต่ยังไม่โหลดขึ้นเรือ ควรใช้ Term ใด?", "ops": ["FAS", "FOB", "FCA", "CFR"], "reason": "FAS คือ Free Alongside Ship", "review": "ทบทวน FAS"}, {"id": "Q38", "term": "Buyer", "q": "ภายใต้ DAP ใครรับผิดชอบ Import Clearance?", "ops": ["Seller", "Buyer", "Carrier", "ทั้งสองฝ่าย"], "reason": "DAP ให้ Buyer จัดการนำเข้า", "review": "ทบทวน DAP"}, {"id": "Q39", "term": "เมื่อสินค้าขึ้นเรือที่ท่าเรือต้นทาง", "q": "ภายใต้ CIF ความเสี่ยงโอนเมื่อใด?", "ops": ["เมื่อถึงท่าเรือปลายทาง", "เมื่อสินค้าขึ้นเรือที่ท่าเรือต้นทาง", "เมื่อถึงคลัง Buyer", "เมื่อชำระเงินครบ"], "reason": "CIF โอน Risk เมื่อสินค้าขึ้นเรือ", "review": "ทบทวน CIF Risk"}, {"id": "Q40", "term": "FOB", "q": "ข้อใดเป็น Sea-only Incoterm?", "ops": ["DAP", "FOB", "CIP", "FCA"], "reason": "FOB ใช้เฉพาะทางทะเลและทางน้ำ", "review": "ทบทวน Sea-only Terms"}, {"id": "Q41", "term": "CIP", "q": "ข้อใดเป็น All-modes Incoterm?", "ops": ["CFR", "CIF", "CIP", "FAS"], "reason": "CIP ใช้ได้กับทุกโหมด", "review": "ทบทวน All Modes"}, {"id": "Q42", "term": "Seller", "q": "ใครรับผิดชอบ Export Clearance ภายใต้ FCA?", "ops": ["Seller", "Buyer", "Carrier", "ไม่มีใคร"], "reason": "FCA ให้ Seller ดำเนินพิธีการขาออก", "review": "ทบทวน FCA"}, {"id": "Q43", "term": "Buyer", "q": "ภายใต้ EXW ใครจัด Contract of Carriage โดยทั่วไป?", "ops": ["Seller", "Buyer", "ทั้งสองฝ่าย", "Customs"], "reason": "EXW ให้ Buyer จัดการขนส่งหลัก", "review": "ทบทวน EXW"}, {"id": "Q44", "term": "Seller", "q": "ภายใต้ CIF ใครเป็นผู้จัดทำ Insurance?", "ops": ["Seller", "Buyer", "Carrier", "ไม่มีใคร"], "reason": "CIF ให้ Seller จัดทำ Insurance", "review": "ทบทวน CIF"}, {"id": "Q45", "term": "Buyer", "q": "ภายใต้ FOB ใครเป็นผู้จ่าย Main Carriage โดยทั่วไป?", "ops": ["Seller", "Buyer", "ทั้งสองฝ่าย", "ไม่มีใคร"], "reason": "FOB ให้ Buyer จัด Freight หลังสินค้าขึ้นเรือ", "review": "ทบทวน FOB"}, {"id": "Q46", "term": "Seller", "q": "ภายใต้ DDP ใครรับผิดชอบ Import Clearance?", "ops": ["Seller", "Buyer", "Carrier", "Customs"], "reason": "DDP ให้ Seller รับผิดชอบการนำเข้า", "review": "ทบทวน DDP"}, {"id": "Q47", "term": "Buyer", "q": "ภายใต้ DPU ใครเป็นผู้จ่าย Import Duty?", "ops": ["Seller", "Buyer", "Carrier", "ทั้งสองฝ่าย"], "reason": "DPU ไม่รวม Import Duty จึงเป็นหน้าที่ Buyer", "review": "ทบทวน DPU"}, {"id": "Q48", "term": "Seller", "q": "ภายใต้ CFR ใครจ่าย Ocean Freight?", "ops": ["Seller", "Buyer", "Carrier", "แบ่งกัน"], "reason": "CFR ให้ Seller จ่าย Freight", "review": "ทบทวน CFR"}];

let selectedCounts={pre:10,post:10};
let active='FOB';
let user=JSON.parse(localStorage.getItem('zupUser')||'null');
let quizState=null;

function initNav(){
 document.querySelectorAll('.side-nav button').forEach(btn=>{
   btn.addEventListener('click',()=>{
     const destination=btn.dataset.page;
     if(destination==='home') goPage('home',btn);
     else requireLogin(destination,btn);
   });
 });
 document.getElementById('loginBtn').addEventListener('click',()=>{
   if(isLoggedIn()) requireLogin('settings');
   else openLogin();
 });
}

function goPage(id,btn){
 if(protectedDestinations.has(id) && !isLoggedIn()){
   pendingDestination=id;
   pendingButton=btn||null;
   openLogin();
   return;
 }
 closeMobileMenu();
 document.body.classList.toggle('landing-mode',id==='home');
 document.querySelectorAll('.page').forEach(p=>p.classList.add('hidden'));
 document.getElementById(id).classList.remove('hidden');
 document.querySelectorAll('.side-nav button').forEach(b=>b.classList.remove('active'));
 if(btn) btn.classList.add('active');
 if(id==='learn') renderDetail();
 if(id==='progress') renderProgress();
 if(id==='settings'){loadMinimalSettings();}
 window.scrollTo({top:0,behavior:'smooth'});
}

function openLogin(){document.getElementById('loginModal').classList.remove('hidden')}
function closeLogin(){document.getElementById('loginModal').classList.add('hidden')}
function saveLogin(){
 const email=document.getElementById('loginEmail').value.trim();
 const name=document.getElementById('loginName').value.trim()||email.split('@')[0];
 if(!email.includes('@')){alert('กรุณากรอกอีเมลให้ถูกต้อง');return}
 user={email,name};
 localStorage.setItem('zupUser',JSON.stringify(user));
 updateUser();
 closeLogin();

 const destination=pendingDestination||'overview';
 const button=pendingButton||document.querySelector(`[data-page="${destination}"]`);
 pendingDestination=null;
 pendingButton=null;
 goPage(destination,button);
}
function updateUser(){
 const s=typeof getMinimalSettings==="function"?getMinimalSettings():{};
 const label=document.getElementById("userEmail");
 if(label) label.innerText=s.name||user?.name||"ผู้ใช้ส่วนตัว";
 renderTopUserAvatar(getSavedProfileImage());
 updateLandingUser();
}

function cardHTML(t,green=false){
 const x=terms[t];
 return `<div class="mini-card ${green?'green':''}" onclick="openTerm('${t}')">
 <b>${t}</b><small>${x.full}</small><span>${x.icon}</span><p>${x.short}</p>
 </div>`;
}
function buildCards(){
 const all=['EXW','FCA','CPT','CIP','DAP','DPU','DDP'];
 const sea=['FAS','FOB','CFR','CIF'];
 document.getElementById('allModeCards').innerHTML=all.map(t=>cardHTML(t)).join('');
 document.getElementById('seaCards').innerHTML=sea.map(t=>cardHTML(t,true)).join('');
 const overviewAll=document.getElementById('overviewAllMode');
 const overviewSea=document.getElementById('overviewSeaMode');
 if(overviewAll) overviewAll.innerHTML=all.map(t=>cardHTML(t)).join('');
 if(overviewSea) overviewSea.innerHTML=sea.map(t=>cardHTML(t,true)).join('');
}
function openTerm(t){
 if(!isLoggedIn()){
   active=t;
   pendingDestination='learn';
   openLogin();
   return;
 }
 active=t;
 goPage('learn',document.querySelector('[data-page="learn"]'));
 renderDetail();
}
function renderDetail(){
 const menu=document.getElementById('termMenu');menu.innerHTML='';
 Object.keys(terms).forEach(t=>{
   const b=document.createElement('button');b.innerText=t;b.className=t===active?'active':'';
   b.onclick=()=>{if(!isLoggedIn()){pendingDestination='learn';openLogin();return;}active=t;renderDetail()};menu.appendChild(b);
 });
 const x=terms[active];
 document.getElementById('termGroup').innerText=x.group;
 document.getElementById('termTitle').innerText=active;
 document.getElementById('termDesc').innerHTML=glossaryMarkup(x.desc);
 document.getElementById('fullName').innerText=translateTermInfo(active);
 document.getElementById('freight').innerText=x.freight;
 document.getElementById('insurance').innerText=x.insurance;
 document.getElementById('duty').innerText=x.duty;
 document.getElementById('sellerDuty').innerHTML=glossaryMarkup(x.seller);
 document.getElementById('buyerDuty').innerHTML=glossaryMarkup(x.buyer);
 document.getElementById('example').innerHTML=glossaryMarkup(x.example);
 renderTermVocabulary(active);
 const flow=document.getElementById('flowMap');flow.innerHTML='';
 steps.forEach((s,i)=>{
   const d=document.createElement('div');
   d.className='seg '+(i<=x.risk?'seller':'buyer')+(i===x.risk?' risk':'');
   d.innerText=s;flow.appendChild(d);
 });
}
function animateBox(){
 const box=document.getElementById('movingBox');
 const status=document.getElementById('simulationStatus');
 const riskIndex=terms[active]?.risk ?? 0;
 const pct=Math.max(2,Math.min(94,(riskIndex/8)*94));
 box.classList.remove('play');
 box.style.left='10px';
 if(status) status.innerHTML=`กำลังจำลองเส้นทางของ <b>${active}</b>… สินค้าจะหยุดที่จุดโอนความเสี่ยง`;
 setTimeout(()=>{
   box.style.left=`calc(${pct}% - 10px)`;
   box.classList.add('play');
 },80);
 setTimeout(()=>{
   if(status) status.innerHTML=`<b>${active}</b>: จุดที่กล่องหยุดคือจุดที่ความเสี่ยงเปลี่ยนจาก Seller ไป Buyer — ${terms[active].desc}`;
 },1450);
}


function selectCount(type,count,btn){
 selectedCounts[type]=count;
 document.querySelectorAll(`#${type}CountOptions .count-btn`).forEach(b=>b.classList.remove('selected'));
 btn.classList.add('selected');
}

function secureShuffle(array){
 const result=[...array];
 for(let i=result.length-1;i>0;i--){
   let j;
   if(window.crypto && window.crypto.getRandomValues){
     const v=new Uint32Array(1);
     window.crypto.getRandomValues(v);
     j=v[0]%(i+1);
   }else{
     j=Math.floor(Math.random()*(i+1));
   }
   [result[i],result[j]]=[result[j],result[i]];
 }
 return result;
}

function buildAttemptSet(type,count){
 const key='zupUsed_'+user.email;
 const used=JSON.parse(localStorage.getItem(key)||'{"pre":[],"post":[]}');
 let pool=secureShuffle(questions);
 if(type==='post' && used.pre.length){
   pool=[...pool.filter(q=>!used.pre.includes(q.id)),...pool.filter(q=>used.pre.includes(q.id))];
 }
 const selected=pool.slice(0,Math.min(count,pool.length)).map(q=>({...q,ops:secureShuffle(q.ops)}));
 used[type]=selected.map(q=>q.id);
 localStorage.setItem(key,JSON.stringify(used));
 return selected;
}

function startQuiz(type){
 if(!user){openLogin();return}
 quizState={type,index:0,score:0,answers:[],locked:false,set:buildAttemptSet(type,selectedCounts[type]||10)};
 document.getElementById(type+'Start').classList.add('hidden');
 document.getElementById(type+'Quiz').classList.remove('hidden');
 renderQuiz();
}

function buildQuestionVisual(q){
 const text=(q.q+" "+q.term).toLowerCase();
 let focus="ภาพรวม Incoterms";
 let icon="🌍";
 let route=["🏭","🚚","🛃","⚓","🚢","⚓","🛃","🚚","🏢"];
 let highlight=4;

 if(/exw|โรงงาน/.test(text)){focus="ผู้ขายเตรียมของที่โรงงาน แล้ว Buyer จัดการต่อ";icon="🏭";highlight=0;}
 else if(/fob|ขึ้นเรือ|สายเรือ/.test(text)){focus="Risk โอนเมื่อสินค้าขึ้นเรือที่ท่าเรือต้นทาง";icon="🚢";highlight=3;}
 else if(/fas|ข้างเรือ/.test(text)){focus="ส่งมอบสินค้าไว้ข้างเรือ ก่อนยกขึ้นเรือ";icon="⚓";highlight=3;}
 else if(/fca|carrier|forwarder/.test(text)){focus="ส่งมอบให้ Carrier ณ จุดที่ตกลง";icon="🚚";highlight=2;}
 else if(/cfr|cif/.test(text)){focus="Seller จ่าย Freight แต่ Risk โอนตั้งแต่ต้นทาง";icon="🛳️";highlight=3;}
 else if(/cpt|cip/.test(text)){focus="Seller จ่าย Carriage ถึงปลายทาง แต่ Risk โอนเมื่อส่งให้ Carrier";icon="✈️";highlight=2;}
 else if(/dap|dpu|ddp|ปลายทาง|ภาษีนำเข้า/.test(text)){focus="สินค้าเดินทางถึงประเทศผู้ซื้อ แล้วดูว่าใครขนลงและใครจ่าย Duty";icon="🏢";highlight=8;}
 else if(/insurance|ประกัน/.test(text)){focus="ดูว่าเงื่อนไขนี้กำหนดให้ใครจัดทำประกันภัย";icon="🛡️";highlight=4;}
 else if(/risk|ความเสี่ยง/.test(text)){focus="สังเกตจุดที่ความเสี่ยงเปลี่ยนจาก Seller เป็น Buyer";icon="⚠️";highlight=4;}

 return `<div class="question-visual">
   <div class="visual-caption"><span>${icon}</span><div><b>ภาพช่วยคิด</b><small>${focus}</small></div></div>
   <div class="mini-route">${route.map((x,i)=>`<span class="${i===highlight?'focus':''}">${x}</span>${i<route.length-1?'<i></i>':''}`).join('')}</div>
 </div>`;
}

function getBriefExplanation(q){
 const term=q.term;
 if(detailedTermNotes && detailedTermNotes[term]) return detailedTermNotes[term];
 return q.reason + " ดังนั้นจึงเป็นตัวเลือกที่สอดคล้องกับหน้าที่ ค่าใช้จ่าย หรือจุดโอนความเสี่ยงตามโจทย์มากที่สุด";
}

function renderQuiz(){
 quizState.locked=false;
 const q=quizState.set[quizState.index];
 const box=document.getElementById(quizState.type+'Quiz');
 box.innerHTML=`<div class="quiz-head"><b>${quizState.type==='pre'?'PRE-TEST':'POST-TEST'}</b><span>ข้อ ${quizState.index+1}/${quizState.set.length}</span></div>
 <div class="progressbar"><div style="width:${(quizState.index/quizState.set.length)*100}%"></div></div>
 <h3>${q.q}</h3>
 ${buildQuestionVisual(q)}
 <div class="quiz-options">${q.ops.map(o=>`<button data-option="${o.replace(/"/g,'&quot;')}" onclick='answerQuiz(${JSON.stringify(o)})'><b>${o}</b>${terms[o]?` — ${translateTermInfo(o)}`:''}</button>`).join('')}</div>
 <div id="quizFeedback"></div>`;
}
function answerQuiz(choice){
 if(quizState.locked) return;
 quizState.locked=true;
 const q=quizState.set[quizState.index];
 const correct=choice===q.term;
 if(correct) quizState.score++;
 quizState.answers.push({question:q.q,choice,correct:q.term,ok:correct,id:q.id});
 document.querySelectorAll('.quiz-options button').forEach(btn=>{
   btn.disabled=true;
   const val=btn.dataset.option;
   if(val===q.term) btn.classList.add('correct-option');
   if(val===choice && !correct) btn.classList.add('wrong-option');
 });
 const fb=document.getElementById('quizFeedback');
 fb.className='feedback '+(correct?'correct':'wrong');
 fb.innerHTML=`<div class="feedback-title">${correct?'✓ ตอบถูก':'✕ ตอบผิด'}</div>
 <div><b>คำตอบที่ถูก:</b> ${terms[q.term]?translateTermInfo(q.term):q.term}</div>
 <div class="feedback-reason"><b>อธิบายให้เข้าใจง่าย:</b> ${glossaryMarkup(getBriefExplanation(q))}</div>
 <div class="feedback-review"><b>แนะนำให้ทบทวน:</b> ${glossaryMarkup(q.review)}</div>
 ${findTermNote(q)}
 ${findLegacyNotes(q)}
 <button class="secondary next-answer-btn" onclick="nextQuiz()">ข้อต่อไป</button>`;
}
function nextQuiz(){
 quizState.index++;
 if(quizState.index>=quizState.set.length){finishQuiz();return}
 renderQuiz();
}
function finishQuiz(){
 const pct=Math.round(quizState.score/quizState.set.length*100);
 const key='zupHist_'+user.email;
 const hist=JSON.parse(localStorage.getItem(key)||'[]');
 hist.push({type:quizState.type,pct,score:quizState.score,total:quizState.set.length,date:new Date().toLocaleString('th-TH'),answers:quizState.answers});
 localStorage.setItem(key,JSON.stringify(hist));
 const box=document.getElementById(quizState.type+'Quiz');
 box.innerHTML=`<div class="page-head"><h2>ทำแบบทดสอบเสร็จแล้ว</h2><p>คะแนน ${quizState.score}/${quizState.set.length} (${pct}%)</p>
 <button class="primary" onclick="goPage('${quizState.type==='pre'?'learn':'progress'}',document.querySelector('[data-page=&quot;${quizState.type==='pre'?'learn':'progress'}&quot;]'))">${quizState.type==='pre'?'ไปเรียนรู้':'ดูผลการเรียน'}</button></div>`;
 updateSteps();
}

function getQuestionCategory(answer){
 const text=(answer.question||"")+" "+(answer.correct||"");
 const term=answer.correct;
 if(["EXW","FCA","FAS","FOB"].includes(term) || /Origin|ต้นทาง|Export Clearance|โรงงาน|ขาออก/i.test(text)) return "ต้นทางและการส่งออก";
 if(["CFR","CIF","CPT","CIP"].includes(term) || /Freight|Insurance|Carrier|Risk|ความเสี่ยง|ประกัน/i.test(text)) return "ค่าขนส่ง ประกัน และ Risk Transfer";
 if(["DAP","DPU","DDP"].includes(term) || /Destination|ปลายทาง|Import|ภาษีนำเข้า|ขนลง/i.test(text)) return "ปลายทางและการนำเข้า";
 if(/ทุกประเภท|ทางทะเล|11|กลุ่ม|Incoterms 2020|DDU|DAT|DEQ/i.test(text)) return "ภาพรวมและการจำแนก Incoterms";
 return "การเลือกใช้ Incoterms จากสถานการณ์";
}

function summarizeTopics(post){
 const groups={};
 (post?.answers||[]).forEach(a=>{
   const category=getQuestionCategory(a);
   if(!groups[category]) groups[category]={correct:0,total:0};
   groups[category].total++;
   if(a.ok) groups[category].correct++;
 });
 return Object.entries(groups).map(([name,x])=>({
   name,
   pct:x.total?Math.round(x.correct/x.total*100):0,
   correct:x.correct,
   total:x.total
 })).sort((a,b)=>b.pct-a.pct);
}

function getRank(score){
 if(score>=80) return {
   name:"Incoterms Master", emoji:"🏆", range:"คะแนนหลังเรียน 80–100%",
   level:"เชี่ยวชาญ", colorClass:"master",
   title:"ยอดเยี่ยม! คุณพร้อมนำ Incoterms ไปใช้กับสถานการณ์จริง",
   message:"รักษาระดับความเข้าใจด้วยการฝึก Case Study และทบทวนจุดโอนความเสี่ยงของแต่ละ Term"
 };
 if(score>=60) return {
   name:"Incoterms Explorer", emoji:"🚢", range:"คะแนนหลังเรียน 60–79%",
   level:"กำลังพัฒนา", colorClass:"explorer",
   title:"คุณกำลังพัฒนาได้ดี และเข้าใจพื้นฐานมากขึ้นแล้ว",
   message:"อีกนิดเดียวจะถึงระดับ Master ลองทบทวนหัวข้อที่คะแนนต่ำและทำแบบทดสอบซ้ำอีกครั้ง"
 };
 return {
   name:"Incoterms Beginner", emoji:"🌱", range:"คะแนนหลังเรียนต่ำกว่า 60%",
   level:"เริ่มต้น", colorClass:"beginner",
   title:"จุดเริ่มต้นที่ดี ทุกคำตอบช่วยให้คุณเข้าใจมากขึ้น",
   message:"เริ่มทบทวนจากภาพรวม Origin–Freight–Destination แล้วเรียนทีละ Term ก่อนลองทำใหม่"
 };
}

function buildAiFeedback(pre,post,topics){
 if(!pre || !post) return "ทำ Pre-test และ Post-test ให้ครบ เพื่อให้ระบบเปรียบเทียบพัฒนาการและแนะนำบทเรียนที่เหมาะกับคุณ";
 const diff=post.pct-pre.pct;
 const strongest=topics[0];
 const weakest=[...topics].sort((a,b)=>a.pct-b.pct)[0];
 let intro=diff>20
   ? `คะแนนของคุณเพิ่มขึ้น ${diff}% แสดงว่าการเรียนผ่านภาพและสถานการณ์ช่วยให้เข้าใจได้ดีขึ้น`
   : diff>0
   ? `คะแนนของคุณเพิ่มขึ้น ${diff}% และกำลังพัฒนาไปในทิศทางที่ดี`
   : diff===0
   ? "คะแนนก่อนและหลังเรียนยังเท่าเดิม ควรลองเปลี่ยนวิธีทบทวนโดยใช้ Visual Flow และ Case Study"
   : `คะแนนหลังเรียนลดลง ${Math.abs(diff)}% อาจเกิดจากชุดคำถามที่ยากขึ้นหรือยังสับสนบางหัวข้อ`;
 const strongText=strongest?` คุณทำได้ดีในเรื่อง “${strongest.name}” (${strongest.pct}%)`:"";
 const weakText=weakest?` แต่ควรทบทวน “${weakest.name}” เพิ่มเติม โดยเฉพาะเหตุผลที่ Cost และ Risk อาจโอนคนละจุด`:"";
 return intro+strongText+weakText;
}

function renderProgress(){
 if(!user){
   document.getElementById('emailReport').innerText='กรุณาเข้าสู่ระบบก่อน';
   return;
 }
 const hist=JSON.parse(localStorage.getItem('zupHist_'+user.email)||'[]');
 const pre=[...hist].reverse().find(x=>x.type==='pre');
 const post=[...hist].reverse().find(x=>x.type==='post');

 const prePct=pre?.pct ?? null;
 const postPct=post?.pct ?? null;
 const diff=(prePct!==null && postPct!==null)?postPct-prePct:null;
 const rank=getRank(postPct??0);
 const topics=summarizeTopics(post);

 document.getElementById('preScore').innerText=pre?pre.pct+'%':'-';
 document.getElementById('postScore').innerText=post?post.pct+'%':'-';
 document.getElementById('improve').innerText=diff===null?'-':`${diff>=0?'+':''}${diff}%`;

 const evolution=Math.max(0,Math.min(100,diff===null?0:50+diff));
 document.getElementById('evolutionFill').style.width=evolution+'%';
 document.getElementById('levelMeterFill').style.width=(postPct??0)+'%';

 document.getElementById('rankHero').className='rank-hero '+rank.colorClass;
 document.getElementById('rankEmoji').innerText=rank.emoji;
 document.getElementById('rankName').innerText=rank.name;
 document.getElementById('rankRange').innerText=rank.range;
 document.getElementById('understandingLevel').innerText=post?`${rank.level} — ${post.pct}%`:'ยังไม่มีผลการทดสอบหลังเรียน';

 ['rankBeginner','rankExplorer','rankMaster'].forEach(id=>document.getElementById(id).classList.remove('active','completed'));
 if(postPct!==null){
   document.getElementById('rankBeginner').classList.add(postPct<60?'active':'completed');
   if(postPct>=60) document.getElementById('rankExplorer').classList.add(postPct<80?'active':'completed');
   if(postPct>=80) document.getElementById('rankMaster').classList.add('active');
 }

 const strong=topics.filter(x=>x.pct>=70);
 const review=topics.filter(x=>x.pct<70).sort((a,b)=>a.pct-b.pct);
 document.getElementById('strongTopics').innerHTML=strong.length
   ? strong.map(x=>`<span><b>${x.name}</b><i>${x.pct}% (${x.correct}/${x.total})</i></span>`).join('')
   : '<span>ยังไม่มีหัวข้อที่ได้เกิน 70% ลองทบทวนแล้วทำใหม่อีกครั้ง</span>';
 document.getElementById('reviewTopics').innerHTML=review.length
   ? review.map(x=>`<span><b>${x.name}</b><i>${x.pct}% (${x.correct}/${x.total})</i></span>`).join('')
   : '<span>ยอดเยี่ยม! ไม่มีหัวข้อที่ต่ำกว่า 70%</span>';

 document.getElementById('aiFeedback').innerText=buildAiFeedback(pre,post,topics);
 document.getElementById('encourageIcon').innerText=rank.emoji;
 document.getElementById('encourageTitle').innerText=rank.title;
 document.getElementById('encourageText').innerText=rank.message;

 document.getElementById('emailReport').innerHTML=(pre&&post)
   ? `ถึง: <b>${user.email}</b><br>Pre-test: ${pre.pct}%<br>Post-test: ${post.pct}%<br>พัฒนาการ: ${diff>=0?'+':''}${diff}%<br>Rank: ${rank.emoji} ${rank.name}<br>ควรทบทวน: ${review.slice(0,2).map(x=>x.name).join(', ')||'ไม่มีหัวข้อเร่งด่วน'}`
   : 'ทำ Pre-test และ Post-test ให้ครบก่อน';

 document.getElementById('history').innerHTML=hist.length
   ? `<h3>ประวัติการทำแบบทดสอบ</h3>`+hist.slice().reverse().map(h=>`<div class="history-item"><b>${h.type.toUpperCase()}</b> ${h.pct}% (${h.score}/${h.total})<br>${h.date}</div>`).join('')
   : '<p>ยังไม่มีประวัติ</p>';
}
function mockSendEmail(){
 document.getElementById('sendStatus').innerText=user?`จำลองส่งรายงานไปที่ ${user.email} แล้ว`:'กรุณาเข้าสู่ระบบก่อน';
}
function updateSteps(){
 if(!user)return;
 const hist=JSON.parse(localStorage.getItem('zupHist_'+user.email)||'[]');
 const pre=hist.some(x=>x.type==='pre'),post=hist.some(x=>x.type==='post');
 document.getElementById('step2').classList.toggle('active',pre);
 document.getElementById('step3').classList.toggle('active',pre);
 document.getElementById('step4').classList.toggle('active',post);
 document.getElementById('step5').classList.toggle('active',post);
}


const legacyTerms={
 DDU:{
  full:"Delivered Duty Unpaid",
  status:"ไม่มีอยู่ใน Incoterms® 2020",
  replacement:"แนวคิดใกล้เคียงถูกแทนด้วย DAP ตั้งแต่ Incoterms® 2010",
  why:"ICC ลดจำนวนกฎจาก 13 เหลือ 11 และรวมกฎปลายทางเดิมหลายตัว เช่น DAF, DES, DEQ และ DDU เข้าสู่ DAT และ DAP เพื่อให้ใช้ง่ายและรองรับหลายรูปแบบการขนส่ง"
 },
 DAT:{
  full:"Delivered at Terminal",
  status:"เปลี่ยนชื่อใน Incoterms® 2020",
  replacement:"DPU — Delivered at Place Unloaded",
  why:"คำว่า Terminal จำกัดสถานที่ส่งมอบมากเกินไป จึงเปลี่ยนเป็น Place เพื่อให้ใช้กับสถานที่ใดก็ได้ โดยหลักการสำคัญเรื่องผู้ขายต้องขนลงสินค้ายังคงเดิม"
 },
 DEQ:{
  full:"Delivered Ex Quay",
  status:"ไม่มีอยู่ตั้งแต่ Incoterms® 2010",
  replacement:"แนวคิดถูกรวมเข้าสู่ DAT/DAP และปัจจุบัน DAT เปลี่ยนเป็น DPU",
  why:"ปรับโครงสร้างกฎปลายทางให้สั้นลง ใช้ได้กว้างขึ้น และลดความซ้ำซ้อนระหว่างกฎเดิม"
 }
};

const detailedTermNotes={
 EXW:"EXW มีภาระของผู้ขายต่ำที่สุด ผู้ขายเพียงวางสินค้าให้พร้อม ณ สถานที่ของตน โดยทั่วไปผู้ซื้อเป็นผู้จัดรถรับสินค้า ทำพิธีการส่งออก จัดขนส่งหลัก ประกันภัย และการนำเข้า จึงเหมาะกับผู้ซื้อที่มีความสามารถจัดการ Logistics ในประเทศผู้ขาย",
 FCA:"FCA ใช้ได้กับทุกโหมด ผู้ขายทำพิธีการส่งออกและส่งมอบสินค้าให้ Carrier ณ จุดที่ตกลง ความเสี่ยงโอน ณ จุดส่งมอบนั้น เหมาะกับสินค้าตู้คอนเทนเนอร์หรือการขนส่งทางอากาศมากกว่า FOB",
 FAS:"FAS ใช้เฉพาะทางทะเล ผู้ขายส่งมอบเมื่อวางสินค้าไว้ข้างเรือ ณ ท่าเรือต้นทาง ผู้ซื้อรับผิดชอบการยกขึ้นเรือ ค่าระวาง ประกันภัย และขั้นตอนหลังจากนั้น",
 FOB:"FOB ใช้เฉพาะทางทะเล ผู้ขายรับผิดชอบจนสินค้าถูกวางบนเรือ ณ ท่าเรือต้นทาง ความเสี่ยงโอนเมื่อสินค้าอยู่บนเรือ ส่วนผู้ซื้อจัดและจ่าย Main Carriage",
 CFR:"CFR ใช้เฉพาะทางทะเล ผู้ขายจ่ายค่าระวางถึงท่าเรือปลายทาง แต่ความเสี่ยงโอนตั้งแต่สินค้าขึ้นเรือที่ต้นทาง ดังนั้นจุดที่ผู้ขายจ่ายค่าใช้จ่ายกับจุดโอนความเสี่ยงไม่ใช่จุดเดียวกัน",
 CIF:"CIF มีหลักเหมือน CFR แต่ผู้ขายต้องจัดทำประกันภัยให้ผู้ซื้อด้วย ใช้เฉพาะทางทะเล และความเสี่ยงยังโอนเมื่อสินค้าขึ้นเรือ ไม่ใช่เมื่อสินค้าถึงปลายทาง",
 CPT:"CPT ใช้ได้ทุกโหมด ผู้ขายจ่ายค่าขนส่งถึงสถานที่ปลายทางที่ตกลง แต่ความเสี่ยงโอนเมื่อส่งมอบสินค้าให้ Carrier คนแรก จึงต้องแยกให้ชัดระหว่างจุดโอน Risk กับจุดที่ผู้ขายจ่าย Cost",
 CIP:"CIP เหมือน CPT แต่ผู้ขายต้องจัดทำประกันภัยให้ผู้ซื้อ ใช้ได้ทุกโหมด เหมาะกับการขนส่งหลายรูปแบบ เช่น รถต่อเครื่องบิน",
 DAP:"DAP ใช้ได้ทุกโหมด ผู้ขายรับผิดชอบนำสินค้าไปถึงสถานที่ปลายทางโดยสินค้ายังอยู่บนยานพาหนะและพร้อมให้ผู้ซื้อขนลง ผู้ซื้อทำพิธีการนำเข้าและจ่ายภาษีนำเข้า",
 DPU:"DPU ใช้ได้ทุกโหมดและเป็นกฎเดียวใน Incoterms 2020 ที่ผู้ขายต้องขนลงสินค้า ณ ปลายทางก่อนส่งมอบ ผู้ซื้อยังรับผิดชอบพิธีการและภาษีนำเข้า",
 DDP:"DDP มีภาระของผู้ขายสูงที่สุด ผู้ขายรับผิดชอบทั้งส่งออก ขนส่ง นำเข้า และภาษีนำเข้า จึงต้องตรวจสอบว่ากฎหมายประเทศปลายทางอนุญาตให้ผู้ขายต่างชาติทำ Import Clearance ได้หรือไม่"
};

function findLegacyNotes(q){
 const text=[q.q,...q.ops,q.term].join(" ");
 const found=Object.keys(legacyTerms).filter(code=>text.includes(code));
 if(!found.length) return "";
 return `<div class="legacy-explain"><b>คำศัพท์จากฉบับเก่า:</b>${found.map(code=>{
   const x=legacyTerms[code];
   return `<div><strong>${code} — ${x.full}</strong><br>${x.status}<br><b>สิ่งที่ใช้แทน:</b> ${x.replacement}<br><b>เหตุผล:</b> ${x.why}</div>`;
 }).join("")}</div>`;
}

function findTermNote(q){
 const possible=[q.term,...q.ops].filter(x=>detailedTermNotes[x]);
 const key=possible.find(x=>x===q.term) || possible[0];
 return key?`<div class="term-extra"><b>อธิบายเพิ่มเติมเกี่ยวกับ ${key}:</b> ${detailedTermNotes[key]}</div>`:"";
}


document.addEventListener('DOMContentLoaded',()=>{
 document.body.classList.add('landing-mode');applyPreferences();applyPremiumAppearance();renderTopUserAvatar(getSavedProfileImage());updateLandingUser();initNav();buildCards();renderDetail();renderGlossary();updateUser();updateSteps();
 if(user){document.getElementById('loginEmail').value=user.email;document.getElementById('loginName').value=user.name}
});