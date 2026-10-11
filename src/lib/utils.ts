export function toBengaliNumber(val: number | string): string {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  const str = typeof val === 'number' ? val.toLocaleString('en-US') : String(val);
  return str.replace(/[0-9]/g, (digit) => bengaliDigits[parseInt(digit, 10)]);
}

export function formatPrice(price: number): string {
  return `${toBengaliNumber(price.toLocaleString('en-US'))} টাকা`;
}

export function formatUnit(unit: string): string {
  switch (unit?.toLowerCase()) {
    case 'kg':
      return 'প্রতি কেজি';
    case 'litre':
      return 'প্রতি লিটার';
    case 'dozen':
      return 'প্রতি ডজন';
    case 'piece':
      return 'প্রতি পিস';
    default:
      return `প্রতি ${unit || 'একক'}`;
  }
}

export function getBengaliDate(): string {
  const now = new Date();
  const monthsBn = [
    'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
    'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
  ];
  const daysBn = [
    'রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'
  ];

  const dayName = daysBn[now.getDay()];
  const day = toBengaliNumber(now.getDate());
  const monthName = monthsBn[now.getMonth()];
  const year = toBengaliNumber(now.getFullYear());

  return `${dayName}, ${day} ${monthName} ${year}`;
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
