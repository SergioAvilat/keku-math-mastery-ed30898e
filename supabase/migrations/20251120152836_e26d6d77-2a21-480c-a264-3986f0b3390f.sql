-- Crear tabla para premios/recompensas reclamadas
CREATE TABLE public.claimed_rewards (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  reward_type TEXT NOT NULL, -- 'quote' o 'tip'
  reward_content TEXT NOT NULL,
  xp_cost INTEGER NOT NULL DEFAULT 20,
  claimed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.claimed_rewards ENABLE ROW LEVEL SECURITY;

-- Políticas RLS
CREATE POLICY "Users can view their own rewards"
ON public.claimed_rewards
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own rewards"
ON public.claimed_rewards
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Índice para mejorar performance
CREATE INDEX idx_claimed_rewards_user_id ON public.claimed_rewards(user_id);
CREATE INDEX idx_claimed_rewards_claimed_at ON public.claimed_rewards(claimed_at DESC);