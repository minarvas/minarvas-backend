const adjectives = [
  '강렬한',
  '신비로운',
  '매혹적인',
  '아름다운',
  '신나는',
  '활기찬',
  '따뜻한',
  '차가운',
  '고요한',
  '빛나는',
  '무한한',
  '유쾌한',
  '쾌활한',
  '행복한',
  '낭만적인',
  '도전적인',
  '자유로운',
  '새로운',
  '화려한',
  '편안한',
  '독특한',
  '현대적인',
  '과거의',
  '미래의',
  '유연한',
  '선명한',
  '소박한',
  '신선한',
  '쾌적한',
  '도시의',
  '자연의',
  '청명한',
  '유순한',
  '황홀한',
  '달콤한',
  '섬세한',
  '단호한',
  '발랄한',
  '신사적인',
  '세련된',
  '고상한',
  '전통적인',
  '존경받는',
  '영리한',
  '참신한',
  '수줍은',
  '경이로운',
  '황홀한',
  '환상적인',
  '절제된',
  '맑은',
  '어두운',
  '무거운',
  '가벼운',
  '쫄깃한',
  '단단한',
  '부드러운',
  '건강한',
  '유리한',
  '불가사의한',
  '기발한',
  '마법같은',
  '단순한',
  '원활한',
  '빠른',
  '느린',
  '고요한',
  '분주한',
  '감각적인',
  '감동적인',
  '우아한',
  '감사한',
  '따뜻한',
  '꾸준한',
  '고요한',
  '환한',
  '진중한',
  '자세한',
  '깔끔한',
  '남다른',
  '끈질긴',
  '긴장감 있는',
  '완벽한',
  '친절한',
  '화목한',
  '다정한',
  '존경받는',
  '소중한',
  '정갈한',
  '담백한',
  '생기있는',
  '책임감 있는',
  '끊임없는',
  '맑은',
];

const nouns = [
  {
    name: '달팽이',
    imageUrl:
      'https://minarvas.s3.ap-northeast-2.amazonaws.com/profile-image/%E1%84%83%E1%85%A1%E1%86%AF%E1%84%91%E1%85%A2%E1%86%BC%E1%84%8B%E1%85%B5.png',
  },
  {
    name: '스포아',
    imageUrl:
      'https://minarvas.s3.ap-northeast-2.amazonaws.com/profile-image/%E1%84%89%E1%85%B3%E1%84%91%E1%85%A9%E1%84%8B%E1%85%A1.png',
  },
  {
    name: '슬라임',
    imageUrl:
      'https://minarvas.s3.ap-northeast-2.amazonaws.com/profile-image/%E1%84%89%E1%85%B3%E1%86%AF%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%B7.png',
  },
  {
    name: '주황버섯',
    imageUrl:
      'https://minarvas.s3.ap-northeast-2.amazonaws.com/profile-image/%E1%84%8C%E1%85%AE%E1%84%92%E1%85%AA%E1%86%BC%E1%84%87%E1%85%A5%E1%84%89%E1%85%A5%E1%86%BA.png',
  },
  {
    name: '리본돼지',
    imageUrl:
      'https://minarvas.s3.ap-northeast-2.amazonaws.com/profile-image/%E1%84%85%E1%85%B5%E1%84%87%E1%85%A9%E1%86%AB%E1%84%83%E1%85%AB%E1%84%8C%E1%85%B5.png',
  },
  {
    name: '초록버섯',
    imageUrl:
      'https://minarvas.s3.ap-northeast-2.amazonaws.com/profile-image/%E1%84%8E%E1%85%A9%E1%84%85%E1%85%A9%E1%86%A8%E1%84%87%E1%85%A5%E1%84%89%E1%85%A5%E1%86%BA.png',
  },
  {
    name: '스티지',
    imageUrl:
      'https://minarvas.s3.ap-northeast-2.amazonaws.com/profile-image/%E1%84%89%E1%85%B3%E1%84%90%E1%85%B5%E1%84%8C%E1%85%B5.png',
  },
  {
    name: '뿔버섯',
    imageUrl:
      'https://minarvas.s3.ap-northeast-2.amazonaws.com/profile-image/%E1%84%88%E1%85%AE%E1%86%AF%E1%84%87%E1%85%A5%E1%84%89%E1%85%A5%E1%86%BA.png',
  },
  {
    name: '미요캐츠',
    imageUrl:
      'https://minarvas.s3.ap-northeast-2.amazonaws.com/profile-image/%E1%84%86%E1%85%B5%E1%84%8B%E1%85%AD%E1%84%8F%E1%85%A2%E1%84%8E%E1%85%B3.png',
  },
  {
    name: '페어리',
    imageUrl:
      'https://minarvas.s3.ap-northeast-2.amazonaws.com/profile-image/%E1%84%91%E1%85%A6%E1%84%8B%E1%85%A5%E1%84%85%E1%85%B5.png',
  },
  {
    name: '라츠',
    imageUrl: 'https://minarvas.s3.ap-northeast-2.amazonaws.com/profile-image/%E1%84%85%E1%85%A1%E1%84%8E%E1%85%B3.png',
  },
  {
    name: '티키',
    imageUrl: 'https://minarvas.s3.ap-northeast-2.amazonaws.com/profile-image/%E1%84%90%E1%85%B5%E1%84%8F%E1%85%B5.png',
  },
  {
    name: '루팡',
    imageUrl:
      'https://minarvas.s3.ap-northeast-2.amazonaws.com/profile-image/%E1%84%85%E1%85%AE%E1%84%91%E1%85%A1%E1%86%BC.png',
  },
  {
    name: '로랑',
    imageUrl:
      'https://minarvas.s3.ap-northeast-2.amazonaws.com/profile-image/%E1%84%85%E1%85%A9%E1%84%85%E1%85%A1%E1%86%BC.png',
  },
  {
    name: '월묘',
    imageUrl:
      'https://minarvas.s3.ap-northeast-2.amazonaws.com/profile-image/%E1%84%8B%E1%85%AF%E1%86%AF%E1%84%86%E1%85%AD.png',
  },
  {
    name: '엄티',
    imageUrl:
      'https://minarvas.s3.ap-northeast-2.amazonaws.com/profile-image/%E1%84%8B%E1%85%A5%E1%86%B7%E1%84%90%E1%85%B5.png',
  },
  {
    name: '페페',
    imageUrl: 'https://minarvas.s3.ap-northeast-2.amazonaws.com/profile-image/%E1%84%91%E1%85%A6%E1%84%91%E1%85%A6.png',
  },
  {
    name: '예티',
    imageUrl: 'https://minarvas.s3.ap-northeast-2.amazonaws.com/profile-image/%E1%84%8B%E1%85%A8%E1%84%90%E1%85%B5.png',
  },
  {
    name: '레쉬',
    imageUrl: 'https://minarvas.s3.ap-northeast-2.amazonaws.com/profile-image/%E1%84%85%E1%85%A6%E1%84%89%E1%85%B1.png',
  },
  {
    name: '하프',
    imageUrl: 'https://minarvas.s3.ap-northeast-2.amazonaws.com/profile-image/%E1%84%92%E1%85%A1%E1%84%91%E1%85%B3.png',
  },
];

export { adjectives, nouns };
