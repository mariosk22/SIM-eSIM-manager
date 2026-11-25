UPDATE sim_assignment_history
SET note = 'Vlastník bol vytvorený'
WHERE sim_card_id = 4
  AND unassigned_at IS NULL
  AND note = 'Aktuálny vlastník čísla';
