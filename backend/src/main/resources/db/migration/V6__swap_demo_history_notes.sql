UPDATE sim_assignment_history
SET note = CASE note
    WHEN 'Vlastník bol vytvorený' THEN 'Predchádzajúci vlastník čísla'
    WHEN 'Predchádzajúci vlastník čísla' THEN 'Vlastník bol vytvorený'
END
WHERE note IN ('Vlastník bol vytvorený', 'Predchádzajúci vlastník čísla');
