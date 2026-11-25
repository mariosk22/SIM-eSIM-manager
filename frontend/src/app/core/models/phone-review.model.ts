export interface PhoneReview {
  id: number;
  simCardId: number;
  iccid: string;
  author: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface PhoneReviewRequest {
  rating: number;
  comment: string;
}
