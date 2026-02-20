ALTER TABLE public.events ADD COLUMN meeting_url text;
ALTER TABLE public.events ADD COLUMN event_type text DEFAULT 'in_person';