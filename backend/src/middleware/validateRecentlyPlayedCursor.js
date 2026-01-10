const validateRecentlyPlayedCursor = (req, res, next) => {
  const beforeRaw = req.query.before;
  const afterRaw = req.query.after;

  // 1. Mutual exclusion
  if (beforeRaw !== undefined && afterRaw !== undefined) {
    return res.status(400).json({
      error: "Provide either 'before' or 'after', not both",
    });
  }

  // 2. Neutral state (no cursor)
  if (beforeRaw === undefined && afterRaw === undefined) {
    req.cursor = {};
    return next();
  }

  // 3. Pick the one that exists
  const raw = beforeRaw ?? afterRaw;
  const key = beforeRaw !== undefined ? "before" : "after";

  // 4. Strict string validation (NO parseInt yet)
  if (
    typeof raw !== "string" ||
    raw.trim() === "" ||
    !/^\d+$/.test(raw)
  ) {
    return res.status(400).json({
      error: `Invalid ${key} cursor`,
    });
  }

  // 5. Numeric safety
  const value = Number(raw);

  if (!Number.isFinite(value) || value < 0) {
    return res.status(400).json({
      error: `Invalid ${key} cursor`,
    });
  }

  // 6. Pass only validated data
  req.cursor = { [key]: value };
  next();
};

export default validateRecentlyPlayedCursor;
