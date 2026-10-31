import { useState } from 'react'

type GroupId = 'veg' | 'fruit' | 'grain' | 'nuts'
type ProductId = 'apple' | 'pear' | 'broccoli'

type Item = {
  id: string
  name: string
  fiber: string
  span: 2 | 3
  tint: string
  badge: string
  place?: 'tr' | 'tl' | 'br'
  openId?: ProductId
}

const groups: { id: GroupId; label: string; lines?: boolean }[] = [
  { id: 'veg', label: 'Овощи' },
  { id: 'fruit', label: 'Фрукты' },
  { id: 'grain', label: 'Крупы' },
  { id: 'nuts', label: 'Орехи и семена', lines: true },
]

const catalog: Record<GroupId, Item[]> = {
  veg: [
    { id: 'artichoke', name: 'Артишок', fiber: '5,4 г', span: 3, tint: '#e5f6dc', badge: '#6aaa45', place: 'tr' },
    { id: 'peas', name: 'Зелёный горошек', fiber: '5,5 г', span: 3, tint: '#e3f6e4', badge: '#5fae46', place: 'tl' },
    { id: 'broccoli', name: 'Брокколи', fiber: '3,8 г', span: 2, tint: '#e7f7df', badge: '#7dba55', place: 'tr', openId: 'broccoli' },
    { id: 'brussels', name: 'Брюссельская капуста', fiber: '3,4 г', span: 2, tint: '#e5f6df', badge: '#8bc34a', place: 'tl' },
    { id: 'carrot', name: 'Морковь', fiber: '3,0 г', span: 2, tint: '#fdeede', badge: '#ef8a3a', place: 'br' },
    { id: 'beet', name: 'Свёкла', fiber: '2,5 г', span: 2, tint: '#f8e4ea', badge: '#d46b86', place: 'tr' },
    { id: 'spinach', name: 'Шпинат', fiber: '2,4 г', span: 2, tint: '#e7f6e2', badge: '#8bc36a', place: 'tl' },
    { id: 'pepper', name: 'Болгарский перец', fiber: '1,9 г', span: 2, tint: '#fde8ea', badge: '#ef5d4e', place: 'tr' },
    { id: 'pumpkin', name: 'Тыква', fiber: '1,5 г', span: 3, tint: '#fff1dc', badge: '#f09a3a', place: 'tr' },
    { id: 'cucumber', name: 'Огурец', fiber: '0,5 г', span: 3, tint: '#e7f6e4', badge: '#8bc36a', place: 'tl' },
  ],
  fruit: [
    { id: 'pear', name: 'Груша', fiber: '3,1 г', span: 3, tint: '#fff6d8', badge: '#e2b84a', place: 'tr', openId: 'pear' },
    { id: 'apple', name: 'Яблоко', fiber: '2,4 г', span: 3, tint: '#fde8ea', badge: '#e15b4c', place: 'tl', openId: 'apple' },
    { id: 'avocado', name: 'Авокадо', fiber: '6,7 г', span: 2, tint: '#e7f6df', badge: '#6aaa45', place: 'tr' },
    { id: 'raspberry', name: 'Малина', fiber: '6,5 г', span: 2, tint: '#fde8ee', badge: '#e15b6c', place: 'tl' },
    { id: 'kiwi', name: 'Киви', fiber: '3,0 г', span: 2, tint: '#e8f7df', badge: '#7dba55', place: 'br' },
    { id: 'banana', name: 'Банан', fiber: '2,6 г', span: 3, tint: '#fff6d4', badge: '#efb23a', place: 'tr' },
    { id: 'orange', name: 'Апельсин', fiber: '2,4 г', span: 3, tint: '#fff0e0', badge: '#f08a32', place: 'tl' },
  ],
  grain: [
    { id: 'oats', name: 'Овсянка', fiber: '10,6 г', span: 3, tint: '#f8f0dc', badge: '#c4a15a', place: 'tr' },
    { id: 'buckwheat', name: 'Гречка', fiber: '10,0 г', span: 3, tint: '#f6eadc', badge: '#a67c52', place: 'tl' },
    { id: 'quinoa', name: 'Киноа', fiber: '7,0 г', span: 2, tint: '#f7f3e4', badge: '#c4a86a', place: 'tr' },
    { id: 'rice', name: 'Бурый рис', fiber: '3,5 г', span: 2, tint: '#f6efe4', badge: '#b08968', place: 'tl' },
    { id: 'barley', name: 'Перловка', fiber: '15,6 г', span: 2, tint: '#f8f4e6', badge: '#c9b27a', place: 'br' },
  ],
  nuts: [
    { id: 'chia', name: 'Семена чиа', fiber: '34,4 г', span: 3, tint: '#eef2e4', badge: '#6a7a4a', place: 'tr' },
    { id: 'flax', name: 'Семена льна', fiber: '27,3 г', span: 3, tint: '#f6efe2', badge: '#b08958', place: 'tl' },
    { id: 'almond', name: 'Миндаль', fiber: '12,5 г', span: 2, tint: '#f8efe4', badge: '#c4926a', place: 'tr' },
    { id: 'pistachio', name: 'Фисташки', fiber: '10,6 г', span: 2, tint: '#e8f6df', badge: '#7dba55', place: 'tl' },
    { id: 'walnut', name: 'Грецкий орех', fiber: '6,7 г', span: 2, tint: '#f6ecdf', badge: '#a67c52', place: 'br' },
  ],
}

function Art({ id }: { id: string }) {
  switch (id) {
    case 'artichoke':
      return (
        <svg viewBox="0 0 120 130" aria-hidden="true">
          <path d="M54 118c0-14 6-22 6-22s6 8 6 22" fill="#5f8f34" />
          <ellipse cx="60" cy="108" rx="7" ry="14" fill="#6d9a3c" />
          <path d="M28 78c-10-22 8-42 28-46 6 16 4 32-6 44-8 4-16 4-22 2z" fill="#7cb342" />
          <path d="M92 78c10-22-8-42-28-46-6 16-4 32 6 44 8 4 16 4 22 2z" fill="#7cb342" />
          <path d="M36 64c-6-20 10-36 24-38 4 14 2 28-4 38-8 4-14 3-20 0z" fill="#8bc34a" />
          <path d="M84 64c6-20-10-36-24-38-4 14-2 28 4 38 8 4 14 3 20 0z" fill="#8bc34a" />
          <ellipse cx="60" cy="62" rx="28" ry="34" fill="#9ccc65" />
          <ellipse cx="60" cy="58" rx="16" ry="22" fill="#c5e1a5" />
          <path d="M60 40c2 10 2 18 0 26-2-8-2-16 0-26z" fill="#7cb342" />
        </svg>
      )
    case 'peas':
      return (
        <svg viewBox="0 0 140 110" aria-hidden="true">
          <path d="M18 70c10-36 96-48 112-8-18 28-86 36-112 8z" fill="#7cb342" />
          <path d="M28 66c12-24 78-30 96-4-16 16-74 22-96 4z" fill="#c5e1a5" />
          <circle cx="48" cy="62" r="10" fill="#8bc34a" />
          <circle cx="70" cy="58" r="11" fill="#9ccc65" />
          <circle cx="92" cy="60" r="10" fill="#8bc34a" />
          <circle cx="112" cy="78" r="7" fill="#8bc34a" />
          <circle cx="124" cy="66" r="6" fill="#9ccc65" />
          <circle cx="118" cy="52" r="5" fill="#aed581" />
        </svg>
      )
    case 'broccoli':
      return (
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <path d="M46 92c0-16 4-28 4-28s4 12 4 28" fill="#7cb342" />
          <circle cx="34" cy="48" r="16" fill="#66bb6a" />
          <circle cx="62" cy="42" r="18" fill="#43a047" />
          <circle cx="50" cy="58" r="16" fill="#81c784" />
          <circle cx="70" cy="60" r="12" fill="#66bb6a" />
          <circle cx="40" cy="34" r="10" fill="#a5d6a7" />
        </svg>
      )
    case 'brussels':
      return (
        <svg viewBox="0 0 100 90" aria-hidden="true">
          <circle cx="32" cy="40" r="18" fill="#8bc34a" />
          <circle cx="58" cy="32" r="16" fill="#9ccc65" />
          <circle cx="68" cy="54" r="17" fill="#7cb342" />
          <circle cx="42" cy="58" r="15" fill="#aed581" />
          <path d="M32 28c2 6 2 10 0 16" stroke="#689f38" strokeWidth="2" fill="none" />
          <path d="M58 22c2 5 2 9 0 14" stroke="#689f38" strokeWidth="2" fill="none" />
        </svg>
      )
    case 'carrot':
      return (
        <svg viewBox="0 0 90 120" aria-hidden="true">
          <path d="M40 28c-8-16 6-26 14-18 6-10 18-8 16 4 10-2 16 10 8 16-2 4-8 6-18 4-6 4-16 2-20-6z" fill="#7cb342" />
          <path d="M46 40c8 20 14 46 8 70-10-8-22-36-22-58 0-8 6-14 14-12z" fill="#ff8a3d" />
          <path d="M50 48c4 16 6 34 2 52" stroke="#f57c2a" strokeWidth="3" fill="none" strokeLinecap="round" />
        </svg>
      )
    case 'beet':
      return (
        <svg viewBox="0 0 90 110" aria-hidden="true">
          <path d="M44 34c-2-16 8-24 10-26 2 10 8 14 14 12-8 4-10 12-8 18" fill="#7cb342" />
          <path d="M40 36c-10-8-8-20 2-22 2 8 6 12 4 18" fill="#8bc34a" />
          <ellipse cx="46" cy="70" rx="26" ry="28" fill="#9b3054" />
          <ellipse cx="38" cy="62" rx="8" ry="12" fill="#c45b78" opacity="0.55" />
          <path d="M34 58c6 4 16 6 24 2" stroke="#7a2440" strokeWidth="2" fill="none" />
          <path d="M32 74c8 6 20 6 28 0" stroke="#7a2440" strokeWidth="2" fill="none" />
        </svg>
      )
    case 'spinach':
      return (
        <svg viewBox="0 0 110 90" aria-hidden="true">
          <path d="M58 78c-2-24 8-42 28-52-22 6-36 26-34 52 2 2 4 2 6 0z" fill="#43a047" />
          <path d="M54 78c0-26-12-46-34-52 20 8 32 28 30 54 1-1 3-1 4-2z" fill="#66bb6a" />
          <path d="M56 78V34" stroke="#2e7d32" strokeWidth="2.2" />
          <path d="M56 48c8-6 16-8 24-8" stroke="#2e7d32" strokeWidth="1.4" fill="none" />
          <path d="M56 58c-8-4-16-4-24-2" stroke="#2e7d32" strokeWidth="1.4" fill="none" />
        </svg>
      )
    case 'pepper':
      return (
        <svg viewBox="0 0 90 110" aria-hidden="true">
          <path d="M44 22c2-10 10-12 12-4" stroke="#388e3c" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M28 48c0-16 12-26 22-26s22 12 20 30c-2 28-12 46-22 46S28 78 28 48z" fill="#ef5350" />
          <path d="M38 46c2 16 6 28 12 36" stroke="#e53935" strokeWidth="3" fill="none" />
          <ellipse cx="40" cy="42" rx="6" ry="10" fill="#ff8a80" opacity="0.7" />
        </svg>
      )
    case 'pumpkin':
      return (
        <svg viewBox="0 0 120 80" aria-hidden="true">
          <path d="M58 16c2-8 10-8 10 0" stroke="#689f38" strokeWidth="3" fill="none" />
          <ellipse cx="40" cy="48" rx="22" ry="26" fill="#ff9800" />
          <ellipse cx="60" cy="46" rx="24" ry="28" fill="#ffb74d" />
          <ellipse cx="80" cy="48" rx="22" ry="26" fill="#ff9800" />
          <path d="M60 22v48" stroke="#f57c00" strokeWidth="2" />
        </svg>
      )
    case 'cucumber':
      return (
        <svg viewBox="0 0 130 70" aria-hidden="true">
          <ellipse cx="48" cy="36" rx="36" ry="18" fill="#8bc34a" transform="rotate(-18 48 36)" />
          <ellipse cx="86" cy="40" rx="28" ry="16" fill="#aed581" transform="rotate(16 86 40)" />
          <circle cx="36" cy="32" r="1.5" fill="#689f38" />
          <circle cx="48" cy="28" r="1.5" fill="#689f38" />
          <circle cx="58" cy="34" r="1.5" fill="#689f38" />
          <circle cx="78" cy="36" r="1.4" fill="#7cb342" />
          <circle cx="92" cy="42" r="1.4" fill="#7cb342" />
        </svg>
      )
    case 'apple':
      return (
        <svg viewBox="0 0 100 110" aria-hidden="true">
          <path d="M52 28c6-12 16-10 14-2" stroke="#689f38" strokeWidth="3" fill="none" />
          <ellipse cx="58" cy="22" rx="8" ry="5" fill="#7cb342" transform="rotate(-30 58 22)" />
          <circle cx="50" cy="64" r="32" fill="#e53935" />
          <ellipse cx="38" cy="54" rx="8" ry="12" fill="#ef5350" opacity="0.7" />
        </svg>
      )
    case 'pear':
      return (
        <svg viewBox="0 0 90 120" aria-hidden="true">
          <path d="M48 24c4-12 14-10 12 0" stroke="#7cb342" strokeWidth="3" fill="none" />
          <ellipse cx="46" cy="40" rx="16" ry="18" fill="#f6d365" />
          <ellipse cx="46" cy="74" rx="26" ry="30" fill="#ffe082" />
        </svg>
      )
    case 'avocado':
      return (
        <svg viewBox="0 0 90 110" aria-hidden="true">
          <ellipse cx="46" cy="60" rx="28" ry="38" fill="#7cb342" />
          <ellipse cx="46" cy="64" rx="16" ry="22" fill="#f3e5ab" />
          <circle cx="46" cy="64" r="8" fill="#6d4c41" />
        </svg>
      )
    case 'raspberry':
      return (
        <svg viewBox="0 0 90 90" aria-hidden="true">
          <circle cx="34" cy="36" r="12" fill="#e53935" />
          <circle cx="54" cy="34" r="12" fill="#ef5350" />
          <circle cx="44" cy="50" r="13" fill="#c62828" />
          <circle cx="62" cy="50" r="11" fill="#e53935" />
          <path d="M44 62c4 10 8 14 8 14" stroke="#689f38" strokeWidth="3" fill="none" />
        </svg>
      )
    case 'kiwi':
      return (
        <svg viewBox="0 0 90 90" aria-hidden="true">
          <circle cx="46" cy="46" r="32" fill="#8d6e63" />
          <circle cx="46" cy="46" r="26" fill="#c5e1a5" />
          <circle cx="46" cy="46" r="8" fill="#f1f8e9" />
          <circle cx="46" cy="28" r="2" fill="#212121" />
          <circle cx="60" cy="36" r="2" fill="#212121" />
          <circle cx="62" cy="52" r="2" fill="#212121" />
          <circle cx="50" cy="62" r="2" fill="#212121" />
          <circle cx="34" cy="56" r="2" fill="#212121" />
          <circle cx="32" cy="40" r="2" fill="#212121" />
        </svg>
      )
    case 'banana':
      return (
        <svg viewBox="0 0 120 80" aria-hidden="true">
          <path d="M20 50c20-30 60-36 86-8-8 6-16 4-22-2-10 16-40 24-64 10z" fill="#ffe082" />
          <path d="M18 48c6 8 4 14-2 16 8-2 16-8 16-16" fill="#f9a825" />
        </svg>
      )
    case 'orange':
      return (
        <svg viewBox="0 0 90 100" aria-hidden="true">
          <ellipse cx="50" cy="18" rx="8" ry="5" fill="#7cb342" />
          <circle cx="46" cy="56" r="30" fill="#ff9800" />
          <path d="M46 30c4 12 4 28 0 48" stroke="#f57c00" strokeWidth="2" />
          <path d="M24 50c12 4 22 4 40 0" stroke="#f57c00" strokeWidth="2" />
        </svg>
      )
    case 'oats':
      return (
        <svg viewBox="0 0 120 80" aria-hidden="true">
          <ellipse cx="36" cy="48" rx="22" ry="14" fill="#e6d3a3" transform="rotate(-20 36 48)" />
          <ellipse cx="64" cy="40" rx="24" ry="14" fill="#f3e5c0" transform="rotate(12 64 40)" />
          <ellipse cx="86" cy="52" rx="20" ry="12" fill="#d7c091" transform="rotate(-8 86 52)" />
        </svg>
      )
    case 'buckwheat':
      return (
        <svg viewBox="0 0 100 80" aria-hidden="true">
          <path d="M30 50l10-18 10 18z" fill="#8d6e63" />
          <path d="M50 46l12-20 12 20z" fill="#a1887f" />
          <path d="M40 62l9-14 9 14z" fill="#6d4c41" />
        </svg>
      )
    case 'quinoa':
      return (
        <svg viewBox="0 0 100 80" aria-hidden="true">
          <circle cx="30" cy="40" r="8" fill="#d7c4a3" />
          <circle cx="50" cy="34" r="8" fill="#c4a882" />
          <circle cx="68" cy="46" r="8" fill="#e6d3b0" />
          <circle cx="46" cy="54" r="7" fill="#b08968" />
        </svg>
      )
    case 'rice':
      return (
        <svg viewBox="0 0 110 70" aria-hidden="true">
          <ellipse cx="34" cy="36" rx="16" ry="8" fill="#efe6d6" transform="rotate(-16 34 36)" />
          <ellipse cx="58" cy="32" rx="16" ry="8" fill="#f7f1e6" transform="rotate(10 58 32)" />
          <ellipse cx="78" cy="42" rx="14" ry="7" fill="#e7dcc8" transform="rotate(-8 78 42)" />
        </svg>
      )
    case 'barley':
      return (
        <svg viewBox="0 0 90 100" aria-hidden="true">
          <path d="M46 88V20" stroke="#c4a86a" strokeWidth="3" />
          <ellipse cx="36" cy="32" rx="10" ry="6" fill="#e6d3a3" />
          <ellipse cx="56" cy="42" rx="10" ry="6" fill="#f3e5c0" />
          <ellipse cx="36" cy="54" rx="10" ry="6" fill="#d7c4a3" />
          <ellipse cx="56" cy="64" rx="10" ry="6" fill="#e6d3a3" />
        </svg>
      )
    case 'chia':
      return (
        <svg viewBox="0 0 100 80" aria-hidden="true">
          <circle cx="28" cy="36" r="5" fill="#424242" />
          <circle cx="44" cy="28" r="5" fill="#616161" />
          <circle cx="60" cy="38" r="5" fill="#212121" />
          <circle cx="74" cy="30" r="4" fill="#424242" />
          <circle cx="38" cy="50" r="4" fill="#757575" />
          <circle cx="56" cy="54" r="5" fill="#424242" />
          <circle cx="72" cy="50" r="4" fill="#616161" />
        </svg>
      )
    case 'flax':
      return (
        <svg viewBox="0 0 110 70" aria-hidden="true">
          <ellipse cx="30" cy="36" rx="12" ry="6" fill="#c4a574" transform="rotate(-20 30 36)" />
          <ellipse cx="54" cy="30" rx="12" ry="6" fill="#d7b98a" transform="rotate(14 54 30)" />
          <ellipse cx="76" cy="40" rx="12" ry="6" fill="#b08958" transform="rotate(-10 76 40)" />
        </svg>
      )
    case 'almond':
      return (
        <svg viewBox="0 0 90 90" aria-hidden="true">
          <ellipse cx="46" cy="48" rx="18" ry="28" fill="#d7a87a" transform="rotate(-16 46 48)" />
          <path d="M40 30c6 10 8 22 4 36" stroke="#b08968" strokeWidth="2" fill="none" />
        </svg>
      )
    case 'pistachio':
      return (
        <svg viewBox="0 0 100 80" aria-hidden="true">
          <path d="M30 48c0-16 14-26 24-18 8-10 22-4 22 12 0 16-14 24-24 18-10 8-22 2-22-12z" fill="#c5e1a5" />
          <path d="M52 28c2 12 2 24 0 36" stroke="#8d6e63" strokeWidth="3" />
        </svg>
      )
    case 'walnut':
      return (
        <svg viewBox="0 0 100 80" aria-hidden="true">
          <ellipse cx="50" cy="42" rx="28" ry="22" fill="#a67c52" />
          <path d="M50 22c4 8 4 28 0 40-4-12-4-32 0-40z" fill="#6d4c41" />
          <path d="M30 42c8 4 16 4 40 0" stroke="#8d6e63" strokeWidth="2" fill="none" />
        </svg>
      )
    default:
      return null
  }
}

function GroupIcon({ id }: { id: GroupId }) {
  if (id === 'veg') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 21c-5-3.2-8-7.4-8-11.2C4 6 7.4 3.2 12 3.2S20 6 20 9.8C20 13.6 17 17.8 12 21z" fill="currentColor" />
        <path d="M12 19.2V6.2" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" opacity="0.9" />
      </svg>
    )
  }
  if (id === 'fruit') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12.2 7.2c1.4-2.4 3.6-2.2 3.6.2" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <path d="M15.2 6.6c1.2.2 1.8 1.2.8 2.2-1.2-.2-1.6-1.2-.8-2.2z" fill="currentColor" />
        <path d="M7.2 13.2c0-3.4 2.2-5.6 4.8-5.6s4.8 2.2 4.8 5.4c0 3.6-2 6.4-4.8 6.4s-4.8-2.6-4.8-6.2z" fill="currentColor" />
      </svg>
    )
  }
  if (id === 'grain') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 20.5V7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <ellipse cx="12" cy="5.6" rx="1.5" ry="2.2" fill="currentColor" />
        <ellipse cx="8.6" cy="9" rx="2.5" ry="1.35" transform="rotate(-28 8.6 9)" fill="currentColor" />
        <ellipse cx="15.4" cy="9" rx="2.5" ry="1.35" transform="rotate(28 15.4 9)" fill="currentColor" />
        <ellipse cx="8.6" cy="12.6" rx="2.5" ry="1.35" transform="rotate(-28 8.6 12.6)" fill="currentColor" />
        <ellipse cx="15.4" cy="12.6" rx="2.5" ry="1.35" transform="rotate(28 15.4 12.6)" fill="currentColor" />
        <ellipse cx="8.8" cy="16.1" rx="2.3" ry="1.25" transform="rotate(-24 8.8 16.1)" fill="currentColor" />
        <ellipse cx="15.2" cy="16.1" rx="2.3" ry="1.25" transform="rotate(24 15.2 16.1)" fill="currentColor" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 4.5c2.8 1.2 5.2 4.2 5.2 8.2 0 3.6-2.2 6.8-5.2 6.8s-5.2-3.2-5.2-6.8C6.8 8.7 9.2 5.7 12 4.5z" fill="currentColor" />
      <path d="M12 7.2c.3 2.6.3 6.2 0 9.6" stroke="#fff" strokeWidth="1.1" opacity="0.45" />
    </svg>
  )
}

export default function ProductsScreen({
  onOpen,
}: {
  onOpen: (id: ProductId) => void
}) {
  const [group, setGroup] = useState<GroupId>('veg')
  const items = catalog[group]

  function choose(next: GroupId) {
    setGroup(next)
    document.querySelector('.feed')?.scrollTo({ top: 0 })
  }

  return (
    <section className="products-screen">
      <div className="products-head">
        <div>
          <h1>
            Клетчатка
            <br />в продуктах
          </h1>
          <p className="products-pill">на 100 г продукта</p>
        </div>
        <aside className="products-tip">
          <span className="products-tip-icon" aria-hidden="true">
            <GroupIcon id="veg" />
          </span>
          <p>Чем больше размер продукта, тем больше в нём клетчатки</p>
        </aside>
      </div>

      <div className="products-filters" role="tablist" aria-label="Категории продуктов">
        {groups.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={group === item.id}
            className={group === item.id ? 'products-filter products-filter-on' : 'products-filter'}
            onClick={() => choose(item.id)}
          >
            <GroupIcon id={item.id} />
            {item.lines ? (
              <span className="products-filter-lines">
                Орехи
                <br />
                и семена
              </span>
            ) : (
              <span>{item.label}</span>
            )}
          </button>
        ))}
      </div>

      <div className="produce-grid">
        {items.map((item) => {
          const card = (
            <>
              <span className="produce-art" style={{ background: item.tint }}>
                <Art id={item.id} />
                <span className={`produce-badge produce-badge-${item.place ?? 'tr'}`} style={{ background: item.badge }}>
                  {item.fiber}
                </span>
              </span>
              <span className="produce-name">{item.name}</span>
            </>
          )
          if (item.openId) {
            return (
              <button
                key={item.id}
                type="button"
                className={`produce-card produce-span-${item.span}`}
                onClick={() => onOpen(item.openId!)}
              >
                {card}
              </button>
            )
          }
          return (
            <article key={item.id} className={`produce-card produce-span-${item.span}`}>
              {card}
            </article>
          )
        })}
      </div>

      <aside className="products-note">
        <span className="products-bulb" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path
              d="M12 3a6 6 0 0 0-3 11v2h6v-2a6 6 0 0 0-3-11zm-2 15h4v1.2a2 2 0 0 1-4 0V18z"
              fill="#3d9a4a"
            />
          </svg>
        </span>
        <div>
          <strong>Полезно знать</strong>
          <p>Клетчатка помогает пищеварению, даёт чувство сытости и поддерживает здоровье кишечника.</p>
        </div>
        <span className="products-chevron" aria-hidden="true">
          ›
        </span>
      </aside>
    </section>
  )
}
