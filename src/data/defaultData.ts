import { StoreProfile, PromotionProject, MenuItem, CategoryType } from '../types';

export const DEFAULT_STORES: StoreProfile[] = [
  {
    id: 'store_1',
    storeName: '원조 솥뚜껑 치킨',
    category: '치킨/호프',
    phone: '02-555-7890',
    address: '서울시 마포구 독막로 42 (상수역 1번출구 앞)',
    primaryColor: '#DC2626',
    accentColor: '#F59E0B',
    logoText: '솥뚜껑치킨',
    representativeMenu: '가마솥 바삭 옛날통닭',
    priceLevel: '9,900원~',
    tagline: '30년 전통 겉바속촉 수제 통닭'
  },
  {
    id: 'store_2',
    storeName: '카페 봄날',
    category: '카페',
    phone: '02-333-1234',
    address: '서울시 마포구 와우산로 18',
    primaryColor: '#854D0E',
    accentColor: '#FBBF24',
    logoText: '카페봄날',
    representativeMenu: '시그니처 밤크림 라떼',
    priceLevel: '4,500원~',
    tagline: '직접 로스팅한 스페셜티 커피와 수제 디저트'
  },
  {
    id: 'store_3',
    storeName: '헤어살롱 수(秀)',
    category: '미용실',
    phone: '02-888-9999',
    address: '서울시 영등포구 여의대방로 22',
    primaryColor: '#4F46E5',
    accentColor: '#EC4899',
    logoText: 'HAIR SU',
    representativeMenu: '퍼스널 헤어 디자인 펌',
    priceLevel: '35,000원~',
    tagline: '당신만을 위한 1:1 맞춤 퍼스널 뷰티'
  }
];

export const SAMPLE_IMAGES = [
  {
    id: 'img_chicken',
    title: '바삭 치킨 & 맥주',
    category: '치킨/호프',
    url: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'img_cafe',
    title: '스페셜티 커피 & 디저트',
    category: '카페',
    url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'img_korean',
    title: '푸짐한 한식 & 고기',
    category: '음식점',
    url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'img_bakery',
    title: '갓 구운 빵 & 베이커리',
    category: '베이커리',
    url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'img_salon',
    title: '헤어 스타일링 & 펌',
    category: '미용실',
    url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'img_gym',
    title: '피트니스 & PT 운동',
    category: '헬스/필라테스',
    url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80'
  }
];

export const INITIAL_PROJECTS: PromotionProject[] = [
  {
    id: 'proj_1',
    storeName: '원조 솥뚜껑 치킨',
    category: '치킨/호프',
    title: '오늘만 치킨 2마리 할인 이벤트',
    ratio: '1:1',
    photoUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=1000&q=80',
    headline: '오늘만 이 가격! 치킨 2마리 파격 할인',
    subheadline: '바삭한 가마솥 옛날통닭 2마리가 단돈 19,900원!',
    bodyCopy: '퇴근길 온 가족이 넉넉하게 즐기실 수 있도록 매일 아침 깨끗한 기름으로 정성껏 튀겨냅니다. 선착순 50마리 한정이니 서두르세요!',
    priceBadge: '2마리 19,900원 (포장특가)',
    cta: '지금 바로 전화 주문하기',
    phone: '02-555-7890',
    address: '상수역 1번 출구 50m 앞',
    primaryColor: '#DC2626',
    accentColor: '#FBBF24',
    bgTheme: 'red',
    fontSizeLevel: 'large',
    fontFamily: 'display',
    createdAt: '2026-09-16 10:30',
    isFavorite: true
  },
  {
    id: 'proj_2',
    storeName: '카페 봄날',
    category: '카페',
    title: '가을 시그니처 신메뉴 출시',
    ratio: '4:5',
    photoUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=80',
    headline: '가을을 담은 달콤함, 공주 밤라떼 출시',
    subheadline: '국내산 제철 햇밤을 듬뿍 갈아 만든 시그니처',
    bodyCopy: '선선한 바람이 불어오는 계절, 고소하고 진한 밤 크림과 스페셜티 에스프레소의 완벽한 조화를 직접 경험해보세요.',
    priceBadge: '신메뉴 런칭 10% DC (5,400원)',
    cta: '매장에서 따뜻하게 만나보세요',
    phone: '02-333-1234',
    address: '와우산로 18 (홍대 놀이터 옆)',
    primaryColor: '#78350F',
    accentColor: '#FDE68A',
    bgTheme: 'warm',
    fontSizeLevel: 'normal',
    fontFamily: 'serif',
    createdAt: '2026-09-15 14:15',
    isFavorite: false
  },
  {
    id: 'proj_3',
    storeName: '헤어살롱 수',
    category: '미용실',
    title: '첫 방문 고객 30% 특별 할인',
    ratio: '9:16',
    photoUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=80',
    headline: '인생 헤어를 찾는 첫걸음, 첫 방문 30% DC',
    subheadline: '1:1 두상 및 피부톤 맞춤 퍼스널 컷 & 펌 케어',
    bodyCopy: '청담 출신 수석 디자이너가 고객님의 숨겨진 아름다움을 찾아드립니다. 네이버 예약 시 프리미엄 두피 스케일링 무료 제공!',
    priceBadge: '첫 방문 펌/염색 30% 할인',
    cta: '네이버/전화 간편 예약',
    phone: '02-888-9999',
    address: '여의대방로 22 보라매파크뷰 2층',
    primaryColor: '#4F46E5',
    accentColor: '#38BDF8',
    bgTheme: 'light',
    fontSizeLevel: 'normal',
    fontFamily: 'sans',
    createdAt: '2026-09-14 09:00',
    isFavorite: true
  },
  {
    id: 'proj_4',
    storeName: '삼거리 돈가츠',
    category: '음식점',
    title: '직장인 든든 점심특선 9,900원',
    ratio: '1:1',
    photoUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80',
    headline: '고물가 시대 응원! 점심특선 9,900원',
    subheadline: '100% 국내산 한돈 수제 안심 카츠 정식',
    bodyCopy: '공기밥, 미소된장국, 샐러드 무한 리필! 오전 11:30 ~ 오후 2:00까지 정성껏 대접합니다.',
    priceBadge: '점심특선 9,900원 균일가',
    cta: '오늘 점심 여기서 해결!',
    phone: '02-777-1111',
    address: '테헤란로 12길 강남역 3번출구',
    primaryColor: '#1E293B',
    accentColor: '#EAB308',
    bgTheme: 'dark',
    fontSizeLevel: 'large',
    fontFamily: 'display',
    createdAt: '2026-09-13 11:20',
    isFavorite: false
  }
];

export const DEFAULT_MENU_ITEMS: MenuItem[] = [
  { id: 'm1', name: '가마솥 바삭 옛날통닭', price: '9,900원', desc: '겉은 바삭하고 속은 촉촉한 30년 전통 시그니처', category: '메인메뉴', isPopular: true },
  { id: 'm2', name: '양념 통닭 (매콤달콤)', price: '12,900원', desc: '비법 수제 양념 소스로 버무린 국민 치킨', category: '메인메뉴', isPopular: true },
  { id: 'm3', name: '순살 꿀닭강정 (대)', price: '8,900원', desc: '아이들 간식, 맥주 안주로 최고인 한입 닭강정', category: '메인메뉴' },
  { id: 'm4', name: '바삭 치즈볼 (5개)', price: '4,500원', desc: '모짜렐라 치즈가 쭈욱 늘어나는 찹쌀볼', category: '사이드' },
  { id: 'm5', name: '살얼음 생맥주 500cc', price: '4,000원', desc: '가슴속까지 시원하게 얼어붙는 저온숙성 맥주', category: '음료/주류', isPopular: true },
  { id: 'm6', name: '패밀리 실속세트', price: '21,900원', desc: '옛날통닭 + 닭강정 + 치즈볼 + 콜라 1.25L', category: '세트', isPopular: true }
];

export const CATEGORIES_LIST: { name: CategoryType; iconName: string; desc: string }[] = [
  { name: '음식점', iconName: 'Utensils', desc: '식당, 찌개, 고깃집, 국밥' },
  { name: '치킨/호프', iconName: 'Beer', desc: '치킨, 호프, 주점, 포차' },
  { name: '카페', iconName: 'Coffee', desc: '커피, 디저트, 음료' },
  { name: '베이커리', iconName: 'Cake', desc: '빵집, 제과, 베이글, 떡' },
  { name: '미용실', iconName: 'Scissors', desc: '헤어, 펌, 염색, 바버샵' },
  { name: '네일샵', iconName: 'Sparkles', desc: '네일아트, 패디, 속눈썹' },
  { name: '피부관리', iconName: 'HeartHandshake', desc: '에스테틱, 스킨케어, 마사지' },
  { name: '헬스/필라테스', iconName: 'Dumbbell', desc: '피트니스, 요가, PT, 체육관' },
  { name: '학원', iconName: 'GraduationCap', desc: '보습, 입시, 음악, 미술, 태권도' },
  { name: '부동산', iconName: 'Building2', desc: '공인중개사, 원룸, 상가' },
  { name: '자동차/세차', iconName: 'Car', desc: '손세차, 정비, 틴팅, 튜닝' },
  { name: '숙박', iconName: 'Hotel', desc: '펜션, 모텔, 게스트하우스' },
  { name: '소매점', iconName: 'ShoppingBag', desc: '꽃집, 정육점, 청과, 옷가게' },
  { name: '기타', iconName: 'Store', desc: '모든 자영업 매장' }
];

export const QUICK_PROMO_CHIPS = [
  '오픈 1+1 파격 이벤트',
  '오늘만 치킨 2마리 19,900원',
  '직장인 점심특선 8,900원',
  '첫 방문 고객 30% 할인',
  '포장 주문 시 3,000원 즉시 할인',
  '가을 시즌 한정 신메뉴 출시',
  '선착순 50명 사은품 증정',
  '비 오는 날 생맥주 1+1'
];
