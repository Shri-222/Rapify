

const validatePagination = ( req, res, next ) => {

    const LIMIT = 20;
    const MAX_LIMIT = 50;
    const DEFAULT_OFFSET = 0;
    
    let { limit, offset } = req.query;

    let Limit = parseInt( Limit );
    let Offset = parseInt( Offset );

    if( !Limit ) {
        limit = LIMIT;
    }
    
    if ( !Offset ) {
        offset = 0;
    }

    if ( Limit >= MAX_LIMIT ) {
        limit = MAX_LIMIT;
    }

    if ( Offset <= 0 ) {
        offset = DEFAULT_OFFSET;
    }

    req.pagination = { limit, offset };

    next();

}

export default validatePagination;