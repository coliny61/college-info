// seed-brand-deals.ts — Creates BrandPartner and SchoolBrandDeal records (Influxor)

export const seedBrandPartners = [
  { id: 'bp-marucci', slug: 'marucci', name: 'Marucci', category: 'apparel', logoUrl: '/images/brands/marucci.png', websiteUrl: 'https://maruccisports.com', description: 'Premium baseball and softball equipment trusted by elite athletes at every level.' },
  { id: 'bp-deoblock', slug: 'deoblock', name: 'DeoBlock', category: 'wellness', logoUrl: '/images/brands/deoblock.png', websiteUrl: 'https://deoblock.com', description: 'Natural deodorant and body care products designed for active lifestyles.' },
  { id: 'bp-fanspark', slug: 'fanspark', name: 'FanSpark', category: 'tech', logoUrl: '/images/brands/fanspark.png', websiteUrl: 'https://fanspark.com', description: 'Fan engagement platform connecting athletes with their audiences.' },
  { id: 'bp-goat-coats', slug: 'goat-coats', name: 'GOAT Coats', category: 'apparel', logoUrl: '/images/brands/goat-coats.png', websiteUrl: 'https://goatcoats.com', description: 'Premium athletic outerwear for the greatest of all time.' },
  { id: 'bp-cellev8', slug: 'cellev8', name: 'Cellev8', category: 'nutrition', logoUrl: '/images/brands/cellev8.png', websiteUrl: 'https://cellev8.com', description: 'Cellular-level hydration and recovery supplements for peak performance.' },
  { id: 'bp-hny-plus', slug: 'hny-plus', name: 'HNY+', category: 'nutrition', logoUrl: '/images/brands/hny-plus.png', websiteUrl: 'https://hnyplus.com', description: 'Honey-based performance nutrition and natural energy products.' },
  { id: 'bp-revomadic', slug: 'revomadic', name: 'Revomadic', category: 'lifestyle', logoUrl: '/images/brands/revomadic.png', websiteUrl: 'https://revomadic.com', description: 'Modern lifestyle brand for athletes who live on the move.' },
  { id: 'bp-dive-coastal', slug: 'dive-coastal-cuisine', name: 'Dive Coastal Cuisine', category: 'food', logoUrl: '/images/brands/dive-coastal.png', websiteUrl: 'https://divecoastalcuisine.com', description: 'Fresh coastal cuisine and meal options for athletes.' },
  { id: 'bp-chopshop', slug: 'original-chopshop', name: 'Original ChopShop', category: 'food', logoUrl: '/images/brands/chopshop.png', websiteUrl: 'https://originalchopshop.com', description: 'Fast-casual restaurant serving protein bowls, juices, and healthy meals designed for active lifestyles.' },
]

export const seedSchoolBrandDeals = [
  // UMHB deals (all 9 brands)
  { schoolId: 'umhb-crusaders-001', brandPartnerId: 'bp-marucci', dealText: 'CUSTOMIZED PRICING VIA LINK', promoUrl: 'https://maruccisports.com/umhb', isActive: true, isFeatured: true, sortOrder: 1 },
  { schoolId: 'umhb-crusaders-001', brandPartnerId: 'bp-deoblock', dealText: '20% OFF ALL PRODUCTS FOR ALL ATHLETES', promoCode: 'UMHB20', isActive: true, isFeatured: false, sortOrder: 2 },
  { schoolId: 'umhb-crusaders-001', brandPartnerId: 'bp-fanspark', dealText: 'BETA ACCESS', isActive: true, isFeatured: false, sortOrder: 3 },
  { schoolId: 'umhb-crusaders-001', brandPartnerId: 'bp-goat-coats', dealText: 'ENJOY 20% OFF YOUR FIRST GOAT COAT PURCHASE!', promoCode: 'CRU20', isActive: true, isFeatured: true, sortOrder: 4 },
  { schoolId: 'umhb-crusaders-001', brandPartnerId: 'bp-cellev8', dealText: 'EXCLUSIVE ATHLETE PRICING', isActive: true, isFeatured: false, sortOrder: 5 },
  { schoolId: 'umhb-crusaders-001', brandPartnerId: 'bp-hny-plus', dealText: '20% OFF STANDARD FOR ANY ATHLETE', promoCode: 'CRU20', isActive: true, isFeatured: false, sortOrder: 6 },
  { schoolId: 'umhb-crusaders-001', brandPartnerId: 'bp-revomadic', dealText: '15% OFF TO ALL ATHLETES', promoCode: 'CRU15', isActive: true, isFeatured: false, sortOrder: 7 },
  { schoolId: 'umhb-crusaders-001', brandPartnerId: 'bp-dive-coastal', dealText: '25% OFF', promoCode: 'CRU25', isActive: true, isFeatured: false, sortOrder: 8 },
  { schoolId: 'umhb-crusaders-001', brandPartnerId: 'bp-chopshop', dealText: '5% OFF, MUST BE A REGISTERED LOYALTY GUEST', isActive: true, isFeatured: false, sortOrder: 9 },

  // TAMUCC deals (all 9 brands)
  { schoolId: 'tamucc-islanders-001', brandPartnerId: 'bp-marucci', dealText: 'CUSTOMIZED PRICING VIA LINK', promoUrl: 'https://maruccisports.com/tamucc', isActive: true, isFeatured: true, sortOrder: 1 },
  { schoolId: 'tamucc-islanders-001', brandPartnerId: 'bp-deoblock', dealText: '20% OFF ALL PRODUCTS FOR ALL ATHLETES', promoCode: 'ISLAND20', isActive: true, isFeatured: false, sortOrder: 2 },
  { schoolId: 'tamucc-islanders-001', brandPartnerId: 'bp-fanspark', dealText: 'BETA ACCESS', isActive: true, isFeatured: false, sortOrder: 3 },
  { schoolId: 'tamucc-islanders-001', brandPartnerId: 'bp-goat-coats', dealText: 'ENJOY 20% OFF YOUR FIRST GOAT COAT PURCHASE!', promoCode: 'ISLAND20', isActive: true, isFeatured: true, sortOrder: 4 },
  { schoolId: 'tamucc-islanders-001', brandPartnerId: 'bp-cellev8', dealText: 'EXCLUSIVE ATHLETE PRICING', isActive: true, isFeatured: false, sortOrder: 5 },
  { schoolId: 'tamucc-islanders-001', brandPartnerId: 'bp-hny-plus', dealText: '20% OFF STANDARD FOR ANY ATHLETE', promoCode: 'ISLAND20', isActive: true, isFeatured: false, sortOrder: 6 },
  { schoolId: 'tamucc-islanders-001', brandPartnerId: 'bp-revomadic', dealText: '15% OFF TO ALL ATHLETES', promoCode: 'ISLAND15', isActive: true, isFeatured: false, sortOrder: 7 },
  { schoolId: 'tamucc-islanders-001', brandPartnerId: 'bp-dive-coastal', dealText: '25% OFF', promoCode: 'ISLAND25', isActive: true, isFeatured: true, sortOrder: 8 },
  { schoolId: 'tamucc-islanders-001', brandPartnerId: 'bp-chopshop', dealText: '5% OFF, MUST BE A REGISTERED LOYALTY GUEST', isActive: true, isFeatured: false, sortOrder: 9 },
]

export async function seedBrandDeals(prisma: any) {
  // Create brand partners
  for (const bp of seedBrandPartners) {
    await prisma.brandPartner.create({ data: bp })
  }
  console.log(`  Created ${seedBrandPartners.length} Brand Partners`)

  // Create school brand deals
  for (const deal of seedSchoolBrandDeals) {
    await prisma.schoolBrandDeal.create({ data: deal })
  }
  console.log(`  Created ${seedSchoolBrandDeals.length} School Brand Deals`)
}
