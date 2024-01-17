class APIfeatures {
    constructor(query, querystring) {
      this.query = query;
      this.querystring = querystring;
    }
  
    filtring() {
      const queryreq = { ...this.querystring };
      const excludedFields = ['page', 'sort', 'limit', 'fields'];
      excludedFields.forEach((el) => delete queryreq[el]);
  
      const querystring = JSON.stringify(queryreq).replace(
        /\b(gte|gt|lte|lt)\b/g,
        (match) => `$${match}`,
      );
  
      this.query.find(JSON.parse(querystring));
      return this;
    }
    sorting() {
      if (this.querystring.sort) {
        this.query = this.query.sort(req.query.sort);
      } else {
        this.query = this.query.sort('-createdAt');
      }
      return this;
    }
    limiting() {
      if (this.querystring.fields) {
        const fields = this.querystring.fields.split(',').join(' ');
        this.query = this.query.select(fields);
      } else {
        this.query = this.query.select('-__v');
      }
      return this;
    }
    pagination() {
      const page = this.querystring.page * 1 || 1;
      const limit = this.querystring.limit * 1 || 100;
      const skip = (page - 1) * limit;
  
      this.query = this.query.skip(skip).limit(limit);
  
      return this;
    }
  }

  module.exports = APIfeatures;