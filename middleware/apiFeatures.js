
class ApiFeatures{
constructor(querySt,mongooseQuery){
    this.querySt = querySt ; 
    this.mongooseQuery=mongooseQuery;
}
//filtering

filter(){
  const filter = {...this.querySt}
  const obj = ['page','limit','fields'];
  obj.forEach((x)=> delete filter[x])

let querySt = JSON.stringify(filter);
querySt = querySt.replace(/\b(gte|gt|lte|lt)\b/g, (match)=>`$${match}`)

this.mongooseQuery = this.mongooseQuery.find(JSON.parse(querySt))
return this;
}

// sorting  
sort(){
if(this.querySt.sort){
    const sortBy = this.querySt.sort.split(',').join(' ')
    this.mongooseQuery = this.mongooseQuery.sort(sortBy)
  }else{
    this.mongooseQuery = this.mongooseQuery.sort('-createdAt')
  }
return this ;
}

// limit fields 

limitFields(){
if(this.querySt.select){
    const selectBy = this.querySt.select.split(',').join(' ');
    this.mongooseQuery = this.mongooseQuery.select(selectBy)
}else{
  this.mongooseQuery = this.mongooseQuery.select('-__v')
}
return this;
}

//searching 
search(modelName){
  if(this.querySt.keyWords){
    let query = {};
    
    if(modelName == 'Products'){
    query.$or=[
      {title:{$regex:this.querySt.keyWords,$options:'i'}},
      {description:{$regex:this.querySt.keyWords,$options:'i'}}
    ]
  }else{
    query = {name:{$regex:this.querySt.keyWords,$options:'i'}}

  }
    this.mongooseQuery= this.mongooseQuery.find(query)

  }
  return this;
}

//Pagination
paginate(contDocuments){
const page =this.querySt.page * 1 || 1;
const limit =this.querySt.limit * 1 || 50;
const skip = (page - 1) * limit;
const endIndex = page * limit; 


const pagination = {};
pagination.limit = limit;
pagination.currentPage = page;
pagination.numberOfPage=Math.ceil(contDocuments/limit) 

this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit)

if(endIndex < contDocuments){
  pagination.nextPage = page + 1 ;
}

if(skip > 0){
  pagination.prv = page-1
}
this.paginationResult = pagination
return this;
}

}

module.exports =ApiFeatures;