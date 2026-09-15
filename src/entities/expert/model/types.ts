/**
 * GET /main/expert-statistics/ javobining bitta elementi. Admin barcha
 * ekspertlarni, ekspert faqat o'zini oladi. Sanoqlar notakror sertifikatlar bo'yicha.
 */
export type ExpertStatistics = {
  id: number
  // Swagger misolida ism yo'q — kelmasa UI telefon raqamini ko'rsatadi
  full_name?: string
  phone: string
  pnfl: number | string | null
  passport: string | null
  role: string
  /** Ekspert tekshira oladigan tillar nomlari */
  language: string[]
  /** Ekspert tekshira oladigan sertifikat turlari nomlari */
  type: string[]
  all_certificates: number
  approved_certificates: number
  rejected_certificates: number
  problem_certificates: number
  pending_reviews: number
  /** `all_certificates` ning aliasi */
  total_reviewed: number
}
