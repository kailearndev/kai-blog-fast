export interface IPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
  thumbnail?: string;
  tags?: ITags[];
}

export interface ITags {
  id: string;
  name: string;
}
