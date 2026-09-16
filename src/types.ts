export type CategoryType =
  | '음식점'
  | '치킨/호프'
  | '카페'
  | '베이커리'
  | '미용실'
  | '네일샵'
  | '피부관리'
  | '헬스/필라테스'
  | '학원'
  | '부동산'
  | '자동차/세차'
  | '숙박'
  | '소매점'
  | '기타';

export type MoodType =
  | '고급스러운'
  | '깔끔한'
  | '맛있어 보이는'
  | '귀여운'
  | '강렬한'
  | '따뜻한'
  | '감성적인'
  | '전통적인'
  | '젊은 느낌';

export type RatioType = '1:1' | '4:5' | '9:16' | '16:9' | 'A4';

export interface StoreProfile {
  id: string;
  storeName: string;
  category: CategoryType;
  phone: string;
  address: string;
  primaryColor: string;
  accentColor?: string;
  logoText?: string;
  representativeMenu?: string;
  priceLevel?: string;
  tagline?: string;
}

export interface DesignVariant {
  id: 'clean_modern' | 'bold_sale' | 'warm_emotional' | 'luxury';
  styleName: string;
  styleDesc: string;
  headline: string;
  subheadline: string;
  bodyCopy: string;
  priceBadge: string;
  cta: string;
  bgTheme: 'light' | 'red' | 'warm' | 'dark' | 'yellow' | 'green';
  primaryColor: string;
  accentColor: string;
  tag: string;
}

export interface PromotionProject {
  id: string;
  storeName: string;
  category: CategoryType;
  title: string;
  ratio: RatioType;
  photoUrl: string;
  headline: string;
  subheadline: string;
  bodyCopy: string;
  priceBadge: string;
  cta: string;
  phone: string;
  address: string;
  primaryColor: string;
  accentColor: string;
  bgTheme: string;
  fontSizeLevel: 'normal' | 'large' | 'xlarge';
  fontFamily: 'sans' | 'serif' | 'display';
  createdAt: string;
  isFavorite?: boolean;
}

export interface SnsPosts {
  instagram: string;
  karrot: string;
  kakao: string;
}

export interface MenuItem {
  id: string;
  name: string;
  price: string;
  desc?: string;
  category: '메인메뉴' | '사이드' | '음료/주류' | '세트';
  isPopular?: boolean;
}
