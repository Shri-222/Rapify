

const validatePagination = ( req, res, next ) => {

    const LIMIT = 20;
    const MAX_LIMIT = 50;
    const DEFAULT_OFFSET = 0;
    
    let limitRaw = req.query.limit;
    let offsetRaw = req.query.offset;

    let limit = parseInt( limitRaw );
    let offset = parseInt( offsetRaw );

        // LIMIT
    if (!Number.isFinite(limit) || limit <= 0) {
        limit = DEFAULT_LIMIT;
    } else if (limit > MAX_LIMIT) {
        limit = MAX_LIMIT;
    } else {
        limit = Math.floor(limit);
    }

    // OFFSET
    if (!Number.isFinite(offset) || offset < 0) {
        offset = DEFAULT_OFFSET;
    } else {
        offset = Math.floor(offset);
    }
    
    req.pagination = { limit, offset };

    next();

}

export default validatePagination;