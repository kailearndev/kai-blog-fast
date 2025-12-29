export interface IPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
  thumbnail?: string;
  tags: ITags[];
  summary: string;
}

export interface ITags {
  id: string;
  name: string;
}

export interface CreatePostCTO {
  title: string;
  slug: string;
  content: string;
  is_public?: boolean;
  thumbnail?: string;
  summary: string;
  tags?: string[]; // Comma-separated tag IDs
}

export interface UpdatePostCTO extends Partial<CreatePostCTO> {}
