-- Function to increment user streak
CREATE OR REPLACE FUNCTION increment_user_streak(user_id UUID)
RETURNS INTEGER AS $$
DECLARE
    current_streak INTEGER;
BEGIN
    -- Get current streak
    SELECT streak_count INTO current_streak 
    FROM public.profiles 
    WHERE id = user_id;
    
    -- If no profile found, return 0
    IF current_streak IS NULL THEN
        RETURN 0;
    END IF;
    
    -- Increment streak
    UPDATE public.profiles 
    SET streak_count = current_streak + 1, updated_at = NOW()
    WHERE id = user_id;
    
    RETURN current_streak + 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to reset user streak
CREATE OR REPLACE FUNCTION reset_user_streak(user_id UUID)
RETURNS INTEGER AS $$
BEGIN
    UPDATE public.profiles 
    SET streak_count = 0, updated_at = NOW()
    WHERE id = user_id;
    
    RETURN 0;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user's daily progress
CREATE OR REPLACE FUNCTION get_daily_progress(user_id UUID, target_date DATE DEFAULT CURRENT_DATE)
RETURNS TABLE (
    total_goals INTEGER,
    completed_goals INTEGER,
    total_subtasks INTEGER,
    completed_subtasks INTEGER,
    total_time_spent INTEGER
) AS $$
BEGIN
    RETURN QUERY
    WITH daily_goals AS (
        SELECT g.id, g.completed as goal_completed
        FROM public.goals g
        WHERE g.user_id = user_id 
        AND DATE(g.created_at) = target_date
    ),
    daily_subtasks AS (
        SELECT s.id, s.completed, s.time_spent
        FROM public.subtasks s
        JOIN daily_goals dg ON s.goal_id = dg.id
    )
    SELECT 
        (SELECT COUNT(*)::INTEGER FROM daily_goals),
        (SELECT COUNT(*)::INTEGER FROM daily_goals WHERE goal_completed = true),
        (SELECT COUNT(*)::INTEGER FROM daily_subtasks),
        (SELECT COUNT(*)::INTEGER FROM daily_subtasks WHERE completed = true),
        (SELECT COALESCE(SUM(time_spent), 0)::INTEGER FROM daily_subtasks)
    ;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;