class CustomErrorHandler extends Error{
  constructor(status,message){
    super(message)
    this.status = status
    this.msg = message
  }
}

module.exports = CustomErrorHandler