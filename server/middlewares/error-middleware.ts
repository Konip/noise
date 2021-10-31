import ApiError from '../exceptions/api-error';

export = function (err:any, req:any, res:any, next:any) {
    console.log(err);
    if (err instanceof ApiError) {
        return res.status(err.status).json({message: err.message, errors: err.errors})
    }
      return res.status(500).json({message: err.message, errors: err.errors})

};
