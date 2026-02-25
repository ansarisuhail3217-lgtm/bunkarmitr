
-- Users table
CREATE TABLE public.users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  mobile TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL CHECK (role IN ('bani','karigar','girasta','mokadam','pata_khodne_wala','bana_vale','cutting_machine_vale','deka_vale')),
  area TEXT NOT NULL DEFAULT '',
  experience TEXT NOT NULL DEFAULT '',
  service_type TEXT NOT NULL DEFAULT '',
  availability BOOLEAN NOT NULL DEFAULT true,
  rate TEXT NOT NULL DEFAULT '',
  profile_image TEXT NOT NULL DEFAULT '',
  lat DOUBLE PRECISION NOT NULL DEFAULT 25.3176,
  lng DOUBLE PRECISION NOT NULL DEFAULT 82.9739,
  average_rating DOUBLE PRECISION NOT NULL DEFAULT 0,
  total_ratings INTEGER NOT NULL DEFAULT 0,
  is_approved BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Anyone can read users (public directory)
CREATE POLICY "Users are publicly readable" ON public.users FOR SELECT USING (true);
-- Anyone can insert (registration without auth)
CREATE POLICY "Anyone can register" ON public.users FOR INSERT WITH CHECK (true);
-- Anyone can update (simple mobile login, no auth)
CREATE POLICY "Anyone can update users" ON public.users FOR UPDATE USING (true);

-- Jobs table
CREATE TABLE public.jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  posted_by UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  posted_by_name TEXT NOT NULL DEFAULT '',
  role_required TEXT NOT NULL CHECK (role_required IN ('bani','karigar','girasta','mokadam','pata_khodne_wala','bana_vale','cutting_machine_vale','deka_vale')),
  description TEXT NOT NULL DEFAULT '',
  urgency TEXT NOT NULL DEFAULT 'medium' CHECK (urgency IN ('low','medium','high')),
  area TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open','filled')),
  rate_type TEXT CHECK (rate_type IN ('saree','dupatta','suit')),
  rate_amount DOUBLE PRECISION,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Jobs are publicly readable" ON public.jobs FOR SELECT USING (true);
CREATE POLICY "Anyone can post jobs" ON public.jobs FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update jobs" ON public.jobs FOR UPDATE USING (true);

-- Ratings table
CREATE TABLE public.ratings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  rater_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  rater_name TEXT NOT NULL DEFAULT '',
  receiver_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  job_id TEXT NOT NULL DEFAULT '',
  rating_value INTEGER NOT NULL CHECK (rating_value BETWEEN 1 AND 5),
  review_text TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.ratings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Ratings are publicly readable" ON public.ratings FOR SELECT USING (true);
CREATE POLICY "Anyone can add ratings" ON public.ratings FOR INSERT WITH CHECK (true);
