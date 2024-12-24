// ฟังก์ชันแสดงข้อความเมื่อคัดลอกสำเร็จ
function showAlert() {
 const alert = document.createElement('div');
 alert.classList.add('custom-alert');
 alert.textContent = 'คัดลอกสำเร็จ!';

 // เพิ่มข้อความแจ้งเตือนเข้าไปใน body
 document.body.appendChild(alert);

 // ใช้ requestAnimationFrame เพื่อแสดงข้อความแจ้งเตือนให้ราบรื่น
 requestAnimationFrame(() => {
  alert.classList.add('show');
 });

 // ลบข้อความแจ้งเตือนหลังจาก 2 วินาที
 setTimeout(() => {
  alert.classList.remove('show');
  // ใช้ setTimeout หลังจากการแสดงผลเพื่อไม่ให้ค้างใน DOM นาน
  setTimeout(() => alert.remove(), 300);
 }, 2000);
}

// ฟังก์ชันสร้างปุ่มจากรายการใน list
function createButtons(list, containerId) {
 const container = document.getElementById(containerId);

 // ตรวจสอบว่าคอนเทนเนอร์มีอยู่หรือไม่
 if (!container) {
  console.error(`ไม่พบคอนเทนเนอร์ ID: ${containerId}`);
  return;
 }

 // ตรวจสอบว่ามีปุ่มที่ถูกสร้างไว้แล้วหรือไม่
 const existingButtons = container.querySelectorAll('.content-button');
 if (existingButtons.length > 0) return; // ถ้ามีปุ่มแล้วไม่ต้องสร้างใหม่

 // ใช้ DocumentFragment เพื่อเพิ่มปุ่มหลายๆ ปุ่มในครั้งเดียว
 const fragment = document.createDocumentFragment();

 // เพิ่มปุ่มสำหรับแต่ละรายการใน list
 list.forEach(item => {
  const button = document.createElement('button');
  button.classList.add('content-button');
  button.textContent = item;

  button.addEventListener('click', () => {
   try {
    navigator.clipboard.writeText(item).then(() => {
     showAlert(); // เรียกใช้ฟังก์ชันแสดงข้อความ
    }).catch(error => {
     console.error('เกิดข้อผิดพลาดในการคัดลอก:', error);
     alert('ไม่สามารถคัดลอกได้');
    });
   } catch (error) {
    console.error('เกิดข้อผิดพลาด:', error);
    alert('ไม่สามารถคัดลอกได้');
   }
  });

  fragment.appendChild(button); // เพิ่มปุ่มไปยัง fragment
 });

 // เพิ่มทั้งหมดลงในคอนเทนเนอร์
 container.appendChild(fragment);
}

// ฟังก์ชันสร้างปุ่มทั้งหมดจากรายการ
function initializeCustomButtons(list, containerId) {
 // ตรวจสอบว่า list และ containerId มีข้อมูลหรือไม่
 if (!list || !Array.isArray(list) || list.length === 0) {
  console.error('รายการปุ่มไม่ถูกต้อง!');
  return;
 }

 const container = document.getElementById(containerId);

 // ตรวจสอบว่า container มีอยู่จริงใน DOM
 if (!container) {
  console.error(`ไม่พบคอนเทนเนอร์ ID: ${containerId}`);
  return;
 }

 // เริ่มสร้างปุ่ม
 createButtons(list, containerId);
 createReportButton(containerId, list);
}

// รายการต่าง ๆ ที่สามารถเพิ่มได้
const lists = {
    // หมวดหมู่อีโมจิ (Emojis)
    emojis: [
        '😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😇', '😈', '👿', '😉', '😊', '😋', '😌', 
        '😍', '🥰', '😘', '😗', '😙', '😚', '😜', '😝', '😛', '🤑', '🤗', '🤩', '😎', '🤓', '🤔', '🤭', 
        '🤫', '😶', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '😣', '😖', '😫', '😩', '🥺', '😤', '😡', 
        '😠', '🤬', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '🥶', '🥵', '🥴', '😵', '😵‍💫', '🤯', '🤠', '🥳',
        '😎', '🧐', '🤓', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾'
    ],

    // หมวดหมู่สัญลักษณ์ (Special Characters)
    specialCharacters: [
        '©', '®', '™', '☀', '☂', '★', '✈', '☃', '☄', '⚡', '❄', '♻', '☘', '♠', '♣', '♥', '♦', 
        '♤', '♡', '♢', '♧', '✿', '✰', '✪', '✩', '✺', '✽', '❀', '✦', '⛔', '⛓', '⚖', '⚔', '⚙', '⚖',
        '⚜', '⚙', '✧', '✓', '✔', '✗', '✘', '✚', '➕', '➖', '➗', '➘', '➡', '⬅', '⬆', '⬇', '↗', '↖',
        '↘', '↙', '↩', '↪', '↻', '↺', '♨', '☍', '☎', '☏', '⚙', '⚙', '🎶', '🎧', '🎷', '🎸', '🎹', '🎺'
    ],

    // หมวดหมู่อารมณ์ (Mood Symbols)
    moodSymbols: [
        '🖤', '💜', '💙', '💚', '💛', '❤️', '🤍', '🤎', '💔', '💗', '💓', '💖', '💘', '💝', '💞', '💌',
        '💋', '💍', '💎', '💡', '🔦', '🕯', '📣', '📢', '📯', '📜', '📜', '📖', '📘', '📙', '📚', '📑'
    ],

    // หมวดหมู่อาวุธและเครื่องมือ (Weapons and Tools)
    weaponsAndTools: [
        '⚔', '🔫', '🪓', '🧶', '🔪', '🛠', '⚒', '🔨', '⛏', '🪛', '🔧', '🔩', '⚙', '🔗', '🧰', '🛠'
    ],

    // หมวดหมู่การเดินทาง (Transport)
    transport: [
        '🚗', '🚕', '🚙', '🚌', '🚎', '🏎', '🚓', '🚑', '🚒', '🚐', '🚚', '🚛', '🚜', '🚲', '🛵', '🛺',
        '🚠', '🚡', '🚟', '🚃', '🚋', '🚞', '🚝', '🚄', '🚅', '🚈', '🚂', '🚆', '🚇', '🚈', '🚉', '🚏'
    ],

    // หมวดหมู่อาหาร (Food)
    food: [
        '🍎', '🍏', '🍒', '🍓', '🍊', '🍋', '🍌', '🍉', '🍇', '🍍', '🍎', '🍪', '🍩', '🍫', '🍬', '🍭',
        '🍯', '🍞', '🥖', '🥨', '🍗', '🍖', '🍤', '🍳', '🍲', '🍜', '🍚', '🍕', '🍔', '🍟', '🍠', '🍡',
        '🍣', '🍤', '🍜', '🍧', '🍦', '🍨', '🍪', '🥧'
    ],

    // หมวดหมู่อุปกรณ์ไอที (IT Devices)
    itDevices: [
        '💻', '🖥', '🖨', '⌨', '🖱', '🖲', '💡', '🔋', '🔌', '⚡', '📱', '📲', '📞', '📟', '💾', '💽'
    ],

    // หมวดหมู่ท่องเที่ยว (Nature)
    nature: [
        '🌳', '🌲', '🌵', '🌴', '🌱', '🌾', '🌿', '🍃', '🍂', '🍁', '🌻', '🌼', '🌷', '🌹', '🌺', '🌸',
        '🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘', '🌙', '🌚', '🌝', '🌞', '⭐', '🌟', '✨', '💫'
    ],

    // หมวดหมู่กีฬา (Sports)
    sports: [
        '⚽', '🏀', '🏈', '⚾', '🎾', '🏐', '🏉', '🥏', '🏸', '🥅', '⛸', '⛷', '🏂', '🏌', '⛹', '🏋',
        '🤺', '🤼', '🤸', '🏆', '🎯', '🎳', '🎮', '🕹', '🏓', '🏸', '🥋', '🎿', '🛷'
    ],

    // หมวดหมู่อารมณ์สัตว์ (Animal Faces)
    animalFaces: [
        '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🦝', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵',
        '🙊', '🙉', '🙈', '🐔', '🐧', '🐦', '🦄', '🦓', '🦒', '🦌', '🐘', '🦏', '🦥', '🦦', '🦣'
    ],

    // หมวดหมู่กิจกรรม (Activities)
    activities: [
        '🏄‍♂️', '🏄‍♀️', '🚣‍♂️', '🚣‍♀️', '🏊‍♂️', '🏊‍♀️', '⛷', '🏂', '🧗‍♂️', '🧗‍♀️', '🏇', '🚴‍♂️',
        '🚴‍♀️', '🏌️‍♂️', '🏌️‍♀️', '🏋️‍♂️', '🏋️‍♀️', '⛹️‍♂️', '⛹️‍♀️', '🤾‍♂️', '🤾‍♀️', '🤺'
    ],

    // หมวดหมู่ดาว (Stars and Celestial)
    starsAndCelestial: [
        '🌟', '✨', '🌠', '🌌', '🌞', '🌝', '🌙', '🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘', '🌟'
    ]
};

// ฟังก์ชันนี้จะถูกเรียกเมื่อ DOM โหลดเสร็จ
document.addEventListener('DOMContentLoaded', () => {
 // ตรวจสอบว่า container ที่ใช้มีอยู่ใน HTML หรือไม่
 const containerIds = Object.keys(lists).map(listName => `${listName}`);

 // วนลูปเพื่อสร้างปุ่มในแต่ละ container ที่มีอยู่
 containerIds.forEach(containerId => {
  const listName = containerId.split('-')[0]; // ใช้ชื่อ container ในการดึงข้อมูลจาก lists
  if (lists[listName]) {
   initializeCustomButtons(lists[listName], containerId); // เรียกใช้เพื่อสร้างปุ่ม
  }
 });
});