
const validateTimeRange  = ( req , res, next ) => {

    const allowedRanges = [ 'short_term','medium_term','long_term'];

    const {time_range}  = req.query || 'medium_term';

    if ( !time_range ) { 
        time_range = 'medium_term';
    }

    if ( !allowedRanges.includes( time_range )) {
        return res.status(400).json (
            {
                error : " Invalid Time Range Provided"
            }
        )
    }

    req.time_range = time_range;

    next();

}

export default validateTimeRange ;